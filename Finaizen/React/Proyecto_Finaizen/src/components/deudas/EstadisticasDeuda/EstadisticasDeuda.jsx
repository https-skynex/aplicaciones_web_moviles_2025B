import PropTypes from 'prop-types';
import styles from './EstadisticasDeuda.module.css';

/**
 * EstadisticasDeuda - Dashboard con estadísticas de deudas del usuario
 */
function EstadisticasDeuda({ estadisticas = {}, simboloMoneda = '$' }) {
  if (!estadisticas || Object.keys(estadisticas).length === 0) {
    return null;
  }

  const {
    totalDeudas = 0,
    deudasActivas = 0,
    totalDeuda = 0,
    totalPagado = 0,
    totalFaltante = 0,
    promedioProgreso = 0,
    deudasCompletadas = 0,
    deudasAtrasadas = 0,
    proximoVencimiento = null,
    deudaMasPrioritaria = null
  } = estadisticas;

  const kpis = [
    {
      label: 'Total Deudas',
      valor: totalDeudas,
      icono: '📋',
      color: '#2196F3'
    },
    {
      label: 'Deudas Activas',
      valor: deudasActivas,
      icono: '⚡',
      color: '#FF9800'
    },
    {
      label: 'Deuda Total',
      valor: `${simboloMoneda}${totalDeuda.toLocaleString('es-ES', { maximumFractionDigits: 2 })}`,
      icono: '💰',
      color: '#F44336'
    },
    {
      label: 'Total Pagado',
      valor: `${simboloMoneda}${totalPagado.toLocaleString('es-ES', { maximumFractionDigits: 2 })}`,
      icono: '✓',
      color: '#4CAF50'
    },
    {
      label: 'Progreso Promedio',
      valor: `${Math.round(promedioProgreso)}%`,
      icono: '📊',
      color: '#9C27B0'
    },
    {
      label: 'Deudas Completadas',
      valor: deudasCompletadas,
      icono: '🎉',
      color: '#4CAF50'
    }
  ];

  return (
    <div className={styles.estadisticasContainer}>
      <h3 className={styles.titulo}>📈 Resumen de Deudas</h3>

      {/* KPIs */}
      <div className={styles.kpiGrid}>
        {kpis.map((kpi, idx) => (
          <div key={idx} className={styles.kpi}>
            <div className={styles.kpiHeader}>
              <span className={styles.kpiIcon} style={{ color: kpi.color }}>
                {kpi.icono}
              </span>
              <p className={styles.kpiLabel}>{kpi.label}</p>
            </div>
            <p className={styles.kpiValor}>{kpi.valor}</p>
          </div>
        ))}
      </div>

      {/* Alertas y Próximas */}
      <div className={styles.seccionesGrid}>
        {/* Deudas Atrasadas */}
        {deudasAtrasadas > 0 && (
          <div className={`${styles.seccion} ${styles.alert}`}>
            <h4>⚠️ Deudas Vencidas</h4>
            <p className={styles.numero}>{deudasAtrasadas}</p>
            <p className={styles.texto}>Deudas con pago vencido</p>
          </div>
        )}

        {/* Próximo Vencimiento */}
        {proximoVencimiento && (
          <div className={`${styles.seccion} ${styles.proximo}`}>
            <h4>📅 Próximo Vencimiento</h4>
            <p className={styles.nombre}>{proximoVencimiento.nombre}</p>
            <p className={styles.texto}>
              {proximoVencimiento.diasRestantes} días
            </p>
          </div>
        )}

        {/* Deuda Más Prioritaria */}
        {deudaMasPrioritaria && (
          <div className={`${styles.seccion} ${styles.prioritaria}`}>
            <h4>🎯 Más Prioritaria</h4>
            <p className={styles.nombre}>{deudaMasPrioritaria.nombre}</p>
            <p className={styles.monto}>
              {simboloMoneda}{deudaMasPrioritaria.montoFaltante.toLocaleString('es-ES', { maximumFractionDigits: 2 })}
            </p>
          </div>
        )}

        {/* Saldo Faltante */}
        <div className={`${styles.seccion} ${styles.faltante}`}>
          <h4>💵 Saldo Faltante</h4>
          <p className={styles.monto}>
            {simboloMoneda}{totalFaltante.toLocaleString('es-ES', { maximumFractionDigits: 2 })}
          </p>
          <p className={styles.texto}>Total por pagar</p>
        </div>
      </div>
    </div>
  );
}

EstadisticasDeuda.propTypes = {
  estadisticas: PropTypes.shape({
    totalDeudas: PropTypes.number,
    deudasActivas: PropTypes.number,
    totalDeuda: PropTypes.number,
    totalPagado: PropTypes.number,
    totalFaltante: PropTypes.number,
    promedioProgreso: PropTypes.number,
    deudasCompletadas: PropTypes.number,
    deudasAtrasadas: PropTypes.number,
    proximoVencimiento: PropTypes.object,
    deudaMasPrioritaria: PropTypes.object
  }),
  simboloMoneda: PropTypes.string
};

export default EstadisticasDeuda;
