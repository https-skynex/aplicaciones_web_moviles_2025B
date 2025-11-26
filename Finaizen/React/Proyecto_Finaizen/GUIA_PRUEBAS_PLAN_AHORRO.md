# 🧪 Guía de Prueba del Planificador de Ahorro

## ✅ Estado Actual

**Servidor en ejecución:** `http://localhost:5174/`  
**Estado de compilación:** ✅ Sin errores  
**Persistencia:** ✅ localStorage habilitada

---

## 📋 Pasos para Probar

### 1️⃣ Acceso a la Aplicación

```
URL: http://localhost:5174/
```

Deberías ver la pantalla de login de Finaizen.

---

### 2️⃣ Iniciar Sesión

**Credenciales de prueba para usuario con planes de ejemplo:**

```
Email: maria@finanzas.com
Contraseña: 123456
```

**O con otro usuario:**

```
Email: carlos@finanzas.com
Contraseña: 123456
```

---

### 3️⃣ Navegar al Planificador de Ahorro

Una vez logueado, tienes dos opciones:

**Opción A: Desde el Menú**
- Busca en el sidebar el elemento "Plan de Ahorros"
- Click en él

**Opción B: URL Directa**
```
http://localhost:5174/user/plan-ahorro
```

---

## 🎯 Pruebas por Funcionalidad

### 📊 Prueba 1: Ver Planes Existentes
**Objetivo:** Verificar que se cargan los planes de ejemplo

**Pasos:**
1. Navega a Plan de Ahorros
2. Deberías ver 2 planes para María:
   - "Viaje a París" (67% completo)
   - "Comprar Auto Nuevo" (31% completo)
   - "Curso de Inglés Hija" (95% completo)
3. Y 1 plan para Carlos:
   - "Fondo de Emergencia" (60% completo)

**Verificar:**
- ✅ Se muestran las tarjetas con la información correcta
- ✅ Barra de progreso visual
- ✅ Montos correctos (actual/meta)
- ✅ Ícono y categoría correcto

---

### ➕ Prueba 2: Crear Nuevo Plan
**Objetivo:** Verificar que se puede crear un plan nuevo

**Pasos:**
1. Click en botón "+ Crear Plan"
2. **Paso 1 - Información:**
   - Nombre: "Laptop Nueva"
   - Objetivo: "Comprar laptop gaming para programación"
   - Categoría: "Tecnología" (o la que prefieras)
   - Click "Siguiente"
3. **Paso 2 - Metas Financieras:**
   - Monto Meta: $2,500
   - Fecha Meta: Selecciona una fecha futura (ej: 15/12/2025)
   - Observa la simulación en tiempo real
   - Click "Siguiente"
4. **Paso 3 - Configuración:**
   - Ahorro Mensual: $500 (la app debe calcular automáticamente)
   - Estrategia: "Consistente"
   - Click "Crear Plan"

**Verificar:**
- ✅ El modal tiene 3 pasos
- ✅ La simulación actualiza cuando cambias fechas/montos
- ✅ El plan se agrega a la lista
- ✅ Aparece en la posición correcta

---

### ✏️ Prueba 3: Editar Plan
**Objetivo:** Verificar edición de planes existentes

**Pasos:**
1. En una tarjeta de plan, click en icono "Editar"
2. Se abre modal con datos actuales
3. Cambia el nombre: "Viaje a Francia"
4. Cambia el objetivo con una descripción diferente
5. Click "Guardar"

**Verificar:**
- ✅ Modal muestra datos actuales
- ✅ Cambios se guardan
- ✅ Tarjeta se actualiza inmediatamente

---

### 💰 Prueba 4: Agregar Depósito
**Objetivo:** Verificar que se puede agregar dinero a un plan

**Pasos:**
1. En una tarjeta, click en "Ver Detalles"
2. Se abre modal de detalles
3. En sección "Agregar Depósito":
   - Ingresa cantidad: $500
   - Click botón "Depositar"
4. Observa que el monto actual aumenta
5. Cierra modal

**Verificar:**
- ✅ Modal de detalles se abre
- ✅ El monto actual aumenta en tiempo real
- ✅ Barra de progreso se actualiza
- ✅ Historial muestra el depósito

---

### 🏦 Prueba 5: Retirar Dinero
**Objetivo:** Verificar que se puede retirar dinero

**Pasos:**
1. En modal de detalles (del plan anterior)
2. Busca sección de retiros o usa botón de "Retirar"
3. Ingresa cantidad: $200
4. Confirma retiro

**Verificar:**
- ✅ El monto disminuye
- ✅ No puedes retirar más que lo ahorrado
- ✅ Historial se actualiza

---

### ⏸️ Prueba 6: Pausar/Reactivar Plan
**Objetivo:** Verificar estados del plan

**Pasos:**
1. En modal de detalles, click "Pausar Plan"
2. El estado cambia a "pausado"
3. Click "Reactivar Plan"
4. Vuelve a estado "activo"

**Verificar:**
- ✅ El badge de estado cambia
- ✅ Botones se actualizan
- ✅ Plan aparece/desaparece del filtro "Activos"

---

### ✅ Prueba 7: Completar Plan
**Objetivo:** Verificar que se puede marcar como completado

**Pasos:**
1. En modal de detalles, click "Completar Plan"
2. Confirma en diálogo
3. Plan pasa a estado "completado"
4. Mueve a filtro "Completados"

**Verificar:**
- ✅ El badge cambia a "Completado"
- ✅ Desaparece del filtro "Activos"
- ✅ Aparece en filtro "Completados"

