# Sistema de Mensajes Inteligentes de Finaizen

Sistema completo de notificaciones contextuales que proporciona ~1000 mensajes personalizados para mejorar la experiencia del usuario y fomentar mejores hábitos financieros.

## 📋 Descripción General

El sistema de mensajes inteligentes analiza el comportamiento financiero del usuario en tiempo real y genera notificaciones contextuales que incluyen:

- ⚠️ **Alertas de gastos excesivos**: Cuando el usuario está gastando más de lo habitual
- 💡 **Sugerencias de ahorro**: Consejos proactivos basados en patrones detectados
- 🏆 **Alertas de logros próximos**: Notificaciones cuando está cerca de completar logros
- 🎉 **Mensajes de motivación**: Felicitaciones y refuerzo positivo
- 📚 **Educación financiera**: Tips y conceptos financieros útiles
- ⏰ **Recordatorios**: Acciones pendientes y pagos próximos
- 🌅 **Mensajes contextuales por hora**: Mensajes adaptados al momento del día
- 🤖 **Alertas inteligentes**: Predicciones y detección de anomalías

## 🗂️ Estructura de Archivos

```
src/
├── utils/
│   └── smartMessages.js          # Base de datos de ~1000 mensajes + generador
├── components/
│   └── SmartNotifications/
│       ├── SmartNotifications.jsx       # Componente React
│       ├── SmartNotifications.module.css # Estilos con colores por tipo
│       └── index.js                     # Exportación
└── pages/
    └── User/
        └── DashboardUser/
            └── DashboardUser.jsx        # Integración en dashboard
```

## 📦 Categorías de Mensajes

### 1. Alertas de Gastos Excesivos (150 mensajes)
Detecta cuando el usuario está gastando más de lo normal y proporciona alertas específicas.

**Subcategorías:**
- Alertas generales (50 mensajes)
- Por categoría de gasto (100 mensajes):
  - Comida (10)
  - Transporte (10)
  - Entretenimiento (10)
  - Compras/Shopping (10)
  - Suscripciones (10)
  - Servicios (10)
  - Salud (10)

**Ejemplo:**
```javascript
"⚠️ Tus gastos de este mes están 30% por encima del promedio. ¿Todo bien?"
"🍔 Gastos en comida: $150.50 este mes. Supera tu promedio en 25%."
```

### 2. Sugerencias de Ahorro (100 mensajes)
Consejos proactivos para mejorar la situación financiera del usuario.

**Subcategorías:**
- Sugerencias generales (25 mensajes)
- Por categoría (25 mensajes)
- Basadas en patrones detectados (25 mensajes)
- Ahorros específicos (15 mensajes)
- Metas y motivación (10 mensajes)

**Ejemplo:**
```javascript
"💡 Consejo: Si ahorras $5 diario, tendrás $1,825 en un año."
"☕ Café diario: $120. Prepáralo en casa = $100/mes ahorrado."
```

### 3. Alertas de Logros Próximos (100 mensajes)
Notificaciones cuando el usuario está cerca de completar logros (80%+).

