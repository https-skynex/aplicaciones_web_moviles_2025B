import PropTypes from 'prop-types';
import styles from './EstadisticasAhorro.module.css';

/**
 * EstadisticasAhorro - Componente para mostrar estadísticas globales de ahorro
 */
function EstadisticasAhorro({ estadisticas, simboloMoneda }) {
  if (!estadisticas) return null;

  const porcentajePromedio = Math.round(estadisticas.porcentajePromedioCompletitud);

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>📈 Tu Resumen de Ahorro</h2>

      <div className={styles.grid}>
        {/* Card: Total de Planes */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>📋</div>
          <div className={styles.cardContent}>
            <p className={styles.label}>Total de Planes</p>
            <p className={styles.valor}>{estadisticas.totalPlanes}</p>
          </div>
        </div>

        {/* Card: Planes Activos */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>✅</div>
          <div className={styles.cardContent}>
            <p className={styles.label}>Planes Activos</p>
            <p className={styles.valor}>{estadisticas.planesActivos}</p>
          </div>
        </div>

        {/* Card: Total Ahorrado */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>💰</div>
          <div className={styles.cardContent}>
            <p className={styles.label}>Total Ahorrado</p>
            <p className={styles.valor}>{simboloMoneda}{estadisticas.montoAhorradoTotal.toLocaleString()}</p>
          </div>
        </div>

        {/* Card: Meta Total */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>🎯</div>
          <div className={styles.cardContent}>
            <p className={styles.label}>Meta Total</p>
            <p className={styles.valor}>{simboloMoneda}{estadisticas.montoMetaTotal.toLocaleString()}</p>
          </div>
        </div>

        {/* Card: Completitud Promedio */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>📊</div>
          <div className={styles.cardContent}>
            <p className={styles.label}>Completitud Promedio</p>
            <p className={styles.valor}>{porcentajePromedio}%</p>
          </div>
        </div>

        {/* Card: Completados */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>🎉</div>
          <div className={styles.cardContent}>
            <p className={styles.label}>Planes Completados</p>
            <p className={styles.valor}>{estadisticas.planesCompletados}</p>
          </div>
        </div>
      </div>

      {/* Alerta de Planes en Peligro */}
      {estadisticas.planesEnPeligro.length > 0 && (
        <div className={styles.alerta}>
          <p className={styles.alertaTitle}>⚠️ {estadisticas.planesEnPeligro.length} plan(es) atrasado(s)</p>
          <ul className={styles.alertaList}>
            {estadisticas.planesEnPeligro.map(plan => (
              <li key={plan.id}>
                {plan.icono} <strong>{plan.nombre}</strong> - {plan.diasRestantes} días para cumplir
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Próximos a Completar */}
      {estadisticas.proximosPlanesACompletar.length > 0 && (
        <div className={styles.proximosSection}>
          <p className={styles.proximosTitle}>🔥 Próximos a Completar</p>
          <div className={styles.proximosList}>
            {estadisticas.proximosPlanesACompletar.map(plan => (
              <div key={plan.id} className={styles.proximoItem}>
                <span className={styles.proximoIcon}>{plan.icono}</span>
                <div className={styles.proximoInfo}>
                  <p className={styles.proximoNombre}>{plan.nombre}</p>
                  <div className={styles.proximoBar}>
                    <div
                      className={styles.proximoProgreso}
                      style={{
                        width: `${Math.min(plan.progreso, 100)}%`,
                        backgroundColor: plan.color
                      }}
                    />
                  </div>
                </div>
                <span className={styles.proximoPorcentaje}>{Math.round(plan.progreso)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

EstadisticasAhorro.propTypes = {
  estadisticas: PropTypes.object.isRequired,
  simboloMoneda: PropTypes.string.isRequired
};

export default EstadisticasAhorro;
