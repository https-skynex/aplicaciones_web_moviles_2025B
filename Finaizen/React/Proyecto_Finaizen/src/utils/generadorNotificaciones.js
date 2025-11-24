/**
 * Script de Prueba: Generador de Notificaciones
 * 
 * Copia y pega este script en la consola del navegador (F12)
 * para generar notificaciones de ejemplo.
 * 
 * IMPORTANTE: Ejecuta esto DESPUÉS de iniciar sesión en Finaizen
 */

// ============================================
// FUNCIÓN 1: Crear Notificación Simple
// ============================================
function crearNotificacionSimple() {
  const mockDB = window.mockDB || JSON.parse(localStorage.getItem('finaizen_mockdb'));
  
  const notif = {
    id: Date.now(),
    userId: 1,
    perfilId: 1,
    tipo: 'info',
    titulo: '🔔 Notificación de Prueba',
    mensaje: 'Esta es una notificación de prueba creada manualmente',
    icono: '🔔',
    leida: false,
    createdAt: new Date(),
    accionUrl: null,
    data: {}
  };
  
  const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
  data.notificaciones.push(notif);
  localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
  
  console.log('✅ Notificación simple creada');
  alert('✅ Notificación creada! Recarga la página para verla.');
}

// ============================================
// FUNCIÓN 2: Logro de McDonald's Completado
// ============================================
function logroMcDonaldsCompletado() {
  const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
  
  const notif = {
    id: Date.now(),
    userId: 1,
    perfilId: 1,
    tipo: 'logro',
    titulo: '🍔 ¡Logro Desbloqueado!',
    mensaje: '¡Felicitaciones! Has completado "Rey de la Comida Rápida". Ganaste $10 USD en cupones de McDonald\'s. Ve a la página de Logros para reclamar tu recompensa.',
    icono: '🍔',
    leida: false,
    createdAt: new Date(),
    accionUrl: '/user/logros',
    data: { 
      logroId: 'logro_mcdonalds',
      recompensa: '$10 USD',
      empresa: 'McDonald\'s'
    }
  };
  
  data.notificaciones.push(notif);
  
  // Actualizar progreso del logro
  const logro = data.logros.find(l => l.titulo === 'Rey de la Comida Rápida');
  if (logro) {
    logro.progresoActual = logro.meta;
    logro.desbloqueado = true;
    logro.fechaDesbloqueo = new Date();
  }
  
  localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
  
  console.log('✅ Logro McDonald\'s completado');
  alert('🍔 ¡Logro completado! Recarga para ver la notificación.');
}

// ============================================
// FUNCIÓN 3: Banco Pichincha - Meta de Ahorro
// ============================================
function logroBancoPichinchaAhorro() {
  const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
  
  const notif = {
    id: Date.now(),
    userId: 1,
    perfilId: 1,
    tipo: 'success',
    titulo: '💰 ¡Meta de Ahorro Alcanzada!',
    mensaje: '¡Increíble! Has ahorrado $200 USD en el Banco Pichincha. Reclama tu recompensa de $5 USD en tu próxima visita a la sucursal.',
    icono: '🏦',
    leida: false,
    createdAt: new Date(),
    accionUrl: '/user/logros',
    data: { 
      logroId: 'logro_banco_pichincha_ahorro',
      montoAhorrado: 200,
      recompensa: '$5 USD'
    }
  };
  
  data.notificaciones.push(notif);
  
  // Actualizar logro
  const logro = data.logros.find(l => 
    l.titulo === 'Ahorrador Maestro' && l.empresa === 'Banco Pichincha'
  );
  if (logro) {
    logro.progresoActual = 200;
    logro.desbloqueado = true;
    logro.fechaDesbloqueo = new Date();
  }
  
  localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
  
  console.log('✅ Logro Banco Pichincha completado');
  alert('🏦 ¡Meta de ahorro alcanzada! Recarga para ver la notificación.');
}

// ============================================
// FUNCIÓN 4: KFC - Logro Cercano (80%)
// ============================================
function logroKFCCercano() {
  const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
  
  const notif = {
    id: Date.now(),
    userId: 1,
    perfilId: 1,
    tipo: 'logro',
    titulo: '🍗 ¡Logro Cercano!',
    mensaje: '¡Casi lo logras! Solo 2 compras más en KFC y desbloqueas "Amante del Pollo". Recompensa: Combo Familiar gratis ($25 USD)',
    icono: '🍗',
    leida: false,
    createdAt: new Date(),
    accionUrl: '/user/logros',
    data: { 
      logroId: 'logro_kfc',
      progreso: 8,
      meta: 10,
      porcentaje: 80
    }
  };
  
  data.notificaciones.push(notif);
  localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
  
  console.log('✅ Notificación de logro cercano KFC creada');
  alert('🍗 ¡Logro al 80%! Recarga para ver la notificación.');
}

