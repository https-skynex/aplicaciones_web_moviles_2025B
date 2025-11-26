import PropTypes from 'prop-types';
import styles from './ConsejoDeuda.module.css';

/**
 * ConsejoDeuda - Componente para mostrar consejos inteligentes sobre deudas
 */
function ConsejoDeuda({ consejos = [] }) {
  if (consejos.length === 0) return null;

  const tiposIcono = {
    warning: '⚠️',
    alert: '🚨',
    success: '✅',
    info: 'ℹ️',
    suggestion: '💡'
  };

  const tiposColor = {
    warning: '#FF9800',
    alert: '#F44336',
    success: '#4CAF50',
    info: '#2196F3',
    suggestion: '#9C27B0'
  };

  return (
    <div className={styles.consejosContainer}>
      <h3 className={styles.titulo}>📊 Consejos Inteligentes</h3>
      <div className={styles.grid}>
        {consejos.map((consejo, idx) => (
          <div
            key={idx}
            className={`${styles.consejo} ${styles[consejo.tipo]}`}
            style={{ borderLeftColor: tiposColor[consejo.tipo] }}
          >
            <div className={styles.header}>
              <span className={styles.icono}>{tiposIcono[consejo.tipo]}</span>
              <h4 className={styles.titulo}>{consejo.titulo}</h4>
            </div>
            <p className={styles.descripcion}>{consejo.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ConsejoDeuda.propTypes = {
  consejos: PropTypes.arrayOf(PropTypes.shape({
    tipo: PropTypes.oneOf(['warning', 'alert', 'success', 'info', 'suggestion']),
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    urgencia: PropTypes.string
  }))
};

export default ConsejoDeuda;
