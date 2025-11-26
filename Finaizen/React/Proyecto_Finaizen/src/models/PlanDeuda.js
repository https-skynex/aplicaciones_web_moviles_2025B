/**
 * PlanDeuda - Modelo para gestionar planes de pago de deudas
 * Herramienta inteligente para organizar y eliminar deudas
 */

export const CATEGORIAS_PLAN_DEUDA = [
  'Tarjeta de Crédito',
  'Préstamo Personal',
  'Hipoteca',
  'Préstamo Auto',
  'Deuda Familiar',
  'Servicios',
  'Otro'
];

export const ICONOS_CATEGORIA_DEUDA = {
  'Tarjeta de Crédito': '💳',
  'Préstamo Personal': '📋',
  'Hipoteca': '🏠',
  'Préstamo Auto': '🚗',
  'Deuda Familiar': '👨‍👩‍👧',
  'Servicios': '🏢',
  'Otro': '📌'
};

export const COLORES_CATEGORIA_DEUDA = {
  'Tarjeta de Crédito': '#FF6B6B',
  'Préstamo Personal': '#FF8C42',
  'Hipoteca': '#FFD93D',
  'Préstamo Auto': '#6BCB77',
  'Deuda Familiar': '#4D96FF',
  'Servicios': '#9D84B7',
  'Otro': '#A0AEC0'
};

export const ESTRATEGIAS_DEUDA = {
  'bola_nieve': {
    nombre: 'Bola de Nieve',
    descripcion: 'Pagar primero las deudas más pequeñas',
    icono: '⛄'
  },
  'avalancha': {
    nombre: 'Avalancha',
    descripcion: 'Priorizar deudas con mayor tasa de interés',
    icono: '❄️'
  },
  'equilibrada': {
    nombre: 'Equilibrada',
    descripcion: 'Distribuir pagos equitativamente entre deudas',
    icono: '⚖️'
  },
  'agresiva': {
    nombre: 'Agresiva',
    descripcion: 'Maximizar pagos para eliminar deudas rápidamente',
    icono: '🔥'
  }
};

class PlanDeuda {
  constructor({
    id = null,
    perfilId = null,
    nombre = '',
    descripcion = '',
    categoria = 'Otro',
    montoDeuda = 0,
    montoPagado = 0,
    tasaInteres = 0,
    cuotaMensual = 0,
    fechaPago = new Date(),
    estado = 'activo', // activo, pausado, completado, cancelado
    prioridad = 'normal', // baja, normal, alta, urgente
    estrategia = 'equilibrada',
    acreedor = '',
    numeroContrato = '',
    historialPagos = [],
    reajustes = [],
    notificacionActiva = true,
    icono = '💳',
    color = '#FF6B6B',
    createdAt = new Date(),
    updatedAt = new Date()
  } = {}) {
    this.id = id;
    this.perfilId = perfilId;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.montoDeuda = parseFloat(montoDeuda);
    this.montoPagado = parseFloat(montoPagado);
    this.tasaInteres = parseFloat(tasaInteres);
    this.cuotaMensual = parseFloat(cuotaMensual);
    this.fechaPago = new Date(fechaPago);
    this.estado = estado;
    this.prioridad = prioridad;
    this.estrategia = estrategia;
    this.acreedor = acreedor;
    this.numeroContrato = numeroContrato;
    this.historialPagos = Array.isArray(historialPagos) ? historialPagos : [];
    this.reajustes = Array.isArray(reajustes) ? reajustes : [];
    this.notificacionActiva = notificacionActiva;
    this.icono = icono;
    this.color = color;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }

  // Getters - Cálculos automáticos
  get montoRestante() {
    return Math.max(0, this.montoDeuda - this.montoPagado);
  }

  get progreso() {
    if (this.montoDeuda === 0) return 0;
    return (this.montoPagado / this.montoDeuda) * 100;
  }

  get estaCompletada() {
    return this.montoPagado >= this.montoDeuda;
  }

  get interesGenerado() {
    const mesesTranscurridos = Math.max(0, Math.ceil((new Date() - this.createdAt) / (1000 * 60 * 60 * 24 * 30)));
    return (this.montoDeuda * (this.tasaInteres / 100) / 12) * mesesTranscurridos;
  }

