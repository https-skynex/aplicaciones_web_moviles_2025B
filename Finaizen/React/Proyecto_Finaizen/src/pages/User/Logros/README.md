# Página de Logros - React

## Descripción
Página que muestra todos los logros y recompensas disponibles para el usuario en Finaizen. Permite visualizar el progreso de cada logro, los completados y los que están en progreso.

## Ubicación
`src/pages/User/Logros/`

## Archivos
- `Logros.jsx` - Componente principal
- `Logros.module.css` - Estilos CSS Module
- `index.js` - Exportación del componente

## Características

### 1. **Visualización de Logros**
- Muestra todos los logros del perfil actual del usuario
- Cada logro se presenta en una tarjeta con:
  - Icono del logro (emoji) o logo de empresa
  - Nombre y descripción
  - Badge de empresa patrocinadora (si aplica)
  - Barra de progreso animada
  - Estado de progreso (X/Y completado)
  - Recompensa asociada con valor en USD
  - Indicador de comprobantes subidos

### 2. **Filtros**
- **Todos**: Muestra todos los logros
- **Completados**: Solo logros desbloqueados
- **En Progreso**: Solo logros con progreso > 0 pero no completados

### 3. **Estadísticas Globales**
- Contador de logros completados vs totales
- Porcentaje de progreso total

### 4. **Diseño Responsivo**
- Grid adaptativo que se ajusta según el tamaño de pantalla
- Mobile-first approach
- Tarjetas con hover effects y animaciones

### 5. **Animaciones**
- Barra de progreso con animación de carga
- Efecto de rayas diagonal en la barra de progreso
- Animación de flotación en los iconos
- Efecto hover en las tarjetas

## Estructura de Datos

Los logros se obtienen del `mockDatabase` usando:
```javascript
mockDB.getLogrosDePerfil(currentPerfil.id)
```

Cada logro tiene la siguiente estructura (según `models/Logro.js`):
```javascript
{
  id: string,
  perfilId: number,
  nombre: string,
  descripcion: string,
  icono: string (emoji),
  tipo: 'ahorro' | 'racha' | 'presupuesto' | 'registro' | 'especial' | 'empresa',
  condicion: string,
  desbloqueado: boolean,
  fechaDesbloqueo: Date | null,
  progreso: number,
  meta: number,
  // Nuevos campos para empresas
  empresa: string | null,              // Nombre de la empresa
  logoEmpresa: string | null,          // URL del logo
  recompensa: string | null,           // Descripción de la recompensa
  valorRecompensa: number,             // Valor en USD
  requiereComprobante: boolean,        // Si requiere verificación
  comprobantes: Array<{                // Comprobantes subidos
    url: string,
    fecha: Date,
    verificado: boolean
  }>
}
```

## Tipos de Logros Predefinidos

Según `LOGROS_PREDEFINIDOS` en `models/Logro.js`:

### 🏢 **Logros de Empresas** (con recompensas reales)

1. **McDonald's**
   - Rey de la Comida Rápida: 5 consumos → $10 USD en productos

2. **Banco Pichincha**
   - Ahorrador Maestro: Ahorra $200 → $5 USD acreditados
   - Pagador Puntual: 3 pagos a tiempo → 500 Puntos Pichincha

3. **KFC**
   - Fan del Coronel: 10 consumos → Combo Familiar Gratis ($25 USD)

4. **Uber**
   - Viajero Frecuente: 20 viajes → $15 USD en créditos

5. **Netflix**
   - Binge Watcher: 6 meses de suscripción → 1 mes gratis

### 📊 **Logros Generales**

1. **Registro**
   - Primer Paso (primer ingreso)
   - Consciente (primer egreso)
   - Detallista (50 transacciones)
   - Experto en Finanzas (100 transacciones)

2. **Racha**
   - Constante (7 días seguidos)
   - Disciplinado (30 días seguidos)

3. **Ahorro**
   - Ahorrador Novato ($100 en un mes)
   - Ahorrador Experto ($500 en un mes)

4. **Presupuesto**
   - Planificador (primer presupuesto)
   - Respetuoso del Límite (cumplir todos los presupuestos)

## Acciones

### Botones de Acción

#### **Ver Recompensa** (logros completados)
- Muestra toast con información de la recompensa desbloqueada
- Ideal para futuro: generar código de cupón real

