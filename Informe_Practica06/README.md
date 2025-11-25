## ESCUELA POLITÉCNICA NACIONAL - FACULTAD DE INGENIERÍA ELÉCTRICA Y ELECTRÓNICA - APLICACIONES WEB Y MÓVILES

# Informe 06
# Finaizen - Migración a React: Componentes, Props, Estado y Hooks

## Descripción breve del objetivo de la práctica

- **Nombre de la aplicación:** Finaizen
- **Ubicación del código migrado:** `Finaizen/React/Proyecto_Finaizen/`

El objetivo de esta práctica fue migrar el prototipo de Finaizen a React, implementando componentes funcionales, gestionando estado con hooks y logrando una interfaz modular, reutilizable e interactiva.

## Documentación de la migración y principales cambios realizados

### 1. Migración de vistas principales a componentes React
- Las vistas principales del prototipo fueron convertidas en componentes funcionales dentro de la carpeta `src/pages/` y `src/components/`.
- Se definió una jerarquía clara: layouts, páginas, componentes UI, modales y formularios.
- Ejemplo: `DashboardUser`, `NuevoIngreso`, `NuevoEgreso`, `Historial`, `Presupuestos`, `Logros`, `Notificaciones`.



### 2. Uso de props y validación
- Los datos se pasan entre componentes mediante props, permitiendo reutilización y personalización.
- Se utiliza `PropTypes` para validar la forma de los props en componentes clave como formularios y modales.

### 3. Gestión de estado local y efectos
- Se implementa `useState` para manejar el estado de formularios, inputs, notificaciones y UI.
- Se utiliza `useEffect` para cargar datos simulados, inicializar valores y actualizar la UI en respuesta a cambios de estado.
- Ejemplo: El formulario de transacciones (`TransactionForm`) gestiona el estado de todos los campos y errores de validación.

### 4. Formularios controlados y manejo de eventos
- Los inputs de los formularios están vinculados al estado local, permitiendo validación en tiempo real y control total sobre los datos ingresados.
- Se manejan eventos `onChange` y `onSubmit` para actualizar el estado y procesar la información.
- Ejemplo: Validación de monto, descripción, fecha y frecuencia en el registro de ingresos/egresos.

### 5. Levantamiento de estado (Lifting State Up)
- Se aplica lifting state up para sincronizar componentes hermanos y compartir datos entre formularios y vistas principales.
- Ejemplo: Al guardar una transacción, se actualiza el estado global y se muestra una notificación en el dashboard.

### 6. Sistema de notificaciones y mensajes locales
- Se integra un gestor de notificaciones locales (banners/toasts) que se disparan ante cambios en el estado, como registros exitosos, errores o logros.
- Ejemplo: Componente `NotificationBell` y sistema de mensajes inteligentes en `SmartNotifications`.

### 7. Modularidad y reutilización
- El código se organiza en componentes reutilizables, layouts y hooks personalizados para mantener la escalabilidad y mantenibilidad.
- Se utiliza un mockDB para simular la persistencia de datos y la interacción entre componentes.


## Capturas de las funcionalidades implementadas

### 1. Estructura de carpetas tras la migración
![Estructura de carpetas](./assets/Estructura%20de%20carpetas%20de%20las%20paginas%20luego%20de%20la%20migracion.png)
*Organización de carpetas y archivos en React tras la migración.*

### 2. Dashboard de usuario
![Dashboard usuario](./assets/Dashboard%20usuario.png)
*Vista principal del dashboard modular con componentes React.*

### 3. Administración de finanzas
![Administrar finanzas](./assets/Administrar%20finanzas.png)
*Gestión de ingresos, egresos y resumen financiero usando formularios controlados.*

### 4. Historial de transacciones
![Historial](./assets/Historial.png)
*Listado de transacciones gestionado por componentes y props.*

### 5. Logros del usuario
![Logros usuario](./assets/Logros%20usuario.png)
*Visualización de logros y metas alcanzadas por el usuario.*

### 6. Componentes creados
![Componentes creados](./assets/Componentes%20creados.png)
*Ejemplo de componentes funcionales y reutilizables en la aplicación.*

### 7. Inteligencia de mercado (Admin)
![Admin Inteligencia de mercado](./assets/Admin%20Inteligencia%20de%20mercado.png)
*Panel de inteligencia de mercado para administración.*

### 8. Supervisión IA (Admin)
![Admin Supervision IA](./assets/Admin%20Supervision%20IA.png)
*Panel de supervisión y control con IA para administración.*

## Conclusiones y recomendaciones

### Conclusiones
- La migración a React permitió una estructura más clara y modular, facilitando la reutilización y el mantenimiento del código.
- El uso de hooks (`useState`, `useEffect`) simplificó la gestión de estado y efectos secundarios, mejorando la experiencia de usuario.
- Los formularios controlados y la validación en tiempo real aumentaron la robustez y la interactividad de la aplicación.
- El sistema de notificaciones locales y mensajes inteligentes enriqueció la retroalimentación al usuario.
- La separación en componentes y layouts favorece la escalabilidad y futuras integraciones.

### Recomendaciones
- **Persistencia real de datos:** Integrar una API o base de datos para reemplazar el mockDB y permitir datos persistentes entre sesiones y usuarios.
- **Testing automatizado:** Implementar pruebas unitarias y de integración con Jest o React Testing Library para asegurar la calidad del código.
- **Mejorar la gestión global de estado:** Considerar el uso de Context API o Redux para manejar estados complejos y compartir datos entre múltiples componentes.
- **Optimización de rendimiento:** Aplicar técnicas de memoización y lazy loading para mejorar la velocidad y eficiencia de la aplicación.
- **Documentación y buenas prácticas:** Mantener documentación actualizada y seguir patrones recomendados de React para facilitar la colaboración y el mantenimiento.
