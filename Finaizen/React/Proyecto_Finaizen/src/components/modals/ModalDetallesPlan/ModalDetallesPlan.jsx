import { useState } from 'react';
import PropTypes from 'prop-types';
import mockDB from '../../../utils/mockDatabase';
import Button from '../../ui/Button';
import styles from './ModalDetallesPlan.module.css';

/**
 * ModalDetallesPlan - Modal para ver detalles completos y gestionar un plan
 */
function ModalDetallesPlan({ isOpen, plan, onClose, onPausar, onReactivar, onRefresh, simboloMoneda }) {
  const [modoDeposito, setModoDeposito] = useState(false);
  const [montoDeposito, setMontoDeposito] = useState('');
  const [descripcionDeposito, setDescripcionDeposito] = useState('');

  if (!isOpen || !plan) return null;

  const handleAgregarDeposito = () => {
    const monto = parseFloat(montoDeposito);
    if (monto <= 0) {
      alert('Ingresa un monto válido');
      return;
    }

    const result = mockDB.agregarDepositoPlan(plan.id, monto, descripcionDeposito);

    if (result.success) {
      setMontoDeposito('');
      setDescripcionDeposito('');
      setModoDeposito(false);
      onRefresh();
    }
  };

  const handleRetirar = () => {
    const monto = parseFloat(montoDeposito);
    if (monto <= 0 || monto > plan.montoActual) {
      alert('Ingresa un monto válido');
      return;
    }

    const result = mockDB.retirarDelPlan(plan.id, monto, descripcionDeposito);

    if (result.success) {
      setMontoDeposito('');
      setDescripcionDeposito('');
      setModoDeposito(false);
      onRefresh();
    }
  };

  const colorEstado = {
    activo: '#4CAF50',
    pausado: '#FF9800',
    completado: '#2196F3',
    cancelado: '#F44336'
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header} style={{ borderLeftColor: plan.color }}>
          <div className={styles.headerContent}>
            <div>
              <span className={styles.icono}>{plan.icono}</span>
              <h2 className={styles.titulo}>{plan.nombre}</h2>
              <p className={styles.objetivo}>{plan.objetivo}</p>
            </div>
            <button className={styles.btnCerrar} onClick={onClose}>✕</button>
          </div>
          <span className={styles.estado} style={{ backgroundColor: colorEstado[plan.estado] }}>
            {plan.estado.toUpperCase()}
          </span>
        </div>

        {/* Contenido */}
        <div className={styles.content}>
          {/* Progreso visual */}
          <div className={styles.seccion}>
            <div className={styles.progresoBarra}>
              <div className={styles.barraFondo}>
                <div
                  className={styles.barraProgreso}
                  style={{
                    width: `${Math.min(plan.progreso, 100)}%`,
                    backgroundColor: plan.color
                  }}
                />
              </div>
              <div className={styles.info}>
                <span className={styles.porcentaje}>{Math.round(plan.progreso)}% completado</span>
                <span className={styles.fechas}>
                  {plan.diasRestantes > 0 
                    ? `${plan.diasRestantes} días restantes`
                    : 'Fecha meta alcanzada'}
                </span>
              </div>
            </div>
          </div>

          {/* Datos principales */}
          <div className={styles.seccion}>
            <h3 className={styles.seccionTitulo}>Información Financiera</h3>
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
              <div className={styles.dato}>
                <label>Mensual Estimado</label>
                <p className={styles.valor}>{simboloMoneda}{plan.montoAhorrarMensualEstimado.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Configuración */}
          <div className={styles.seccion}>
            <h3 className={styles.seccionTitulo}>Configuración</h3>
            <div className={styles.configs}>
              <div className={styles.config}>
                <span className={styles.label}>Categoría:</span>
                <span className={styles.value}>{plan.categoria}</span>
              </div>
              <div className={styles.config}>
                <span className={styles.label}>Prioridad:</span>
                <span className={styles.value}>{plan.prioridad}</span>
              </div>
              <div className={styles.config}>
                <span className={styles.label}>Estrategia:</span>
                <span className={styles.value}>{plan.estrategia}</span>
              </div>
              <div className={styles.config}>
                <span className={styles.label}>Notificaciones:</span>
                <span className={styles.value}>{plan.notificacionActiva ? '✅ Activas' : '❌ Desactivas'}</span>
              </div>
            </div>
          </div>

          {/* Historial de depósitos */}
          {plan.historialAhorros.length > 0 && (
            <div className={styles.seccion}>
              <h3 className={styles.seccionTitulo}>Historial de Movimientos</h3>
              <div className={styles.historial}>
                {plan.historialAhorros.slice(-5).reverse().map((movimiento, idx) => (
                  <div
                    key={idx}
                    className={`${styles.movimiento} ${movimiento.tipo === 'deposito' ? styles.deposito : styles.retiro}`}
                  >
                    <div className={styles.movInfo}>
                      <p className={styles.movTipo}>
                        {movimiento.tipo === 'deposito' ? '➕ Depósito' : '➖ Retiro'}
                      </p>
                      {movimiento.descripcion && (
                        <p className={styles.movDesc}>{movimiento.descripcion}</p>
                      )}
                    </div>
                    <div className={styles.movMonto}>
                      <p className={styles.movValor}>
                        {movimiento.tipo === 'deposito' ? '+' : ''}{simboloMoneda}{Math.abs(movimiento.monto).toFixed(2)}
                      </p>
                      <p className={styles.movFecha}>
                        {new Date(movimiento.fecha).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sección de depósito/retiro */}
          {plan.estado === 'activo' && !modoDeposito && (
            <div className={styles.seccion}>
              <button
                className={styles.btnDeposito}
                onClick={() => setModoDeposito(true)}
              >
                💰 Agregar Depósito
              </button>
            </div>
          )}

          {modoDeposito && (
            <div className={styles.seccion}>
              <h3 className={styles.seccionTitulo}>Agregar Depósito</h3>
              <input
                type="number"
                value={montoDeposito}
                onChange={(e) => setMontoDeposito(e.target.value)}
                placeholder="Monto a depositar"
                className={styles.input}
                step="0.01"
              />
              <input
                type="text"
                value={descripcionDeposito}
                onChange={(e) => setDescripcionDeposito(e.target.value)}
                placeholder="Descripción (opcional)"
                className={styles.input}
              />
              <div className={styles.btnGroup}>
                <Button variant="brand" onClick={handleAgregarDeposito}>
                  Confirmar Depósito
                </Button>
                <Button variant="outline" onClick={() => {
                  setModoDeposito(false);
                  setMontoDeposito('');
                  setDescripcionDeposito('');
                }}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Acciones */}
        <div className={styles.acciones}>
          {plan.estado === 'activo' && (
            <Button
              variant="outline"
              onClick={() => {
                onPausar(plan);
                onClose();
              }}
            >
              ⏸️ Pausar Plan
            </Button>
          )}

          {plan.estado === 'pausado' && (
            <Button
              variant="brand"
              onClick={() => {
                onReactivar(plan);
                onClose();
              }}
            >
              ▶️ Reactivar Plan
            </Button>
          )}

          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}

ModalDetallesPlan.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  plan: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onPausar: PropTypes.func.isRequired,
  onReactivar: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  simboloMoneda: PropTypes.string.isRequired
};

export default ModalDetallesPlan;