// ============================================
// FUNCIÓN 5: Uber - Viajero Frecuente
// ============================================
function logroUberCompletado() {
  const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
  
  const notif = {
    id: Date.now(),
    userId: 1,
    perfilId: 1,
    tipo: 'success',
    titulo: '🚗 ¡Viajero Frecuente!',
    mensaje: '¡Felicitaciones! Has completado 20 viajes en Uber. Ganaste $15 USD en créditos. El código de descuento ha sido enviado a tu email.',
    icono: '🚗',
    leida: false,
    createdAt: new Date(),
    accionUrl: '/user/logros',
    data: { 
      logroId: 'logro_uber',
      viajes: 20,
      recompensa: '$15 USD'
    }
  };
  
  data.notificaciones.push(notif);
  localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
  
  console.log('✅ Logro Uber completado');
  alert('🚗 ¡Logro Uber desbloqueado! Recarga para ver la notificación.');
}

// ============================================
// FUNCIÓN 6: Netflix - Cinéfilo
// ============================================
function logroNetflixCompletado() {
  const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
  
  const notif = {
    id: Date.now(),
    userId: 1,
    perfilId: 1,
    tipo: 'logro',
    titulo: '📺 ¡Cinéfilo!',
    mensaje: '¡Excelente! Has mantenido tu suscripción de Netflix por 6 meses. Ganaste 1 mes gratis. El crédito se aplicará automáticamente.',
    icono: '📺',
    leida: false,
    createdAt: new Date(),
    accionUrl: '/user/logros',
    data: { 
      logroId: 'logro_netflix',
      meses: 6,
      recompensa: '1 mes gratis'
    }
  };
  
  data.notificaciones.push(notif);
  localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
  
  console.log('✅ Logro Netflix completado');
  alert('📺 ¡Logro Netflix desbloqueado! Recarga para ver la notificación.');
}

// ============================================
// FUNCIÓN 7: Alerta de Gasto Alto
// ============================================
function alertaGastoAlto() {
  const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
  
  const notif = {
    id: Date.now(),
    userId: 1,
    perfilId: 1,
    tipo: 'warning',
    titulo: '⚠️ Alerta: Gasto Elevado',
    mensaje: 'Has gastado $850 de $1000 presupuestados este mes (85%). Controla tus gastos para no exceder el límite. Revisa tu historial para identificar gastos innecesarios.',
    icono: '⚠️',
    leida: false,
    createdAt: new Date(),
    accionUrl: '/user/historial',
    data: { 
      gastado: 850,
      presupuesto: 1000,
      porcentaje: 85
    }
  };
  
  data.notificaciones.push(notif);
  localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
  
  console.log('⚠️ Alerta de gasto alto creada');
  alert('⚠️ Alerta creada! Recarga para verla.');
}

// ============================================
// FUNCIÓN 8: Sugerencia de Ahorro
// ============================================
function sugerenciaAhorro() {
  const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
  
  const notif = {
    id: Date.now(),
    userId: 1,
    perfilId: 1,
    tipo: 'info',
    titulo: '💡 Sugerencia de Ahorro',
    mensaje: 'Consejo: Si reduces tus gastos en comida fuera de casa en un 20%, podrías ahorrar $120 al mes. ¿Qué tal cocinar más en casa? Pequeños cambios generan grandes resultados.',
    icono: '💡',
    leida: false,
    createdAt: new Date(),
    accionUrl: null,
    data: { 
      categoria: 'comida',
      ahorroEstimado: 120,
      porcentajeReduccion: 20
    }
  };
  
  data.notificaciones.push(notif);
  localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
  
  console.log('💡 Sugerencia de ahorro creada');
  alert('💡 Sugerencia creada! Recarga para verla.');
}

