# 📝 Guía: Editar Logros Manualmente (Sin Consola)

## 🎯 Objetivo
Completar logros editando directamente el archivo `mockDatabase.js` y que el sistema genere la notificación automáticamente.

---

## 📂 Paso 1: Abrir el Archivo

Abre: `src/utils/mockDatabase.js`

---

## 🍔 Ejemplo 1: Completar Logro de McDonald's

### 1️⃣ Busca la sección de EGRESOS (línea ~360)

```javascript
// =====================================================
// EGRESOS (Perfil de María - Personal)
// =====================================================

const egreso1 = new Egreso({
  id: 1,
  perfilId: perfilMaria.id,
  monto: 500,
  descripcion: 'Alquiler',
  // ...
});
```

### 2️⃣ Agrega NUEVOS egresos de McDonald's al final de la sección

```javascript
// AGREGAR ESTOS 5 EGRESOS DE MCDONALD'S
const egresoMcD1 = new Egreso({
  id: 100,  // ID único
  perfilId: perfilMaria.id,
  monto: 12.50,
  descripcion: 'Combo Big Mac McDonald\'s',
  categoria: 'Comida',
  frecuencia: 'ocasional',
  fechaEspecifica: new Date(),
  etiquetas: ['mcdonalds'],
  createdAt: new Date()
});

const egresoMcD2 = new Egreso({
  id: 101,
  perfilId: perfilMaria.id,
  monto: 15.99,
  descripcion: 'McFlurry y papas McDonald\'s',
  categoria: 'Comida',
  frecuencia: 'ocasional',
  fechaEspecifica: new Date(),
  etiquetas: ['mcdonalds'],
  createdAt: new Date()
});

const egresoMcD3 = new Egreso({
  id: 102,
  perfilId: perfilMaria.id,
  monto: 8.50,
  descripcion: 'Desayuno McDonald\'s',
  categoria: 'Comida',
  frecuencia: 'ocasional',
  fechaEspecifica: new Date(),
  etiquetas: ['mcdonalds'],
  createdAt: new Date()
});

const egresoMcD4 = new Egreso({
  id: 103,
  perfilId: perfilMaria.id,
  monto: 18.99,
  descripcion: 'Combo para 2 McDonald\'s',
  categoria: 'Comida',
  frecuencia: 'ocasional',
  fechaEspecifica: new Date(),
  etiquetas: ['mcdonalds'],
  createdAt: new Date()
});

const egresoMcD5 = new Egreso({
  id: 104,
  perfilId: perfilMaria.id,
  monto: 10.50,
  descripcion: 'McNuggets McDonald\'s',
  categoria: 'Comida',
  frecuencia: 'ocasional',
  fechaEspecifica: new Date(),
  etiquetas: ['mcdonalds'],
  createdAt: new Date()
});
```

### 3️⃣ Agrégalos al array (busca donde dice `this.egresos.push(...)`)

```javascript
this.egresos.push(egreso1, egreso2, egreso3, egreso4, egreso5, egreso6,
  egresoMcD1, egresoMcD2, egresoMcD3, egresoMcD4, egresoMcD5);  // ← AGREGAR AQUÍ
```

### 4️⃣ Guardar y Recargar

1. **Guarda el archivo** (`Ctrl + S`)
2. **Borra el localStorage**: Abre la consola (F12) y ejecuta:
   ```javascript
   localStorage.removeItem('finaizen_mockdb');
   location.reload();
   ```
3. **Inicia sesión** (`maria@example.com` / `maria123`)
4. **¡La notificación aparecerá automáticamente!** 🔔

---

## 🍗 Ejemplo 2: Completar Logro de KFC (10 compras)

### Agregar 10 egresos de KFC:

```javascript
// Agregar después de los egresos existentes
const egresoKFC1 = new Egreso({
  id: 110,
  perfilId: perfilMaria.id,
  monto: 15.50,
  descripcion: 'Combo KFC',
  categoria: 'Comida',
  frecuencia: 'ocasional',
  fechaEspecifica: new Date(),
  etiquetas: ['kfc'],
  createdAt: new Date()
});

// Repetir para egresoKFC2, egresoKFC3... hasta egresoKFC10
// Cambiar id: 111, 112, 113... 119
// Cambiar descripción: 'Bucket KFC', 'Popcorn KFC', etc.
```

Luego agregar al push:
```javascript
this.egresos.push(egreso1, egreso2, ..., 
  egresoKFC1, egresoKFC2, egresoKFC3, egresoKFC4, egresoKFC5,
  egresoKFC6, egresoKFC7, egresoKFC8, egresoKFC9, egresoKFC10);
```

---

## 🏦 Ejemplo 3: Meta de Ahorro Banco Pichincha ($200)

### 1️⃣ Busca la sección de INGRESOS

### 2️⃣ Agrega un ingreso de ahorro:

```javascript
const ingresoPichincha = new Ingreso({
  id: 10,
  perfilId: perfilMaria.id,
  monto: 200,
  descripcion: 'Ahorro Banco Pichincha',
  categoria: 'Ahorro',
  frecuencia: 'mensual',
  diaMes: 15,
  etiquetas: ['banco pichincha', 'ahorro'],
  createdAt: new Date()
});
```

