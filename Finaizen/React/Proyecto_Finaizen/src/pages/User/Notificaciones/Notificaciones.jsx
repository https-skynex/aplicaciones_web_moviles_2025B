import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import mockDB from '../../../utils/mockDatabase';
import { Card } from '../../../components/ui';
import styles from './Notificaciones.module.css';

/**
 * Página de Notificaciones
 * Muestra todas las notificaciones del usuario con filtros y acciones
 */
export default function Notificaciones() {
  const { currentUser, currentPerfil } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [typeFilter, setTypeFilter] = useState('all'); // all, warning, info, success, logro

  useEffect(() => {
    if (currentUser) {
      loadNotifications();
    }
  }, [currentUser]);

  const loadNotifications = () => {
    if (!currentUser) return;
    
    const notifs = mockDB.getNotificacionesDeUsuario(currentUser.id);
    setNotifications(notifs);
  };

  const handleMarkAsRead = (notifId) => {
    const notif = mockDB.notificaciones.find(n => n.id === notifId);
    if (notif) {
      notif.marcarComoLeida();
      mockDB.saveToLocalStorage();
      loadNotifications();
    }
  };

  const handleMarkAllAsRead = () => {
    mockDB.notificaciones.forEach(n => {
      if (n.userId === currentUser.id && !n.leida) {
        n.marcarComoLeida();
      }
    });
    mockDB.saveToLocalStorage();
    loadNotifications();
  };

  const handleDeleteNotification = (notifId) => {
    mockDB.notificaciones = mockDB.notificaciones.filter(n => n.id !== notifId);
    mockDB.saveToLocalStorage();
    loadNotifications();
  };

  const handleDeleteAll = () => {
    if (confirm('¿Estás seguro de eliminar TODAS las notificaciones?')) {
      mockDB.notificaciones = mockDB.notificaciones.filter(n => n.userId !== currentUser.id);
      mockDB.saveToLocalStorage();
      loadNotifications();
    }
  };

  // Filtrar notificaciones
  const filteredNotifications = notifications.filter(notif => {
    // Filtro por estado (leída/no leída)
    if (filter === 'unread' && notif.leida) return false;
    if (filter === 'read' && !notif.leida) return false;
    
    // Filtro por tipo
    if (typeFilter !== 'all' && notif.tipo !== typeFilter) return false;
    
    return true;
  });

  // Estadísticas
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.leida).length,
    read: notifications.filter(n => n.leida).length,
    byType: {
      warning: notifications.filter(n => n.tipo === 'warning').length,
      info: notifications.filter(n => n.tipo === 'info').length,
      success: notifications.filter(n => n.tipo === 'success').length,
      logro: notifications.filter(n => n.tipo === 'logro').length,
      error: notifications.filter(n => n.tipo === 'error').length,
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>📬 Notificaciones</h1>
          <p className={styles.subtitle}>
            Gestiona todas tus notificaciones y alertas financieras
          </p>
        </div>
        <div className={styles.headerActions}>
          <button 
            className={styles.btnSecondary}
            onClick={handleMarkAllAsRead}
            disabled={stats.unread === 0}
          >
            Marcar todas como leídas
          </button>
          <button 
            className={styles.btnDanger}
            onClick={handleDeleteAll}
            disabled={stats.total === 0}
          >
            Eliminar todas
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Total</span>
            <span className={styles.statValue}>{stats.total}</span>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>🔴</div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Sin leer</span>
            <span className={styles.statValue}>{stats.unread}</span>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Leídas</span>
            <span className={styles.statValue}>{stats.read}</span>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>🏆</div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Logros</span>
            <span className={styles.statValue}>{stats.byType.logro}</span>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <Card className={styles.filtersCard}>
        <div className={styles.filtersSection}>
          <div className={styles.filterGroup}>
            <label>Estado:</label>
            <div className={styles.filterButtons}>
              <button
                className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
                onClick={() => setFilter('all')}
              >
                Todas ({stats.total})
              </button>
              <button
                className={`${styles.filterBtn} ${filter === 'unread' ? styles.active : ''}`}
                onClick={() => setFilter('unread')}
              >
                Sin leer ({stats.unread})
              </button>
              <button
                className={`${styles.filterBtn} ${filter === 'read' ? styles.active : ''}`}
                onClick={() => setFilter('read')}
              >
                Leídas ({stats.read})
              </button>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Tipo:</label>
            <div className={styles.filterButtons}>
              <button
                className={`${styles.filterBtn} ${typeFilter === 'all' ? styles.active : ''}`}
                onClick={() => setTypeFilter('all')}
              >
                Todas
              </button>
              <button
                className={`${styles.filterBtn} ${typeFilter === 'warning' ? styles.active : ''}`}
                onClick={() => setTypeFilter('warning')}
              >
                ⚠️ Alertas ({stats.byType.warning})
              </button>
              <button
                className={`${styles.filterBtn} ${typeFilter === 'info' ? styles.active : ''}`}
                onClick={() => setTypeFilter('info')}
              >
                💡 Info ({stats.byType.info})
              </button>
              <button
                className={`${styles.filterBtn} ${typeFilter === 'success' ? styles.active : ''}`}
                onClick={() => setTypeFilter('success')}
              >
                🎉 Éxito ({stats.byType.success})
              </button>
              <button
                className={`${styles.filterBtn} ${typeFilter === 'logro' ? styles.active : ''}`}
                onClick={() => setTypeFilter('logro')}
              >
                🏆 Logros ({stats.byType.logro})
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Lista de Notificaciones */}
      <div className={styles.notificationsList}>
        {filteredNotifications.length === 0 ? (
          <Card className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <h3>No hay notificaciones</h3>
            <p>
              {filter === 'unread' && 'No tienes notificaciones sin leer'}
              {filter === 'read' && 'No tienes notificaciones leídas'}
              {filter === 'all' && typeFilter !== 'all' && 'No hay notificaciones de este tipo'}
              {filter === 'all' && typeFilter === 'all' && 'Aún no tienes notificaciones'}
            </p>
          </Card>
        ) : (
          filteredNotifications.map(notif => (
            <Card 
              key={notif.id} 
              className={`${styles.notificationCard} ${!notif.leida ? styles.unread : ''}`}
            >
              <div className={styles.notifIcon}>
                {notif.icono}
              </div>
              
              <div className={styles.notifContent}>
                <div className={styles.notifHeader}>
                  <h3 className={styles.notifTitle}>{notif.titulo}</h3>
                  <span className={styles.notifType}>
                    {getTypeBadge(notif.tipo)}
                  </span>
                  <span className={styles.notifTime}>
                    {getTimeAgo(notif.createdAt)}
                  </span>
                </div>
                
                <p className={styles.notifMessage}>{notif.mensaje}</p>
                
                {notif.accionUrl && (
                  <a href={notif.accionUrl} className={styles.notifAction}>
                    Ver detalles →
                  </a>
                )}
              </div>

              <div className={styles.notifActions}>
                {!notif.leida && (
                  <button
                    className={styles.actionBtn}
                    onClick={() => handleMarkAsRead(notif.id)}
                    title="Marcar como leída"
                  >
                    ✓
                  </button>
                )}
                <button
                  className={`${styles.actionBtn} ${styles.deleteBtn}`}
                  onClick={() => handleDeleteNotification(notif.id)}
                  title="Eliminar"
                >
                  🗑️
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

// Funciones auxiliares
function getTimeAgo(date) {
  const now = new Date();
  const notifDate = new Date(date);
  const diffMs = now - notifDate;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Ahora';
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 7) return `Hace ${diffDays}d`;
  
  return notifDate.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'short',
    year: 'numeric'
  });
}

function getTypeBadge(tipo) {
  const badges = {
    warning: '⚠️ Alerta',
    info: 'ℹ️ Info',
    success: '✅ Éxito',
    error: '❌ Error',
    logro: '🏆 Logro',
    presupuesto: '💰 Presupuesto',
    transaccion: '💳 Transacción'
  };
  return badges[tipo] || 'ℹ️ Info';
}
