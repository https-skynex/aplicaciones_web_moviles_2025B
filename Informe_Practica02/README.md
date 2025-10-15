## ESCUELA POLITECNICA NACIONAL -  FACULTAD DE INGENIERIA ELECTRICA Y ELECTRONICA - APLICACIONES WEB Y MOVILES

# Informe 02
# Finaizen - Gestión Inteligente de Finanzas Personales

## Descripción Breve del objetivo de la práctica.
En la práctica, se pulió lás características de la aplicación y se plantea ya la creación de los primeros mockups del proyecto. 

## Conclusiones y recomendaciones
### Conclusiones
- Se obtuvieron los objetivos principales en los que se enfocará el proyecto. Un foco principal es brindar al usuario una asistencia en sus finanzas creando un perfil financiero, junto con recordatorios de pagos e ingresos, como también realizar una planficación de ahorro para ofrecer la posibilidad de simular metas alcanzables y motivar al usuario.
- Finalmente, se obtienen los primeros bocetos e ideas para los mockups del proyecto, tomando en cuenta las historias de usuario y los casos de uso, comotambié una redefinición del diagrama UML del proyecto.
### Recomendaciones
- Una visión más detallada a como se está desarrollando el proyecto, pues aún existen vacíos y poco tiempo de retroalimentación.
- Se recomienda priorizar un poco más en la sencillez para que el usuario se conecte y familiarice con una aplicación que le va a asistir en sus finanzas con notificaciones.

## Historias de Usuario
- HU1: Como usuario quiero registrar y clasificar mis gastos automáticamente para entender en qué gasto más.
- HU2: Como usuario quiero fijar metas de ahorro y recibir seguimiento automático para alcanzarlas.
- HU3: Como usuario quiero recibir alertas si gasto más de lo planeado.
- HU4: Como usuario quiero ver mis finanzas en un dashboard con gráficos y métricas.
- HU5: Como usuario quiero recibir consejos personalizados y recordatorios de pagos.
- HU6: Como usuario quiero manejar varios perfiles (personal, familiar, negocio) dentro de la misma cuenta.
- HU7: Como usuario quiero exportar mis datos y reportes financieros.
- HU8: Como usuario quiero personalizar mis categorías y umbrales de alertas.
- HU9: Como usuario quiero usar la aplicación desde el teléfono o la computadora sin perder funcionalidad.
- HU10: Como usuario quiero que mis datos financieros estén protegidos de accesos no autorizados.

## Casos de uso

### CU-01: Gestionar Cuenta de Usuario
**Descripción:**  
Permite al usuario crear una nueva cuenta en la aplicación y acceder a ella posteriormente.  
Incluye los procesos de **registro** e **inicio de sesión**, asegurando el control de acceso al sistema.

**Actor principal:** Usuario  
**Objetivo:** Garantizar que cada usuario tenga una cuenta personalizada y segura.  
**Precondición:** El usuario debe contar con acceso a internet.  
**Postcondición:** La cuenta queda registrada y el usuario puede iniciar sesión.

**Flujo Principal (Registro):**
1. El usuario selecciona la opción **"Registrarse"**.  
2. El sistema solicita un nombre de usuario, correo electrónico y contraseña.  
3. El usuario ingresa los datos solicitados y los envía.  
4. El sistema valida que el correo y nombre de usuario no existan previamente.  
5. El sistema crea la cuenta de usuario y la almacena en la base de datos.  
6. El sistema notifica que el registro fue exitoso y redirige al usuario.

**Flujos Alternativos:**
- Si el correo ya está en uso o la contraseña no cumple los requisitos, el sistema muestra un mensaje de error y solicita corregir los datos.

---
### CU-02: Registrar Ingresos y Egresos
**Descripción:**  
El usuario puede **registrar, clasificar y gestionar** sus transacciones financieras (ingresos y egresos).  
También puede definir su **periodicidad** y **categoría** para un mejor control del presupuesto.

**Actor principal:** Usuario  
**Objetivo:** Controlar el flujo de dinero personal y obtener un panorama claro de los gastos.  
**Precondición:** El usuario debe haber iniciado sesión.  
**Postcondición:** Las transacciones quedan almacenadas y clasificadas correctamente.

**Flujo Principal:**
1. El usuario selecciona la opción **“Gestionar perfiles”** y crea uno nuevo (ej. "Finanzas Familiares").  
2. Dentro del perfil, elige **“Registrar Ingreso”**.  
3. El sistema muestra un formulario con monto, descripción, fecha y periodicidad.  
4. El usuario completa y guarda el ingreso.  
5. El sistema almacena la información en la base de datos.  
6. El usuario selecciona **“Registrar Gasto”**.  
7. El sistema muestra un formulario similar con un campo adicional de clasificación (“Prioritario” o “Secundario”).  
8. El usuario completa los datos y guarda el gasto.  
9. El sistema almacena el gasto en la base de datos.

