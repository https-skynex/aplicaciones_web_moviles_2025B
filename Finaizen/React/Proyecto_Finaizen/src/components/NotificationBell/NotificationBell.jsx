import { useState, useEffect, useRef } from 'react';
import { SmartMessageGenerator } from '../../utils/smartMessages';
import mockDB from '../../utils/mockDatabase';
import Notificacion from '../../models/Notificacion';
import styles from './NotificationBell.module.css';

/**
 * Componente de Campanita de Notificaciones
 * Muestra notificaciones inteligentes en un dropdown desplegable
 */
export default function NotificationBell({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (userId) {
      generateAndLoadNotifications();
    }
  }, [userId]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const generateAndLoadNotifications = () => {
    try {
      // Obtener datos del usuario
      const perfiles = mockDB.getPerfilesDeUsuario(userId);
      const perfil = perfiles && perfiles.length > 0 ? perfiles[0] : null;
      if (!perfil) return;

      const ingresos = mockDB.getIngresosDePerf(perfil.id);
      const egresos = mockDB.getEgresosDePerf(perfil.id);
      const logros = mockDB.getLogrosDePerfil(perfil.id);

      // Calcular métricas
      const totalIngresos = ingresos.reduce((sum, i) => sum + i.monto, 0);
      const totalEgresos = egresos.reduce((sum, e) => sum + e.monto, 0);
      const balanceActual = totalIngresos - totalEgresos;
      const porcentajeGastado = totalIngresos > 0 ? (totalEgresos / totalIngresos * 100) : 0;

      // Analizar gastos por categoría
      const gastosPorCategoria = {};
      egresos.forEach(egreso => {
        if (!gastosPorCategoria[egreso.categoria]) {
          gastosPorCategoria[egreso.categoria] = 0;
        }
        gastosPorCategoria[egreso.categoria] += egreso.monto;
      });

      const generatedMessages = [];

      // Obtener notificaciones existentes PRIMERO
      const notificacionesExistentes = mockDB.getNotificacionesDeUsuario(userId);

      // 1. MENSAJE DE BIENVENIDA SEGÚN HORA
      const hora = new Date().getHours();
      generatedMessages.push(SmartMessageGenerator.generateMessage({ 
        tipo: 'contextual_tiempo' 
      }));

      // 2. ALERTAS DE GASTOS EXCESIVOS
      if (porcentajeGastado > 80) {
        generatedMessages.push(SmartMessageGenerator.generateMessage({
          tipo: 'alerta_gasto',
          monto: totalEgresos,
          porcentaje: porcentajeGastado
        }));
      }

      // 3. ALERTAS POR CATEGORÍA (si alguna supera el 30%)
      Object.keys(gastosPorCategoria).forEach(categoria => {
        const porcentajeCategoria = (gastosPorCategoria[categoria] / totalEgresos) * 100;
        if (porcentajeCategoria > 30) {
          generatedMessages.push(SmartMessageGenerator.generateMessage({
            tipo: 'alerta_gasto',
            categoria: categoria,
            monto: gastosPorCategoria[categoria],
            porcentaje: porcentajeCategoria
          }));
        }
      });

      // 4. SUGERENCIAS DE AHORRO
      if (balanceActual > 0 && balanceActual < totalIngresos * 0.2) {
        const ahorroSugerido = totalIngresos * 0.2 - balanceActual;
        generatedMessages.push(SmartMessageGenerator.generateMessage({
          tipo: 'sugerencia',
          monto: ahorroSugerido,
          porcentaje: 20
        }));
      }

      // 5. DETECTAR LOGROS COMPLETADOS (NUEVO)
      logros.forEach(logro => {
        const porcentajeLogro = (logro.progreso / logro.meta) * 100;
        
        // Si el logro está desbloqueado, crear notificación
        if (logro.desbloqueado) {
          // Verificar si ya existe notificación para este logro
          const existeNotifLogro = notificacionesExistentes.some(n => 
            n.tipo === 'logro' && 
            n.data?.logroId === logro.id
          );
          
          if (!existeNotifLogro) {
            // Crear notificación de logro completado
            const notifLogro = new Notificacion({
              userId: userId,
              perfilId: perfil.id,
              tipo: 'logro',
              titulo: `${logro.icono} ¡Logro Desbloqueado!`,
              mensaje: logro.empresa 
                ? `¡Felicitaciones! Has completado "${logro.nombre}". ${logro.recompensa ? `Recompensa: ${logro.recompensa}` : ''}`
                : `¡Excelente! Has desbloqueado "${logro.nombre}". ${logro.descripcion}`,
              icono: logro.icono,
              leida: false,
              accionUrl: '/user/logros',
              data: { 
                logroId: logro.id,
                tipo: 'logro_completado',
                recompensa: logro.recompensa,
                empresa: logro.empresa
              }
            });
            mockDB.notificaciones.push(notifLogro);
            console.log('🏆 Notificación de logro creada:', logro.nombre);
          }
        }
        
        // Logros próximos (80% o más pero no completados)
        else if (porcentajeLogro >= 80 && porcentajeLogro < 100) {
          const faltante = logro.meta - logro.progreso;
          generatedMessages.push(SmartMessageGenerator.generateMessage({
            tipo: 'logro_proximo',
            logro: logro.nombre,
            numero: faltante,
            porcentaje: porcentajeLogro.toFixed(0),
            recompensa: logro.recompensa || 'recompensa especial'
          }));
        }
      });

      // 6. FELICITACIONES
      if (porcentajeGastado < 70 && totalIngresos > 0) {
        generatedMessages.push(SmartMessageGenerator.generateMessage({
          tipo: 'motivacion',
          porcentaje: 100 - porcentajeGastado,
          monto: balanceActual
        }));
      }

      // 7. EDUCACIÓN FINANCIERA (siempre 1-2)
      generatedMessages.push(SmartMessageGenerator.generateMessage({
        tipo: 'educacion'
      }));

      // 8. RECORDATORIOS
      const diaSemana = new Date().getDay();
      if ([0, 1, 5].includes(diaSemana)) {
        generatedMessages.push(SmartMessageGenerator.generateMessage({
          tipo: 'recordatorio'
        }));
      }

      // 9. ALERTAS INTELIGENTES (predicciones)
      const diasDelMes = new Date().getDate();
      const diasTotalesMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      const gastoProyectado = (totalEgresos / diasDelMes) * diasTotalesMes;
      
      if (gastoProyectado > totalIngresos * 1.1) {
        generatedMessages.push(SmartMessageGenerator.generateMessage({
          tipo: 'inteligente',
          monto: gastoProyectado,
          porcentaje: ((gastoProyectado - totalIngresos) / totalIngresos) * 100
        }));
      }

      // 10. MOTIVACIÓN ADICIONAL
      generatedMessages.push(SmartMessageGenerator.generateMessage({
        tipo: 'motivacion'
      }));
      
      // Limpiar notificaciones antiguas (más de 7 días)
      const hace7Dias = new Date();
      hace7Dias.setDate(hace7Dias.getDate() - 7);
      mockDB.notificaciones = mockDB.notificaciones.filter(n => 
        n.userId !== userId || n.createdAt > hace7Dias
      );

      // Crear nuevas notificaciones si no existen hoy
      const hoy = new Date().toDateString();
      const notificacionesHoy = notificacionesExistentes.filter(n => 
        new Date(n.createdAt).toDateString() === hoy
      );

      if (notificacionesHoy.length === 0) {
        generatedMessages.forEach(msg => {
          const notif = new Notificacion({
            userId: userId,
            perfilId: perfil.id,
            tipo: mapTipoToNotificationType(msg.tipo),
            titulo: getTituloByTipo(msg.tipo),
            mensaje: msg.mensaje,
            icono: getIconoByTipo(msg.tipo),
            leida: false,
            data: { tipo: msg.tipo }
          });
          mockDB.notificaciones.push(notif);
        });
      }
      
      // Guardar todo en localStorage
      mockDB.saveToLocalStorage();

      // Cargar notificaciones
      loadNotifications();

      console.log('📨 Notificaciones inteligentes generadas:', generatedMessages.length);
    } catch (error) {
      console.error('Error generando notificaciones:', error);
    }
  };

  const loadNotifications = () => {
    const notifs = mockDB.getNotificacionesDeUsuario(userId);
    setNotifications(notifs);
    
    const unread = notifs.filter(n => !n.leida).length;
    setUnreadCount(unread);
  };

  const mapTipoToNotificationType = (tipo) => {
    const map = {
      'alerta_gasto': 'warning',
      'sugerencia': 'info',
      'logro_proximo': 'logro',
      'motivacion': 'success',
      'educacion': 'info',
      'recordatorio': 'info',
      'contextual_tiempo': 'info',
      'inteligente': 'warning'
    };
    return map[tipo] || 'info';
  };

  const getTituloByTipo = (tipo) => {
    const map = {
      'alerta_gasto': 'Alerta de Gastos',
      'sugerencia': 'Sugerencia de Ahorro',
      'logro_proximo': 'Logro Cercano',
      'motivacion': '¡Bien Hecho!',
      'educacion': 'Tip Financiero',
      'recordatorio': 'Recordatorio',
      'contextual_tiempo': 'Mensaje del Día',
      'inteligente': 'Análisis Inteligente'
    };
    return map[tipo] || 'Notificación';
  };

  const getIconoByTipo = (tipo) => {
    const map = {
      'alerta_gasto': '⚠️',
      'sugerencia': '💡',
      'logro_proximo': '🏆',
      'motivacion': '🎉',
      'educacion': '📚',
      'recordatorio': '⏰',
      'contextual_tiempo': '🌅',
      'inteligente': '🤖'
    };
    return map[tipo] || '🔔';
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      loadNotifications(); // Recargar al abrir
    }
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
      if (n.userId === userId && !n.leida) {
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

  return (
    <div className={styles.bellContainer} ref={dropdownRef}>
      {/* Campanita */}
      <button 
        className={styles.bellButton}
        onClick={handleToggle}
        aria-label="Notificaciones"
      >
        <span className={styles.bellIcon}>🔔</span>
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {/* Dropdown de Notificaciones */}
      {isOpen && (
        <div className={styles.dropdown}>
          {/* Header */}
          <div className={styles.dropdownHeader}>
            <h3>Notificaciones</h3>
            {unreadCount > 0 && (
              <button 
                className={styles.markAllBtn}
                onClick={handleMarkAllAsRead}
              >
                Marcar todas como leídas
              </button>
            )}
          </div>

          {/* Lista de Notificaciones */}
          <div className={styles.notificationList}>
            {notifications.length === 0 ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📭</span>
                <p>No hay notificaciones</p>
              </div>
            ) : (
              notifications.map(notif => (
                <div 
                  key={notif.id}
                  className={`${styles.notificationItem} ${!notif.leida ? styles.unread : ''}`}
                >
                  <div className={styles.notifIcon}>
                    {notif.icono}
                  </div>
                  <div className={styles.notifContent}>
                    <div className={styles.notifHeader}>
                      <span className={styles.notifTitle}>{notif.titulo}</span>
                      <span className={styles.notifTime}>
                        {getTimeAgo(notif.createdAt)}
                      </span>
                    </div>
                    <p className={styles.notifMessage}>{notif.mensaje}</p>
                  </div>
                  <div className={styles.notifActions}>
                    {!notif.leida && (
                      <button
                        className={styles.markReadBtn}
                        onClick={() => handleMarkAsRead(notif.id)}
                        title="Marcar como leída"
                      >
                        ✓
                      </button>
                    )}
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteNotification(notif.id)}
                      title="Eliminar"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className={styles.dropdownFooter}>
              <button 
                className={styles.viewAllBtn}
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = '/user/notificaciones';
                }}
              >
                Ver todas las notificaciones
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Función auxiliar para mostrar tiempo relativo
function getTimeAgo(date) {
  try {
    if (!date) return 'Reciente';
    
    const now = new Date();
    const notifDate = new Date(date);
    
    // Validar que la fecha sea válida
    if (isNaN(notifDate.getTime())) {
      return 'Reciente';
    }
    
    const diffMs = now - notifDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return notifDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  } catch (error) {
    console.error('Error en getTimeAgo:', error);
    return 'Reciente';
  }
}
