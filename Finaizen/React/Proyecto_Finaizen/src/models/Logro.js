/**
 * Modelo de Logro
 * Representa un logro desbloqueado por el usuario
 */
class Logro {
  constructor({
    id,
    perfilId,
    nombre,
    descripcion,
    icono = '🏆',
    tipo, // 'ahorro' | 'racha' | 'presupuesto' | 'registro' | 'especial' | 'empresa'
    condicion, // Condición para desbloquear
    desbloqueado = false,
    fechaDesbloqueo = null,
    progreso = 0, // Progreso actual (0-100)
    meta = 100, // Meta para completar
    // Nuevos campos para recompensas de empresas
    empresa = null, // Nombre de la empresa asociada (ej: 'McDonald\'s', 'Banco Pichincha')
    logoEmpresa = null, // URL del logo de la empresa
    recompensa = null, // Descripción de la recompensa (ej: '$10 USD en productos McDonald\'s')
    valorRecompensa = 0, // Valor monetario de la recompensa en USD
    requiereComprobante = false, // Si requiere subir comprobante para verificar
    comprobantes = [] // Array de URLs de comprobantes subidos
  }) {
    this.id = id;
    this.perfilId = perfilId;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.icono = icono;
    this.tipo = tipo;
    this.condicion = condicion;
    this.desbloqueado = desbloqueado;
    this.fechaDesbloqueo = fechaDesbloqueo ? new Date(fechaDesbloqueo) : null;
    this.progreso = progreso;
    this.meta = meta;
    this.empresa = empresa;
    this.logoEmpresa = logoEmpresa;
    this.recompensa = recompensa;
    this.valorRecompensa = valorRecompensa;
    this.requiereComprobante = requiereComprobante;
    this.comprobantes = comprobantes || [];
  }

  /**
   * Obtiene el porcentaje de progreso
   */
  get porcentajeProgreso() {
    return (this.progreso / this.meta) * 100;
  }

  /**
   * Actualiza el progreso del logro
   */
  actualizarProgreso(nuevoProgreso) {
    this.progreso = Math.min(nuevoProgreso, this.meta);
    
    // Desbloquear si se alcanzó la meta
    if (this.progreso >= this.meta && !this.desbloqueado) {
      this.desbloquear();
    }
  }

  /**
   * Desbloquea el logro
   */
  desbloquear() {
    this.desbloqueado = true;
    this.fechaDesbloqueo = new Date();
    this.progreso = this.meta;
  }

  /**
   * Agrega un comprobante (foto de recibo/depósito)
   */
  agregarComprobante(urlComprobante) {
    this.comprobantes.push({
      url: urlComprobante,
      fecha: new Date(),
      verificado: false
    });
  }

  /**
   * Serializa el logro
   */
  toJSON() {
    return {
      id: this.id,
      perfilId: this.perfilId,
      nombre: this.nombre,
      descripcion: this.descripcion,
      icono: this.icono,
      tipo: this.tipo,
      condicion: this.condicion,
      desbloqueado: this.desbloqueado,
      fechaDesbloqueo: this.fechaDesbloqueo ? this.fechaDesbloqueo.toISOString() : null,
      progreso: this.progreso,
      meta: this.meta,
      empresa: this.empresa,
      logoEmpresa: this.logoEmpresa,
      recompensa: this.recompensa,
      valorRecompensa: this.valorRecompensa,
      requiereComprobante: this.requiereComprobante,
      comprobantes: this.comprobantes
    };
  }

  /**
   * Crea una instancia desde JSON
   */
  static fromJSON(json) {
    return new Logro({
      ...json,
      fechaDesbloqueo: json.fechaDesbloqueo ? new Date(json.fechaDesbloqueo) : null
    });
  }
}

/**
 * Logros predefinidos del sistema
 */
