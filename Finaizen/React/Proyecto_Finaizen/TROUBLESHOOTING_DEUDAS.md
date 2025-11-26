# 🔧 Troubleshooting - Planificador de Deudas

## 🚨 Problemas Comunes y Soluciones

### 1️⃣ "Página no carga / Ruta no encontrada"

**Síntomas:**
- Error 404 al navegar a `/user/plan-deuda`
- Ruta no existe

**Soluciones:**
```bash
# 1. Verifica que la ruta está en App.jsx:
# Debe tener: <Route path="plan-deuda" element={<PlanDeuda />} />

# 2. Recarga el módulo:
npm run build

# 3. Si aún no funciona, reinicia el servidor:
npm run dev

# 4. Limpia el navegador:
# Abre DevTools (F12) → Application → Clear All
```

**Verificación Manual:**
```javascript
// En DevTools Console:
import("./pages/User/PlanDeuda/PlanDeuda.jsx")
  .then(() => console.log("✅ Componente cargado"))
  .catch(e => console.error("❌", e))
```

---

### 2️⃣ "Botón 'Agregar Deuda' no funciona / Modal no abre"

**Síntomas:**
- Click sin respuesta
- Modal no aparece
- Error en consola

**Soluciones:**
```javascript
// En DevTools Console, verifica el estado:
console.log("showModal state:", showModal)

// Verifica que el mock database está disponible:
console.log("mockDatabase:", mockDatabase)
```

**Pasos:**
1. Abre DevTools (F12)
2. Click en el botón
3. Verifica errors en Console
4. Si dice "Cannot read property 'crearPlanDeuda'", falta import de mockDatabase
5. Busca en `PlanDeuda.jsx` y verifica:
   ```javascript
   import mockDatabase from '../../utils/mockDatabase'
   ```

---

### 3️⃣ "Datos no se guardan / Se pierden al recargar"

**Síntomas:**
- Creo deuda y desaparece al F5
- localStorage muestra vacío

**Soluciones:**
```bash
# 1. Verifica localStorage en DevTools:
# F12 → Application → Storage → Local Storage → localhost:5174

# 2. Verifica el patrón de guardado:
# Debe haber entrada: "mockDatabase_Finaizen"

# 3. Si está vacío, limpia y reinicia:
# F12 → Console:
localStorage.clear()
location.reload()

# 4. Si sigue sin funcionar, verifica en mockDatabase.js:
# Debe tener: saveToLocalStorage() y loadFromLocalStorage()
```

**Test Manual:**
```javascript
// En DevTools Console:
const data = JSON.parse(localStorage.getItem('mockDatabase_Finaizen'))
console.log("Planesdeuda guardados:", data.planesDeuda)
```

---

### 4️⃣ "Pagos no se registran / Progreso no actualiza"

**Síntomas:**
- Hago click en "Confirmar Pago"
- Nada sucede
- Progreso sigue igual

**Soluciones:**
```javascript
// Verifica error en consola (F12)
// Busca errores como:
// "agregarPagoPlan is not a function"
// "Cannot read property 'montoPagado'"

// En mockDatabase.js verifica:
agregarPagoPlan(planId, monto, descripcion = '') {
  // Debe estar definido correctamente
}
```

**Pasos para Debuggear:**
1. Abre DevTools → Console
2. Ejecuta:
   ```javascript
   mockDatabase.getPlanesDePerfil_Deuda('user-id').forEach(plan => {
     console.log(`${plan.nombre}: $${plan.montoPagado}/${plan.montoDeuda}`)
   })
   ```
3. Agrega un pago
4. Repite el comando
5. Verifica que `montoPagado` aumentó

---

### 5️⃣ "CSS Modules no funcionan / Estilos rotos"

**Síntomas:**
- Componentes no tienen estilos
- Colores están mal
- Layout está roto

**Soluciones:**
```bash
# 1. Verifica que los archivos .module.css existen:
ls -la src/components/cards/DeudaCard/
# Debe ver: DeudaCard.module.css

# 2. Verifica import en el componente:
# import styles from './DeudaCard.module.css'

# 3. Reconstruye el proyecto:
npm run build

# 4. Limpia caché del navegador:
# DevTools → Settings → Cache → Disable cache (mientras DevTools abierto)
```

**Busca Errores Tipográficos:**
- `className={styles.deudaCard}` ← Correcto
- `className="deudaCard"` ← ❌ Incorrecto (sin styles.)
- `className={styles.'deuda-card'}` ← ❌ Incorrecto (usar camelCase)

---

### 6️⃣ "Modal no se cierra / Queda atrapado"

**Síntomas:**
- Click en botón cerrar no funciona
- Modal permanece abierto
- Fondo bloqueado

**Soluciones:**
```javascript
// Verifica en DevTools:
console.log("showModal:", showModal)
console.log("showDetails:", showDetails)

// Si está true pero no debería:
// Ejecuta en consola (emergencia):
localStorage.removeItem('mockDatabase_Finaizen')
location.reload()
```

**Causas Posibles:**
- setShowModal o setShowDetails no está siendo llamado
- Error dentro del modal evita que se cierre
- Estado corrupto en React

---

### 7️⃣ "Filtros no funcionan / Deudas no se filtran"

