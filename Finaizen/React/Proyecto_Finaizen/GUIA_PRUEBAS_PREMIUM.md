# 🧪 Guía de Prueba - Sistema Premium

## 🚀 Inicio Rápido

### Opción 1: Probar con Usuario Premium Existente (María)

1. **Iniciar sesión:**
   ```
   Correo: maria@example.com
   Contraseña: maria123
   ```

2. **Verificar funcionalidades premium:**
   - ✨ Ver badge "PREMIUM" con estrellas en el saludo
   - 👑 Menú de usuario muestra "Gestionar Premium"
   - 🤖 Botón flotante (+) tiene opción "ChatBot IA"

3. **Probar ChatBot:**
   - Click en botón flotante (+) esquina inferior derecha
   - Click en "🤖 ChatBot IA"
   - Escribir: "Analiza mis finanzas"
   - Ver respuesta con análisis completo
   - Probar otras consultas:
     - "Cómo ahorrar más"
     - "Revisa mis gastos"
     - "Plan de presupuesto"

---

### Opción 2: Activar Premium desde Usuario Free (Carlos)

1. **Iniciar sesión como usuario free:**
   ```
   Correo: carlos@example.com
   Contraseña: carlos123
   ```

2. **Verificar estado free:**
   - ❌ NO hay badge premium en saludo
   - ⭐ Menú muestra "Hazte Premium" (botón morado)
   - ❌ Botón flotante NO tiene opción ChatBot

3. **Activar Premium:**
   - Click en foto de perfil (sidebar)
   - Click en "⭐ Hazte Premium"
   - **Seleccionar Plan:**
     - Mensual: $9.99/mes
     - Anual: $99.99/año (recomendado, ahorra $19.89)
   
4. **Ingresar datos de tarjeta de prueba:**
   ```
   Número de tarjeta: 4242 4242 4242 4242
   Nombre titular: CARLOS RAMIREZ
   Fecha exp: 12/26
   CVV: 123
   ```

5. **Confirmar pago:**
   - Click en "Pagar $9.99 USD/mes" o "Pagar $99.99 USD/año"
   - Esperar 2 segundos (simulación de procesamiento)
   - Ver notificación de éxito
   - Página recarga automáticamente

6. **Verificar activación:**
   - ✅ Badge "PREMIUM" aparece en saludo
   - ✅ Menú ahora muestra "👑 Gestionar Premium"
   - ✅ ChatBot disponible en botón flotante
   - ✅ Notificación de bienvenida en campanita 🔔

---

## 🤖 Pruebas del ChatBot

### Test 1: Análisis Financiero

**Entrada:** `Analiza mis finanzas`

**Resultado Esperado:**
```
📊 Análisis Financiero Actual:

💰 Balance General:
• Ingresos totales: $XXXX.XX
• Egresos totales: $XXXX.XX
• Balance: $XXXX.XX ✅ o ⚠️

📈 Categoría con más gastos:
[Categoría]: $XXXX.XX

✅ Mensaje de felicitación o ⚠️ Alerta
```

---

### Test 2: Estrategias de Ahorro

**Entrada:** `Cómo ahorrar más`

**Resultado Esperado:**
```
💡 Estrategia de Ahorro Personalizada:

🎯 Meta de ahorro mensual: $XXX.XX (20% de tus ingresos)

📝 Recomendaciones:
1. Automatiza transferencias
2. Regla 50/30/20
3. Revisa suscripciones
4. Reduce gastos en [Categoría]
```

---

### Test 3: Análisis de Gastos

**Entrada:** `Revisa mis gastos`

**Resultado Esperado:**
```
📊 Análisis de Gastos:

Total de egresos registrados: XX
Gasto promedio: $XXX.XX

⚠️ Gastos superiores al promedio:
• [Descripción]: $XXX.XX
• [Descripción]: $XXX.XX

🔍 Categoría dominante: [Categoría] (XX% del total)
```

---

### Test 4: Plan de Presupuesto

**Entrada:** `Plan de presupuesto`

**Resultado Esperado:**
```
📋 Plan de Presupuesto Inteligente:

🏠 Necesidades (50%): $XXX.XX
🎨 Gustos (30%): $XXX.XX
💎 Ahorros/Inversiones (20%): $XXX.XX

✅ Evaluación del nivel de gasto actual
```