export const LOGROS_PREDEFINIDOS = [
  // === LOGROS DE EMPRESAS CON RECOMPENSAS REALES ===
  {
    id: 'logro_mcdonalds_5',
    nombre: 'Rey de la Comida Rápida',
    descripcion: 'Registra 5 consumos en McDonald\'s para desbloquear',
    icono: '🍔',
    tipo: 'empresa',
    condicion: 'consumos_mcdonalds',
    meta: 5,
    empresa: 'McDonald\'s',
    logoEmpresa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png',
    recompensa: '$10 USD en productos McDonald\'s',
    valorRecompensa: 10,
    requiereComprobante: true
  },
  {
    id: 'logro_pichincha_ahorro_200',
    nombre: 'Ahorrador Maestro',
    descripcion: 'Ahorra $200 en tu cuenta de Banco Pichincha',
    icono: '💵',
    tipo: 'empresa',
    condicion: 'ahorro_banco_pichincha',
    meta: 200,
    empresa: 'Banco Pichincha',
    logoEmpresa: 'https://www.pichincha.com/portal/EC/resource/img/logo-banco-pichincha.png',
    recompensa: '$5 USD acreditados en tu cuenta',
    valorRecompensa: 5,
    requiereComprobante: true
  },
  {
    id: 'logro_pichincha_pagador_puntual',
    nombre: 'Pagador Puntual',
    descripcion: 'Paga tu tarjeta de crédito a tiempo 3 meses seguidos',
    icono: '💳',
    tipo: 'empresa',
    condicion: 'pagos_puntuales_tarjeta',
    meta: 3,
    empresa: 'Banco Pichincha',
    logoEmpresa: 'https://www.pichincha.com/portal/EC/resource/img/logo-banco-pichincha.png',
    recompensa: 'Aumento de 500 Puntos Pichincha',
    valorRecompensa: 0,
    requiereComprobante: true
  },
  {
    id: 'logro_kfc_10',
    nombre: 'Fan del Coronel',
    descripcion: 'Registra 10 consumos en KFC',
    icono: '🍗',
    tipo: 'empresa',
    condicion: 'consumos_kfc',
    meta: 10,
    empresa: 'KFC',
    logoEmpresa: 'https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png',
    recompensa: 'Combo Familiar Gratis',
    valorRecompensa: 25,
    requiereComprobante: true
  },
  {
    id: 'logro_uber_20',
    nombre: 'Viajero Frecuente',
    descripcion: 'Realiza 20 viajes en Uber',
    icono: '🚗',
    tipo: 'empresa',
    condicion: 'viajes_uber',
    meta: 20,
    empresa: 'Uber',
    logoEmpresa: 'https://logo-marque.com/wp-content/uploads/2020/09/Uber-Logo.png',
    recompensa: '$15 USD en créditos Uber',
    valorRecompensa: 15,
    requiereComprobante: true
  },
  {
    id: 'logro_netflix_6_meses',
    nombre: 'Binge Watcher',
    descripcion: 'Mantén tu suscripción Netflix activa 6 meses',
    icono: '📺',
    tipo: 'empresa',
    condicion: 'suscripcion_netflix',
    meta: 6,
    empresa: 'Netflix',
    logoEmpresa: 'https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png',
    recompensa: '1 mes gratis de Netflix',
    valorRecompensa: 15.99,
    requiereComprobante: true
  },
  
  // === LOGROS GENERALES ===
  {
    id: 'logro_primer_ingreso',
    nombre: 'Primer Paso',
    descripcion: 'Registra tu primer ingreso',
    icono: '🎯',
    tipo: 'registro',
    condicion: 'primer_ingreso',
    meta: 1
  },
  {
    id: 'logro_primer_egreso',
    nombre: 'Consciente',
    descripcion: 'Registra tu primer egreso',
    icono: '📝',
    tipo: 'registro',
    condicion: 'primer_egreso',
    meta: 1
  },
  {
    id: 'logro_primer_presupuesto',
    nombre: 'Planificador',
    descripcion: 'Crea tu primer presupuesto',
    icono: '📊',
    tipo: 'presupuesto',
    condicion: 'primer_presupuesto',
    meta: 1
  },
  {
    id: 'logro_racha_7_dias',
    nombre: 'Constante',
    descripcion: 'Registra transacciones durante 7 días seguidos',
    icono: '🔥',
    tipo: 'racha',
    condicion: 'racha_dias',
    meta: 7
  },
  {
    id: 'logro_racha_30_dias',
    nombre: 'Disciplinado',
    descripcion: 'Registra transacciones durante 30 días seguidos',
    icono: '💪',
    tipo: 'racha',
    condicion: 'racha_dias',
    meta: 30
  },
  {
    id: 'logro_ahorro_100',
    nombre: 'Ahorrador Novato',
    descripcion: 'Ahorra $100 en un mes',
    icono: '💰',
    tipo: 'ahorro',
    condicion: 'ahorro_mensual',
    meta: 100
  },
  {
    id: 'logro_ahorro_500',
    nombre: 'Ahorrador Experto',
    descripcion: 'Ahorra $500 en un mes',
    icono: '💎',
    tipo: 'ahorro',
    condicion: 'ahorro_mensual',
    meta: 500
  },
  {
    id: 'logro_presupuesto_cumplido',
    nombre: 'Respetuoso del Límite',
    descripcion: 'Cumple todos tus presupuestos durante un mes',
    icono: '✅',
    tipo: 'presupuesto',
    condicion: 'presupuestos_cumplidos',
    meta: 1
  },
  {
    id: 'logro_50_registros',
    nombre: 'Detallista',
    descripcion: 'Registra 50 transacciones',
    icono: '📈',
    tipo: 'registro',
    condicion: 'total_registros',
    meta: 50
  },
  {
    id: 'logro_100_registros',
    nombre: 'Experto en Finanzas',
    descripcion: 'Registra 100 transacciones',
    icono: '🏆',
    tipo: 'registro',
    condicion: 'total_registros',
    meta: 100
  }
];

export default Logro;