**Subcategorías:**
- Logros cercanos generales (50 mensajes)
- Por empresa (McDonald's, Pichincha, KFC, Uber, Netflix) (30 mensajes)
- Logros generales de la app (20 mensajes)

**Ejemplo:**
```javascript
"🏆 ¡Casi lo logras! Solo 2 compras más para 'Rey de la Comida Rápida'."
"💰 Solo $50 más de ahorro = $5 USD de recompensa (Pichincha)."
```

### 4. Mensajes de Motivación (80 mensajes)
Refuerzo positivo y felicitaciones por buen comportamiento financiero.

**Subcategorías:**
- Felicitaciones generales (30 mensajes)
- Hitos alcanzados (20 mensajes)
- Pequeños logros (20 mensajes)
- Comparaciones positivas (10 mensajes)

**Ejemplo:**
```javascript
"🎉 ¡Excelente! Has cumplido tu presupuesto este mes."
"💪 Racha de 15 días registrando transacciones. ¡Imparable!"
```

### 5. Educación Financiera (100 mensajes)
Tips, conceptos y educación financiera práctica.

**Subcategorías:**
- Conceptos básicos (25 mensajes)
- Estrategias de ahorro (25 mensajes)
- Errores comunes (25 mensajes)
- Datos interesantes (15 mensajes)
- Frases motivacionales financieras (10 mensajes)

**Ejemplo:**
```javascript
"💡 ¿Sabías que? El interés compuesto es tu mejor aliado para el ahorro."
"⚠️ Error común: Gastar antes de analizar si es necesario."
```

### 6. Recordatorios y Acciones (50 mensajes)
Recordatorios contextuales para mantener al usuario activo.

**Subcategorías:**
- Recordatorios diarios (10 mensajes)
- Recordatorios semanales (10 mensajes)
- Recordatorios mensuales (10 mensajes)
- Acciones específicas (10 mensajes)
- Notificaciones de pagos (10 mensajes)

**Ejemplo:**
```javascript
"⏰ Buenos días! ¿Ya registraste tus gastos de ayer?"
"💳 Recordatorio: Pagar tarjeta de crédito el 15."
```

### 7. Mensajes Contextuales por Hora (100 mensajes)
Mensajes adaptados al momento del día y día de la semana.

**Subcategorías:**
- Mañana (6am-12pm) (10 mensajes)
- Mediodía (12pm-6pm) (10 mensajes)
- Noche (6pm-12am) (10 mensajes)
- Madrugada (12am-6am) (10 mensajes)
- Días específicos (Lunes, Viernes, Sábado, Domingo) (20 mensajes)

**Ejemplo:**
```javascript
"☀️ Buenos días! Empieza el día con el pie derecho: revisa tus finanzas."
"🎉 ¡Viernes! Cuidado con los gastos de fin de semana."
```

### 8. Alertas Inteligentes Avanzadas (100 mensajes)
Análisis predictivo y detección de anomalías.

**Subcategorías:**
- Detección de anomalías (25 mensajes)
- Predicciones (25 mensajes)
- Comparaciones inteligentes (25 mensajes)
- Oportunidades detectadas (15 mensajes)
- Alertas de riesgo (10 mensajes)

**Ejemplo:**
```javascript
"🚨 Anomalía detectada: Gasto de $250 es 200% mayor al usual en transporte."
"🔮 Predicción: A este ritmo, gastarás $1,500 este mes (30% más)."
```

## 🎨 Diseño Visual

El componente muestra notificaciones flotantes en la esquina superior derecha con:

- **Gradientes de color** según el tipo de mensaje
- **Navegación** entre múltiples mensajes (◀ ▶)
- **Contador** de mensajes (ej: 3 / 10)
- **Barra de progreso** visual
- **Botón de cerrar** (oculta por 1 hora)
- **Auto-rotación** cada 8 segundos
- **Animaciones suaves** de entrada/salida
- **Responsive** para móviles

### Colores por Tipo de Mensaje

```css
Alertas de gasto:     Gradiente Rojo (#f093fb → #f5576c)
Sugerencias:          Gradiente Cyan (#4facfe → #00f2fe)
Logros próximos:      Gradiente Dorado (#ffd89b → #ff6b6b)
Motivación:           Gradiente Rosa (#a8edea → #fed6e3)
Educación:            Gradiente Púrpura (#667eea → #764ba2)
Recordatorios:        Gradiente Naranja (#fddb92 → #d1fdff)
Contextual tiempo:    Gradiente Verde (#84fab0 → #8fd3f4)
Inteligente:          Gradiente Magenta (#fa709a → #fee140)
```

## 🚀 Uso del Componente

### Importación

```jsx
import SmartNotifications from '../../../components/SmartNotifications';
```

### Integración en Dashboard

```jsx
<SmartNotifications 
  userId={currentUser.id} 
  perfilId={currentPerfil.id} 
/>
```

### Ejemplo Completo

```jsx
function DashboardUser() {
  const { currentUser, currentPerfil } = useAuth();

  return (
    <div className={styles.dashboardContainer}>
      {/* Smart Notifications */}
      <SmartNotifications 
        userId={currentUser.id} 
        perfilId={currentPerfil.id} 
      />
      
      {/* Resto del dashboard */}
    </div>
  );
}
```

## 🧠 Lógica de Generación de Mensajes

El componente `SmartNotifications` analiza automáticamente:

### 1. Datos del Usuario
- Balance actual
- Total de ingresos/egresos
- Porcentaje gastado del presupuesto
- Gastos por categoría

### 2. Condiciones para Alertas

```javascript
// Alerta si gasta más del 80%
if (porcentajeGastado > 80) {
  generateMessage({ tipo: 'alerta_gasto', ... });
}

// Alerta si una categoría supera el 30%
if (porcentajeCategoria > 30) {
  generateMessage({ tipo: 'alerta_gasto', categoria, ... });
}

// Sugerencia si el ahorro es bajo
if (balanceActual < totalIngresos * 0.2) {
  generateMessage({ tipo: 'sugerencia', ... });
}

// Logro próximo si está al 80%+
if (porcentajeLogro >= 80 && porcentajeLogro < 100) {
  generateMessage({ tipo: 'logro_proximo', ... });
}
```

### 3. Personalización de Mensajes

Los mensajes usan plantillas con variables dinámicas:

```javascript
"⚠️ Tus gastos de este mes están ${porcentaje}% por encima del promedio."
→ "⚠️ Tus gastos de este mes están 30% por encima del promedio."

"🍔 Gastos en comida: $${monto} este mes."
→ "🍔 Gastos en comida: $150.50 este mes."
```

## 📊 Clase SmartMessageGenerator

### Método Principal: `generateMessage(context)`

```javascript
SmartMessageGenerator.generateMessage({
  tipo: 'alerta_gasto',
  categoria: 'comida',
  monto: 150.50,
  porcentaje: 30,
  meta: 'reducir gastos',
  logro: 'Rey de la Comida Rápida',
  hora: 14,
  dia: 5
});
```

**Retorna:**
```javascript
{
  mensaje: "🍔 Gastos en comida: $150.50 este mes. Supera tu promedio en 30%.",
  tipo: "alerta_gasto",
  timestamp: Date,
  personalizado: true
}
```

### Método Dashboard: `generateDashboardMessages(userData)`

Genera automáticamente un conjunto de mensajes relevantes basado en:
- Hora actual
- Gastos altos detectados
- Oportunidades de ahorro
- Logros próximos
- Estado de presupuestos

## 🎯 Estrategia de "Venta" y Engagement

### Objetivos del Sistema

1. **Retención**: Mensajes motivacionales mantienen al usuario comprometido
2. **Educación**: Tips financieros mejoran conocimientos del usuario
3. **Acción**: Recordatorios impulsan registro constante de transacciones
4. **Gamificación**: Alertas de logros próximos incentivan uso continuo
5. **Prevención**: Alertas tempranas evitan gastos excesivos

### Flujo de Engagement

```
Usuario entra al dashboard
         ↓
Se analizan sus datos financieros
         ↓
Se generan 8-12 mensajes contextuales
         ↓
Se muestran rotando cada 8 segundos
         ↓
Usuario toma acción basada en el mensaje
         ↓
Mejora sus hábitos financieros
```

## 🔧 Configuración y Personalización

### Ajustar Frecuencia de Rotación

En `SmartNotifications.jsx`:

```javascript
// Cambiar de 8000ms (8 seg) a 10000ms (10 seg)
const interval = setInterval(() => {
  setCurrentMessageIndex(prev => (prev + 1) % messages.length);
}, 10000); // ← Ajustar aquí
```

### Ajustar Duración de Ocultamiento

```javascript
const handleDismiss = () => {
  setIsVisible(false);
  // Cambiar de 3600000ms (1 hora) a 7200000ms (2 horas)
  setTimeout(() => setIsVisible(true), 7200000); // ← Ajustar aquí
};
```

### Agregar Nuevos Mensajes

En `smartMessages.js`:

```javascript
export const ALERTAS_GASTOS_EXCESIVOS = [
  // ... mensajes existentes
  "🆕 Tu nuevo mensaje personalizado aquí con variables ${monto}.",
];
```

### Agregar Nueva Categoría de Mensajes

```javascript
// 1. Crear array de mensajes
export const MI_NUEVA_CATEGORIA = [
  "🆕 Mensaje 1 de la nueva categoría.",
  "🆕 Mensaje 2 de la nueva categoría.",
  // ... más mensajes
];

// 2. Agregar al switch en SmartMessageGenerator
case 'mi_categoria':
  pool = MI_NUEVA_CATEGORIA;
  break;

// 3. Definir color en SmartNotifications.module.css
.miCategoria {
  background: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

## 📈 Métricas y Analytics (Futuro)

Posibles mejoras para trackear efectividad:

- Tasa de clics en mensajes con llamado a la acción
- Mensajes más efectivos para reducir gastos
- Correlación entre mensajes y registro de transacciones
- A/B testing de diferentes tipos de mensajes
- Tiempo promedio de visualización por tipo

## 🐛 Troubleshooting

### Los mensajes no aparecen

1. Verificar que el usuario esté autenticado
2. Verificar que `currentPerfil.id` exista
3. Revisar consola: debe mostrar "📨 Mensajes inteligentes generados: X"

### Mensajes sin personalización

Los placeholders como `${monto}` deben estar en el template original. Si aparecen literalmente, verificar que `context` tenga las propiedades correctas.

### Estilo no se aplica

Verificar que el import de CSS Module sea correcto:

```javascript
import styles from './SmartNotifications.module.css';
```

## 🚀 Próximos Pasos

- [ ] Agregar más mensajes específicos por empresa (logros)
- [ ] Implementar ML para predecir comportamiento
- [ ] Notificaciones push (fuera de la app)
- [ ] Personalización avanzada basada en historial largo
- [ ] Gamificación: puntos por leer mensajes educativos
- [ ] Integración con chatbot IA para consejos personalizados

## 📝 Notas Técnicas

- **Total de mensajes base**: ~780 (expandibles a 1000+ con variaciones)
- **Renderizado**: Componente React funcional con hooks
- **Performance**: Memoización y useCallback para optimizar
- **Accesibilidad**: ARIA labels y navegación por teclado
- **Responsive**: Media queries para móviles
- **Animaciones**: CSS animations sin librerías externas

## 🤝 Contribución

Para agregar nuevos mensajes:

1. Editar `src/utils/smartMessages.js`
2. Agregar mensajes a la categoría correspondiente
3. Usar variables dinámicas: `${monto}`, `${porcentaje}`, `${categoria}`, etc.
4. Mantener tono amigable y motivacional
5. Usar emojis relevantes para llamar la atención

## 📄 Licencia

Sistema desarrollado para Finaizen - Aplicación de gestión financiera personal.

---

**Autor**: Sistema de Mensajes Inteligentes v1.0  
**Fecha**: 2025  
**Branch**: feature/React-Crear-Avisos-Xavier