---

### Test 5: Reducir Gastos

**Entrada:** `Reducir gastos`

**Resultado Esperado:**
```
💡 Estrategias para Reducir Gastos:

1️⃣ Método del Desafío de 30 días
2️⃣ Audita suscripciones
3️⃣ Planifica comidas
4️⃣ Usa la regla de las 24 horas
5️⃣ Enfócate en [Categoría con más gastos]
```

---

### Test 6: Botones Rápidos

**Acciones:**
1. Click en "📊 Análisis"
2. Click en "💰 Ahorro"
3. Click en "🔍 Gastos"

**Resultado:** Input se llena automáticamente con consulta predefinida

---

### Test 7: Historial Persistente

**Pasos:**
1. Enviar 3-4 mensajes al ChatBot
2. Cerrar el modal del chat
3. Abrir nuevamente el ChatBot
4. **Verificar:** Mensajes anteriores siguen presentes

---

### Test 8: Limpiar Historial

**Pasos:**
1. Click en botón 🗑️ en header del chat
2. Confirmar en diálogo
3. **Verificar:** Chat se reinicia con mensaje de bienvenida

---

## 🎨 Pruebas Visuales

### Test 1: Badge Premium

**Ubicación:** Header del Dashboard (`¡Hola, María!`)

**Verificar:**
- ✅ Fondo plateado con gradiente
- ✅ Icono ✨ a la izquierda
- ✅ Texto "PREMIUM"
- ✅ Icono ⭐ a la derecha
- ✅ Animación shimmer (brillo cada 3s)
- ✅ Efecto shine (destello diagonal)

---

### Test 2: Modal de Suscripción

**Verificar:**
- ✅ Fondo oscuro con blur
- ✅ Modal con gradiente morado
- ✅ Icono 👑 con animación pulse
- ✅ Planes en grid (2 columnas desktop)
- ✅ Badge "Recomendado" en plan anual
- ✅ Beneficios listados con emojis
- ✅ Formulario con validación en tiempo real
- ✅ Botón de pago con gradiente
- ✅ Animación de "Procesando..." al enviar

---

### Test 3: ChatBot Modal

**Verificar:**
- ✅ Modal desde esquina inferior derecha
- ✅ Header con gradiente morado
- ✅ Avatar del bot con animación float
- ✅ Punto verde "online" pulsante
- ✅ Mensajes del bot alineados a la izquierda
- ✅ Mensajes del usuario alineados a la derecha
- ✅ Animación de typing (3 puntos)
- ✅ Botones rápidos en footer
- ✅ Input con auto-expand
- ✅ Scroll suave a último mensaje

---

### Test 4: Menú Premium en Sidebar

**Para usuario FREE:**
- ✅ Botón "⭐ Hazte Premium" con gradiente morado
- ✅ Hover aumenta brillo y mueve a la derecha

**Para usuario PREMIUM:**
- ✅ Botón "👑 Gestionar Premium" con gradiente plateado
- ✅ Hover aumenta brillo

---

## 🔧 Validaciones del Formulario

### Test de Tarjeta Inválida

**Casos:**
1. **Número corto:**
   ```
   Input: 1234
   Error: "Número de tarjeta inválido"
   ```

2. **Sin titular:**
   ```
   Input: ""
   Error: "Nombre del titular requerido"
   ```

3. **Fecha incorrecta:**
   ```
   Input: 13/25 (mes > 12)
   Error: "Fecha de expiración inválida"
   ```

4. **CVV corto:**
   ```
   Input: 12
   Error: "CVV inválido"
   ```

---

### Test de Tarjetas Válidas

**Tarjetas de prueba:**

1. **Visa:**
   ```
   Número: 4242 4242 4242 4242
   Resultado: Detecta "Visa"
   ```

2. **Mastercard:**
   ```
   Número: 5555 5555 5555 4444
   Resultado: Detecta "Mastercard"
   ```

3. **American Express:**
   ```
   Número: 3782 822463 10005
   Resultado: Detecta "American Express"
   ```

---

## 📱 Pruebas Responsive

### Móvil (< 640px)

**Modal Suscripción:**
- ✅ Ocupa pantalla completa
- ✅ Planes en una columna
- ✅ Formulario en una columna
- ✅ Scrollable

