import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import mockDB from '../../../utils/mockDatabase';
import { Button, Card, SimpleBarChart, FloatingActionButton, Toast } from '../../../components/ui';
import { Sidebar } from '../../../components/layout';
import styles from './DashboardUser.module.css';

/**
 * Dashboard de Usuario
 * Muestra resumen financiero, gráficas y acciones rápidas
 */
function DashboardUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, currentPerfil, loading: authLoading, logout } = useAuth();

  // Estados
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [presupuestos, setPresupuestos] = useState([]);
  const [logros, setLogros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartView, setChartView] = useState('monthly'); // 'monthly' o 'last6months'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState(null);

  // Estadísticas calculadas
  const [stats, setStats] = useState({
    totalIngresos: 0,
    totalEgresos: 0,
    balance: 0,
    ahorro: 0
  });

  // Cargar datos al montar el componente
  useEffect(() => {
    // Esperar a que termine de cargar la autenticación
    if (authLoading) return;

    if (!currentUser || !currentPerfil) {
      navigate('/login');
      return;
    }

    cargarDatos();
  }, [currentUser, currentPerfil, authLoading, navigate]);

  // Mostrar notificación si viene del formulario de transacción
  useEffect(() => {
    if (location.state?.notification) {
      setToast(location.state.notification);
      
      // Limpiar el estado de navegación para evitar mostrar la notificación nuevamente
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const cargarDatos = () => {
    setLoading(true);

    const ing = mockDB.getIngresosDePerf(currentPerfil.id);
    const egr = mockDB.getEgresosDePerf(currentPerfil.id);
    const hist = mockDB.getHistorialDePerfil(currentPerfil.id);
    const pres = mockDB.getPresupuestosDePerfil(currentPerfil.id);
    const logr = mockDB.getLogrosDePerfil(currentPerfil.id);

    setIngresos(ing);
    setEgresos(egr);
    setHistorial(hist);
    setPresupuestos(pres);
    setLogros(logr);

    // Calcular estadísticas del mes actual
    const now = new Date();
    const mesActual = now.getMonth() + 1;
    const anioActual = now.getFullYear();

    const historialMes = hist.filter(h => h.mes === mesActual && h.anio === anioActual);
    
    const totalIngresos = historialMes
      .filter(h => h.tipo === 'ingreso')
      .reduce((sum, h) => sum + h.monto, 0);
    
    const totalEgresos = historialMes
      .filter(h => h.tipo === 'egreso')
      .reduce((sum, h) => sum + h.monto, 0);

    const balance = totalIngresos - totalEgresos;
    const ahorro = balance > 0 ? (balance / totalIngresos) * 100 : 0;

    setStats({
      totalIngresos,
      totalEgresos,
      balance,
      ahorro: ahorro.toFixed(1)
    });

    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Menú items para el Sidebar de Usuario
  const userMenuItems = [
    { label: 'Dashboard', path: '/user/dashboard' },
    { label: 'Administrador ingresos/egresos', path: '/user/administrar-registros' },
    { label: 'Plan de Ahorros', path: '/user/plan-ahorro' },
    { label: 'Ajuste de presupuestos', path: '/user/presupuestos' },
    { label: 'Planificador de deudas', path: '/user/planificador-deudas' },
    { label: 'Logros y Recompensas', path: '/user/logros' },
  ];

  // Menú dropdown del usuario
  const userDropdownItems = [
    { icon: '👤', label: 'Mi Cuenta', path: '/user/config-cuenta' },
    { icon: '�', label: 'Perfiles', path: '/user/config-perfiles' },
    { icon: '�', label: 'Notificaciones', path: '/user/config-notificaciones' },
    { icon: '🔒', label: 'Seguridad', path: '/user/config-seguridad' },
    { icon: '❓', label: 'Ayuda', path: '/user/config-ayuda' },
  ];

  // Datos para la gráfica del mes actual
  const chartDataMonthly = [
    { label: 'Ingresos', value: stats.totalIngresos, color: '#10b981' },
    { label: 'Egresos', value: stats.totalEgresos, color: '#ef4444' },
    { label: 'Balance', value: Math.abs(stats.balance), color: stats.balance >= 0 ? '#14b8a6' : '#f59e0b' }
  ];

  // Datos para la gráfica de últimos 6 meses
  const getLast6MonthsData = () => {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const targetMonth = targetDate.getMonth();
      const targetYear = targetDate.getFullYear();
      
      const monthIngresos = historial
        .filter(h => {
          const fecha = new Date(h.fechaEjecucion);
          return h.tipo === 'ingreso' && 
                 fecha.getMonth() === targetMonth && 
                 fecha.getFullYear() === targetYear;
        })
        .reduce((sum, h) => sum + h.monto, 0);
      
      const monthEgresos = historial
        .filter(h => {
          const fecha = new Date(h.fechaEjecucion);
          return h.tipo === 'egreso' && 
                 fecha.getMonth() === targetMonth && 
                 fecha.getFullYear() === targetYear;
        })
        .reduce((sum, h) => sum + h.monto, 0);
      
      const monthBalance = monthIngresos - monthEgresos;
      
      months.push({
        label: targetDate.toLocaleDateString('es', { month: 'short' }),
        value: Math.abs(monthBalance),
        color: monthBalance >= 0 ? '#14b8a6' : '#f59e0b'
      });
    }
    
    return months;
  };

  const chartDataLast6Months = getLast6MonthsData();

  // Datos según el estado del toggle
  const chartData = chartView === 'monthly' ? chartDataMonthly : chartDataLast6Months;

  // Logros desbloqueados
  const logrosDesbloqueados = logros.filter(l => l.desbloqueado).length;

  // Items del FAB (Floating Action Button)
  const fabMenuItems = [
    { icon: '💰', label: 'Nuevo Ingreso', path: '/user/nuevo-ingreso' },
    { icon: '💸', label: 'Nuevo Egreso', path: '/user/nuevo-egreso' },
    { icon: '📋', label: 'Historial', path: '/user/historial' }
  ];

  // Mostrar loading mientras carga auth o datos
  if (authLoading || loading) {
    return (
      <div className={styles.dashboardPage}>
        <Sidebar 
          menuItems={userMenuItems} 
          userMenuItems={userDropdownItems} 
          variant="user"
          onCollapsedChange={setSidebarCollapsed}
        />
        <div className={`${styles.loadingContainer} ${sidebarCollapsed ? styles.collapsed : ''}`}>
          <p>Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardPage}>
      <Sidebar 
        menuItems={userMenuItems} 
        userMenuItems={userDropdownItems} 
        variant="user"
        onCollapsedChange={setSidebarCollapsed}
      />
      
      <div className={`${styles.dashboardContainer} ${sidebarCollapsed ? styles.collapsed : ''}`}>
        {/* Header */}
        <header className={styles.dashboardHeader}>
          <div className={styles.welcomeSection}>
            <h1>¡Hola, {currentUser.nombre}! 👋</h1>
            <p>Perfil: <strong>{currentPerfil.nombre}</strong> ({currentPerfil.moneda})</p>
          </div>
        </header>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <Card variant="success" icon="💰" title="Ingresos del Mes">
            <div className={styles.statValue}>
              {currentPerfil.simboloMoneda}{stats.totalIngresos.toLocaleString()}
            </div>
          </Card>

          <Card variant="danger" icon="💸" title="Egresos del Mes">
            <div className={styles.statValue}>
              {currentPerfil.simboloMoneda}{stats.totalEgresos.toLocaleString()}
            </div>
          </Card>

          <Card variant={stats.balance >= 0 ? 'primary' : 'warning'} icon="📊" title="Balance">
            <div className={styles.statValue}>
              {currentPerfil.simboloMoneda}{stats.balance.toLocaleString()}
            </div>
          </Card>

          <Card variant="default" icon="🎯" title="Logros Desbloqueados">
            <div className={styles.statValue}>
              {logrosDesbloqueados}/{logros.length}
            </div>
          </Card>
        </div>

        {/* Gráfica - Full Width */}
        <div className={styles.chartSection}>
          <Card 
            title={chartView === 'monthly' ? 'Balance Mensual' : 'Balance Últimos 6 Meses'} 
            subtitle={chartView === 'monthly' ? 'Resumen de este mes' : 'Tendencia semestral'}
          >
            <div className={styles.chartHeader}>
              <div className={styles.chartToggle}>
                <button 
                  className={`${styles.toggleButton} ${chartView === 'monthly' ? styles.active : ''}`}
                  onClick={() => setChartView('monthly')}
                >
                  Mensual
                </button>
                <button 
                  className={`${styles.toggleButton} ${chartView === 'last6months' ? styles.active : ''}`}
                  onClick={() => setChartView('last6months')}
                >
                  6 Meses
                </button>
              </div>
            </div>
            <SimpleBarChart data={chartData} height="250px" />
          </Card>
        </div>

        {/* Main Content Grid - Presupuestos y Transacciones */}
        <div className={styles.mainGrid}>
          {/* Presupuestos */}
          <div className={styles.leftColumn}>
            <Card title="Presupuestos" subtitle={`${presupuestos.length} activos`} icon="🎯">
              <div className={styles.presupuestosList}>
                {presupuestos.length === 0 ? (
                  <p className={styles.emptyMessage}>No tienes presupuestos configurados</p>
                ) : (
                  presupuestos.slice(0, 4).map(pres => (
                    <div key={pres.id} className={styles.presupuestoItem}>
                      <div className={styles.presupuestoHeader}>
                        <span className={styles.presupuestoCategoria}>{pres.categoria}</span>
                        <span className={styles.presupuestoMonto}>
                          {currentPerfil.simboloMoneda}{pres.montoGastado}/{pres.montoLimite}
                        </span>
                      </div>
                      <div className={styles.progressBar}>
                        <div 
                          className={`${styles.progressFill} ${styles[pres.estado]}`}
                          style={{ width: `${Math.min(pres.porcentajeGastado, 100)}%` }}
                        />
                      </div>
                      <span className={styles.presupuestoEstado}>
                        {pres.porcentajeGastado.toFixed(2)}% usado
                      </span>
                    </div>
                  ))
                )}
              </div>
              {presupuestos.length > 0 && (
                <Button 
                  variant="link" 
                  onClick={() => navigate('/user/presupuestos')}
                  className={styles.viewAllButton}
                >
                  Ver todos →
                </Button>
              )}
            </Card>
          </div>

          {/* Transacciones Recientes */}
          <div className={styles.rightColumn}>
            <Card title="Transacciones Recientes" subtitle="Últimos movimientos" icon="📋">
              <div className={styles.historialList}>
                {historial.length === 0 ? (
                  <p className={styles.emptyMessage}>No hay transacciones registradas</p>
                ) : (
                  historial.slice(0, 5).map(registro => (
                    <div key={registro.id} className={styles.historialItem}>
                      <div className={styles.historialIcon}>
                        {registro.tipo === 'ingreso' ? '💰' : '💸'}
                      </div>
                      <div className={styles.historialInfo}>
                        <span className={styles.historialDescripcion}>{registro.descripcion}</span>
                        <span className={styles.historialFecha}>
                          {new Date(registro.fechaEjecucion).toLocaleDateString()}
                        </span>
                      </div>
                      <span className={`${styles.historialMonto} ${styles[registro.tipo]}`}>
                        {registro.tipo === 'ingreso' ? '+' : '-'}
                        {currentPerfil.simboloMoneda}{registro.monto.toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
              {historial.length > 5 && (
                <Button 
                  variant="link" 
                  onClick={() => navigate('/user/historial')}
                  className={styles.viewAllButton}
                >
                  Ver todo el historial →
                </Button>
              )}
            </Card>
          </div>
        </div>

        {/* Floating Action Button */}
        <FloatingActionButton 
          menuItems={fabMenuItems}
          position="bottom-right"
          color="primary"
        />

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
    </div>
  );
}

export default DashboardUser;
