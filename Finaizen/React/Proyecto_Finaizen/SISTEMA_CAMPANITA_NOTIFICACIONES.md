# Sistema de Notificaciones Inteligentes con Campanita 🔔

Sistema completo de notificaciones que integra mensajes inteligentes con un componente de campanita desplegable en el dashboard del usuario.

## 🎯 Características Principales

### ✅ Campanita Interactiva
- **Icono de campanita** animado en el header del dashboard
- **Badge de contador** que muestra notificaciones sin leer
- **Dropdown desplegable** con lista completa de notificaciones
- **Cierre automático** al hacer clic fuera del dropdown
- **Animaciones suaves** en hover y acciones

### 🧠 Generación Inteligente
- **Análisis automático** del comportamiento financiero del usuario
- **8 tipos de mensajes** contextuales diferentes
- **Generación diaria** de nuevas notificaciones
- **Limpieza automática** de notificaciones antiguas (>7 días)
- **Integración con mockDatabase** para persistencia

### 💾 Persistencia de Datos
- Usa **mockDatabase.js** en `src/utils/`
- Notificaciones guardadas en **localStorage**
- Compatible con el modelo **Notificacion.js**
- **Sincronización automática** con el sistema de datos

## 📦 Estructura de Archivos

```
src/
├── components/
│   └── NotificationBell/
│       ├── NotificationBell.jsx           # Componente principal
│       ├── NotificationBell.module.css     # Estilos de campanita
│       └── index.js                        # Exportación
├── utils/
│   ├── smartMessages.js                    # Base de ~1000 mensajes
│   └── mockDatabase.js                     # Base de datos simulada
└── pages/
    └── User/
        └── DashboardUser/
            └── DashboardUser.jsx           # Integración en header
```

## 🎨 Diseño Visual

### Campanita en el Header
```
┌─────────────────────────────────────────────────────┐
│  ¡Hola, Usuario! 👋                          🔔 (5) │
│  Perfil: Personal (USD)                             │
└─────────────────────────────────────────────────────┘
```

### Dropdown Desplegable
```
┌─────────────────────────────────────────────────┐
│ Notificaciones    [Marcar todas como leídas]   │
├─────────────────────────────────────────────────┤
│ 🏆  Logro Cercano                    Hace 2h    │
│     ¡Casi lo logras! Solo 2 compras más...     │
│                                          ✓  ✕   │
├─────────────────────────────────────────────────┤
│ ⚠️  Alerta de Gastos                Hace 5h    │
│ •   Tus gastos están 30% por encima...         │
│                                          ✓  ✕   │
├─────────────────────────────────────────────────┤
│ 💡  Sugerencia de Ahorro            Hace 1d    │
│     Si ahorras $5 diario, tendrás...           │
│                                             ✕   │
├─────────────────────────────────────────────────┤
│         Ver todas las notificaciones            │
└─────────────────────────────────────────────────┘
```

## 🚀 Uso e Integración

### Integración en el Dashboard

```jsx
import NotificationBell from '../../../components/NotificationBell';

function DashboardUser() {
  const { currentUser, currentPerfil } = useAuth();

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <div className={styles.welcomeSection}>
          <h1>¡Hola, {currentUser?.nombre}! 👋</h1>
          <p>Perfil: <strong>{currentPerfil?.nombre}</strong></p>
        </div>
        
        {/* Campanita de Notificaciones */}
        <NotificationBell 
          userId={currentUser.id} 
          perfilId={currentPerfil.id} 
        />
      </header>
      
      {/* Resto del dashboard */}
    </div>
  );
}
```

## 📊 Tipos de Notificaciones Generadas

### 1. Mensajes Contextuales por Hora (🌅)
- Mensajes de bienvenida según hora del día
- Mañana, mediodía, noche, madrugada

### 2. Alertas de Gastos (⚠️)
- Gastos superiores al 80% del presupuesto
- Categorías con gasto excesivo (>30%)
- Predicciones de sobregasto mensual

### 3. Sugerencias de Ahorro (💡)
- Oportunidades detectadas de ahorro
- Consejos basados en patrones de gasto
- Tips para optimizar finanzas

### 4. Logros Próximos (🏆)
- Alertas cuando logros están al 80%+
- Notificaciones de logros desbloqueables
- Recordatorios de recompensas cercanas

### 5. Mensajes Motivacionales (🎉)
- Felicitaciones por buen desempeño
- Refuerzo positivo por ahorro
- Celebración de hitos alcanzados

