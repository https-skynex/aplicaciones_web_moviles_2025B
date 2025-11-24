# Guía Completa: Sistema de Notificaciones Inteligentes 🔔

## 📋 Índice
1. [Acceso a Notificaciones](#acceso-a-notificaciones)
2. [Generación Automática](#generación-automática)
3. [Crear Notificaciones Manualmente](#crear-notificaciones-manualmente)
4. [Ejemplos de Uso](#ejemplos-de-uso)
5. [Completar Logros](#completar-logros)
6. [Tips y Trucos](#tips-y-trucos)

---

## 🎯 Acceso a Notificaciones

### Campanita en el Dashboard
La campanita está ubicada en la **esquina superior derecha** del header del dashboard.

```
┌─────────────────────────────────────────────┐
│  ¡Hola, María! 👋               🔔 (5)      │
│  Perfil: Personal (USD)                     │
└─────────────────────────────────────────────┘
```

**Funcionalidades:**
- **Badge rojo**: Muestra cantidad de notificaciones sin leer
- **Click en campanita**: Abre dropdown con últimas notificaciones
- **Botón "Ver todas"**: Navega a página completa de notificaciones

### Página de Notificaciones Completa
**Ruta**: `/user/notificaciones`

**Acceso desde menú lateral:**
```
Dashboard
Administrador ingresos/egresos
Plan de Ahorros
Ajuste de presupuestos
Planificador de deudas
Logros y Recompensas
➡️ Notificaciones ⬅️ [NUEVA OPCIÓN]
```

**Características:**
- ✅ Filtrar por estado (todas, sin leer, leídas)
- ✅ Filtrar por tipo (alertas, info, éxito, logros)
- ✅ Marcar como leída individualmente
- ✅ Eliminar notificaciones
- ✅ Estadísticas visuales
- ✅ Ordenadas por fecha (más recientes primero)

---

## 🤖 Generación Automática

Las notificaciones se generan **automáticamente** cuando:

1. **Entras al Dashboard** (1 vez por día)
2. **El sistema analiza** tus datos financieros:
   - Ingresos y egresos del mes
   - Porcentaje de presupuesto gastado
   - Gastos por categoría
   - Progreso de logros
   - Balance actual

3. **Genera mensajes** basados en:
   - Hora del día (mañana, tarde, noche)
   - Día de la semana (lunes, viernes, domingo)
   - Estado financiero (gastando mucho, ahorrando bien)
   - Logros cercanos (80%+ completados)
   - Predicciones (proyección de gasto mensual)

### Tipos de Notificaciones Automáticas

| Tipo | Emoji | Cuándo se genera |
|------|-------|------------------|
| Contextual | 🌅 | Siempre (mensaje de bienvenida) |
| Alerta de Gastos | ⚠️ | Cuando gastas >80% del presupuesto |
| Sugerencia de Ahorro | 💡 | Cuando detecta oportunidades de ahorro |
| Logro Próximo | 🏆 | Cuando un logro está al 80%+ |
| Motivación | 🎉 | Cuando gastas <70% del presupuesto |
| Educación Financiera | 📚 | Siempre (1-2 tips) |
| Recordatorio | ⏰ | Lunes, viernes y domingos |
| Análisis Inteligente | 🤖 | Cuando detecta patrones inusuales |

---

## 🛠️ Crear Notificaciones Manualmente

### Método 1: Desde la Consola del Navegador

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Importar clases necesarias
import mockDB from './src/utils/mockDatabase';
import Notificacion from './src/models/Notificacion';

// Crear notificación simple
const notif = new Notificacion({
  userId: 1,              // ID del usuario (María = 1)
  perfilId: 1,            // ID del perfil (Personal = 1)
  tipo: 'info',           // info, warning, success, error, logro
  titulo: 'Prueba',
  mensaje: 'Este es un mensaje de prueba',
  icono: '🔔',
  leida: false
});

// Agregar a la base de datos
mockDB.notificaciones.push(notif);
mockDB.saveToLocalStorage();

console.log('✅ Notificación creada:', notif);
```

### Método 2: Crear Notificación de Logro

```javascript
// Notificación cuando completas un logro de McDonald's
const notifLogro = new Notificacion({
  userId: 1,
  perfilId: 1,
  tipo: 'logro',
  titulo: '🏆 ¡Logro Desbloqueado!',
  mensaje: '¡Felicitaciones! Has completado "Rey de la Comida Rápida". Ganaste $10 USD en cupones de McDonald\'s',
  icono: '🍔',
  leida: false,
  accionUrl: '/user/logros',  // Link a la página de logros
  data: { 
    logroId: 'logro_mcdonalds',
    recompensa: '$10 USD'
  }
});

mockDB.notificaciones.push(notifLogro);
mockDB.saveToLocalStorage();
```

### Método 3: Notificación de Banco Pichincha

```javascript
// Notificación al completar ahorro en Banco Pichincha
const notifBancoPichincha = new Notificacion({
  userId: 1,
  perfilId: 1,
  tipo: 'success',
  titulo: '💰 ¡Meta de Ahorro Alcanzada!',
  mensaje: 'Has ahorrado $200 USD. Reclama tu recompensa de $5 USD del Banco Pichincha',
  icono: '🏦',
  leida: false,
  accionUrl: '/user/logros',
  data: { 
    logroId: 'logro_banco_pichincha_ahorro',
    montoAhorrado: 200,
    recompensa: '$5 USD'
  }
});

mockDB.notificaciones.push(notifBancoPichincha);
mockDB.saveToLocalStorage();
```

### Método 4: Notificación de Alerta de Gasto

```javascript
// Alerta cuando gastas mucho
const notifAlerta = new Notificacion({
  userId: 1,
  perfilId: 1,
  tipo: 'warning',
  titulo: '⚠️ Alerta de Gastos',
  mensaje: 'Has gastado $850 de $1000 presupuestados (85%). Controla tus gastos para no exceder el límite.',
  icono: '⚠️',
  leida: false,
  data: { 
    gastado: 850,
    presupuesto: 1000,
    porcentaje: 85
  }
});

mockDB.notificaciones.push(notifAlerta);
mockDB.saveToLocalStorage();
```

---

## 📝 Ejemplos de Uso Completos

### Ejemplo 1: Completar Logro de McDonald's

**Paso 1: Ver progreso actual**
```javascript
// Obtener logro de McDonald's
const logroMcDonalds = mockDB.logros.find(l => 
  l.titulo === 'Rey de la Comida Rápida'
);

console.log(`Progreso: ${logroMcDonalds.progresoActual}/${logroMcDonalds.meta}`);
// Ejemplo: Progreso: 3/5
```

**Paso 2: Agregar una compra (egreso en McDonald's)**
```javascript
import Egreso from './src/models/Egreso';

// Crear egreso en McDonald's
const egresoMcDonalds = new Egreso({
  perfilId: 1,
  monto: 15.50,
  categoria: 'Comida',
  descripcion: 'Almuerzo en McDonald\'s',
  fecha: new Date(),
  metodoPago: 'Tarjeta',
  esRecurrente: false
});

// Agregar al perfil
mockDB.egresos.push(egresoMcDonalds);

// Incrementar progreso del logro
logroMcDonalds.incrementarProgreso(1);

// Si está completo, desbloquearlo
if (logroMcDonalds.progresoActual >= logroMcDonalds.meta) {
  logroMcDonalds.desbloquear();
  
  // Crear notificación de logro completado
  const notif = new Notificacion({
    userId: 1,
    perfilId: 1,
    tipo: 'logro',
    titulo: '🏆 ¡Logro Desbloqueado!',
    mensaje: `¡Felicitaciones! Has completado "${logroMcDonalds.titulo}". ${logroMcDonalds.recompensa}`,
    icono: logroMcDonalds.icono || '🍔',
    leida: false,
    accionUrl: '/user/logros'
  });
  
  mockDB.notificaciones.push(notif);
}

// Guardar cambios
mockDB.saveToLocalStorage();
console.log('✅ Compra registrada y logro actualizado');
```

**Paso 3: Verificar notificación**
```javascript
// Ver últimas notificaciones del usuario
const misNotificaciones = mockDB.getNotificacionesDeUsuario(1);
console.log('Mis notificaciones:', misNotificaciones);
```

### Ejemplo 2: Completar Ahorro en Banco Pichincha

**Escenario**: Usuario ahorra $200 USD

```javascript
import Ingreso from './src/models/Ingreso';

// 1. Registrar ingreso como "Ahorro"
const ingresoAhorro = new Ingreso({
  perfilId: 1,
  monto: 200,
  categoria: 'Ahorros',
  descripcion: 'Depósito en cuenta de ahorros - Banco Pichincha',
  fecha: new Date(),
  esRecurrente: false
});

mockDB.ingresos.push(ingresoAhorro);

// 2. Obtener logro de Banco Pichincha
const logroBancoPichincha = mockDB.logros.find(l => 
  l.titulo === 'Ahorrador Maestro' && l.empresa === 'Banco Pichincha'
);

// 3. Incrementar progreso (agregar monto ahorrado)
logroBancoPichincha.incrementarProgreso(200);

// 4. Verificar si completó el logro
if (logroBancoPichincha.progresoActual >= logroBancoPichincha.meta) {
  logroBancoPichincha.desbloquear();
  
  // 5. Crear notificación
  const notif = new Notificacion({
    userId: 1,
    perfilId: 1,
    tipo: 'success',
    titulo: '💰 ¡Meta de Ahorro Alcanzada!',
    mensaje: `¡Increíble! Has ahorrado $${logroBancoPichincha.meta} USD en el Banco Pichincha. Reclama tu recompensa de ${logroBancoPichincha.recompensa}`,
    icono: '🏦',
    leida: false,
    accionUrl: '/user/logros'
  });
  
  mockDB.notificaciones.push(notif);
  
  console.log('🎉 ¡Logro completado! Notificación creada');
}

mockDB.saveToLocalStorage();
```

### Ejemplo 3: Subir Comprobante y Completar Logro

**Escenario**: Usuario sube comprobante de compra en KFC

```javascript
// 1. Obtener logro de KFC
const logroKFC = mockDB.logros.find(l => 
  l.titulo.includes('KFC') || l.empresa === 'KFC'
);

// 2. Agregar comprobante
const urlComprobante = 'https://ejemplo.com/recibo-kfc-123.jpg';
logroKFC.agregarComprobante(urlComprobante);

// 3. Incrementar progreso
logroKFC.incrementarProgreso(1);

// 4. Verificar completitud
if (logroKFC.progresoActual >= logroKFC.meta) {
  logroKFC.desbloquear();
  
  // Notificación de logro completado
  const notif = new Notificacion({
    userId: 1,
    perfilId: 1,
    tipo: 'logro',
    titulo: '🍗 ¡Logro KFC Completado!',
    mensaje: `¡Excelente! Completaste "${logroKFC.titulo}". ${logroKFC.recompensa}`,
    icono: '🍗',
    leida: false,
    accionUrl: '/user/logros'
  });
  
  mockDB.notificaciones.push(notif);
} else {
  // Notificación de progreso
  const falta = logroKFC.meta - logroKFC.progresoActual;
  const notif = new Notificacion({
    userId: 1,
    perfilId: 1,
    tipo: 'info',
    titulo: '🍗 Comprobante Verificado',
    mensaje: `Comprobante de KFC aceptado. Solo te faltan ${falta} compras para desbloquear "${logroKFC.titulo}"`,
    icono: '✅',
    leida: false
  });
  
  mockDB.notificaciones.push(notif);
}

mockDB.saveToLocalStorage();
console.log('✅ Comprobante agregado y logro actualizado');
```

---

## 🎮 Completar Logros: Paso a Paso

### Logros Disponibles por Empresa

#### 🍔 McDonald's - "Rey de la Comida Rápida"
- **Meta**: 5 compras
- **Recompensa**: $10 USD en cupones
- **Cómo completar**:
  ```javascript
  // Hacer 5 compras en McDonald's
  for (let i = 0; i < 5; i++) {
    const egreso = new Egreso({
      perfilId: 1,
      monto: 12 + Math.random() * 8, // $12-$20
      categoria: 'Comida',
      descripcion: `Compra ${i+1} en McDonald's`,
      fecha: new Date()
    });
    mockDB.egresos.push(egreso);
    
    const logro = mockDB.logros.find(l => l.empresa === 'McDonald\'s');
    logro.incrementarProgreso(1);
  }
  
  // Desbloquear
  const logro = mockDB.logros.find(l => l.empresa === 'McDonald\'s');
  logro.desbloquear();
  
  // Notificar
  const notif = new Notificacion({
    userId: 1, perfilId: 1, tipo: 'logro',
    titulo: '🍔 ¡Logro McDonald\'s!',
    mensaje: 'Has completado 5 compras. ¡$10 USD en cupones!',
    icono: '🍔', leida: false
  });
  mockDB.notificaciones.push(notif);
  mockDB.saveToLocalStorage();
  ```

#### 🏦 Banco Pichincha - "Ahorrador Maestro"
- **Meta**: Ahorrar $200 USD
- **Recompensa**: $5 USD
- **Cómo completar**:
  ```javascript
  const ingreso = new Ingreso({
    perfilId: 1,
    monto: 200,
    categoria: 'Ahorros',
    descripcion: 'Depósito en cuenta de ahorros',
    fecha: new Date()
  });
  mockDB.ingresos.push(ingreso);
  
  const logro = mockDB.logros.find(l => 
    l.empresa === 'Banco Pichincha' && l.titulo.includes('Ahorrador')
  );
  logro.incrementarProgreso(200);
  logro.desbloquear();
  
  const notif = new Notificacion({
    userId: 1, perfilId: 1, tipo: 'success',
    titulo: '💰 ¡Meta de Ahorro!',
    mensaje: '¡$200 ahorrados! Gana $5 USD del Banco Pichincha',
    icono: '🏦', leida: false
  });
  mockDB.notificaciones.push(notif);
  mockDB.saveToLocalStorage();
  ```

#### 🍗 KFC - "Amante del Pollo"
- **Meta**: 10 compras
- **Recompensa**: Combo Familiar gratis ($25 USD)
- **Cómo completar**:
  ```javascript
  const logro = mockDB.logros.find(l => l.empresa === 'KFC');
  
  for (let i = 0; i < 10; i++) {
    const egreso = new Egreso({
      perfilId: 1,
      monto: 15 + Math.random() * 10,
      categoria: 'Comida',
      descripcion: `Compra ${i+1} en KFC`,
      fecha: new Date()
    });
    mockDB.egresos.push(egreso);
    logro.incrementarProgreso(1);
  }
  
  logro.desbloquear();
  
  const notif = new Notificacion({
    userId: 1, perfilId: 1, tipo: 'logro',
    titulo: '🍗 ¡Logro KFC Desbloqueado!',
    mensaje: '10 compras completadas. ¡Combo Familiar gratis!',
    icono: '🍗', leida: false
  });
  mockDB.notificaciones.push(notif);
  mockDB.saveToLocalStorage();
  ```

#### 🚗 Uber - "Viajero Frecuente"
- **Meta**: 20 viajes
- **Recompensa**: $15 USD en créditos
- **Cómo completar**:
  ```javascript
  const logro = mockDB.logros.find(l => l.empresa === 'Uber');
  
  for (let i = 0; i < 20; i++) {
    const egreso = new Egreso({
      perfilId: 1,
      monto: 5 + Math.random() * 10,
      categoria: 'Transporte',
      descripcion: `Viaje ${i+1} en Uber`,
      fecha: new Date()
    });
    mockDB.egresos.push(egreso);
    logro.incrementarProgreso(1);
  }
  
  logro.desbloquear();
  mockDB.saveToLocalStorage();
  ```

#### 📺 Netflix - "Cinéfilo"
- **Meta**: 6 meses de suscripción
- **Recompensa**: 1 mes gratis
- **Cómo completar**:
  ```javascript
  const logro = mockDB.logros.find(l => l.empresa === 'Netflix');
  
  for (let i = 0; i < 6; i++) {
    const egreso = new Egreso({
      perfilId: 1,
      monto: 11.99,
      categoria: 'Entretenimiento',
      descripcion: `Suscripción Netflix - Mes ${i+1}`,
      fecha: new Date(2025, i, 1) // Cada mes
    });
    mockDB.egresos.push(egreso);
    logro.incrementarProgreso(1);
  }
  
  logro.desbloquear();
  mockDB.saveToLocalStorage();
  ```

---

## 💡 Tips y Trucos

### Ver Todas las Notificaciones del Usuario

```javascript
// En la consola del navegador
const misNotifs = mockDB.getNotificacionesDeUsuario(1);
console.table(misNotifs.map(n => ({
  Título: n.titulo,
  Mensaje: n.mensaje.substring(0, 50) + '...',
  Tipo: n.tipo,
  Leída: n.leida ? '✅' : '❌',
  Fecha: new Date(n.createdAt).toLocaleString('es-ES')
})));
```

### Marcar Todas como Leídas

```javascript
mockDB.notificaciones.forEach(n => {
  if (n.userId === 1 && !n.leida) {
    n.marcarComoLeida();
  }
});
mockDB.saveToLocalStorage();
console.log('✅ Todas las notificaciones marcadas como leídas');
```

### Eliminar Notificaciones Antiguas

```javascript
// Eliminar notificaciones de más de 7 días
const hace7Dias = new Date();
hace7Dias.setDate(hace7Dias.getDate() - 7);

mockDB.notificaciones = mockDB.notificaciones.filter(n => 
  n.userId !== 1 || n.createdAt > hace7Dias
);

mockDB.saveToLocalStorage();
console.log('✅ Notificaciones antiguas eliminadas');
```

### Crear Notificación Personalizada

```javascript
// Función helper para crear notificaciones rápidamente
function crearNotificacion(titulo, mensaje, tipo = 'info', icono = '🔔') {
  const notif = new Notificacion({
    userId: 1,
    perfilId: 1,
    tipo: tipo,
    titulo: titulo,
    mensaje: mensaje,
    icono: icono,
    leida: false
  });
  
  mockDB.notificaciones.push(notif);
  mockDB.saveToLocalStorage();
  
  console.log('✅ Notificación creada:', notif.titulo);
  return notif;
}

// Uso:
crearNotificacion(
  '🎯 Nueva Meta',
  'Has establecido una meta de ahorro de $500',
  'info',
  '🎯'
);
```

### Simular Notificaciones de Varios Días

```javascript
// Crear notificaciones con fechas diferentes
const tiposNotif = [
  { titulo: 'Bienvenida', mensaje: 'Bienvenido a Finaizen', tipo: 'info', dias: -5 },
  { titulo: 'Gasto Alto', mensaje: 'Gastos elevados detectados', tipo: 'warning', dias: -3 },
  { titulo: 'Logro Cercano', mensaje: 'Cerca de completar logro', tipo: 'logro', dias: -1 },
  { titulo: 'Meta Alcanzada', mensaje: '¡Felicitaciones!', tipo: 'success', dias: 0 }
];

tiposNotif.forEach(({ titulo, mensaje, tipo, dias }) => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  
  const notif = new Notificacion({
    userId: 1,
    perfilId: 1,
    tipo: tipo,
    titulo: titulo,
    mensaje: mensaje,
    icono: '🔔',
    leida: false
  });
  
  notif.createdAt = fecha; // Modificar fecha manualmente
  mockDB.notificaciones.push(notif);
});

mockDB.saveToLocalStorage();
console.log('✅ Notificaciones de varios días creadas');
```

---

## 🚀 Atajos de Teclado

En la página de notificaciones (futuro):
- `Ctrl + A`: Seleccionar todas
- `Ctrl + R`: Marcar todas como leídas
- `Delete`: Eliminar seleccionadas

---

## 📊 Estadísticas

Ver estadísticas de notificaciones:

```javascript
const stats = {
  total: mockDB.notificaciones.filter(n => n.userId === 1).length,
  noLeidas: mockDB.notificaciones.filter(n => n.userId === 1 && !n.leida).length,
  porTipo: {}
};

['info', 'warning', 'success', 'error', 'logro'].forEach(tipo => {
  stats.porTipo[tipo] = mockDB.notificaciones.filter(n => 
    n.userId === 1 && n.tipo === tipo
  ).length;
});

console.table(stats);
```

---

## 🎉 ¡Listo!

Ahora tienes acceso completo al sistema de notificaciones inteligentes:
- ✅ Página de notificaciones en `/user/notificaciones`
- ✅ Campanita en el dashboard
- ✅ Ejemplos de cómo crear notificaciones
- ✅ Guía para completar logros
- ✅ Tips y trucos útiles

**¡Disfruta gestionando tus notificaciones financieras!** 🚀
logroMcDonaldsCompletado()  // 🍔 Desbloquea logro de McDonald's
logroKFCCercano()            // 🍗 Logro KFC al 80%
alertaGastoAlto()            // ⚠️ Alerta de gastos
crearNotificacionesVariadas() // ✨ Crea 4 notificaciones a la vez
verEstadisticas()            // 📊 Muestra estadísticas