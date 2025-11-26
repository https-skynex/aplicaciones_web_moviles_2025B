import PropTypes from 'prop-types';
import styles from './DeudaCard.module.css';

/**
 * DeudaCard - Card reutilizable para mostrar un plan de deuda
 */
function DeudaCard({ plan, onEdit, onDelete, onViewDetails, simboloMoneda }) {
  const progreso = Math.round(plan.progreso);
  const colorEstado = {
    activo: '#FF6B6B',
    pausado: '#FF9800',
    completado: '#4CAF50',
    cancelado: '#F44336'
  };

  return (
    <div className={styles.deudaCard} style={{ borderLeftColor: plan.color }}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <span className={styles.icono}>{plan.icono}</span>
          <div>
            <h3 className={styles.nombre}>{plan.nombre}</h3>
            <p className={styles.acreedor}>{plan.acreedor || plan.categoria}</p>
          </div>
        </div>
        <span className={styles.estado} style={{ backgroundColor: colorEstado[plan.estado] }}>
          {plan.estado.charAt(0).toUpperCase() + plan.estado.slice(1)}
        </span>
      </div>

      <div className={styles.content}>
        <div className={styles.descripcion}>
          <p>{plan.descripcion}</p>
        </div>

        <div className={styles.progresoBarra}>
          <div className={styles.barraFondo}>
            <div
              className={styles.barraProgreso}
              style={{
                width: `${Math.min(progreso, 100)}%`,
                backgroundColor: plan.color
              }}
            />
          </div>
          <span className={styles.porcentaje}>{progreso}%</span>
        </div>

        <div className={styles.datos}>
          <div className={styles.dato}>
            <label>Deuda Total</label>
            <p className={styles.valor}>{simboloMoneda}{plan.montoDeuda.toLocaleString()}</p>
          </div>
          <div className={styles.dato}>
            <label>Pagado</label>
            <p className={styles.valor}>{simboloMoneda}{plan.montoPagado.toLocaleString()}</p>
          </div>
          <div className={styles.dato}>
            <label>Faltante</label>
            <p className={styles.valor}>{simboloMoneda}{plan.montoFaltante.toLocaleString()}</p>
          </div>
        </div>

        {plan.tasaInteres > 0 && (
          <div className={styles.interes}>
            <span>📊 Tasa de Interés: {plan.tasaInteres}% anual</span>
          </div>
        )}

        {plan.diasRestantes > 0 && (
          <div className={styles.fechas}>
            <small>
              📅 Próximo pago en {plan.diasRestantes} días
            </small>
          </div>
        )}

        {plan.diasRestantes <= 0 && plan.estado !== 'completado' && (
          <div className={`${styles.fechas} ${styles.warning}`}>
            <small>⚠️ Pago vencido</small>
          </div>
        )}
      </div>

      <div className={styles.acciones}>
        <button className={styles.btnDetalles} onClick={() => onViewDetails(plan)}>
          Ver Detalles
        </button>
        <button className={styles.btnEditar} onClick={() => onEdit(plan)}>
          Editar
        </button>
        <button className={styles.btnEliminar} onClick={() => onDelete(plan.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

DeudaCard.propTypes = {
  plan: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  simboloMoneda: PropTypes.string.isRequired
};

export default DeudaCard;
