# 🚀 Guía Rápida: Completar Logros y Lanzar Avisos

## 📋 Método Rápido (Consola del Navegador)

### 1️⃣ Abrir la Consola
1. Inicia sesión en Finaizen (`maria@example.com` / `maria123`)
2. Presiona **F12** para abrir las herramientas de desarrollo
3. Ve a la pestaña **Console**

---

## ⚡ EJEMPLO SÚPER RÁPIDO

### Completar Logro McDonald's en 3 Pasos:

```javascript
// PASO 1: Crear 5 egresos de McDonald's
for (let i = 1; i <= 5; i++) {
  mockDB.egresos.push({
    id: Date.now() + i,
    perfilId: 1,
    monto: 12 + i,
    categoria: 'Comida',
    descripcion: `Combo McDonald's ${i}`,
    frecuencia: 'ocasional',
    fechaEspecifica: new Date(),
    etiquetas: ['mcdonalds'],
    createdAt: new Date()
  });
}

// PASO 2: Actualizar logros (se completa automáticamente)
mockDB.actualizarProgresosLogros(1);

// PASO 3: Guardar y recargar
mockDB.saveToLocalStorage();
location.reload();
```

**¡Eso es todo!** El sistema:
1. ✅ Detecta que completaste 5 compras de McDonald's
2. ✅ Desbloquea el logro automáticamente
3. ✅ Crea la notificación de "¡Logro Desbloqueado!"
4. ✅ Muestra el badge en la campanita 🔔

---

## 🎯 COMPLETAR LOGROS (AUTOMÁTICO)

### ⚡ Sistema Automático
El sistema detecta automáticamente cuando completas un logro y te envía la notificación. Solo crea transacciones y el resto es automático.

### Opción A: Logro de McDonald's (🍔)

```javascript
// Copia y pega esto en la consola:
// Solo crea el egreso, el sistema detecta el logro automáticamente

// 1. Crear egreso de McDonald's
mockDB.egresos.push({
  id: Date.now(),
  perfilId: 1,
  monto: 15.99,
  categoria: 'Comida',
  descripcion: 'Combo Big Mac en McDonald\'s',
  frecuencia: 'ocasional',
  fechaEspecifica: new Date(),
  etiquetas: ['mcdonalds'],
  createdAt: new Date()
});

// 2. Actualizar progreso de logros (automático)
mockDB.actualizarProgresosLogros(1);

// 3. Guardar
mockDB.saveToLocalStorage();

alert('✅ Egreso creado! El sistema detectará el logro. Recarga (F5)');
```

### 🔥 Completar Logro McDonald's de Golpe (5 compras)

```javascript
// Crear 5 egresos de McDonald's para completar el logro
for (let i = 1; i <= 5; i++) {
  mockDB.egresos.push({
    id: Date.now() + i,
    perfilId: 1,
    monto: 10 + (i * 2),
    categoria: 'Comida',
    descripcion: `Compra ${i} en McDonald's`,
    frecuencia: 'ocasional',
    fechaEspecifica: new Date(),
    etiquetas: ['mcdonalds'],
    createdAt: new Date()
  });
}

// Actualizar logros (se completará automáticamente)
mockDB.actualizarProgresosLogros(1);
mockDB.saveToLocalStorage();

alert('🍔 5 compras de McDonald\'s creadas! Logro completado. Recarga (F5)');
```

### Opción B: Logro de KFC (🍗) - 10 compras

```javascript
// Crear 10 egresos de KFC para completar el logro
for (let i = 1; i <= 10; i++) {
  mockDB.egresos.push({
    id: Date.now() + i,
    perfilId: 1,
    monto: 15 + (i * 3),
    categoria: 'Comida',
    descripcion: `Compra ${i} en KFC`,
    frecuencia: 'ocasional',
    fechaEspecifica: new Date(),
    etiquetas: ['kfc'],
    createdAt: new Date()
  });
}

mockDB.actualizarProgresosLogros(1);
mockDB.saveToLocalStorage();

alert('🍗 10 compras de KFC creadas! Logro completado. Recarga (F5)');
```

### Opción C: Meta de Ahorro Banco Pichincha (🏦) - $200

```javascript
// Crear ingreso de ahorro de $200
mockDB.ingresos.push({
  id: Date.now(),
  perfilId: 1,
  monto: 200,
  categoria: 'Ahorro',
  descripcion: 'Ahorro mensual Banco Pichincha',
  frecuencia: 'mensual',
  diaMes: 5,
  etiquetas: ['banco pichincha', 'ahorro'],
  createdAt: new Date()
});

mockDB.actualizarProgresosLogros(1);
mockDB.saveToLocalStorage();

alert('🏦 Ahorro de $200 creado! Logro completado. Recarga (F5)');
```

### Opción D: Logro de Uber (🚗) - 20 viajes

```javascript
// Crear 20 egresos de Uber
for (let i = 1; i <= 20; i++) {
  mockDB.egresos.push({
    id: Date.now() + i,
    perfilId: 1,
    monto: 5 + (i * 0.5),
    categoria: 'Transporte',
    descripcion: `Viaje ${i} en Uber`,
    frecuencia: 'ocasional',
    fechaEspecifica: new Date(),
    etiquetas: ['uber'],
    createdAt: new Date()
  });
}

