# ✅ Checklist de Pruebas - Planificador de Deudas

## 🔧 Verificación Técnica

- [ ] Aplicación compila sin errores (npm run build)
- [ ] No hay advertencias críticas
- [ ] localStorage está disponible
- [ ] AuthContext funciona correctamente
- [ ] Rutas están registradas en App.jsx

---

## 🚀 Pruebas de Acceso

- [ ] Puedo navegar a `/user/plan-deuda`
- [ ] La página carga correctamente
- [ ] El encabezado se muestra
- [ ] Los botones responden
- [ ] No hay errores en consola

---

## ➕ Crear Deuda

### Paso 1: Información Básica
- [ ] Modal abre al click "Agregar Deuda"
- [ ] Campo "Nombre" acepta texto
- [ ] Campo "Acreedor" es obligatorio
- [ ] Categoría tiene opciones disponibles
- [ ] Número de Contrato (opcional) funciona
- [ ] Descripción (opcional) funciona
- [ ] Preview se actualiza con datos
- [ ] Botón "Siguiente" funciona
- [ ] Puedo volver atrás si quiero

### Paso 2: Financiero
- [ ] Campo "Monto Total" acepta números
- [ ] Campo "Tasa de Interés" es opcional
- [ ] Selector de fecha funciona
- [ ] Simulación se calcula correctamente
- [ ] Botón "Siguiente" funciona
- [ ] Puedo volver al Paso 1

### Paso 3: Configuración
- [ ] Campo "Cuota Mensual" se valida
- [ ] Prioridad tiene 3 opciones (Normal, Alta, Urgente)
- [ ] Estrategia muestra 4 opciones
- [ ] Toggle de Notificaciones funciona
- [ ] Tiempo estimado se calcula
- [ ] Botón "Crear Deuda" crea la deuda
- [ ] Modal se cierra después

### Post-Creación
- [ ] Deuda aparece en la grid
- [ ] DeudaCard muestra todos los datos correctamente
- [ ] Progreso comienza en 0%
- [ ] Toast de confirmación aparece
- [ ] localStorage se actualiza

---

## 👁️ Ver Detalles

- [ ] Click en "Ver Detalles" abre modal
- [ ] Encabezado muestra información correcta
- [ ] Barra de progreso se muestra
- [ ] Las 6 tarjetas financieras muestran datos
- [ ] Configuración se muestra correctamente
- [ ] Historial de pagos aparece (si hay)
- [ ] Modal se cierra con botón "Cerrar"

---

## 💳 Realizar Pagos

### Agregar Pago
- [ ] Campo de monto acepta números
- [ ] Campo descripción es opcional
- [ ] Botón "Confirmar Pago" funciona
- [ ] Pago se registra en historial
- [ ] Progreso se actualiza automáticamente
- [ ] "Pagado" aumenta
- [ ] "Faltante" disminuye
- [ ] Toast de confirmación aparece

### Validaciones
- [ ] No puedo pagar monto negativo
- [ ] No puedo pagar más de lo que falta
- [ ] Campo obligatorio mostrado si vacío
- [ ] Errores se muestran claramente

### Actualización Real-Time
- [ ] Al cerrar modal, PlanCard se actualiza
- [ ] Progreso % está correcto
- [ ] Monto pagado muestra correctamente
- [ ] No necesito recargar página

---

## ✏️ Editar Deuda

- [ ] Click "Editar" abre modal con datos actuales
- [ ] Puedo cambiar nombre
- [ ] Puedo cambiar acreedor
- [ ] Puedo cambiar categoría
- [ ] Puedo cambiar interés
- [ ] Puedo cambiar fecha
- [ ] Puedo cambiar cuota mensual
- [ ] Puedo cambiar prioridad
- [ ] Puedo cambiar estrategia
- [ ] Cambios se guardan correctamente
- [ ] DeudaCard se actualiza

---

## 🗑️ Eliminar Deuda

- [ ] Click "Eliminar" muestra confirmación
- [ ] Confirmo en diálogo
- [ ] Deuda se elimina de la grid
- [ ] localStorage se actualiza
- [ ] Toast de confirmación aparece

---

## ⏸️ Pausar/Reactivar

- [ ] Dentro de modal detalles: botón "Pausar Deuda"
- [ ] Estado cambia a "PAUSADA"
- [ ] Badge se actualiza en tarjeta
- [ ] Botón ahora dice "Reactivar Deuda"
- [ ] Click en "Reactivar" vuelve a "ACTIVA"
- [ ] Cambios persisten en localStorage

---

## 🔍 Filtrar

### Verificar Filtros
- [ ] Botón "Todos" muestra todas las deudas
- [ ] Botón "Activas" muestra solo deudas activas
- [ ] Botón "Completadas" muestra deudas completadas
- [ ] Botón "Pausadas" muestra deudas pausadas
- [ ] Los números de contador son correctos
- [ ] Botón activo está destacado