### 6. Educación Financiera (📚)
- Tips y conceptos financieros útiles
- Estrategias de gestión de dinero
- Datos interesantes sobre finanzas

### 7. Recordatorios (⏰)
- Recordatorios diarios/semanales
- Acciones pendientes
- Pagos próximos a vencer

### 8. Análisis Inteligente (🤖)
- Predicciones basadas en datos
- Detección de anomalías
- Comparativas inteligentes

## 🔄 Flujo de Generación de Notificaciones

```
Usuario entra al Dashboard
         ↓
NotificationBell se monta (useEffect)
         ↓
generateAndLoadNotifications()
         ↓
Analiza datos del usuario:
  - Ingresos y egresos
  - Gastos por categoría
  - Progreso de logros
  - Balance actual
         ↓
Genera mensajes inteligentes (8-12)
         ↓
Verifica notificaciones existentes hoy
         ↓
Crea nuevas notificaciones si no existen
         ↓
Guarda en mockDB.notificaciones[]
         ↓
mockDB.saveToLocalStorage()
         ↓
loadNotifications() - Muestra en UI
         ↓
Usuario ve campanita con badge
```

## 💡 Funcionalidades del Componente

### Badge de Contador
- **Aparece** cuando hay notificaciones sin leer
- **Animación de pulso** para llamar la atención
- **Máximo 99+** si hay más de 99 notificaciones
- **Animación de campanita** constante

### Dropdown de Notificaciones
- **Auto-cierre** al hacer clic fuera
- **Scroll** si hay muchas notificaciones
- **Hover effects** en cada notificación
- **Indicador visual** de notificaciones sin leer (punto azul)

### Acciones por Notificación
- **✓ Marcar como leída** (botón individual)
- **✕ Eliminar** (elimina de la base de datos)
- **Marcar todas como leídas** (botón en header)

### Tiempo Relativo
- "Ahora" (< 1 min)
- "Hace X min" (< 1 hora)
- "Hace Xh" (< 24 horas)
- "Hace Xd" (< 7 días)
- Fecha corta (> 7 días)

## 🎨 Colores por Tipo de Notificación

| Tipo            | Gradiente del Icono           | Emoji |
|-----------------|-------------------------------|-------|
| Alerta Gasto    | Amarillo claro → Amarillo    | ⚠️    |
| Sugerencia      | Azul claro → Azul            | 💡    |
| Logro Próximo   | Amarillo claro → Dorado      | 🏆    |
| Motivación      | Verde claro → Verde          | 🎉    |
| Educación       | Azul claro → Azul            | 📚    |
| Recordatorio    | Azul claro → Azul            | ⏰    |
| Contextual      | Azul claro → Azul            | 🌅    |
| Inteligente     | Amarillo claro → Amarillo    | 🤖    |

## 🔧 Configuración y Personalización

### Ajustar Limpieza Automática

En `NotificationBell.jsx`:

```javascript
// Cambiar de 7 días a 14 días
const hace7Dias = new Date();
hace7Dias.setDate(hace7Dias.getDate() - 14); // ← Ajustar aquí
```

### Cambiar Frecuencia de Generación

```javascript
// Generar solo 1 vez por día
const hoy = new Date().toDateString();
const notificacionesHoy = notificacionesExistentes.filter(n => 
  new Date(n.createdAt).toDateString() === hoy
);

if (notificacionesHoy.length === 0) {
  // Generar nuevas notificaciones
}
```

### Ajustar Cantidad de Notificaciones

Modifica las condiciones en `generateAndLoadNotifications()`:

```javascript
// Reducir alertas de categorías (de 30% a 40%)
if (porcentajeCategoria > 40) { // ← Cambiar umbral
  generatedMessages.push(...);
}
```

### Personalizar Íconos

En la función `getIconoByTipo()`:

```javascript
const map = {
  'alerta_gasto': '🚨', // Cambiar de ⚠️ a 🚨
  'sugerencia': '💰',   // Cambiar de 💡 a 💰
  // ... más personalizaciones
};
```

## 📱 Responsive

### Desktop (>768px)
- Dropdown de **400px** de ancho
- Posición: esquina superior derecha
- Altura máxima: **600px**

### Mobile (<768px)
- Dropdown **full width** (con márgenes)
- Posición: **fixed** desde el top
- Altura máxima: **calc(100vh - 80px)**
- Campanita más pequeña: **20px**

