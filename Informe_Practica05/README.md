## ESCUELA POLITECNICA NACIONAL -  FACULTAD DE INGENIERIA ELECTRICA Y ELECTRONICA - APLICACIONES WEB Y MOVILES

# Informe 05
# Finaizen - Gestión Inteligente de Finanzas Personales

## Descripción breve del objetivo de la práctica

- Nombre de la aplicación: Finaizen
- Ubicación del código: carpeta `Finaizen/` (HTML, CSS y JS del prototipo)

Esta práctica tuvo como objetivo implementar la funcionalidad interactiva de la aplicación web Finaizen mediante JavaScript, añadiendo validación de formularios, manipulación del DOM, integración de librerías externas y manejo de eventos del usuario.

Los principales logros de esta práctica fueron:

### 1. Validación dinámica de formularios
- Implementación de validación en tiempo real en los formularios de **Nuevo Ingreso** (`nuevo_ingreso.js`) y **Nuevo Egreso** (`nuevo_egreso.js`).
- Validación de campos obligatorios: monto, descripción y selección de días según frecuencia.
- Mensajes de error contextuales que se muestran y ocultan dinámicamente mediante las funciones `showError()` y `clearError()`.
- Validación condicional de notificaciones (hora requerida solo si se activa la notificación).

### 2. Manipulación del DOM
- **Generación dinámica de calendarios**: Creación programática de 31 días para selección mensual con eventos de clic.
- **Renderizado de listas de registros**: En `administrar_registros.js`, se implementó la función `renderRecords()` que genera tarjetas de ingresos y egresos desde arrays de datos.
- **Carga dinámica de componentes**: El archivo `main.js` carga de forma asíncrona los sidebars (admin/user) usando `fetch()` y el atributo `data-sidebar`.
- **Menú flotante de usuario**: Sistema de dropdown con carga dinámica y control de estado (abrir/cerrar).

### 3. Manejo de eventos
- **Eventos de formulario**: Listeners para `submit`, `input`, `change` y `click` que controlan el flujo de validación y limpieza de errores.
- **Toggle de sidebar**: Botón de colapso que alterna las clases CSS del sidebar y del contenido principal (`sidebar-collapsed`).
- **Selección de frecuencia**: Sistema de pestañas interactivo que muestra/oculta selectores de tiempo según la frecuencia elegida (diario, semanal, mensual, anual, ocasional).
- **Checkboxes dinámicos**: Control de días de la semana con validación de selección mínima.
- **Calendario interactivo**: Selección visual de días del mes con feedback mediante clases CSS.

### 4. Integración de librerías externas
- **Chart.js**: Implementación de gráficos interactivos en `dashboardUser.js`:
  - Gráfico de línea para visualizar el ahorro mensual con curvas suaves (`tension: 0.4`).
  - Gráfico de dona para mostrar la distribución de gastos por categoría con `cutout: 70%`.
  - Configuración responsive con `maintainAspectRatio: false` y manejo de redimensionamiento de ventana con `resize()`.

### 5. Organización modular del código JavaScript
- Estructura por funcionalidad: cada página tiene su archivo JS específico (`dashboardUser.js`, `nuevo_ingreso.js`, `nuevo_egreso.js`, etc.).
- Archivo `main.js` centralizado para funcionalidades compartidas (carga de sidebar, menú de usuario).
- Patrón DOMContentLoaded para garantizar que el DOM esté completamente cargado antes de ejecutar scripts.

### 6. Experiencia de usuario mejorada
- Feedback visual inmediato mediante clases `.is-invalid` y `.error-message`.
- Pre-selección inteligente (fecha actual en calendarios, todos los días en frecuencia diaria).
- Limpieza automática de errores cuando el usuario corrige los campos.
- Confirmación de guardado mediante `alert()` con resumen de datos ingresados.

### 7. Buenas prácticas aplicadas
- Uso de arrow functions para mantener el contexto de `this`.
- Optional chaining (`?.`) para evitar errores de referencia nula.
- Dataset attributes (`data-value`, `data-sidebar`) para almacenar metadatos en el HTML.
- Separación de lógica de validación, UI y eventos.
- Console.log estratégico para debugging y seguimiento de flujo de datos.

## Capturas de las funcionalidades implementadas


## Conclusiones y recomendaciones
### Conclusiones

- La validación de formularios en tiempo real mejora significativamente la experiencia del usuario, permitiendo correcciones inmediatas antes del envío. El patrón de funciones `showError()` y `clearError()` resultó escalable y reutilizable.
- La manipulación del DOM mediante JavaScript puro (Vanilla JS) demostró ser suficiente para la mayoría de las funcionalidades, sin necesidad de frameworks pesados. El uso de `fetch()` para carga dinámica de componentes HTML mantuvo el código modular y mantenible.
- Chart.js se integró exitosamente para visualización de datos financieros, con configuración responsive que se adapta automáticamente a diferentes tamaños de pantalla mediante eventos de `resize`.
- El patrón de desarrollo modular (un archivo JS por página/funcionalidad) facilita el mantenimiento, debugging y escalabilidad del proyecto. La centralización de funcionalidades compartidas en `main.js` evitó duplicación de código.
- El manejo de eventos delegados y el uso de dataset attributes permitió crear interfaces dinámicas sin necesidad de IDs únicos para cada elemento generado programáticamente.

### Recomendaciones

- **Implementar LocalStorage o SessionStorage**: Para persistir los datos de ingresos, egresos y configuraciones del usuario entre sesiones, evitando pérdida de información al recargar la página.
- **Migrar a un sistema de componentes más robusto**: Considerar el uso de Web Components o un framework ligero como Alpine.js para manejar estados complejos y reactividad, especialmente cuando la aplicación crezca.
- **Añadir manejo de errores en peticiones asíncronas**: Implementar bloques try-catch en las funciones `fetch()` y mostrar mensajes de error amigables al usuario en caso de fallo de carga de componentes.
- **Optimizar eventos de scroll y resize**: Implementar técnicas de debouncing/throttling para mejorar el rendimiento, especialmente en el listener de `resize` de los gráficos de Chart.js.
- **Validación del lado del servidor**: Aunque se implementó validación del lado del cliente, es crucial añadir validación en el backend para garantizar la integridad y seguridad de los datos.
- **Accesibilidad (a11y)**: Añadir atributos ARIA (`aria-invalid`, `aria-describedby`) a los campos con errores de validación y asegurar que los mensajes de error sean anunciados por lectores de pantalla.
- **Testing automatizado**: Implementar pruebas unitarias con Jest o Vitest para validar las funciones de validación, manipulación del DOM y manejo de eventos, asegurando la robustez del código.
- **Documentación de funciones**: Añadir JSDoc a las funciones clave para mejorar la mantenibilidad y facilitar la colaboración en equipo.





