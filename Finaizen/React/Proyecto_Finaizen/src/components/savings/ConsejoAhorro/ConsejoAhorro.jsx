import PropTypes from 'prop-types';
import styles from './ConsejoAhorro.module.css';

/**
 * ConsejoAhorro - Componente para mostrar consejos inteligentes sobre ahorro
 */
function ConsejoAhorro({ consejos, onDismiss }) {
  if (!consejos || consejos.length === 0) {
    return null;
  }

  const tipoClases = {
    advertencia: styles.advertencia,
    alerta: styles.alerta,
    exito: styles.exito,
    info: styles.info,
    sugerencia: styles.sugerencia
  };

  const iconosTipo = {
    advertencia: '⚠️',
    alerta: '🚨',
    exito: '🎉',
    info: 'ℹ️',
    sugerencia: '💡'
  };

  return (
    <div className={styles.consejosContainer}>
      {consejos.map((consejo, index) => (
        <div
          key={index}
          className={`${styles.consejo} ${tipoClases[consejo.tipo] || styles.info}`}
        >
          <div className={styles.header}>
            <span className={styles.icono}>{iconosTipo[consejo.tipo] || 'ℹ️'}</span>
            <h4 className={styles.titulo}>{consejo.titulo}</h4>
            {onDismiss && (
              <button
                className={styles.btnCerrar}
                onClick={() => onDismiss(index)}
                aria-label="Descartar"
              >
                ✕
              </button>
            )}
          </div>
          <p className={styles.mensaje}>{consejo.mensaje}</p>
          {consejo.accion && consejo.accion !== 'ninguna' && (
            <div className={styles.footer}>
              <small>Puedes {consejo.accion} tu plan cuando lo desees.</small>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

ConsejoAhorro.propTypes = {
  consejos: PropTypes.arrayOf(
    PropTypes.shape({
      tipo: PropTypes.oneOf(['advertencia', 'alerta', 'exito', 'info', 'sugerencia']),
      titulo: PropTypes.string.isRequired,
      mensaje: PropTypes.string.isRequired,
      accion: PropTypes.string
    })
  ),
  onDismiss: PropTypes.func
};

export default ConsejoAhorro;