mockDB.actualizarProgresosLogros(1);
mockDB.saveToLocalStorage();

alert('🚗 20 viajes de Uber creados! Logro completado. Recarga (F5)');
```

---

## 🔔 LANZAR AVISOS/NOTIFICACIONES

### Alerta de Gasto Alto (⚠️)

```javascript
const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
const userId = 1;
const perfil = data.perfiles.find(p => p.userId === userId);

const notif = {
  id: Date.now(),
  userId: userId,
  perfilId: perfil.id,
  tipo: 'warning',
  titulo: '⚠️ Alerta: Gasto Elevado',
  mensaje: 'Has gastado $850 de $1000 presupuestados este mes (85%). Controla tus gastos.',
  icono: '⚠️',
  leida: false,
  createdAt: new Date().toISOString(),
  accionUrl: '/user/historial',
  data: { gastado: 850, presupuesto: 1000, porcentaje: 85 }
};

data.notificaciones.push(notif);
localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
alert('⚠️ Alerta creada! Recarga la página (F5)');
```

### Sugerencia de Ahorro (💡)

```javascript
const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
const userId = 1;
const perfil = data.perfiles.find(p => p.userId === userId);

const notif = {
  id: Date.now(),
  userId: userId,
  perfilId: perfil.id,
  tipo: 'info',
  titulo: '💡 Sugerencia de Ahorro',
  mensaje: 'Si reduces tus gastos en comida fuera un 20%, podrías ahorrar $120 al mes. ¿Qué tal cocinar más en casa?',
  icono: '💡',
  leida: false,
  createdAt: new Date().toISOString(),
  accionUrl: null,
  data: { categoria: 'comida', ahorroEstimado: 120 }
};

data.notificaciones.push(notif);
localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
alert('💡 Sugerencia creada! Recarga la página (F5)');
```

### Mensaje de Motivación (🎉)

```javascript
const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
const userId = 1;
const perfil = data.perfiles.find(p => p.userId === userId);

const notif = {
  id: Date.now(),
  userId: userId,
  perfilId: perfil.id,
  tipo: 'success',
  titulo: '🎉 ¡Excelente Trabajo!',
  mensaje: '¡Felicitaciones! Tus gastos están 30% por debajo del presupuesto. Mantén el buen control financiero.',
  icono: '🎉',
  leida: false,
  createdAt: new Date().toISOString(),
  accionUrl: null,
  data: { tipo: 'motivacion' }
};

data.notificaciones.push(notif);
localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
alert('🎉 Mensaje de motivación creado! Recarga la página (F5)');
```

### Recordatorio de Pago (⏰)

```javascript
const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
const userId = 1;
const perfil = data.perfiles.find(p => p.userId === userId);

const notif = {
  id: Date.now(),
  userId: userId,
  perfilId: perfil.id,
  tipo: 'warning',
  titulo: '⏰ Recordatorio de Pago',
  mensaje: 'No olvides pagar tu tarjeta de crédito el día 15. Faltan 3 días.',
  icono: '⏰',
  leida: false,
  createdAt: new Date().toISOString(),
  accionUrl: null,
  data: { tipo: 'recordatorio', diasRestantes: 3 }
};

data.notificaciones.push(notif);
localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
alert('⏰ Recordatorio creado! Recarga la página (F5)');
```

---

## 🎨 Crear Múltiples Notificaciones de Golpe

```javascript
const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
const userId = 1;
const perfil = data.perfiles.find(p => p.userId === userId);

const notificaciones = [
  {
    id: Date.now() + 1,
    userId, perfilId: perfil.id, tipo: 'info',
    titulo: '🌅 Buenos Días',
    mensaje: 'Empieza el día con el pie derecho. Revisa tus finanzas.',
    icono: '🌅', leida: false, createdAt: new Date().toISOString()
  },
  {
    id: Date.now() + 2,
    userId, perfilId: perfil.id, tipo: 'success',
    titulo: '✨ Progreso Excelente',
    mensaje: 'Has ahorrado $500 este mes. ¡Sigue así!',
    icono: '✨', leida: false, createdAt: new Date().toISOString()
  },
  {
    id: Date.now() + 3,
    userId, perfilId: perfil.id, tipo: 'info',
    titulo: '📚 Tip Financiero',
    mensaje: 'Regla 50/30/20: 50% necesidades, 30% deseos, 20% ahorros.',
    icono: '📚', leida: false, createdAt: new Date().toISOString()
  },
  {
    id: Date.now() + 4,
    userId, perfilId: perfil.id, tipo: 'logro',
    titulo: '🏆 Racha de 7 Días',
    mensaje: '¡Has registrado tus gastos por 7 días seguidos!',
    icono: '🏆', leida: false, createdAt: new Date().toISOString()
  }
];