#### **Subir Comprobante** (logros de empresas no completados)
- Abre modal `ComprobanteModal` para subir foto
- Permite seleccionar imagen (JPG, PNG, máx 5MB)
- Vista previa de la imagen antes de enviar
- Campo opcional de descripción
- Al enviar:
  1. Guarda el comprobante en el logro
  2. Incrementa el progreso (+1)
  3. Actualiza mockDB y localStorage
  4. Muestra toast de confirmación
  5. Si completa el logro, muestra toast especial de desbloqueo

#### **Continuar Progreso** (logros generales no completados)
- Redirige a la página relevante según el tipo:
  - `registro` → `/user/administrar-registros`
  - `ahorro` → `/user/dashboard`
  - `presupuesto` → `/user/presupuestos`
  - `empresa` → Abre modal de comprobante

## Estilos Destacados

### CSS Variables Usadas
- Colores principales: `#1a2a3a` (oscuro), `#ffd700` (oro)
- Transiciones suaves en hover
- Sombras con múltiples niveles

### Efectos Especiales
- Badge diagonal rotado para logros completados
- Gradiente dorado en la barra de progreso
- Animación de rayas diagonal en la barra
- Efecto de elevación en hover

## Integración con el Sistema

### Rutas
La página se accede a través de:
```
/user/logros
```

### Navegación
- Está incluida en el `UserLayout`
- Aparece en el sidebar con el label "Logros y Recompensas"
- Ruta definida en `App.jsx`

### Contexto
Utiliza `AuthContext` para:
- Obtener el usuario actual
- Obtener el perfil actual
- Verificar estado de autenticación

## Sistema de Comprobantes

### ComprobanteModal
Modal interactivo para subir comprobantes de transacciones:

**Características:**
- Drag & drop o selección de archivo
- Vista previa de imagen antes de enviar
- Validación: solo imágenes, máx 5MB
- Campo de descripción opcional
- Información del logro visible en el modal
- Instrucciones claras sobre qué subir

**Flujo de Uso:**
1. Usuario hace click en "Subir Comprobante"
2. Se abre el modal con info del logro
3. Usuario selecciona/arrastra imagen del recibo
4. Vista previa aparece
5. Opcionalmente agrega descripción
6. Click en "Subir Comprobante"
7. Sistema simula upload (1.5s)
8. Comprobante se guarda en el logro
9. Progreso se incrementa
10. Modal se cierra y muestra toast de éxito

**Tipos de Comprobantes Aceptados:**
- Foto de recibo/factura física
- Comprobante de depósito bancario
- Captura de pantalla de transacción
- Ticket digital de la empresa

## Mejoras Futuras

1. ✅ **Modal de Recompensas**: Implementado con ComprobanteModal
2. ✅ **Sistema de Comprobantes**: Implementado con validación de imágenes
3. ✅ **Logros de Empresas**: Integrado con cupones reales
4. **Verificación Admin**: Panel para admin verifique comprobantes subidos
5. **API de Upload**: Integrar con servicio real de almacenamiento (AWS S3, Cloudinary)
6. **Códigos de Cupón**: Generar códigos únicos de cupón al completar logros
7. **Notificaciones Push**: Notificar cuando se desbloquea un logro
8. **Animaciones de Desbloqueo**: Confetti o celebración visual
9. **Compartir en Redes**: Botón para compartir logros en redes sociales
10. **Historial de Logros**: Línea de tiempo con todos los logros desbloqueados
11. **Sistema de Niveles**: Agregar niveles globales basados en logros completados
12. **Integración con APIs de Empresas**: Conectar con APIs reales de McDonald's, Uber, etc.

## Notas Técnicas

- Usa CSS Modules para evitar conflictos de estilos
- Los logros se crean automáticamente al crear un perfil (ver `mockDatabase.js`)
- El progreso se calcula automáticamente basado en las transacciones del usuario
- El componente es totalmente responsivo y sigue el patrón de diseño del resto de la aplicación

## Testing

Para probar la página:
1. Iniciar sesión con un usuario válido
2. Navegar a "Logros y Recompensas" en el sidebar
3. Verificar que se muestren los logros del perfil actual
4. Probar los filtros (Todos, Completados, En Progreso)
5. Verificar las animaciones de la barra de progreso
6. Hacer click en los botones de acción y verificar navegación
