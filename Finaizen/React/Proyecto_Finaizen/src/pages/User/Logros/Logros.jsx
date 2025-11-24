import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import mockDB from '../../../utils/mockDatabase';
import { Card, Button, Toast } from '../../../components/ui';
import { ComprobanteModal } from '../../../components/modals';
import styles from './Logros.module.css';

/**
 * Componente AchievementCard
 * Tarjeta individual para mostrar cada logro con su progreso
 */
function AchievementCard({ logro, onAction }) {
  const isCompleted = logro.desbloqueado;
  const progress = logro.porcentajeProgreso || 0;

  return (
    <article 
      className={`${styles.achievementCard} ${isCompleted ? styles.isCompleted : ''}`}
      data-progress={progress}
    >
      {isCompleted && <div className={styles.badge}>Completado</div>}
      
      <div className={styles.achievementCardHeader}>
        {/* Mostrar logo de empresa si existe, sino el icono del logro */}
        {logro.logoEmpresa ? (
          <img 
            src={logro.logoEmpresa} 
            alt={logro.empresa || 'Logo'} 
            className={styles.companyLogo}
          />
        ) : (
          <div className={styles.achievementIcon}>
            {logro.icono}
          </div>
        )}
        <h3>{logro.nombre}</h3>
        {logro.empresa && (
          <span className={styles.empresaBadge}>{logro.empresa}</span>
        )}
      </div>

      <div className={styles.achievementCardBody}>
        <p className={styles.description}>{logro.descripcion}</p>
        
        <div className={styles.progressBar}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className={styles.progressText}>
          {logro.progreso} / {logro.meta} {getProgressLabel(logro.tipo)}
        </p>
        
        {logro.recompensa && (
          <div className={styles.reward}>
            <strong>🎁 Recompensa:</strong> {logro.recompensa}
            {logro.valorRecompensa > 0 && (
              <span className={styles.valorRecompensa}>
                ${logro.valorRecompensa} USD
              </span>
            )}
          </div>
        )}

        {/* Mostrar comprobantes subidos */}
        {logro.comprobantes && logro.comprobantes.length > 0 && (
          <div className={styles.comprobantesInfo}>
            <span className={styles.comprobanteIcon}>✓</span>
            {logro.comprobantes.length} comprobante(s) subido(s)
          </div>
        )}
      </div>

      <div className={styles.achievementCardFooter}>
        {isCompleted ? (
          <Button 
            variant="primary" 
            onClick={() => onAction(logro, 'ver')}
          >
            Ver Recompensa
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => onAction(logro, 'subir-comprobante')}
          >
            Subir Comprobante
          </Button>
        )}
      </div>
    </article>
  );
}

/**
 * Función auxiliar para obtener la etiqueta del progreso según el tipo
 */
function getProgressLabel(tipo) {
  switch(tipo) {
    case 'ahorro':
      return 'ahorrado';
    case 'registro':
      return 'registros';
    case 'presupuesto':
      return 'cumplido';
    case 'racha':
      return 'días';
    default:
      return 'completado';
  }
}

/**
 * Página de Logros
 * Muestra todos los logros del usuario con su progreso
 */
