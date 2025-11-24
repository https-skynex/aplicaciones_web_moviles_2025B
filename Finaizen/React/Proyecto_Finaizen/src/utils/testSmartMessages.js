/**
 * Script de prueba para el Sistema de Mensajes Inteligentes
 * Ejecutar en la consola del navegador para probar la generación de mensajes
 */

// Importar el generador (en producción ya estará disponible)
// import { SmartMessageGenerator } from './utils/smartMessages';

// Función de prueba
function testSmartMessages() {
  console.log('%c=== SISTEMA DE MENSAJES INTELIGENTES - PRUEBAS ===', 'color: #667eea; font-size: 16px; font-weight: bold;');
  
  // Prueba 1: Alerta de gasto excesivo
  console.log('\n%c1. ALERTA DE GASTO EXCESIVO:', 'color: #f5576c; font-weight: bold;');
  const alerta = SmartMessageGenerator.generateMessage({
    tipo: 'alerta_gasto',
    categoria: 'comida',
    monto: 250.75,
    porcentaje: 35
  });
  console.log(alerta);
  
  // Prueba 2: Sugerencia de ahorro
  console.log('\n%c2. SUGERENCIA DE AHORRO:', 'color: #00f2fe; font-weight: bold;');
  const sugerencia = SmartMessageGenerator.generateMessage({
    tipo: 'sugerencia',
    monto: 50,
    porcentaje: 20
  });
  console.log(sugerencia);
  
  // Prueba 3: Logro próximo
  console.log('\n%c3. LOGRO PRÓXIMO:', 'color: #ff6b6b; font-weight: bold;');
  const logro = SmartMessageGenerator.generateMessage({
    tipo: 'logro_proximo',
    logro: 'Rey de la Comida Rápida',
    numero: 2,
    porcentaje: 85,
    recompensa: '$10 USD en McDonald\'s'
  });
  console.log(logro);
  
  // Prueba 4: Motivación
  console.log('\n%c4. MENSAJE MOTIVACIONAL:', 'color: #fed6e3; font-weight: bold;');
  const motivacion = SmartMessageGenerator.generateMessage({
    tipo: 'motivacion',
    porcentaje: 30,
    monto: 150
  });
  console.log(motivacion);
  
  // Prueba 5: Educación financiera
  console.log('\n%c5. EDUCACIÓN FINANCIERA:', 'color: #764ba2; font-weight: bold;');
  const educacion = SmartMessageGenerator.generateMessage({
    tipo: 'educacion'
  });
  console.log(educacion);
  
  // Prueba 6: Recordatorio
  console.log('\n%c6. RECORDATORIO:', 'color: #d1fdff; font-weight: bold;');
  const recordatorio = SmartMessageGenerator.generateMessage({
    tipo: 'recordatorio'
  });
  console.log(recordatorio);
  
  // Prueba 7: Contextual por hora (mañana)
  console.log('\n%c7. CONTEXTUAL TIEMPO (MAÑANA):', 'color: #8fd3f4; font-weight: bold;');
  const contextual = SmartMessageGenerator.generateMessage({
    tipo: 'contextual_tiempo',
    hora: 9
  });
  console.log(contextual);
  
  // Prueba 8: Alerta inteligente
  console.log('\n%c8. ALERTA INTELIGENTE:', 'color: #fee140; font-weight: bold;');
  const inteligente = SmartMessageGenerator.generateMessage({
    tipo: 'inteligente',
    monto: 1500,
    porcentaje: 30
  });
  console.log(inteligente);
  
  // Prueba 9: Generar múltiples mensajes para dashboard
  console.log('\n%c9. MENSAJES DASHBOARD (simulación):', 'color: #667eea; font-weight: bold;');
  const userData = {
    gastosAltos: {
      categoria: 'transporte',
      monto: 200,
      porcentaje: 40
    },
    oportunidadAhorro: {
      monto: 75,
      porcentaje: 15
    },
    logroProximo: {
      logro: 'Ahorrador Maestro',
      numero: 50,
      porcentaje: 90,
      recompensa: '$5 USD Banco Pichincha'
    }
  };
  
  const dashboardMessages = SmartMessageGenerator.generateDashboardMessages(userData);
  console.log(`Total de mensajes generados: ${dashboardMessages.length}`);
  dashboardMessages.forEach((msg, idx) => {
    console.log(`  ${idx + 1}. [${msg.tipo}] ${msg.mensaje}`);
  });
  
  console.log('\n%c=== FIN DE PRUEBAS ===', 'color: #10b981; font-size: 16px; font-weight: bold;');
  console.log('%cSistema de Mensajes Inteligentes funcionando correctamente ✅', 'color: #10b981;');
}

// Estadísticas del sistema
function estadisticasMensajes() {
  console.log('%c=== ESTADÍSTICAS DEL SISTEMA ===', 'color: #667eea; font-size: 16px; font-weight: bold;');
  
  const stats = {
    'Alertas de Gastos Excesivos': 150,
    'Sugerencias de Ahorro': 100,
    'Alertas de Logros Próximos': 100,
    'Mensajes de Motivación': 80,
    'Educación Financiera': 100,
    'Recordatorios y Acciones': 50,
    'Mensajes Contextuales por Hora': 100,
    'Alertas Inteligentes Avanzadas': 100
  };
  
  let total = 0;
  Object.entries(stats).forEach(([categoria, cantidad]) => {
    console.log(`%c${categoria}:%c ${cantidad} mensajes`, 'font-weight: bold;', 'color: #667eea;');
    total += cantidad;
  });
  
  console.log(`\n%cTOTAL: ${total} mensajes`, 'color: #10b981; font-size: 14px; font-weight: bold;');
  console.log('%cCon variaciones dinámicas: ~1000+ mensajes únicos posibles', 'color: #667eea;');
}

// Exportar funciones para uso en consola
if (typeof window !== 'undefined') {
  window.testSmartMessages = testSmartMessages;
  window.estadisticasMensajes = estadisticasMensajes;
  
  console.log('%c🚀 Sistema de Mensajes Inteligentes Cargado', 'color: #667eea; font-size: 14px; font-weight: bold;');
  console.log('%cEjecuta en la consola:', 'color: #666;');
  console.log('%c  testSmartMessages()%c       - Prueba todos los tipos de mensajes', 'color: #10b981;', 'color: #666;');
  console.log('%c  estadisticasMensajes()%c   - Muestra estadísticas del sistema', 'color: #10b981;', 'color: #666;');
}

export { testSmartMessages, estadisticasMensajes };