### 3️⃣ Agrégalo al array:

```javascript
this.ingresos.push(ingreso1, ingreso2, ingreso3, ingresoPichincha);
perfilMaria.agregarIngreso(ingresoPichincha.id);
```

---

## 🚗 Ejemplo 4: Logro de Uber (20 viajes)

```javascript
// Crear 20 egresos de Uber (ids: 200-219)
const egresoUber1 = new Egreso({
  id: 200,
  perfilId: perfilMaria.id,
  monto: 5.50,
  descripcion: 'Viaje Uber a casa',
  categoria: 'Transporte',
  frecuencia: 'ocasional',
  fechaEspecifica: new Date(),
  etiquetas: ['uber'],
  createdAt: new Date()
});

// Repetir 20 veces cambiando id y descripción
// egresoUber2, egresoUber3... hasta egresoUber20
```

---

## 📺 Ejemplo 5: Logro Netflix (6 meses de suscripción)

```javascript
// Netflix ya existe en los datos, solo necesitas verificar
// que haya 6 egresos mensuales de Netflix

// Busca el egreso de Netflix existente (id: 2)
const egreso2 = new Egreso({
  id: 2,
  perfilId: perfilMaria.id,
  monto: 15.99,
  descripcion: 'Netflix',
  categoria: 'Suscripciones',
  clasificacionIA: 'Suscripciones',
  frecuencia: 'mensual',
  diaMes: 10,
  createdAt: new Date()
});

// Este ya existe, solo asegúrate de tener historial de 6 meses
// en la sección HISTORIAL
```

---

## ⚙️ MÉTODO ALTERNATIVO: Editar Logro Directamente

### Opción Rápida: Completar el logro manualmente

Busca la sección de LOGROS (~línea 580):

```javascript
LOGROS_PREDEFINIDOS.forEach(logroTemplate => {
  const logro = new Logro({
    ...logroTemplate,
    perfilId: perfilMaria.id
  });

  // AGREGAR ESTO PARA COMPLETAR EL LOGRO DE MCDONALD'S:
  if (logroTemplate.id === 'logro_mcdonalds_5') {
    logro.progreso = 5;           // ← Cambiar de 0 a 5
    logro.desbloqueado = true;    // ← Cambiar a true
    logro.fechaDesbloqueo = new Date();  // ← Agregar fecha
  }

  this.logros.push(logro);
  perfilMaria.agregarLogro(logro.id);
});
```

---

## 🎯 Resumen del Proceso

### Método 1: Agregar Transacciones (Recomendado)
1. Agregar egresos/ingresos con `etiquetas: ['mcdonalds']`
2. Borrar localStorage
3. Recargar página
4. **Sistema detecta y notifica automáticamente** ✅

### Método 2: Editar Logro Directamente (Rápido)
1. Buscar el logro en la sección LOGROS
2. Cambiar `progreso`, `desbloqueado`, `fechaDesbloqueo`
3. Borrar localStorage
4. Recargar página
5. **Sistema crea notificación automáticamente** ✅

---

## 💡 Tips Importantes

### ✅ Siempre usar etiquetas correctas:
- McDonald's: `etiquetas: ['mcdonalds']`
- KFC: `etiquetas: ['kfc']`
- Uber: `etiquetas: ['uber']`
- Netflix: `categoria: 'Suscripciones', descripcion: 'Netflix'`
- Banco Pichincha: `etiquetas: ['banco pichincha', 'ahorro']`

### ✅ IDs únicos:
Cada transacción debe tener un ID único. Usa números altos (100+) para evitar conflictos.

### ✅ Borrar localStorage:
Después de editar el archivo, siempre borra el localStorage para que se carguen los nuevos datos:
```javascript
localStorage.removeItem('finaizen_mockdb');
location.reload();
```

### ✅ Verificar logros:
Después de recargar, ve a **Logros y Recompensas** para ver el progreso.

---

## 🔍 Ver si Funcionó

### En la consola (F12):
```javascript
// Ver progreso de logros
mockDB.logros.filter(l => l.perfilId === 1).forEach(l => {
  console.log(`${l.icono} ${l.nombre}: ${l.progreso}/${l.meta}`);
  if (l.desbloqueado) console.log('  ✅ DESBLOQUEADO');
});

// Ver notificaciones
mockDB.getNotificacionesDeUsuario(1).forEach(n => {
  console.log(`${n.icono} ${n.titulo}: ${n.mensaje}`);
});
```

---

## 📋 Checklist Final

- [ ] Abrí `src/utils/mockDatabase.js`
- [ ] Agregué las transacciones nuevas
- [ ] Usé etiquetas correctas (`['mcdonalds']`, `['kfc']`, etc.)
- [ ] IDs son únicos (100+)
- [ ] Agregué al `this.egresos.push(...)` o `this.ingresos.push(...)`
- [ ] Guardé el archivo (`Ctrl + S`)
- [ ] Borré localStorage: `localStorage.removeItem('finaizen_mockdb')`
- [ ] Recargué la página: `location.reload()`
- [ ] Inicié sesión: `maria@example.com` / `maria123`
- [ ] Vi la campanita 🔔 con el badge
- [ ] Revisé la notificación de logro completado

¡Listo! 🎉
