import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import mockDB from '../../../utils/mockDatabase';
import { Sidebar } from '../../../components/layout';
import { Card, Button } from '../../../components/ui';
import styles from './Historial.module.css';

/**
 * Página de Historial de Transacciones
 * Muestra todas las transacciones ejecutadas con filtros y paginación
 */
function Historial() {
  const navigate = useNavigate();
  const { currentUser, currentPerfil, loading: authLoading } = useAuth();
  
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
    { icon: '👥', label: 'Perfiles', path: '/user/config-perfiles' },
    { icon: '🔔', label: 'Notificaciones', path: '/user/config-notificaciones' },
    { icon: '🔒', label: 'Seguridad', path: '/user/config-seguridad' },
    { icon: '❓', label: 'Ayuda', path: '/user/config-ayuda' },
  ];
  
  // Estados
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [filteredHistorial, setFilteredHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados de filtros
  const [filters, setFilters] = useState({
    tipo: 'todos', // 'todos' | 'ingreso' | 'egreso'
    mes: 'todos', // 'todos' | 1-12
    anio: new Date().getFullYear(),
    searchTerm: ''
  });

  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Cargar historial al montar el componente
  useEffect(() => {
    // Esperar a que termine de cargar la autenticación
    if (authLoading) return;

    // Si no hay usuario o perfil, redirigir al login
    if (!currentUser || !currentPerfil) {
      navigate('/login');
      return;
    }

    try {
      // Obtener historial del perfil actual
      const registros = mockDB.historial.filter(
        reg => reg.perfilId === currentPerfil.id
      );

      // Ordenar por fecha más reciente primero
      registros.sort((a, b) => 
        new Date(b.fechaEjecucion) - new Date(a.fechaEjecucion)
      );

      setHistorial(registros);
      setFilteredHistorial(registros);
    } catch (error) {
      console.error('Error al cargar historial:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPerfil, authLoading, currentUser, navigate]);

  // Aplicar filtros cuando cambian
  useEffect(() => {
    let result = [...historial];

    // Filtro por tipo
    if (filters.tipo !== 'todos') {
      result = result.filter(reg => reg.tipo === filters.tipo);
    }

    // Filtro por mes
    if (filters.mes !== 'todos') {
      result = result.filter(reg => reg.mes === parseInt(filters.mes));
    }

    // Filtro por año
    result = result.filter(reg => reg.anio === parseInt(filters.anio));

    // Filtro por búsqueda (descripción o categoría)
    if (filters.searchTerm.trim()) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(reg => 
        reg.descripcion.toLowerCase().includes(searchLower) ||
        reg.categoria.toLowerCase().includes(searchLower)
      );
    }

    setFilteredHistorial(result);
    setCurrentPage(1); // Resetear a la primera página cuando se filtran
  }, [filters, historial]);

  // Calcular paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistorial.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHistorial.length / itemsPerPage);

  // Calcular estadísticas del período filtrado
  const stats = {
    totalIngresos: filteredHistorial
      .filter(r => r.tipo === 'ingreso')
      .reduce((sum, r) => sum + r.monto, 0),
    totalEgresos: filteredHistorial
      .filter(r => r.tipo === 'egreso')
      .reduce((sum, r) => sum + r.monto, 0),
    balance: 0
  };
  stats.balance = stats.totalIngresos - stats.totalEgresos;

  // Manejadores de eventos
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClearFilters = () => {
    setFilters({
      tipo: 'todos',
      mes: 'todos',
      anio: new Date().getFullYear(),
      searchTerm: ''
    });
  };

  // Meses del año
  const meses = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' }
  ];

  // Generar años disponibles (últimos 5 años)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  if (authLoading || loading) {
    return (
      <div className={styles.historialPage}>
        <Sidebar 
          menuItems={userMenuItems} 
          userMenuItems={userDropdownItems} 
          variant="user"
          onCollapsedChange={setSidebarCollapsed}
        />
        <div className={`${styles.loadingContainer} ${sidebarCollapsed ? styles.collapsed : ''}`}>
          <p>Cargando historial...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario autenticado, no renderizar
  if (!currentUser || !currentPerfil) {
    return null;
  }

  return (
    <div className={styles.historialPage}>
      <Sidebar 
        menuItems={userMenuItems} 
        userMenuItems={userDropdownItems} 
        variant="user"
        onCollapsedChange={setSidebarCollapsed}
      />
      
      <div className={`${styles.historialContainer} ${sidebarCollapsed ? styles.collapsed : ''}`}>
        {/* Header */}
        <header className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1>📋 Historial de Transacciones</h1>
            <p>Registro completo de ingresos y egresos ejecutados</p>
          </div>
        </header>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <Card variant="success" icon="💰" title="Ingresos">
            <div className={styles.statValue}>
              {currentPerfil.simboloMoneda}{stats.totalIngresos.toLocaleString()}
            </div>
            <div className={styles.statLabel}>
              {filteredHistorial.filter(r => r.tipo === 'ingreso').length} transacciones
            </div>
          </Card>

          <Card variant="danger" icon="💸" title="Egresos">
            <div className={styles.statValue}>
              {currentPerfil.simboloMoneda}{stats.totalEgresos.toLocaleString()}
            </div>
            <div className={styles.statLabel}>
              {filteredHistorial.filter(r => r.tipo === 'egreso').length} transacciones
            </div>
          </Card>

          <Card variant={stats.balance >= 0 ? 'primary' : 'warning'} icon="📊" title="Balance">
            <div className={styles.statValue}>
              {currentPerfil.simboloMoneda}{stats.balance.toLocaleString()}
            </div>
            <div className={styles.statLabel}>
              {filteredHistorial.length} total
            </div>
          </Card>
        </div>

        {/* Filtros */}
        <Card title="Filtros" icon="🔍">
          <div className={styles.filtersContainer}>
            <div className={styles.filterRow}>
              {/* Búsqueda */}
              <div className={styles.filterGroup}>
                <label>Buscar:</label>
                <input
                  type="text"
                  placeholder="Descripción o categoría..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              {/* Tipo */}
              <div className={styles.filterGroup}>
                <label>Tipo:</label>
                <select
                  value={filters.tipo}
                  onChange={(e) => handleFilterChange('tipo', e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="todos">Todos</option>
                  <option value="ingreso">Ingresos</option>
                  <option value="egreso">Egresos</option>
                </select>
              </div>

              {/* Mes */}
              <div className={styles.filterGroup}>
                <label>Mes:</label>
                <select
                  value={filters.mes}
                  onChange={(e) => handleFilterChange('mes', e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="todos">Todos</option>
                  {meses.map(mes => (
                    <option key={mes.value} value={mes.value}>
                      {mes.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Año */}
              <div className={styles.filterGroup}>
                <label>Año:</label>
                <select
                  value={filters.anio}
                  onChange={(e) => handleFilterChange('anio', e.target.value)}
                  className={styles.filterSelect}
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón limpiar filtros */}
              <div className={styles.filterGroup}>
                <label>&nbsp;</label>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className={styles.clearButton}
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabla de Historial */}
        <Card>
          <div className={styles.tableContainer}>
            {currentItems.length === 0 ? (
              <div className={styles.emptyState}>
                <p>📭 No se encontraron transacciones con los filtros aplicados</p>
                <Button variant="outline" onClick={handleClearFilters}>
                  Limpiar Filtros
                </Button>
              </div>
            ) : (
              <>
                <table className={styles.historialTable}>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Tipo</th>
                      <th>Descripción</th>
                      <th>Categoría</th>
                      <th>Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map(registro => (
                      <tr key={registro.id}>
                        <td className={styles.dateColumn}>
                          {new Date(registro.fechaEjecucion).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                        <td>
                          <span className={`${styles.badge} ${styles[registro.tipo]}`}>
                            {registro.tipo === 'ingreso' ? '💰 Ingreso' : '💸 Egreso'}
                          </span>
                        </td>
                        <td className={styles.descriptionColumn}>
                          {registro.descripcion}
                        </td>
                        <td className={styles.categoryColumn}>
                          {registro.categoria}
                        </td>
                        <td className={`${styles.montoColumn} ${styles[registro.tipo]}`}>
                          {registro.tipo === 'ingreso' ? '+' : '-'}
                          {currentPerfil.simboloMoneda}{registro.monto.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      ← Anterior
                    </Button>
                    
                    <div className={styles.pageNumbers}>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`${styles.pageButton} ${
                            pageNum === currentPage ? styles.active : ''
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Siguiente →
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Historial;