---

### 🗑️ Prueba 8: Eliminar Plan
**Objetivo:** Verificar que se puede eliminar planes

**Pasos:**
1. En una tarjeta, click botón "Eliminar" (icono papelera)
2. Confirma en diálogo
3. Plan se elimina de la lista

**Verificar:**
- ✅ Aparece confirmación antes de eliminar
- ✅ Plan se remueve de la lista
- ✅ Estadísticas se actualizan

---

### 🔍 Prueba 9: Filtros
**Objetivo:** Verificar que los filtros funcionan

**Pasos:**
1. En la página principal, observa botones de filtro:
   - "Todos"
   - "Activos"
   - "Completados"
   - "Pausados"
2. Click en cada uno y verifica que filtra correctamente

**Verificar:**
- ✅ Solo muestra planes del tipo seleccionado
- ✅ El botón se destaca al estar activo
- ✅ Cantidad de planes visible cambia

---

### 📊 Prueba 10: Estadísticas
**Objetivo:** Verificar dashboard de estadísticas

**Pasos:**
1. En la página, mira la sección "Estadísticas"
2. Deberías ver:
   - Total de planes (ej: 5)
   - Planes activos (ej: 3)
   - Total ahorrado (suma de montos actuales)
   - Total en metas (suma de montos meta)
   - Porcentaje promedio
   - Planes completados

**Verificar:**
- ✅ Los números son correctos
- ✅ Se actualizan al crear/editar planes
- ✅ Las KPIs tienen sentido

---

### 💡 Prueba 11: Consejos Inteligentes
**Objetivo:** Verificar que se generan consejos

**Pasos:**
1. En la página, mira la sección "Consejos"
2. Deberías ver recomendaciones como:
   - "¡Vas muy bien! Vas completando X% en promedio"
   - Alertas de planes en peligro
   - Sugerencias de aumento de ahorro
3. Click en X para descartar un consejo

**Verificar:**
- ✅ Se muestran diferentes tipos de consejos
- ✅ Los consejos son relevantes
- ✅ Se pueden descartar

---

### 💾 Prueba 12: Persistencia (localStorage)
**Objetivo:** Verificar que los datos se guardan

**Pasos:**
1. Crea un plan nuevo
2. Agrega un depósito
3. Recarga la página: `F5`
4. Iniciar sesión nuevamente si es necesario
5. Navega a Plan de Ahorros

**Verificar:**
- ✅ El plan que creaste sigue ahí
- ✅ El depósito está guardado
- ✅ Todos los datos se mantienen

---

## 🐛 Verificación de Errores en Consola

Abre las herramientas de desarrollo (`F12`) y:

1. Ve a la pestaña **Console**
2. Deberías ver logs informativos:
   - "📊 Planes de Ahorro: X"
   - Otros logs del sistema
3. **NO deberías ver:**
   - Errores rojos (errors)
   - Warnings relacionados con componentes

---

## 📱 Verificación Responsive

**En desktop (1920x1080):**
- ✅ Grid de 3-4 columnas

**Reducir ventana a tablet (768px):**
- ✅ Grid de 2 columnas
- ✅ Modal se adapta

**Reducir a mobile (360px):**
- ✅ Grid de 1 columna
- ✅ Modal es usable

---

## 🔄 Casos de Prueba Especiales

### Caso: Plan casi completado
1. Crea plan con meta $1,000
2. Agrega depósito de $950
3. Deberías ver alerta/sugerencia

### Caso: Plan con vencimiento próximo
1. Crea plan con fecha de hoy + 7 días
2. Deberías ver advertencia de tiempo

### Caso: Múltiples planes de mismo usuario
1. Crea 5 planes diferentes
2. Verifica que filtros funcionan bien
3. Verifica que estadísticas son correctas

---

## ✅ Checklist Final

- [ ] Aplicación carga sin errores
- [ ] Se ven los 4 planes de ejemplo
- [ ] Puedo crear nuevos planes
- [ ] Puedo editar planes existentes
- [ ] Puedo agregar depósitos
- [ ] Puedo pausar/reactivar planes
- [ ] Puedo completar planes
- [ ] Puedo eliminar planes
- [ ] Filtros funcionan correctamente
- [ ] Estadísticas se calculan correctamente
- [ ] Consejos se muestran
- [ ] Datos se guardan al recargar (localStorage)
- [ ] No hay errores en consola
- [ ] Responsive en diferentes tamaños
- [ ] Menú sidebar funciona para navegar

---

## 🆘 Si encuentras problemas

### Problema: Página en blanco
**Solución:**
1. Abre consola (F12)
2. Verifica errores
3. Recarga: Ctrl+Shift+R (cache limpio)

### Problema: No ves datos
**Solución:**
1. Verifica estar logueado
2. Verifica estar en perfil de María
3. Abre DevTools → Application → localStorage
4. Busca "finaizenData"

### Problema: Componentes no cargan
**Solución:**
1. Revisa consola para import errors
2. Verifica URLs en la dirección de navegación

---

## 📞 Información de Contacto

Si necesitas ayuda con las pruebas, revisa los archivos:
- `PLAN_AHORRO_README.md` - Guía de usuario
- `PLAN_AHORRO_IMPLEMENTACION.md` - Documentación técnica
- `VERIFICACION_PLANIFICADOR_AHORRO.md` - Estado del sistema

---

**Última actualización:** 26 de Noviembre 2025  
**Versión del Sistema:** Finaizen React v1.0  
**Servidor de Desarrollo:** Activo en http://localhost:5174/