notificaciones.forEach(n => data.notificaciones.push(n));
localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
alert('✅ 4 notificaciones creadas! Recarga la página (F5)');
```

---

## 🔍 Ver Estadísticas de Notificaciones

```javascript
const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
const misNotifs = data.notificaciones.filter(n => n.userId === 1);

console.log('📊 ESTADÍSTICAS');
console.log('Total:', misNotifs.length);
console.log('No leídas:', misNotifs.filter(n => !n.leida).length);
console.log('Leídas:', misNotifs.filter(n => n.leida).length);

console.table(misNotifs.slice(0, 10).map(n => ({
  Título: n.titulo,
  Tipo: n.tipo,
  Leída: n.leida ? '✅' : '❌',
  Fecha: new Date(n.createdAt).toLocaleString('es-ES')
})));
```

---

## 🧹 Limpiar Todas las Notificaciones

```javascript
const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
data.notificaciones = data.notificaciones.filter(n => n.userId !== 1);
localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
alert('🧹 Todas las notificaciones eliminadas! Recarga la página (F5)');
```

---

## ⚡ Tips Rápidos

1. **Siempre recarga la página (F5)** después de ejecutar un script
2. La **campanita 🔔** en el header muestra el contador de notificaciones sin leer
3. Ve a **Notificaciones** en el menú lateral para ver todas
4. Los logros completados aparecen en **Logros y Recompensas**
5. Puedes combinar scripts para crear múltiples transacciones y logros

---

## 🎯 Ejemplo Completo: Simular un Día de Compras

```javascript
const data = JSON.parse(localStorage.getItem('finaizen_mockdb'));
const userId = 1;
const perfil = data.perfiles.find(p => p.userId === userId);

// 1. Desayuno en McDonald's
data.egresos.push({
  id: Date.now() + 1,
  perfilId: perfil.id,
  monto: 8.50,
  categoria: 'Comida',
  descripcion: 'Desayuno McDonald\'s',
  fecha: new Date().toISOString(),
  metodoPago: 'Tarjeta',
  etiquetas: ['mcdonalds']
});

// 2. Gasolina
data.egresos.push({
  id: Date.now() + 2,
  perfilId: perfil.id,
  monto: 45,
  categoria: 'Transporte',
  descripcion: 'Gasolina',
  fecha: new Date().toISOString(),
  metodoPago: 'Efectivo',
  etiquetas: ['gasolina']
});

// 3. Almuerzo en KFC
data.egresos.push({
  id: Date.now() + 3,
  perfilId: perfil.id,
  monto: 18.99,
  categoria: 'Comida',
  descripcion: 'Almuerzo KFC',
  fecha: new Date().toISOString(),
  metodoPago: 'Tarjeta',
  etiquetas: ['kfc']
});

// 4. Notificación de gasto diario
data.notificaciones.push({
  id: Date.now() + 4,
  userId, perfilId: perfil.id, tipo: 'info',
  titulo: '💸 Resumen del Día',
  mensaje: 'Has gastado $72.49 hoy. Comida: $27.49, Transporte: $45.',
  icono: '💸', leida: false, createdAt: new Date().toISOString()
});

localStorage.setItem('finaizen_mockdb', JSON.stringify(data));
alert('✅ Día de compras simulado! Recarga (F5)');
```

---

## 📝 Notas Importantes

- Todos los scripts asumen que estás logueado con `userId = 1` (Maria)
- Los montos están en USD (puedes cambiarlos según tu moneda)
- Las fechas se crean con `new Date().toISOString()`
- Los tipos de notificación son: `info`, `warning`, `success`, `logro`, `error`
- Recuerda **siempre recargar** la página después de ejecutar scripts

---

## 🎯 CÓMO FUNCIONA EL SISTEMA AUTOMÁTICO

### 1️⃣ Creas Transacciones
```javascript
mockDB.egresos.push({ 
  descripcion: 'Combo McDonald\'s',
  etiquetas: ['mcdonalds']
  // ... otros datos
});
```

### 2️⃣ Actualizas Logros
```javascript
mockDB.actualizarProgresosLogros(1);
```

### 3️⃣ El Sistema Detecta:
- ✅ **Progreso actualizado** → Logro avanza (ej: 3/5 compras)
- ✅ **Logro completado** → Se marca como desbloqueado
- ✅ **Notificación automática** → Se crea y aparece en la campanita
- ✅ **Badge actualizado** → Muestra contador de notificaciones sin leer

### 4️⃣ Recarga y Disfruta
```javascript
location.reload(); // O presiona F5
```

### 📊 Ver Progreso de Logros
```javascript
// Ver todos los logros y su progreso
mockDB.logros.filter(l => l.perfilId === 1).forEach(l => {
  console.log(`${l.icono} ${l.nombre}: ${l.progreso}/${l.meta} (${l.porcentajeProgreso.toFixed(0)}%)`);
  if (l.desbloqueado) console.log('   ✅ DESBLOQUEADO');
});
```

---

¡Diviértete probando el sistema! 🎉
