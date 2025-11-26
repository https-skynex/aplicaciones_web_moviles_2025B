/**
 * Modelo de Plan de Ahorro
 * Representa un plan de ahorro personalizado del usuario
 */
class PlanAhorro {
  constructor({
    id,
    perfilId,
    nombre,
    descripcion = '',
    objetivo,
    montoActual = 0,
    montoMeta,
    montoAhorrarMensual,
    categoria = 'Personal', // 'Personal', 'Viajes', 'Vehículo', 'Casa', 'Educación', 'Otros'
    fechaInicio = new Date(),
    fechaMeta, // Fecha objetivo para alcanzar el ahorro
    estado = 'activo', // 'activo' | 'pausado' | 'completado' | 'cancelado'
    prioridad = 'normal', // 'baja' | 'normal' | 'alta' | 'urgente'
    icono = '💰',
    color = '#4CAF50', // Color para representar el plan
    
    // Seguimiento
    porcentajeCompletado = 0,
    depositosRealizados = 0,
    mesasRestantes = 0,
    estaEnPlazo = true,
    
    // Configuración avanzada
    notificacionActiva = true,
    tipoNotificacion = 'mensual', // 'semanal' | 'mensual'
    estrategia = 'consistente', // 'consistente' | 'agresiva' | 'flexible'
    
    // Historial
    historialAhorros = [],
    reajustes = [],
    
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.perfilId = perfilId;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.objetivo = objetivo;
    this.montoActual = parseFloat(montoActual) || 0;
    this.montoMeta = parseFloat(montoMeta);
    this.montoAhorrarMensual = parseFloat(montoAhorrarMensual);
    this.categoria = categoria;
    this.fechaInicio = fechaInicio instanceof Date ? fechaInicio : new Date(fechaInicio);
    this.fechaMeta = fechaMeta instanceof Date ? fechaMeta : new Date(fechaMeta);
    this.estado = estado;
    this.prioridad = prioridad;
    this.icono = icono;
    this.color = color;
    this.porcentajeCompletado = porcentajeCompletado;
    this.depositosRealizados = depositosRealizados;
    this.mesasRestantes = mesasRestantes;
    this.estaEnPlazo = estaEnPlazo;
    this.notificacionActiva = notificacionActiva;
    this.tipoNotificacion = tipoNotificacion;
    this.estrategia = estrategia;
    this.historialAhorros = historialAhorros || [];
    this.reajustes = reajustes || [];
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.updatedAt = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
  }

  /**
   * Calcula el progreso del plan (0-100)
   */
  get progreso() {
    if (this.montoMeta === 0) return 0;
    return (this.montoActual / this.montoMeta) * 100;
  }

  /**
   * Calcula el monto faltante
   */
  get montoFaltante() {
    return Math.max(0, this.montoMeta - this.montoActual);
  }

  /**
   * Calcula días restantes
   */
  get diasRestantes() {
    const hoy = new Date();
    const diffTime = this.fechaMeta - hoy;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Calcula si está completado
   */
  get estaCompletado() {
    return this.montoActual >= this.montoMeta;
  }

  /**
   * Calcula si está atrasado
   */
  get estaAtrasado() {
    const hoy = new Date();
    const diasTranscurridos = Math.floor((hoy - this.fechaInicio) / (1000 * 60 * 60 * 24));
    const mesasTranscurridas = Math.ceil(diasTranscurridos / 30);
    
    if (mesasTranscurridas === 0) return false;
    
    const ahorroEsperado = this.montoAhorrarMensual * mesasTranscurridas;
    return this.montoActual < ahorroEsperado * 0.9; // 10% de tolerancia
  }

  /**
   * Calcula la velocidad de ahorro ($ por mes)
   */
  get velocidadAhorro() {
    const diasTranscurridos = Math.floor((new Date() - this.fechaInicio) / (1000 * 60 * 60 * 24));
    const mesasTranscurridas = Math.max(1, Math.ceil(diasTranscurridos / 30));
    return this.montoActual / mesasTranscurridas;
  }

  /**
   * Estima cuánto falta ahorrar por mes
   */
  get montoAhorrarMensualEstimado() {
    const diasRestantes = this.diasRestantes;
    const mesasRestantes = Math.ceil(diasRestantes / 30);
    
    if (mesasRestantes <= 0) {
      return this.montoFaltante;
    }
    
    return this.montoFaltante / mesasRestantes;
  }

  /**
   * Agrega un deposito al plan
   */
  agregarDeposito(monto, descripcion = '', fecha = new Date()) {
    this.montoActual += parseFloat(monto);
    this.depositosRealizados += 1;
    this.updatedAt = new Date();

    this.historialAhorros.push({
      tipo: 'deposito',
      monto: parseFloat(monto),
      descripcion,
      fecha: fecha instanceof Date ? fecha : new Date(fecha),
      saldoAnterior: this.montoActual - parseFloat(monto),
      saldoNuevo: this.montoActual
    });

    // Verificar si se completó el plan
    if (this.estaCompletado && this.estado === 'activo') {
      this.completar();
    }
  }

  /**
   * Retira dinero del plan
   */
  retirarDeposito(monto, descripcion = '', fecha = new Date()) {
    const montoRetiro = Math.min(parseFloat(monto), this.montoActual);
    this.montoActual -= montoRetiro;
    this.updatedAt = new Date();

    this.historialAhorros.push({
      tipo: 'retiro',
      monto: -montoRetiro,
      descripcion,
      fecha: fecha instanceof Date ? fecha : new Date(fecha),
      saldoAnterior: this.montoActual + montoRetiro,
      saldoNuevo: this.montoActual
    });
  }

  /**
   * Completa el plan
   */
  completar() {
    this.estado = 'completado';
    this.porcentajeCompletado = 100;
    this.updatedAt = new Date();
  }

  /**
   * Pausa el plan
   */
  pausar() {
    if (this.estado === 'activo') {
      this.estado = 'pausado';
      this.updatedAt = new Date();
    }
  }

  /**
   * Reactiva un plan pausado
   */
  reactivar() {
    if (this.estado === 'pausado') {
      this.estado = 'activo';
      this.updatedAt = new Date();
    }
  }

  /**
   * Cancela el plan
   */
  cancelar() {
    this.estado = 'cancelado';
    this.updatedAt = new Date();
  }

  /**
   * Reajusta el plan (por cambios en metas o fechas)
   */
  reajustar(nuevasMetas) {
    const reajuste = {
      fecha: new Date(),
      cambios: {},
      razon: nuevasMetas.razon || 'Reajuste manual'
    };

    if (nuevasMetas.montoMeta) {
      reajuste.cambios.montoMeta = {
        anterior: this.montoMeta,
        nuevo: nuevasMetas.montoMeta
      };
      this.montoMeta = parseFloat(nuevasMetas.montoMeta);
    }

    if (nuevasMetas.fechaMeta) {
      reajuste.cambios.fechaMeta = {
        anterior: this.fechaMeta,
        nuevo: nuevasMetas.fechaMeta
      };
      this.fechaMeta = nuevasMetas.fechaMeta instanceof Date ? nuevasMetas.fechaMeta : new Date(nuevasMetas.fechaMeta);
    }

    if (nuevasMetas.montoAhorrarMensual) {
      reajuste.cambios.montoAhorrarMensual = {
        anterior: this.montoAhorrarMensual,
        nuevo: nuevasMetas.montoAhorrarMensual
      };
      this.montoAhorrarMensual = parseFloat(nuevasMetas.montoAhorrarMensual);
    }

    this.reajustes.push(reajuste);
    this.updatedAt = new Date();
  }

  /**
   * Serializa el plan
   */
  toJSON() {
    return {
      id: this.id,
      perfilId: this.perfilId,
      nombre: this.nombre,
      descripcion: this.descripcion,
      objetivo: this.objetivo,
      montoActual: this.montoActual,
      montoMeta: this.montoMeta,
      montoAhorrarMensual: this.montoAhorrarMensual,
      categoria: this.categoria,
      fechaInicio: this.fechaInicio.toISOString(),
      fechaMeta: this.fechaMeta.toISOString(),
      estado: this.estado,
      prioridad: this.prioridad,
      icono: this.icono,
      color: this.color,
      porcentajeCompletado: this.porcentajeCompletado,
      depositosRealizados: this.depositosRealizados,
      mesasRestantes: this.mesasRestantes,
      estaEnPlazo: this.estaEnPlazo,
      notificacionActiva: this.notificacionActiva,
      tipoNotificacion: this.tipoNotificacion,
      estrategia: this.estrategia,
      historialAhorros: this.historialAhorros,
      reajustes: this.reajustes,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }

  /**
   * Crea una instancia desde JSON
   */
  static fromJSON(json) {
    return new PlanAhorro({
      ...json,
      fechaInicio: new Date(json.fechaInicio),
      fechaMeta: new Date(json.fechaMeta),
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt)
    });
  }
}

/**
 * Categorías de planes de ahorro
 */
export const CATEGORIAS_PLAN_AHORRO = [
  'Personal',
  'Viajes',
  'Vehículo',
  'Casa',
  'Educación',
  'Inversión',
  'Emergencia',
  'Otros'
];

/**
 * Íconos por categoría
 */
export const ICONOS_CATEGORIA = {
  Personal: '👤',
  Viajes: '✈️',
  Vehículo: '🚗',
  Casa: '🏠',
  Educación: '📚',
  Inversión: '📈',
  Emergencia: '🚨',
  Otros: '💰'
};

/**
 * Colores por categoría
 */
export const COLORES_CATEGORIA = {
  Personal: '#9C27B0',
  Viajes: '#2196F3',
  Vehículo: '#FF9800',
  Casa: '#4CAF50',
  Educación: '#E91E63',
  Inversión: '#00BCD4',
  Emergencia: '#F44336',
  Otros: '#795548'
};

export default PlanAhorro;
