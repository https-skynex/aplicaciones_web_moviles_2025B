import PropTypes from 'prop-types';
import styles from './PlanCard.module.css';

/**
 * PlanCard - Card reutilizable para mostrar un plan de ahorro
 */
function PlanCard({ plan, onEdit, onDelete, onViewDetails, simboloMoneda }) {
  const progreso = Math.round(plan.progreso);
  const colorEstado = {
    activo: '#4CAF50',
    pausado: '#FF9800',
    completado: '#2196F3',
    cancelado: '#F44336'
  };

  return (
    <div className={styles.planCard} style={{ borderLeftColor: plan.color }}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <span className={styles.icono}>{plan.icono}</span>
          <div>
            <h3 className={styles.nombre}>{plan.nombre}</h3>
            <p className={styles.categoria}>{plan.categoria}</p>
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
            <label>Ahorrado</label>
            <p className={styles.valor}>{simboloMoneda}{plan.montoActual.toLocaleString()}</p>
          </div>
          <div className={styles.dato}>
            <label>Meta</label>
            <p className={styles.valor}>{simboloMoneda}{plan.montoMeta.toLocaleString()}</p>
          </div>
          <div className={styles.dato}>
            <label>Faltante</label>
            <p className={styles.valor}>{simboloMoneda}{plan.montoFaltante.toLocaleString()}</p>
          </div>
        </div>

        {plan.diasRestantes > 0 && (
          <div className={styles.fechas}>
            <small>
              📅 {plan.diasRestantes} días para alcanzar tu meta
            </small>
          </div>
        )}

        {plan.diasRestantes <= 0 && plan.estado !== 'completado' && (
          <div className={`${styles.fechas} ${styles.warning}`}>
            <small>⚠️ La fecha meta ya pasó</small>
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

PlanCard.propTypes = {
  plan: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  simboloMoneda: PropTypes.string.isRequired
};

export default PlanCard;