## 🔄 Integración con mockDatabase

### Métodos Utilizados

```javascript
// Obtener notificaciones del usuario
mockDB.getNotificacionesDeUsuario(userId, soloNoLeidas);

// Agregar nueva notificación
mockDB.notificaciones.push(nuevaNotificacion);

// Guardar cambios
mockDB.saveToLocalStorage();

// Filtrar/eliminar notificaciones
mockDB.notificaciones = mockDB.notificaciones.filter(...);
```

### Modelo Notificacion

```javascript
const notif = new Notificacion({
  userId: userId,
  perfilId: perfilId,
  tipo: 'info',                    // info, warning, success, error, logro
  titulo: 'Título de notificación',
  mensaje: 'Mensaje detallado...',
  icono: '🔔',
  leida: false,
  data: { tipo: 'contextual_tiempo' }
});

// Marcar como leída
notif.marcarComoLeida();
```

## 🎯 Ventajas vs SmartNotifications Anterior

| Característica          | SmartNotifications | NotificationBell ✅ |
|------------------------|-------------------|---------------------|
| Posición               | Flotante fija     | Campanita en header |
| Diseño                 | Card flotante     | Dropdown desplegable|
| Interacción            | Auto-rotación     | Manual, on-demand   |
| Persistencia           | No persistía      | Sí, en mockDatabase |
| Marcar como leída      | No disponible     | ✅ Sí               |
| Eliminar notificación  | No disponible     | ✅ Sí               |
| Historial              | Solo actual       | Todas guardadas     |
| Mobile friendly        | Sí                | ✅ Mejorado         |
| Contador visual        | No                | ✅ Badge con número |

## 🐛 Troubleshooting

### La campanita no aparece
1. Verificar que `currentUser.id` y `currentPerfil.id` existan
2. Revisar consola para errores de carga
3. Verificar que mockDatabase esté inicializado

### No se generan notificaciones
1. Verificar que haya datos de ingresos/egresos/logros
2. Revisar condiciones de generación (umbrales)
3. Verificar localStorage: `finaizen_mockdb`

### Badge no muestra número correcto
1. Verificar que `notif.leida` sea booleano
2. Llamar a `loadNotifications()` después de cambios
3. Verificar que `mockDB.saveToLocalStorage()` se ejecute

### Dropdown no cierra
1. Verificar que `dropdownRef` esté asignado correctamente
2. Revisar event listener de `mousedown`
3. Verificar que el estado `isOpen` se actualice

## 📈 Próximas Mejoras

- [ ] Notificaciones push (fuera de la app)
- [ ] Filtros por tipo de notificación
- [ ] Búsqueda en notificaciones
- [ ] Página completa de historial de notificaciones
- [ ] Sonido al recibir notificación nueva
- [ ] Configuración de preferencias de notificaciones
- [ ] Notificaciones en tiempo real (WebSocket)
- [ ] Categorización automática avanzada

## 🤝 Integración con otras Páginas

### En el NavBar (opcional)

```jsx
import NotificationBell from '../components/NotificationBell';

function NavBar() {
  const { currentUser, currentPerfil } = useAuth();
  
  return (
    <nav>
      {/* ... otros elementos ... */}
      <NotificationBell 
        userId={currentUser?.id} 
        perfilId={currentPerfil?.id} 
      />
    </nav>
  );
}
```

### En otras páginas de Usuario

El componente es reutilizable en cualquier página donde quieras mostrar notificaciones.

## 📝 Notas Técnicas

- **React Hooks**: useState, useEffect, useRef
- **Event Handling**: Click outside detection
- **CSS Modules**: Estilos encapsulados
- **Animations**: CSS keyframes
- **localStorage**: Persistencia de datos
- **mockDatabase**: Simulación de backend
- **Responsive**: Mobile-first approach

## 📄 Archivos Relacionados

- `src/components/NotificationBell/NotificationBell.jsx`
- `src/components/NotificationBell/NotificationBell.module.css`
- `src/utils/smartMessages.js`
- `src/utils/mockDatabase.js`
- `src/models/Notificacion.js`
- `src/pages/User/DashboardUser/DashboardUser.jsx`

---

**Sistema desarrollado para**: Finaizen - Gestión Financiera Personal  
**Fecha**: Noviembre 2025  
**Branch**: feature/React-Crear-Avisos-Xavier  
**Versión**: 2.0 (con campanita)