**Síntomas:**
- Hago click en "Activas" y sigue mostrando todas
- Los números de contadores están mal

**Soluciones:**
```javascript
// En DevTools Console:
const deudas = mockDatabase.getPlanesDePerfil_Deuda('user-id')
console.log("Total:", deudas.length)
console.log("Activas:", deudas.filter(d => d.estado === 'ACTIVA').length)
console.log("Completadas:", deudas.filter(d => d.estado === 'COMPLETADA').length)
```

**Verifica en PlanDeuda.jsx:**
- La variable `filtro` debe cambiar al hacer click
- `useMemo` debe recalcular las deudas filtradas
- El grid debe renderizar las deudas del array filtrado

---

### 8️⃣ "Consejosno aparecen / ConsejoDeuda está vacío"

**Síntomas:**
- El grid de consejos está vacío
- No hay tarjetas de consejo

**Soluciones:**
```javascript
// Verifica que generarConsejosDeuda funciona:
const deuda = mockDatabase.obtenerPlanDeuda('deuda-id')
const consejos = mockDatabase.generarConsejosDeuda(deuda.id)
console.log("Consejos:", consejos)
```

**Causas:**
- No hay deudas que generen consejos
- La función `generarConsejosDeuda` no está retornando datos
- El array de consejos está vacío pero no se oculta el componente

**Fix:**
```javascript
// En PlanDeuda.jsx, solo muestra si hay consejos:
{consejos.length > 0 && <ConsejoDeuda consejos={consejos} />}
```

---

### 9️⃣ "Estadísticas muestran números incorrectos"

**Síntomas:**
- Total Deudas no coincide
- Progreso promedio está mal
- Dinero totales incorrectos

**Soluciones:**
```javascript
// Verifica manualmente:
const stats = mockDatabase.obtenerEstadisticasDeuda('user-id')
console.log(JSON.stringify(stats, null, 2))

// Verifica cada métrica:
console.log("Total deudas:", stats.totalDeudas)
console.log("Total deuda:", stats.totalDeuda)
console.log("Total pagado:", stats.totalPagado)
```

**Causas Posibles:**
- Un pago no se registró correctamente
- Una deuda tiene estado incorrecto
- El cálculo de interesse está mal

**Recalcular:**
```bash
npm run build
# Si sigue mal, resetea datos:
# DevTools → Application → Clear All → Recarga
```

---

### 🔟 "Error: 'Cannot read property X of undefined'"

**Síntomas:**
- Error específico en consola
- Página crash o blanca

**Pasos Generales:**
```javascript
// En DevTools, busca la línea de error
// Ejemplo: "Cannot read property 'nombre' of undefined"

// Significa que intentaste acceder a .nombre pero el objeto es undefined

// Debug:
console.log("El objeto es:", objeto)
// Si es undefined, verifica:
// 1. Se pasó correctamente como prop?
// 2. Se inicializó en estado?
// 3. Se desestructuró correctamente?
```

**Solución Rápida:**
```javascript
// Agrega validación defensiva:
const nombre = deuda?.nombre || 'Sin nombre'
// En lugar de:
const nombre = deuda.nombre // ❌ Puede fallar
```

---

## 🛠️ Debug Avanzado

### Verificar Toda la Base de Datos

```javascript
// En DevTools Console:
const db = JSON.parse(localStorage.getItem('mockDatabase_Finaizen'))
console.table(db.planesDeuda)
```

### Simular Agregar Deuda

```javascript
mockDatabase.crearPlanDeuda({
  perfilId: 'user-id',
  nombre: 'Test Deuda',
  montoDeuda: 1000,
  tasaInteres: 10,
  acreedor: 'Test Bank'
})
location.reload()
```

### Limpiar Datos Problematicos

```javascript
// Opción 1: Limpiar todo
localStorage.clear()
location.reload()

// Opción 2: Mantener otros datos
const currentDb = JSON.parse(localStorage.getItem('mockDatabase_Finaizen'))
currentDb.planesDeuda = []
localStorage.setItem('mockDatabase_Finaizen', JSON.stringify(currentDb))
location.reload()
```

---

## 📋 Checklist de Debugging

Cuando algo no funcione:

1. ✅ Abre DevTools (F12)
2. ✅ Mira la pestaña Console
3. ✅ Busca errores rojos
4. ✅ Copia el error completo
5. ✅ Busca el archivo donde ocurre
6. ✅ Verifica línea de código
7. ✅ Ejecuta comandos en consola para verifyar
8. ✅ Si no hay errores, el problema es lógico
9. ✅ Usa console.log() para debuggear
10. ✅ Recarga o resetea si es necesario

---

## 📞 Contacto de Soporte

Si los troubleshooting anteriores no funcionan:

1. **Documente el error:**
   - Screenshot del error
   - Pasos exactos para reproducir
   - Navegador y versión
   - Consola completa (copy-paste)

2. **Describa el contexto:**
   - ¿Qué intenta hacer?
   - ¿Cuándo empezó a fallar?
   - ¿Cambió algo recientemente?

3. **Proporcione evidencia:**
   - localStorage contents (console: localStorage)
   - Estado de componentes (React DevTools)
   - Red requests (DevTools Network tab)

---

**Última Actualización:** 26 de Noviembre 2025
**Versión:** 1.0
