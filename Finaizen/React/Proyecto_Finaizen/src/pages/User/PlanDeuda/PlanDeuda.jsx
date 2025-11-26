import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../../../context/AuthContext';
import mockDB from '../../../utils/mockDatabase';
import { Button, Toast } from '../../../components/ui';
import DeudaCard from '../../../components/cards/DeudaCard';
import PlanDeudaModal from '../../../components/modals/PlanDeudaModal';
import ConsejoDeuda from '../../../components/deudas/ConsejoDeuda';
import ModalDetallesDeuda from '../../../components/modals/ModalDetallesDeuda';
import EstadisticasDeuda from '../../../components/deudas/EstadisticasDeuda';
import styles from './PlanDeuda.module.css';

/**
 * PlanDeuda - Página principal del Planificador de Deudas
 * Herramienta inteligente para gestionar y eliminar deudas
 */
function PlanDeuda() {
  const { currentPerfil } = useAuth();

  // Estado
  const [deudas, setDeudas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDeuda, setEditingDeuda] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDeuda, setSelectedDeuda] = useState(null);
  const [toast, setToast] = useState(null);
  const [filtro, setFiltro] = useState('todos');
  const [consejos, setConsejos] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);

  const simboloMoneda = currentPerfil?.moneda.simbolo || '$';

  const cargarDatos = useCallback(() => {
    if (!currentPerfil) return;

    setLoading(true);
    const deudasDelPerfil = mockDB.getPlanesDePerfil_Deuda(currentPerfil.id);
    setDeudas(deudasDelPerfil);

    // Cargar estadísticas
    const stats = mockDB.obtenerEstadisticasDeuda(currentPerfil.id);
    setEstadisticas(stats);

    // Generar consejos si hay deudas activas
    if (deudasDelPerfil.length > 0) {
      const todosConsejos = [];
      deudasDelPerfil.forEach(deuda => {
        const consejosDelDeuda = mockDB.generarConsejosDeuda(deuda.id);
        todosConsejos.push(...consejosDelDeuda);
      });
      setConsejos(todosConsejos.slice(0, 3));
    }

    setLoading(false);
  }, [currentPerfil]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleCrearDeuda = (deudaData) => {
    const result = mockDB.crearPlanDeuda({
      ...deudaData,
      perfilId: currentPerfil.id,
      montoPagado: 0
    });

    if (result.success) {
      setToast({
        type: 'success',
        message: `Deuda "${result.plan.nombre}" creada exitosamente 🎉`
      });
      setShowModal(false);
      cargarDatos();
    } else {
      setToast({
        type: 'error',
        message: 'Error al crear la deuda'
      });
    }
  };

  const handleEditarDeuda = (deuda) => {
    setEditingDeuda(deuda);
    setShowModal(true);
  };

  const handleGuardarEdicion = (deudaData) => {
    const result = mockDB.actualizarPlanDeuda(editingDeuda.id, deudaData);

    if (result.success) {
      setToast({
        type: 'success',
        message: 'Deuda actualizada exitosamente ✓'
      });
      setShowModal(false);
      setEditingDeuda(null);
      cargarDatos();
    } else {
      setToast({
        type: 'error',
        message: 'Error al actualizar la deuda'
      });
    }
  };

  const handleEliminarDeuda = (deudaId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta deuda?')) {
      const result = mockDB.eliminarPlanDeuda(deudaId);

      if (result.success) {
        setToast({
          type: 'success',
          message: 'Deuda eliminada exitosamente'
        });
        cargarDatos();
      } else {
        setToast({
          type: 'error',
          message: 'Error al eliminar la deuda'
        });
      }
    }
  };

  const handleVerDetalles = (deuda) => {
    setSelectedDeuda(deuda);
    setShowDetails(true);
  };

  const handleCerrarDetalles = () => {
    setShowDetails(false);
    setTimeout(() => {
      cargarDatos();
    }, 300);
  };

  const handlePausarDeuda = (deuda) => {
    const result = mockDB.pausarPlanDeuda(deuda.id);

    if (result.success) {
      setToast({
        type: 'info',
        message: 'Deuda pausada'
      });
      cargarDatos();
    }
  };

  const handleReactivarDeuda = (deuda) => {
    const result = mockDB.reactivarPlanDeuda(deuda.id);

    if (result.success) {
      setToast({
        type: 'success',
        message: 'Deuda reactivada'
      });
      cargarDatos();
    }
  };

  // Filtrar deudas
  const deudasFiltradas = useMemo(() => {
    let resultado = deudas;

    switch (filtro) {
      case 'activas':
        resultado = deudas.filter(d => d.estado === 'activo');
        break;
      case 'completadas':
        resultado = deudas.filter(d => d.estado === 'completado');
        break;
      case 'pausadas':
        resultado = deudas.filter(d => d.estado === 'pausado');
        break;
      default:
        resultado = deudas;
    }

    return resultado;
  }, [deudas, filtro]);

  if (loading && deudas.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Cargando deudas...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.titulo}>💳 Planificador de Deudas</h1>
          <p className={styles.subtitulo}>
            Gestiona tus deudas de forma inteligente y elimínalas estratégicamente
          </p>
        </div>
        <Button
          variant="brand"
          onClick={() => {
            setEditingDeuda(null);
            setShowModal(true);
          }}
        >
          ➕ Agregar Deuda
        </Button>
      </div>

      {/* Estadísticas */}
      {estadisticas && (
        <EstadisticasDeuda 
          estadisticas={estadisticas} 
          simboloMoneda={simboloMoneda}
        />
      )}

      {/* Consejos */}
      {consejos.length > 0 && (
        <ConsejoDeuda consejos={consejos} />
      )}

      {/* Filtros */}
      {deudas.length > 0 && (
        <div className={styles.filtros}>
          <button
            className={`${styles.filtro} ${filtro === 'todos' ? styles.activo : ''}`}
            onClick={() => setFiltro('todos')}
          >
            Todos ({deudas.length})
          </button>
          <button
            className={`${styles.filtro} ${filtro === 'activas' ? styles.activo : ''}`}
            onClick={() => setFiltro('activas')}
          >
            Activas ({deudas.filter(d => d.estado === 'activo').length})
          </button>
          <button
            className={`${styles.filtro} ${filtro === 'completadas' ? styles.activo : ''}`}
            onClick={() => setFiltro('completadas')}
          >
            Completadas ({deudas.filter(d => d.estado === 'completado').length})
          </button>
          <button
            className={`${styles.filtro} ${filtro === 'pausadas' ? styles.activo : ''}`}
            onClick={() => setFiltro('pausadas')}
          >
            Pausadas ({deudas.filter(d => d.estado === 'pausado').length})
          </button>
        </div>
      )}

      {/* Grid de deudas */}
      {deudasFiltradas.length > 0 ? (
        <div className={styles.grid}>
          {deudasFiltradas.map(deuda => (
            <DeudaCard
              key={deuda.id}
              plan={deuda}
              onEdit={handleEditarDeuda}
              onDelete={handleEliminarDeuda}
              onViewDetails={handleVerDetalles}
              simboloMoneda={simboloMoneda}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          {deudas.length === 0 ? (
            <>
              <p className={styles.emptyIcon}>💪</p>
              <h3>¡Excelente! No tienes deudas registradas</h3>
              <p>Comienza agregando deudas para gestionarlas de forma inteligente</p>
              <Button
                variant="brand"
                onClick={() => {
                  setEditingDeuda(null);
                  setShowModal(true);
                }}
              >
                Crear Mi Primer Plan
              </Button>
            </>
          ) : (
            <>
              <p className={styles.emptyIcon}>🔍</p>
              <h3>Sin deudas en este filtro</h3>
              <p>Prueba cambiando el filtro para ver otras deudas</p>
            </>
          )}
        </div>
      )}

      {/* Modal de crear/editar */}
      <PlanDeudaModal
        isOpen={showModal}
        plan={editingDeuda}
        onSave={editingDeuda ? handleGuardarEdicion : handleCrearDeuda}
        onCancel={() => {
          setShowModal(false);
          setEditingDeuda(null);
        }}
        simboloMoneda={simboloMoneda}
      />

      {/* Modal de detalles */}
      {selectedDeuda && (
        <ModalDetallesDeuda
          isOpen={showDetails}
          plan={selectedDeuda}
          onClose={handleCerrarDetalles}
          onPausar={handlePausarDeuda}
          onReactivar={handleReactivarDeuda}
          onRefresh={cargarDatos}
          simboloMoneda={simboloMoneda}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default PlanDeuda;
