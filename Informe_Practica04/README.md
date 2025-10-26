## ESCUELA POLITECNICA NACIONAL -  FACULTAD DE INGENIERIA ELECTRICA Y ELECTRONICA - APLICACIONES WEB Y MOVILES

# Informe 04
# Finaizen - Gestión Inteligente de Finanzas Personales

## Descripción breve del objetivo de la práctica

- Nombre de la aplicación: Finaizen
- Ubicación del código: carpeta `Finaizen/` (HTML, CSS y JS del prototipo)

Esta práctica tuvo como objetivo aplicar CSS avanzado (Flexbox y Grid) para consolidar un prototipo responsivo del proyecto Finaizen y cerrar el primer Sprint.

Los que se consiguio para esta practica fue:

- Estructura de layout con CSS Grid en secciones de tarjetas y paneles, por ejemplo:
	- `src/css/style/pages/dashboard_admin.css`: grid de 3 columnas para tarjetas de resumen.
	- Secciones con grid fluido usando `repeat(auto-fit, minmax(...))` en páginas como `gestion_usuarios.css`, `registro_seguridad.css`, `reportes_soporte.css` y `supervision_categorias.css`.
- Componentes reutilizables con Flexbox:
	- `src/css/style/components/sidebar.css`: sidebar fija y colapsable, compuesta con Flexbox.
	- Contenedores de filtros, cabeceras y listas construidos con Flexbox en varias vistas.
- Diseño responsivo:
	- Media queries aplicadas en páginas clave.
	- Patrones de Grid responsivo para adaptar columnas de tarjetas entre tablet y desktop.
- Organización modular del CSS: `style/base`, `style/components`, `style/pages` para facilitar mantenibilidad.
- Se dejaron referencias preparadas a variables CSS en algunas vistas, con miras a centralizar un sistema de diseño en una siguiente iteración.


## Conclusiones y recomendaciones
### Conclusiones

- Flexbox y Grid permiten componer layouts consistentes y responsivos de forma clara, especialmente en dashboards y listados. Además, el uso de Grid con `auto-fit` y `minmax` facilita cuadrículas fluidas que escalan bien entre tablet y desktop sin reglas complejas.
- En conclusion, la modularización por páginas y componentes agiliza la lectura del código, la evolucion del proyecto y la aplicación de posibles cambios que puedan presentarse a un futuro.

### Recomendaciones

- Es recomendable definir variables CSS globales (paleta de colores, espaciados, tipografía) y reemplazar literales en los estilos actuales. Además, es posible adoptar tipografía fluida con `clamp()` para mejorar la legibilidad entre breakpoints.
- Es importante reforzar la accesibilidad: contraste de color, estados de foco visibles (`:focus`), y, cuando aplique, atributos/roles ARIA en componentes interactivos. Y tambien, probar visualmente en puntos de quiebre frecuentes (768px, 1024px, 1280px) y en navegadores principales.