function Logros() {
  const navigate = useNavigate();
  const { currentUser, currentPerfil, loading: authLoading } = useAuth();
  
  const [logros, setLogros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' | 'completed' | 'in-progress'
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLogro, setSelectedLogro] = useState(null);
  const [toast, setToast] = useState(null);

  // Cargar logros del perfil actual
  useEffect(() => {
    if (authLoading) return;

    if (!currentUser || !currentPerfil) {
      navigate('/login');
      return;
    }

    // Verificar si los datos están actualizados
    const version = localStorage.getItem('finaizen_db_version');
    const expectedVersion = '2.0'; // Versión con logros de empresas
    
    if (version !== expectedVersion) {
      console.log('🔄 Actualizando base de datos a versión', expectedVersion);
      mockDB.clearLocalStorage();
      localStorage.setItem('finaizen_db_version', expectedVersion);
      window.location.reload();
      return;
    }

    cargarLogros();
  }, [currentUser, currentPerfil, authLoading, navigate]);

  const cargarLogros = () => {
    setLoading(true);
    const logrosDelPerfil = mockDB.getLogrosDePerfil(currentPerfil.id);
    console.log('📊 Logros cargados:', logrosDelPerfil.length);
    console.log('🏢 Logros de empresas:', logrosDelPerfil.filter(l => l.empresa).length);
    setLogros(logrosDelPerfil);
    setLoading(false);
  };

  // Filtrar logros según el filtro activo
  const logrosFiltrados = logros.filter(logro => {
    if (filter === 'completed') return logro.desbloqueado;
    if (filter === 'in-progress') return !logro.desbloqueado && logro.progreso > 0;
    return true; // 'all'
  });

  // Estadísticas
  const totalLogros = logros.length;
  const logrosCompletados = logros.filter(l => l.desbloqueado).length;
  const porcentajeCompletado = totalLogros > 0 
    ? Math.round((logrosCompletados / totalLogros) * 100) 
    : 0;

  // Handler para acciones en las tarjetas de logros
  const handleAction = (logro, action) => {
    if (action === 'ver') {
      // Mostrar detalles de la recompensa
      setToast({
        type: 'success',
        message: `¡Felicidades! Has desbloqueado: ${logro.recompensa || logro.nombre}`
      });
    } else if (action === 'subir-comprobante') {
      // Abrir modal para subir comprobante para CUALQUIER logro no completado
      setSelectedLogro(logro);
      setModalOpen(true);
    }
  };

  // Handler para enviar comprobante
  const handleSubmitComprobante = (comprobanteData) => {
    // Buscar el logro en el array de logros
    const logroIndex = logros.findIndex(l => l.id === selectedLogro.id);
    if (logroIndex !== -1) {
      const logroActualizado = logros[logroIndex];
      
      // Agregar el comprobante
      logroActualizado.agregarComprobante(comprobanteData.url);
      
      // Incrementar progreso
      logroActualizado.actualizarProgreso(logroActualizado.progreso + 1);
      
      // Actualizar en mockDB
      mockDB.logros = mockDB.logros.map(l => 
        l.id === logroActualizado.id ? logroActualizado : l
      );
      mockDB.saveToLocalStorage();
      
      // Actualizar estado local
      const nuevosLogros = [...logros];
      nuevosLogros[logroIndex] = logroActualizado;
      setLogros(nuevosLogros);
      
      // Mostrar mensaje de éxito
      setToast({
        type: 'success',
        message: `¡Comprobante subido! Progreso: ${logroActualizado.progreso}/${logroActualizado.meta}`
      });

      // Si el logro se completó, mostrar notificación especial
      if (logroActualizado.desbloqueado) {
        setTimeout(() => {
          setToast({
            type: 'success',
            message: `🎉 ¡Logro desbloqueado! ${logroActualizado.recompensa || logroActualizado.nombre}`
          });
        }, 2000);
      }
    }
  };

  // Mostrar loading mientras carga
  if (authLoading || loading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Cargando logros...</p>
      </div>
    );
  }

  return (
    <div className={styles.achievementsPage}>
      {/* Header con título y estadísticas */}
      <header className={styles.pageHeader}>
        <h1>Mis Logros y Recompensas</h1>
        <p className={styles.subtitle}>
          Completa desafíos, obtén recompensas y mejora tus hábitos financieros.
        </p>
        
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>🏆</span>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{logrosCompletados}/{totalLogros}</span>
              <span className={styles.statLabel}>Completados</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>📊</span>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{porcentajeCompletado}%</span>
              <span className={styles.statLabel}>Progreso Total</span>
            </div>
          </div>
        </div>
      </header>

      {/* Filtros */}
      <div className={styles.filtersBar}>
        <button 
          className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          Todos ({logros.length})
        </button>
        <button 
          className={`${styles.filterBtn} ${filter === 'completed' ? styles.active : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completados ({logrosCompletados})
        </button>
        <button 
          className={`${styles.filterBtn} ${filter === 'in-progress' ? styles.active : ''}`}
          onClick={() => setFilter('in-progress')}
        >
          En Progreso ({logros.filter(l => !l.desbloqueado && l.progreso > 0).length})
        </button>
      </div>

      {/* Grid de logros */}
      <div className={styles.achievementsGrid}>
        {logrosFiltrados.length > 0 ? (
          logrosFiltrados.map(logro => (
            <AchievementCard 
              key={logro.id} 
              logro={logro}
              onAction={handleAction}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🎯</span>
            <p>No hay logros en esta categoría</p>
          </div>
        )}
      </div>

      {/* Modal de comprobantes */}
      {selectedLogro && (
        <ComprobanteModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedLogro(null);
          }}
          logro={selectedLogro}
          onSubmit={handleSubmitComprobante}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
          duration={5000}
        />
      )}
    </div>
  );
}

export default Logros;