### Cambiar Entre Filtros
- [ ] Puedo hacer click en múltiples filtros
- [ ] Grid actualiza al cambiar filtro
- [ ] Transición es suave

---

## 📊 Dashboard KPIs

- [ ] "Total Deudas" muestra número correcto
- [ ] "Deudas Activas" es correcto
- [ ] "Deuda Total" suma todos los montos
- [ ] "Total Pagado" suma todos los pagos
- [ ] "Progreso Promedio" está entre 0-100%
- [ ] "Completadas" cuenta deudas terminadas

---

## 💡 Consejos Inteligentes

- [ ] Componente ConsejoDeuda aparece
- [ ] Consejos tienen tipos visuales diferentes
- [ ] Iconos se muestran correctamente
- [ ] Colores son coherentes
- [ ] Descripciones tienen sentido

### Tipos de Consejo Esperados
- [ ] Advertencia (naranja) - por deuda atrasada
- [ ] Alerta (roja) - por situación crítica
- [ ] Éxito (verde) - por buen progreso
- [ ] Info (azul) - por vencimiento
- [ ] Sugerencia (púrpura) - por estrategia

---

## 📈 Estadísticas

### Secciones Especiales
- [ ] "Deudas Vencidas" solo aparece si hay
- [ ] "Próximo Vencimiento" muestra información
- [ ] "Más Prioritaria" es la de mayor prioridad
- [ ] "Saldo Faltante" suma todos los faltantes

---

## 🎨 UI/UX

### Responsividad
- [ ] Grid se adapta en móvil
- [ ] Modal es legible en pantallas pequeñas
- [ ] Botones son clickeables
- [ ] Texto es legible

### Estilos
- [ ] CSS Modules están aplicados
- [ ] Sin colisión de estilos con otros componentes
- [ ] Colores son coherentes con tema
- [ ] Hover effects funcionan
- [ ] Transiciones son suaves

### Feedback al Usuario
- [ ] Toast de confirmación aparece
- [ ] Mensajes de error claros
- [ ] Botones muestran estado (hover, active)
- [ ] Loading spinner aparece si es necesario

---

## 💾 Persistencia

### localStorage
- [ ] Datos se guardan en localStorage
- [ ] Recargo página y datos persisten
- [ ] Puedo cerrar navegador y volver
- [ ] Múltiples deudas se guardan todas

### Sincronización
- [ ] Cambios en una pestaña aparecen en otra
- [ ] Editar y volver a la grid muestra cambios

---

## 🔄 Flujos Completos

### Flujo 1: Crear → Ver → Pagar → Ver
- [ ] Creo deuda nueva
- [ ] Click "Ver Detalles"
- [ ] Agrego un pago
- [ ] Cierro modal
- [ ] Progreso se actualiza en tarjeta
- [ ] ¡Flujo completo sin errores!

### Flujo 2: Crear → Editar → Pausar → Reactivar
- [ ] Creo deuda nueva
- [ ] Click "Editar"
- [ ] Cambio un campo
- [ ] Guardo cambios
- [ ] Click "Ver Detalles"
- [ ] Pauso la deuda
- [ ] Cierro modal
- [ ] Estado en tarjeta es "PAUSADA"
- [ ] ¡Flujo completo sin errores!

### Flujo 3: Crear → Filtrar → Eliminar
- [ ] Creo 3 deudas con estados diferentes
- [ ] Filtro por "Activas"
- [ ] Selecciono una
- [ ] Click "Eliminar"
- [ ] Confirmo
- [ ] Deuda desaparece
- [ ] Cuota "Activas" disminuye
- [ ] ¡Flujo completo sin errores!

---

## ⚠️ Edge Cases

- [ ] Intento crear deuda sin acreedor → Error
- [ ] Intento pagar monto negativo → Error
- [ ] Intento editar con campos vacíos → Error
- [ ] No hay deudas → Mensaje vacío adecuado
- [ ] Deuda 100% pagada → Se marca como COMPLETADA
- [ ] Dos deudas con mismo nombre → Ambas se crean

---

## 📋 Resumen Final

- [ ] Todas las pruebas básicas pasaron
- [ ] Todos los flujos completos funcionan
- [ ] No hay errores en consola
- [ ] localStorage funciona correctamente
- [ ] UI se ve bien y es responsivo
- [ ] Rendimiento es aceptable

---

**Fecha de Pruebas:** ___________

**Tester:** Karen

**Status:** 🟢 LISTO PARA PRODUCCIÓN / 🟡 REQUIERE FIXES / 🔴 NO LISTO

**Notas:**
_________________________________________________________________________
_________________________________________________________________________
_________________________________________________________________________

---

**Próximas Mejoras Opcionales:**
- [ ] Agregar gráficos de proyección de pago
- [ ] Integrar con notificaciones del sistema
- [ ] Agregar exportar a PDF
- [ ] Agregar comparativa de estrategias
- [ ] Agregar recordatorios automáticos
- [ ] Agregar widget en dashboard principal