// ============================================
// FUNCIÓN 9: Crear Múltiples Notificaciones
// ============================================
function crearNotificacionesVariadas() {
  const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
  
  const notificaciones = [
    {
      id: Date.now() + 1,
      userId: 1, perfilId: 1, tipo: 'info',
      titulo: '🌅 Buenos Días',
      mensaje: '¡Hola! Empieza el día con el pie derecho: revisa tus finanzas.',
      icono: '🌅', leida: false, createdAt: new Date()
    },
    {
      id: Date.now() + 2,
      userId: 1, perfilId: 1, tipo: 'success',
      titulo: '🎉 ¡Bien Hecho!',
      mensaje: '¡Excelente control! Tus gastos están 30% por debajo del límite.',
      icono: '🎉', leida: false, createdAt: new Date()
    },
    {
      id: Date.now() + 3,
      userId: 1, perfilId: 1, tipo: 'info',
      titulo: '📚 Tip Financiero',
      mensaje: 'Regla 50/30/20: 50% necesidades, 30% deseos, 20% ahorros.',
      icono: '📚', leida: false, createdAt: new Date()
    },
    {
      id: Date.now() + 4,
      userId: 1, perfilId: 1, tipo: 'warning',
      titulo: '⏰ Recordatorio',
      mensaje: 'No olvides pagar tu tarjeta de crédito el día 15.',
      icono: '⏰', leida: false, createdAt: new Date()
    }
  ];
  
  notificaciones.forEach(n => data.notificaciones.push(n));
  localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
  
  console.log('✅ 4 notificaciones variadas creadas');
  alert('✅ 4 notificaciones creadas! Recarga para verlas.');
}

// ============================================
// FUNCIÓN 10: Ver Estadísticas
// ============================================
function verEstadisticas() {
  const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
  const misNotifs = data.notificaciones.filter(n => n.userId === 1);
  
  console.log('📊 ESTADÍSTICAS DE NOTIFICACIONES');
  console.log('=================================');
  console.log(`Total: ${misNotifs.length}`);
  console.log(`No leídas: ${misNotifs.filter(n => !n.leida).length}`);
  console.log(`Leídas: ${misNotifs.filter(n => n.leida).length}`);
  console.log('\nPor tipo:');
  console.log(`  Info: ${misNotifs.filter(n => n.tipo === 'info').length}`);
  console.log(`  Warning: ${misNotifs.filter(n => n.tipo === 'warning').length}`);
  console.log(`  Success: ${misNotifs.filter(n => n.tipo === 'success').length}`);
  console.log(`  Logro: ${misNotifs.filter(n => n.tipo === 'logro').length}`);
  console.log(`  Error: ${misNotifs.filter(n => n.tipo === 'error').length}`);
  
  console.table(misNotifs.slice(0, 10).map(n => ({
    Título: n.titulo,
    Tipo: n.tipo,
    Leída: n.leida ? '✅' : '❌',
    Fecha: new Date(n.createdAt).toLocaleString('es-ES')
  })));
}

// ============================================
// MENÚ PRINCIPAL
// ============================================
console.clear();
console.log('%c🔔 GENERADOR DE NOTIFICACIONES - FINAIZEN', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c=========================================', 'color: #667eea;');
console.log('\n📋 Funciones disponibles:\n');
console.log('%c1. crearNotificacionSimple()%c      - Notificación de prueba básica', 'color: #10b981; font-weight: bold;', 'color: #666;');
console.log('%c2. logroMcDonaldsCompletado()%c    - 🍔 Logro McDonald\'s completado', 'color: #10b981; font-weight: bold;', 'color: #666;');
console.log('%c3. logroBancoPichinchaAhorro()%c   - 🏦 Meta de ahorro Banco Pichincha', 'color: #10b981; font-weight: bold;', 'color: #666;');
console.log('%c4. logroKFCCercano()%c              - 🍗 Logro KFC al 80%', 'color: #10b981; font-weight: bold;', 'color: #666;');
console.log('%c5. logroUberCompletado()%c         - 🚗 Logro Uber desbloqueado', 'color: #10b981; font-weight: bold;', 'color: #666;');
console.log('%c6. logroNetflixCompletado()%c      - 📺 Logro Netflix completado', 'color: #10b981; font-weight: bold;', 'color: #666;');
console.log('%c7. alertaGastoAlto()%c             - ⚠️ Alerta de gasto elevado', 'color: #10b981; font-weight: bold;', 'color: #666;');
console.log('%c8. sugerenciaAhorro()%c            - 💡 Sugerencia de ahorro', 'color: #10b981; font-weight: bold;', 'color: #666;');
console.log('%c9. crearNotificacionesVariadas()%c - ✨ Crear 4 notificaciones variadas', 'color: #10b981; font-weight: bold;', 'color: #666;');
console.log('%c10. verEstadisticas()%c            - 📊 Ver estadísticas de notificaciones', 'color: #10b981; font-weight: bold;', 'color: #666;');
console.log('\n%c💡 Tip: Ejecuta cualquier función copiando su nombre en la consola', 'color: #f59e0b; font-style: italic;');
console.log('%cEjemplo: logroMcDonaldsCompletado()', 'color: #f59e0b; font-style: italic;');
console.log('\n%c🔄 Recuerda recargar la página después de crear notificaciones', 'color: #ef4444; font-weight: bold;');