**Flujos Alternativos:**
- Si el usuario no ingresa el monto o deja campos vacíos, el sistema muestra un error y no guarda la transacción.

---
### CU-03: Simular Plan de Ahorro
**Descripción:**  
Permite al usuario **establecer un objetivo de ahorro** (porcentaje o monto fijo) y **verificar si es alcanzable** con base en sus ingresos y gastos actuales.  
El sistema puede ofrecer **recomendaciones personalizadas** para mejorar la planificación financiera.

**Actor principal:** Usuario  
**Objetivo:** Facilitar la planificación y cumplimiento de metas de ahorro.  
**Precondición:** El usuario debe tener ingresos y egresos registrados.  
**Postcondición:** Se muestra una simulación o análisis de viabilidad del plan de ahorro.

**Flujo Principal:**
1. El usuario selecciona la opción **“Simulación de Ahorro”**.  
2. El sistema solicita definir un objetivo (ej. 20% o $50 mensuales).  
3. El usuario ingresa el objetivo y confirma.  
4. El sistema calcula el balance total (**Ingresos - Gastos**).  
5. El sistema compara el balance con el objetivo de ahorro.  
6. Si el balance es suficiente, indica que se cumple el objetivo.  
7. Si no es suficiente, muestra cuánto falta para alcanzarlo.  
8. El sistema analiza los gastos secundarios y ofrece sugerencias de reducción.

**Flujos Alternativos:**
- Si el usuario no tiene datos financieros suficientes, el sistema muestra un mensaje indicando que debe registrar ingresos y gastos antes de simular.

---
### CU-04: Consultar Asistente Virtual (IA)
**Descripción:**  
El usuario puede **interactuar con un asistente de inteligencia artificial**, que responde preguntas relacionadas con sus finanzas personales o temas financieros generales.

**Actor principal:** Usuario  
**Objetivo:** Brindar una herramienta de apoyo automatizada para mejorar la gestión financiera. **Precondición:** El usuario debe haber iniciado sesión.  
**Postcondición:** Se proporciona una respuesta o sugerencia adecuada a la consulta del usuario.

**Flujo Principal:**
1. El usuario abre la ventana del **Asistente Virtual**.  
2. Escribe una pregunta (ej. “¿En qué categoría gasté más este mes?”).  
3. El sistema analiza la pregunta.  
4. Si es sobre datos personales, consulta la base de datos del usuario.  
5. Si es general, usa su base de conocimiento.  
6. El sistema genera y muestra la respuesta en la interfaz del chat.

**Flujos Alternativos:**
- Si no se encuentra información suficiente, el asistente sugiere acciones o fuentes externas para ampliar la respuesta.

---
### CU-05: Visualizar Resumen Financiero
**Descripción:**  
Al acceder al panel principal, el usuario puede **ver un resumen visual de su situación financiera** mediante gráficos, métricas y estadísticas.  
El sistema presenta los **ingresos, egresos, metas y ahorros** de manera clara y comprensible.

**Actor principal:** Usuario  
**Objetivo:** Facilitar la comprensión de la situación financiera actual.  
**Precondición:** Debe existir información financiera registrada.  
**Postcondición:** Se muestran correctamente los indicadores financieros del usuario.

**Flujo Principal:**
1. El usuario inicia sesión y accede al Dashboard.  
2. El sistema recopila los datos del período actual.  
3. Genera gráficos de pastel (distribución de gastos) y barras (ingresos vs egresos).  
4. Muestra indicadores clave (por ejemplo: superávit o déficit).  
5. El usuario puede filtrar o actualizar los datos mostrados.

**Flujos Alternativos:**
- Si no existen datos financieros, el sistema muestra un mensaje invitando al usuario a registrar sus primeras transacciones.

## Diagramas UML
![Diagrama UML](https://github.com/user-attachments/assets/3d58f13c-1872-491e-82a4-93535274d102)


## Elaboración de los primeros mockups de la aplicación que representen la interfaz de usuario en Microsoft Excel.
A continuanción se muestra un link para accerder a Excel:
https://epnecuador-my.sharepoint.com/:f:/g/personal/kevin_perez05_epn_edu_ec/EnnfXoCeDrxKmG3bg9Y2q4EBNl9aJuBkrLpvT_Ms12ApXQ?e=uRER7C

