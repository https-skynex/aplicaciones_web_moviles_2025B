import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import mockDB from '../../../utils/mockDatabase';
import { Button, Toast } from '../../../components/ui';
import PlanCard from '../../../components/cards/PlanCard';
import PlanAhorroModal from '../../../components/modals/PlanAhorroModal';
import ConsejoAhorro from '../../../components/savings/ConsejoAhorro';
import ModalDetallesPlan from '../../../components/modals/ModalDetallesPlan';
import EstadisticasAhorro from '../../../components/savings/EstadisticasAhorro';
import styles from './PlanAhorro.module.css';

/**
 * PlanAhorro - Página principal del Planificador de Ahorro
 * Herramienta innovadora para planificar y gestionar ahorros
 */
function PlanAhorro() {
  const { currentPerfil } = useAuth();
  
  // Estado
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [toast, setToast] = useState(null);
  const [filtro, setFiltro] = useState('todos'); // 'todos', 'activos', 'completados', 'pausados'
  const [consejos, setConsejos] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);

  const cargarDatos = useCallback(() => {
    if (!currentPerfil) return;

    setLoading(true);
    const planesDelPerfil = mockDB.getPlanesDePerfil(currentPerfil.id);
    setPlanes(planesDelPerfil);

    // Cargar estadísticas
    const stats = mockDB.obtenerEstadisticasAhorro(currentPerfil.id);
    setEstadisticas(stats);

    // Generar consejos si hay planes activos
    if (planesDelPerfil.length > 0) {
      const todesConsejos = [];
      planesDelPerfil.forEach(plan => {
        const consejosDelPlan = mockDB.generarConsejosAhorro(plan.id);
        todesConsejos.push(...consejosDelPlan);
      });
      setConsejos(todesConsejos.slice(0, 3)); // Mostrar max 3 consejos
    }

    setLoading(false);
  }, [currentPerfil]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleCrearPlan = (planData) => {
    const result = mockDB.crearPlanAhorro({
      ...planData,
      perfilId: currentPerfil.id,
      montoActual: 0
    });

    if (result.success) {
      setToast({
        type: 'success',
        message: `Plan "${result.plan.nombre}" creado exitosamente 🎉`
      });
      setShowModal(false);
      cargarDatos();
    } else {
      setToast({
        type: 'error',
        message: 'Error al crear el plan'
      });
    }
  };

  const handleEditarPlan = (plan) => {
    setEditingPlan(plan);
    setShowModal(true);
  };

  const handleGuardarEdicion = (planData) => {
    const result = mockDB.actualizarPlanAhorro(editingPlan.id, planData);

    if (result.success) {
      setToast({
        type: 'success',
        message: 'Plan actualizado exitosamente ✓'
      });
      setShowModal(false);
      setEditingPlan(null);
      cargarDatos();
    } else {
      setToast({
        type: 'error',
        message: 'Error al actualizar el plan'
      });
    }
  };

  const handleEliminarPlan = (planId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este plan?')) {
      const result = mockDB.eliminarPlan(planId);

      if (result.success) {
        setToast({
          type: 'success',
          message: 'Plan eliminado exitosamente'
        });
        cargarDatos();
      } else {
        setToast({
          type: 'error',
          message: 'Error al eliminar el plan'
        });
      }
    }
  };

  const handleVerDetalles = (plan) => {
    setSelectedPlan(plan);
    setShowDetails(true);
  };

  const handleCerrarDetalles = () => {
    setShowDetails(false);
    // Recargar datos para actualizar el montoActual en las tarjetas
    setTimeout(() => {
      cargarDatos();
    }, 300);
  };

  const handlePausarPlan = (plan) => {
    const result = mockDB.pausarPlan(plan.id);

    if (result.success) {
      setToast({
        type: 'info',
        message: 'Plan pausado'
      });
      cargarDatos();
    }
  };

  const handleReactivarPlan = (plan) => {
    const result = mockDB.reactivarPlan(plan.id);

    if (result.success) {
      setToast({
        type: 'success',
        message: 'Plan reactivado'
      });
      cargarDatos();
    }
  };

  // Filtrar planes
  const planesFiltrados = planes.filter(p => {
    if (filtro === 'activos') return p.estado === 'activo';
    if (filtro === 'completados') return p.estado === 'completado';
    if (filtro === 'pausados') return p.estado === 'pausado';
    return true;
  });

  const simboloMoneda = currentPerfil?.simboloMoneda || '$';

  if (loading) {
    return <div className={styles.loading}>Cargando planes de ahorro...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.titulo}>📊 Planificador de Ahorro</h1>
          <p className={styles.subtitle}>
            Crea y gestiona tus planes de ahorro con metas inteligentes y consejos personalizados
          </p>
        </div>
        <Button
          variant="brand"
          onClick={() => {
            setEditingPlan(null);
            setShowModal(true);
          }}
        >
          + Crear Nuevo Plan
        </Button>
      </div>

      {/* Consejos */}
      {consejos.length > 0 && (
        <div className={styles.seccionConsejos}>
          <h2 className={styles.seccionTitulo}>💡 Consejos Personalizados</h2>
          <ConsejoAhorro consejos={consejos} />
        </div>
      )}

      {/* Estadísticas */}
      {estadisticas && (
        <EstadisticasAhorro estadisticas={estadisticas} simboloMoneda={simboloMoneda} />
      )}

      {/* Filtros */}
      <div className={styles.filtros}>
        {['todos', 'activos', 'completados', 'pausados'].map(f => (
          <button
            key={f}
            className={`${styles.filtroBtn} ${filtro === f ? styles.active : ''}`}
            onClick={() => setFiltro(f)}
          >
            {f === 'todos' && 'Todos'}
            {f === 'activos' && '✅ Activos'}
            {f === 'completados' && '🎉 Completados'}
            {f === 'pausados' && '⏸️ Pausados'}
          </button>
        ))}
      </div>

      {/* Planes */}
      {planesFiltrados.length > 0 ? (
        <div className={styles.planesGrid}>
          {planesFiltrados.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={handleEditarPlan}
              onDelete={handleEliminarPlan}
              onViewDetails={handleVerDetalles}
              simboloMoneda={simboloMoneda}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>🎯</p>
          <p className={styles.emptyText}>
            {planes.length === 0
              ? 'Aún no tienes planes de ahorro. ¡Crea uno para comenzar!'
              : 'No hay planes en esta categoría.'}
          </p>
          {planes.length === 0 && (
            <Button
              variant="brand"
              onClick={() => {
                setEditingPlan(null);
                setShowModal(true);
              }}
            >
              Crear Mi Primer Plan
            </Button>
          )}
        </div>
      )}

      {/* Modal de crear/editar */}
      <PlanAhorroModal
        isOpen={showModal}
        plan={editingPlan}
        onSave={editingPlan ? handleGuardarEdicion : handleCrearPlan}
        onCancel={() => {
          setShowModal(false);
          setEditingPlan(null);
        }}
        simboloMoneda={simboloMoneda}
      />

      {/* Modal de detalles */}
      {selectedPlan && (
        <ModalDetallesPlan
          isOpen={showDetails}
          plan={selectedPlan}
          onClose={handleCerrarDetalles}
          onPausar={handlePausarPlan}
          onReactivar={handleReactivarPlan}
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

export default PlanAhorro;