**ChatBot:**
- ✅ Ocupa pantalla completa
- ✅ Mensajes ocupan 80% del ancho
- ✅ Botones rápidos hacen scroll horizontal

---

## 🐛 Tests de Edge Cases

### Test 1: Usuario sin Transacciones

**Setup:** Crear usuario nuevo sin ingresos ni egresos

**ChatBot Input:** "Analiza mis finanzas"

**Resultado Esperado:**
- Balance: $0.00
- No hay categoría dominante
- Mensaje informativo

---

### Test 2: Suscripción Vencida

**Setup (Consola):**
```javascript
const user = mockDB.users.find(u => u.correo === 'maria@example.com');
user.subscriptionEndDate = new Date('2023-01-01'); // Fecha pasada
mockDB.saveToLocalStorage();
location.reload();
```

**Verificar:**
- ❌ Badge no se muestra
- ❌ ChatBot no accesible
- ⭐ Menú muestra "Hazte Premium"

---

### Test 3: Multiple Tabs

**Pasos:**
1. Abrir 2 pestañas con María logueada
2. En pestaña 1: Enviar mensaje al ChatBot
3. En pestaña 2: Abrir ChatBot
4. **Verificar:** Mensaje de pestaña 1 NO aparece (localStorage por tab)

---

## 🎓 Datos de Prueba

### Usuario Premium (María)

```javascript
{
  correo: "maria@example.com",
  contraseña: "maria123",
  isPremium: true,
  premiumSince: "2024-10-01",
  subscriptionType: "anual",
  subscriptionEndDate: "2025-10-01",
  paymentMethod: {
    type: "tarjeta",
    brand: "Visa",
    last4: "4242",
    expiry: "12/26"
  }
}
```

### Usuario Free (Carlos)

```javascript
{
  correo: "carlos@example.com",
  contraseña: "carlos123",
  isPremium: false,
  premiumSince: null,
  subscriptionType: null
}
```

---

## 📊 Métricas de Éxito

### ✅ Sistema Completo Funcional

- [ ] Usuario free puede activar premium
- [ ] Formulario valida correctamente
- [ ] Pago simula procesamiento
- [ ] Usuario se actualiza en mockDB
- [ ] Badge aparece después de pago
- [ ] ChatBot accesible solo para premium
- [ ] ChatBot analiza finanzas correctamente
- [ ] Historial de chat persiste
- [ ] Menú premium cambia según estado
- [ ] Notificación de bienvenida se crea

---

## 🔄 Reset del Sistema

### Desactivar Premium de María

```javascript
const maria = mockDB.users.find(u => u.correo === 'maria@example.com');
maria.cancelarPremium();
mockDB.saveToLocalStorage();
location.reload();
```

### Limpiar Todo el Chat

```javascript
Object.keys(localStorage)
  .filter(k => k.startsWith('chatbot_'))
  .forEach(k => localStorage.removeItem(k));
location.reload();
```

### Reset Completo de Base de Datos

```javascript
localStorage.removeItem('finaizen_mockdb');
location.reload();
```

---

## 📸 Capturas Esperadas

### Dashboard Premium
- Badge plateado con estrellas junto a "¡Hola, María!"

### Modal de Suscripción
- Header morado con 👑
- 2 planes lado a lado
- Formulario de tarjeta
- Lista de beneficios

### ChatBot
- Modal desde esquina inferior derecha
- Avatar del bot con punto verde
- Mensajes en burbujas
- Botones rápidos en footer

---

## ⚠️ Problemas Comunes

### ChatBot no aparece

**Causa:** Usuario no es premium o suscripción vencida

**Solución:** Verificar `currentUser.premiumActivo` en consola

---

### Badge no se muestra

**Causa:** Caché del navegador

**Solución:** Ctrl+Shift+R para hard refresh

---

### Formulario no valida

**Causa:** Estado no se actualiza

**Solución:** Verificar que `formData` tiene valores

---

### Chat no guarda historial

**Causa:** localStorage deshabilitado

**Solución:** Permitir cookies/localStorage en configuración del navegador

---

**Fecha de creación:** Diciembre 2024  
**Versión:** 1.0.0  
**Autor:** Xavier
