import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CATEGORIAS_PLAN_DEUDA, ICONOS_CATEGORIA_DEUDA, COLORES_CATEGORIA_DEUDA, ESTRATEGIAS_DEUDA } from '../../../models/PlanDeuda';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import styles from './PlanDeudaModal.module.css';

/**
 * PlanDeudaModal - Modal para crear/editar planes de deuda
 */
function PlanDeudaModal({ isOpen, plan, onSave, onCancel, simboloMoneda }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'Otro',
    acreedor: '',
    montoDeuda: '',
    tasaInteres: '',
    cuotaMensual: '',
    fechaPago: '',
    prioridad: 'normal',
    estrategia: 'equilibrada',
    numeroContrato: '',
    notificacionActiva: true
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const isEditMode = plan !== null;

  useEffect(() => {
    if (isOpen && plan) {
      const fechaPago = plan.fechaPago instanceof Date 
        ? plan.fechaPago.toISOString().split('T')[0]
        : new Date(plan.fechaPago).toISOString().split('T')[0];

      setFormData({
        nombre: plan.nombre || '',
        descripcion: plan.descripcion || '',
        categoria: plan.categoria || 'Otro',
        acreedor: plan.acreedor || '',
        montoDeuda: plan.montoDeuda?.toString() || '',
        tasaInteres: plan.tasaInteres?.toString() || '',
        cuotaMensual: plan.cuotaMensual?.toString() || '',
        fechaPago,
        prioridad: plan.prioridad || 'normal',
        estrategia: plan.estrategia || 'equilibrada',
        numeroContrato: plan.numeroContrato || '',
        notificacionActiva: plan.notificacionActiva !== false
      });
      setErrors({});
      setStep(1);
    } else if (isOpen && !plan) {
      setFormData({
        nombre: '',
        descripcion: '',
        categoria: 'Otro',
        acreedor: '',
        montoDeuda: '',
        tasaInteres: '',
        cuotaMensual: '',
        fechaPago: '',
        prioridad: 'normal',
        estrategia: 'equilibrada',
        numeroContrato: '',
        notificacionActiva: true
      });
      setErrors({});
      setStep(1);
    }
  }, [isOpen, plan]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.nombre.trim()) {
        newErrors.nombre = 'El nombre de la deuda es requerido';
      }
      if (!formData.acreedor.trim()) {
        newErrors.acreedor = 'El acreedor/entidad es requerido';
      }
      if (!formData.categoria) {
        newErrors.categoria = 'Selecciona una categoría';
      }
    } else if (step === 2) {
      if (!formData.montoDeuda || parseFloat(formData.montoDeuda) <= 0) {
        newErrors.montoDeuda = 'El monto debe ser mayor a 0';
      }
      if (!formData.fechaPago) {
        newErrors.fechaPago = 'Selecciona una fecha de vencimiento';
      }
      if (formData.tasaInteres && parseFloat(formData.tasaInteres) < 0) {
        newErrors.tasaInteres = 'La tasa de interés no puede ser negativa';
      }
    } else if (step === 3) {
      if (!formData.cuotaMensual || parseFloat(formData.cuotaMensual) <= 0) {
        newErrors.cuotaMensual = 'La cuota mensual debe ser mayor a 0';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }

    const deudaData = {
      ...formData,
      montoDeuda: parseFloat(formData.montoDeuda),
      tasaInteres: parseFloat(formData.tasaInteres) || 0,
      cuotaMensual: parseFloat(formData.cuotaMensual),
      fechaPago: new Date(formData.fechaPago),
      icono: ICONOS_CATEGORIA_DEUDA[formData.categoria],
      color: COLORES_CATEGORIA_DEUDA[formData.categoria]
    };

    onSave(deudaData);
  };

  if (!isOpen) return null;

  const categoriaSeleccionada = formData.categoria;
  const icono = ICONOS_CATEGORIA_DEUDA[categoriaSeleccionada];
  const color = COLORES_CATEGORIA_DEUDA[categoriaSeleccionada];

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className={styles.titulo}>
          {isEditMode ? 'Editar Plan de Deuda' : 'Crear Nuevo Plan de Deuda'}
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* STEP 1: Información Básica */}
          {step === 1 && (
            <div className={styles.step}>
              <h3 className={styles.stepTitle}>Paso 1: Información Básica</h3>

              <Input
                label="Nombre de la Deuda *"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Crédito Banco XYZ"
                error={errors.nombre}
              />

              <Input
                label="Acreedor/Entidad *"
                name="acreedor"
                value={formData.acreedor}
                onChange={handleChange}
                placeholder="Ej: Banco ABC, Tienda XYZ"
                error={errors.acreedor}
              />

              <div className={styles.formGroup}>
                <label className={styles.label}>Categoría *</label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className={styles.select}
                >
                  {CATEGORIAS_PLAN_DEUDA.map(cat => (
                    <option key={cat} value={cat}>
                      {ICONOS_CATEGORIA_DEUDA[cat]} {cat}
                    </option>
                  ))}
                </select>
                {errors.categoria && <span className={styles.error}>{errors.categoria}</span>}
              </div>

              <Input
                label="Número de Contrato (opcional)"
                name="numeroContrato"
                value={formData.numeroContrato}
                onChange={handleChange}
                placeholder="Ej: 12345ABC"
              />

              <Input
                label="Descripción (opcional)"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Detalles adicionales sobre la deuda"
              />

              <div className={styles.preview} style={{ borderLeftColor: color }}>
                <span className={styles.previewIcon}>{icono}</span>
                <div>
                  <p className={styles.previewName}>{formData.nombre || 'Mi Deuda'}</p>
                  <p className={styles.previewAcreedor}>{formData.acreedor || 'Acreedor'}</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Detalles Financieros */}
          {step === 2 && (
            <div className={styles.step}>
              <h3 className={styles.stepTitle}>Paso 2: Detalles Financieros</h3>

              <Input
                label="Monto Total de la Deuda *"
                type="number"
                name="montoDeuda"
                value={formData.montoDeuda}
                onChange={handleChange}
                placeholder="1000.00"
                step="0.01"
                error={errors.montoDeuda}
              />

              <Input
                label="Tasa de Interés Anual (%) (opcional)"
                type="number"
                name="tasaInteres"
                value={formData.tasaInteres}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                error={errors.tasaInteres}
              />

              <Input
                label="Fecha de Vencimiento *"
                type="date"
                name="fechaPago"
                value={formData.fechaPago}
                onChange={handleChange}
                error={errors.fechaPago}
              />

              {formData.montoDeuda && formData.fechaPago && (
                <div className={styles.simulacion}>
                  <h4>Información:</h4>
                  {(() => {
                    const monto = parseFloat(formData.montoDeuda);
                    const fechaVenc = new Date(formData.fechaPago);
                    const hoy = new Date();
                    const diasFaltantes = Math.ceil((fechaVenc - hoy) / (1000 * 60 * 60 * 24));
                    const mesesFaltantes = Math.ceil(diasFaltantes / 30);

                    return (
                      <ul>
                        <li>
                          📅 Días hasta vencimiento: <strong>{Math.max(0, diasFaltantes)}</strong>
                        </li>
                        <li>
                          📊 Meses disponibles: <strong>{Math.max(0, mesesFaltantes)}</strong>
                        </li>
                        {formData.tasaInteres && (
                          <li>
                            💰 Interés anual: <strong>{formData.tasaInteres}%</strong>
                          </li>
                        )}
                      </ul>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Configuración de Pago */}
          {step === 3 && (
            <div className={styles.step}>
              <h3 className={styles.stepTitle}>Paso 3: Configuración de Pago</h3>

              <Input
                label="Cuota Mensual Propuesta *"
                type="number"
                name="cuotaMensual"
                value={formData.cuotaMensual}
                onChange={handleChange}
                placeholder="100.00"
                step="0.01"
                error={errors.cuotaMensual}
              />

              <div className={styles.formGroup}>
                <label className={styles.label}>Prioridad</label>
                <select
                  name="prioridad"
                  value={formData.prioridad}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="baja">Baja</option>
                  <option value="normal">Normal</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Estrategia de Pago</label>
                <select
                  name="estrategia"
                  value={formData.estrategia}
                  onChange={handleChange}
                  className={styles.select}
                >
                  {Object.entries(ESTRATEGIAS_DEUDA).map(([key, strategy]) => (
                    <option key={key} value={key}>
                      {strategy.icono} {strategy.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    name="notificacionActiva"
                    checked={formData.notificacionActiva}
                    onChange={handleChange}
                  />
                  <span>Activar notificaciones de vencimiento</span>
                </label>
              </div>

              {formData.cuotaMensual && (
                <div className={styles.estimacion}>
                  <h4>Estimación de Tiempo:</h4>
                  {(() => {
                    const monto = parseFloat(formData.montoDeuda) || 0;
                    const cuota = parseFloat(formData.cuotaMensual) || 0;
                    const meses = cuota > 0 ? Math.ceil(monto / cuota) : 0;
                    const años = Math.floor(meses / 12);
                    const mesesRestantes = meses % 12;

                    return (
                      <p>
                        Con cuota de {simboloMoneda}{cuota.toFixed(2)}/mes, terminarías en:{' '}
                        <strong>
                          {años > 0 && `${años} año${años > 1 ? 's' : ''} `}
                          {mesesRestantes > 0 && `${mesesRestantes} mes${mesesRestantes > 1 ? 'es' : ''}`}
                        </strong>
                      </p>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Navegación */}
          <div className={styles.stepButtons}>
            {step > 1 && (
              <Button variant="outline" type="button" onClick={handlePrevious}>
                ← Anterior
              </Button>
            )}

            {step < 3 ? (
              <Button variant="brand" type="button" onClick={handleNext}>
                Siguiente →
              </Button>
            ) : (
              <Button variant="success" type="submit">
                {isEditMode ? '💾 Guardar Cambios' : '✓ Crear Deuda'}
              </Button>
            )}

            <Button variant="outline" type="button" onClick={onCancel}>
              ✕ Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

PlanDeudaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  plan: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  simboloMoneda: PropTypes.string.isRequired
};

export default PlanDeudaModal;