  get montoTotalPorPagar() {
    return this.montoDeuda + this.interesGenerado;
  }

  get montoFaltante() {
    return Math.max(0, this.montoTotalPorPagar - this.montoPagado);
  }

  get diasRestantes() {
    const diferencia = this.fechaPago - new Date();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  }

  get estaAtrasada() {
    return this.diasRestantes < 0 && this.estado === 'activo';
  }

  get mesesFaltantes() {
    if (this.cuotaMensual === 0) return Infinity;
    return Math.ceil(this.montoFaltante / this.cuotaMensual);
  }

  get velocidadPago() {
    const mesesTranscurridos = Math.max(1, Math.ceil((new Date() - this.createdAt) / (1000 * 60 * 60 * 24 * 30)));
    return (this.montoPagado / mesesTranscurridos).toFixed(2);
  }

  get proximaFechaPago() {
    const proximaPago = new Date(this.fechaPago);
    while (proximaPago < new Date()) {
      proximaPago.setMonth(proximaPago.getMonth() + 1);
    }
    return proximaPago;
  }

  // Métodos de acción
  agregarPago(monto, descripcion = '', fecha = new Date()) {
    if (monto <= 0) return false;
    
    const nuevoMontoPagado = this.montoPagado + monto;
    if (nuevoMontoPagado > this.montoTotalPorPagar) {
      this.montoPagado = this.montoTotalPorPagar;
    } else {
      this.montoPagado = nuevoMontoPagado;
    }

    this.historialPagos.push({
      monto,
      descripcion,
      fecha,
      saldoAnterior: this.montoPagado - monto,
      saldoActual: this.montoPagado
    });

    this.updatedAt = new Date();

    if (this.montoPagado >= this.montoTotalPorPagar) {
      this.estado = 'completado';
    }

    return true;
  }

  reducirPago(monto, descripcion = '') {
    if (monto > this.montoPagado) return false;

    this.montoPagado = Math.max(0, this.montoPagado - monto);
    this.historialPagos.push({
      monto: -monto,
      descripcion: `Retiro: ${descripcion}`,
      fecha: new Date(),
      saldoAnterior: this.montoPagado + monto,
      saldoActual: this.montoPagado
    });

    this.updatedAt = new Date();
    return true;
  }

  pausar() {
    if (this.estado !== 'activo') return false;
    this.estado = 'pausado';
    this.updatedAt = new Date();
    return true;
  }

  reactivar() {
    if (this.estado !== 'pausado') return false;
    this.estado = 'activo';
    this.updatedAt = new Date();
    return true;
  }

  completar() {
    this.montoPagado = this.montoTotalPorPagar;
    this.estado = 'completado';
    this.updatedAt = new Date();
    return true;
  }

  cancelar() {
    this.estado = 'cancelado';
    this.updatedAt = new Date();
    return true;
  }

  reajustar(nuevoCuota, razon = '') {
    this.reajustes.push({
      fecha: new Date(),
      cuotaAnterior: this.cuotaMensual,
      cuotaNueva: nuevoCuota,
      razon
    });

    this.cuotaMensual = nuevoCuota;
    this.updatedAt = new Date();
    return true;
  }

  // Serialización
  toJSON() {
    return {
      id: this.id,
      perfilId: this.perfilId,
      nombre: this.nombre,
      descripcion: this.descripcion,
      categoria: this.categoria,
      montoDeuda: this.montoDeuda,
      montoPagado: this.montoPagado,
      tasaInteres: this.tasaInteres,
      cuotaMensual: this.cuotaMensual,
      fechaPago: this.fechaPago.toISOString(),
      estado: this.estado,
      prioridad: this.prioridad,
      estrategia: this.estrategia,
      acreedor: this.acreedor,
      numeroContrato: this.numeroContrato,
      historialPagos: this.historialPagos,
      reajustes: this.reajustes,
      notificacionActiva: this.notificacionActiva,
      icono: this.icono,
      color: this.color,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }

  static fromJSON(data) {
    return new PlanDeuda(data);
  }
}

export default PlanDeuda;
