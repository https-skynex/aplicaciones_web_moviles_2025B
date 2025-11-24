/**
 * Modelo de Usuario
 * Representa a un usuario del sistema Finaizen
 */
class User {
  constructor({
    id,
    nombre,
    apellido,
    correo,
    nombreUsuario,
    contraseña,
    pais = 'Ecuador',
    ciudad = '',
    fechaNacimiento,
    genero = '',
    rol = 'user', // 'user' | 'admin'
    perfiles = [],
    notificaciones = [],
    // Campos Premium
    isPremium = false,
    premiumSince = null,
    subscriptionType = null, // 'mensual' | 'anual' | null
    subscriptionEndDate = null,
    paymentMethod = null, // { type: 'tarjeta', last4: '4242', expiry: '12/25' }
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.nombreUsuario = nombreUsuario;
    this.contraseña = contraseña; // En producción, esto estaría hasheado
    this.pais = pais;
    this.ciudad = ciudad;
    this.fechaNacimiento = new Date(fechaNacimiento);
    this.genero = genero; // 'masculino' | 'femenino' | 'otro' | 'prefiero_no_decir'
    this.rol = rol;
    this.perfiles = perfiles; // Array de IDs de perfiles
    this.notificaciones = notificaciones;
    // Premium
    this.isPremium = isPremium;
    this.premiumSince = premiumSince ? new Date(premiumSince) : null;
    this.subscriptionType = subscriptionType;
    this.subscriptionEndDate = subscriptionEndDate ? new Date(subscriptionEndDate) : null;
    this.paymentMethod = paymentMethod;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.updatedAt = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
  }

  /**
   * Calcula la edad del usuario basándose en su fecha de nacimiento
   */
  get edad() {
    const today = new Date();
    const birthDate = new Date(this.fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Obtiene el nombre completo del usuario
   */
  get nombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }

  /**
   * Verifica si el usuario es administrador
   */
  get esAdmin() {
    return this.rol === 'admin';
  }

  /**
   * Verifica si las credenciales son correctas
   */
  verificarContraseña(contraseña) {
    return this.contraseña === contraseña;
  }

  /**
   * Agrega un perfil al usuario
   */
  agregarPerfil(perfilId) {
    if (!this.perfiles.includes(perfilId)) {
      this.perfiles.push(perfilId);
      this.updatedAt = new Date();
    }
  }

  /**
   * Elimina un perfil del usuario
   */
  eliminarPerfil(perfilId) {
    const index = this.perfiles.indexOf(perfilId);
    if (index > -1) {
      this.perfiles.splice(index, 1);
      this.updatedAt = new Date();
    }
  }

  /**
   * Activa la suscripción premium
   */
  activarPremium(tipo, paymentMethod) {
    this.isPremium = true;
    this.premiumSince = new Date();
    this.subscriptionType = tipo; // 'mensual' o 'anual'
    
    // Calcular fecha de fin
    const endDate = new Date();
    if (tipo === 'mensual') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (tipo === 'anual') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    this.subscriptionEndDate = endDate;
    this.paymentMethod = paymentMethod;
    this.updatedAt = new Date();
  }

  /**
   * Cancela la suscripción premium
   */
  cancelarPremium() {
    this.isPremium = false;
    this.subscriptionType = null;
    this.subscriptionEndDate = null;
    this.updatedAt = new Date();
  }

  /**
   * Verifica si la suscripción está activa
   */
  get premiumActivo() {
    if (!this.isPremium) return false;
    if (!this.subscriptionEndDate) return false;
    return new Date() < this.subscriptionEndDate;
  }

  /**
   * Serializa el usuario (para guardar en localStorage)
   */
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      nombreUsuario: this.nombreUsuario,
      contraseña: this.contraseña,
      pais: this.pais,
      ciudad: this.ciudad,
      fechaNacimiento: this.fechaNacimiento && !isNaN(this.fechaNacimiento.getTime()) ? this.fechaNacimiento.toISOString() : null,
      genero: this.genero,
      rol: this.rol,
      perfiles: this.perfiles,
      notificaciones: this.notificaciones,
      isPremium: this.isPremium,
      premiumSince: this.premiumSince && !isNaN(this.premiumSince.getTime()) ? this.premiumSince.toISOString() : null,
      subscriptionType: this.subscriptionType,
      subscriptionEndDate: this.subscriptionEndDate && !isNaN(this.subscriptionEndDate.getTime()) ? this.subscriptionEndDate.toISOString() : null,
      paymentMethod: this.paymentMethod,
      createdAt: this.createdAt && !isNaN(this.createdAt.getTime()) ? this.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: this.updatedAt && !isNaN(this.updatedAt.getTime()) ? this.updatedAt.toISOString() : new Date().toISOString()
    };
  }

  /**
   * Crea una instancia de User desde un objeto JSON
   */
  static fromJSON(json) {
    return new User(json);
  }
}

export default User;
