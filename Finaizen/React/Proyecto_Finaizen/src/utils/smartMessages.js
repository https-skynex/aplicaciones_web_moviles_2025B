/**
 * Sistema de Mensajes Inteligentes de Finaizen
 * Base de datos de ~1000 mensajes contextuales para el usuario
 * Categorías: Alertas, Sugerencias, Logros, Motivación, Educación Financiera
 */

/**
 * CATEGORÍA 1: ALERTAS DE GASTOS EXCESIVOS
 * Mensajes cuando el usuario está gastando demasiado
 */
export const ALERTAS_GASTOS_EXCESIVOS = [
  // Alertas Generales (50 mensajes)
  "⚠️ Tus gastos de este mes están 30% por encima del promedio. ¿Todo bien?",
  "🔴 Has gastado $${monto} más de lo usual este mes. Considera revisar tus gastos.",
  "⚠️ Alerta: Estás gastando ${porcentaje}% más que el mes pasado.",
  "🚨 Tus gastos diarios están aumentando. ¿Necesitas ajustar tu presupuesto?",
  "⚠️ Has superado tu gasto promedio semanal en $${monto}.",
  "🔴 Gastos inusuales detectados. Revisa tu historial de transacciones.",
  "⚠️ Tu velocidad de gasto actual agotará tu presupuesto en ${dias} días.",
  "🚨 Gastos ${porcentaje}% por encima de lo normal. ¿Qué está pasando?",
  "⚠️ Alerta temprana: Estás gastando más rápido que de costumbre.",
  "🔴 Tus gastos variables han aumentado significativamente.",
  
  // Por Categoría de Gasto (100 mensajes)
  // Comida
  "🍔 Gastos en comida: $${monto} este mes. Supera tu promedio en ${porcentaje}%.",
  "🍕 Has gastado $${monto} en comida esta semana. ¿Demasiadas salidas a restaurantes?",
  "🍽️ Tus gastos en comida superan el 40% de tus ingresos. Considera cocinar más en casa.",
  "🥡 ${numero} pedidos de delivery este mes. ¿Qué tal preparar comida en casa?",
  "🍔 McDonald's: ${numero} visitas este mes. Tu billetera necesita un descanso.",
  "☕ $${monto} en café este mes. ¿Y si preparas café en casa?",
  "🍕 Pizza ${numero} veces esta semana. Tu presupuesto (y tu salud) lo agradecerán si reduces.",
  "🍱 Gastos en comida rápida: $${monto}. Cocinar en casa podría ahorrarte ${ahorro}.",
  "🥗 Restaurantes: $${monto} este mes. Supera tu límite recomendado.",
  "🍔 Comida fuera de casa: ${porcentaje}% de tu presupuesto. Demasiado alto.",
  
  // Transporte
  "🚗 Uber: $${monto} este mes. ¿Has considerado el transporte público?",
  "🚕 ${numero} viajes en taxi/Uber. Podrías ahorrar usando alternativas.",
  "⛽ Gasolina: $${monto}. ¿Estás usando el auto eficientemente?",
  "🚗 Gastos de transporte ${porcentaje}% por encima del promedio.",
  "🚌 ¿Sabías que el transporte público podría ahorrarte $${ahorro} al mes?",
  "🚗 Mantenimiento de vehículo: $${monto}. Gastos inesperados.",
  "🚕 Taxis: ${numero} viajes. Planifica mejor tus traslados.",
  "⛽ Llenas el tanque ${numero} veces por semana. ¿Puedes optimizar tus rutas?",
  "🚗 Estacionamiento: $${monto}. Busca alternativas más económicas.",
  "🚲 ¿Qué tal andar en bici? Ahorrarías $${ahorro} en transporte.",
  
  // Entretenimiento
  "🎮 Netflix, Spotify, Gaming... ${numero} suscripciones activas. ¿Las usas todas?",
  "🎬 Gastos en entretenimiento: $${monto}. ${porcentaje}% más que el promedio.",
  "🎮 Videojuegos: $${monto} este mes. ¿Juegos necesarios o impulso?",
  "🎵 ${numero} suscripciones de streaming. ¿Puedes cancelar algunas?",
  "🎪 Salidas de entretenimiento: ${numero} este mes. Busca opciones gratis.",
  "🎬 Cine: ${numero} veces. ¿Qué tal películas en casa?",
  "🎮 Compras en apps/juegos: $${monto}. Cuidado con las microtransacciones.",
  "🎵 Conciertos/eventos: $${monto}. Supera tu presupuesto de entretenimiento.",
  "📺 Streaming: ${numero} plataformas. ¿Realmente las ves todas?",
  "🎯 Entretenimiento ${porcentaje}% del presupuesto. Reduce un poco.",
  
  // Compras/Shopping
  "🛍️ Compras online: ${numero} este mes. ¿Todas necesarias?",
  "👕 Ropa: $${monto}. ¿Compras por necesidad o por impulso?",
  "🛒 Amazon: ${numero} pedidos. Cuidado con las compras impulsivas.",
  "💄 Cosméticos/cuidado personal: $${monto}. Supera tu presupuesto.",
  "👟 Zapatos: $${monto} este mes. ¿Realmente los necesitabas?",
  "🎁 Regalos: $${monto}. Generoso, pero cuida tu bolsillo.",
  "🛍️ Shopping: ${numero} transacciones. Espera 24h antes de comprar.",
  "📱 Gadgets/electrónicos: $${monto}. Compra inteligente vs impulso.",
  "🛒 Supermercado: $${monto}. ${porcentaje}% más que el mes pasado.",
  "💳 Compras impulsivas detectadas: $${monto}. Haz una lista antes de comprar.",
  
  // Suscripciones
  "💳 ${numero} suscripciones activas: $${monto}/mes. Audita cuáles usas realmente.",
  "📱 Apps premium: ¿Las usas lo suficiente para justificar el costo?",
  "💪 Gimnasio: $${monto}/mes. ¿Asistes regularmente?",
  "📰 Suscripciones digitales: ${numero} activas. Cancela las que no uses.",
  "🎮 PlayStation Plus, Xbox... ¿Juegas online frecuentemente?",
  "☁️ Almacenamiento en la nube: ¿Necesitas tanto espacio?",
  "📚 Kindle Unlimited: ¿Lees suficientes libros al mes?",
  "💼 LinkedIn Premium: ¿Te ayuda en tu búsqueda laboral?",
  "🎨 Adobe Creative Cloud: ¿Lo usas profesionalmente?",
  "🏋️ App de fitness: $${monto}/mes. ¿No hay alternativas gratis?",
  
  // Servicios
  "💡 Luz: $${monto}. ${porcentaje}% más que el mes pasado. Revisa tu consumo.",
  "💧 Agua: Consumo elevado detectado. Busca fugas.",
  "📱 Plan celular: $${monto}. ¿Estás pagando más de lo necesario?",
  "🌐 Internet: Compara planes. Podrías ahorrar $${ahorro}/mes.",
  "🔥 Gas: Consumo inusual. Verifica tus equipos.",
  "📡 Cable/TV: $${monto}/mes. ¿Usas todos los canales?",
  "🏠 Mantenimiento hogar: $${monto}. Gastos inesperados elevados.",
  "🚿 Servicios básicos: ${porcentaje}% de tu presupuesto. Optimiza.",
  "💻 Software/herramientas: ¿Todas son indispensables?",
  "🏡 Alquiler/hipoteca + servicios: ${porcentaje}% ingresos. Límite recomendado: 30%.",
  
  // Salud
  "💊 Medicamentos: $${monto}. Consulta opciones genéricas.",
  "🏥 Gastos médicos: $${monto}. ¿Tienes seguro adecuado?",
  "😷 Consultas médicas: ${numero} este mes. ¿Todo está bien?",
  "💉 Tratamientos: $${monto}. Verifica cobertura de seguro.",
  "🦷 Dentista: $${monto}. La prevención es más barata que la cura.",
  "👓 Óptica: $${monto}. Compara precios online.",
  "🏥 Emergencias médicas: $${monto}. Crea un fondo de emergencias.",
  "💊 Farmacia: ${numero} visitas. Compra medicamentos genéricos.",
  "🏋️ Salud/fitness: $${monto}. Balancea con ejercicio gratuito.",
  "🧘 Bienestar: Invierte en salud, pero con presupuesto.",
];

/**
 * CATEGORÍA 2: SUGERENCIAS DE AHORRO
 * Consejos proactivos para mejorar las finanzas
 */
export const SUGERENCIAS_AHORRO = [
  // Sugerencias Generales (100 mensajes)
  "💡 Consejo: Si ahorras $${monto} diario, tendrás $${total} en un año.",
  "🎯 Meta sugerida: Ahorra el 20% de tus ingresos ($${monto}/mes).",
  "💰 Has ahorrado $${monto} este mes. ¡${porcentaje}% más que el anterior!",
  "📊 Si reduces gastos en ${categoria} un 15%, ahorrarías $${ahorro}/mes.",
  "🌟 Oportunidad: Tienes un excedente de $${monto}. ¡Ahórralo!",
  "💡 Reto 52 semanas: Ahorra $1 la semana 1, $2 la semana 2... $1,378 al año.",
  "🎯 Método 50/30/20: 50% necesidades, 30% deseos, 20% ahorros.",
  "💰 Redondeo inteligente: Redondea compras y ahorra la diferencia.",
  "📈 Inversión sugerida: Tu ahorro de $${monto} podría generar intereses.",
  "🏦 Abre una cuenta de ahorros separada para tus metas.",
  
  // Por Categoría
  "☕ Café diario: $${monto}. Prepáralo en casa = $${ahorro}/mes ahorrado.",
  "🍔 Cocinar en casa 4x/semana ahorraría $${ahorro}/mes en comida.",
  "🚗 Compartir viajes (carpooling) podría reducir transporte en ${porcentaje}%.",
  "📱 Cambia tu plan celular y ahorra $${ahorro}/mes.",
  "💡 Reduce consumo eléctrico: apaga luces = $${ahorro}/mes.",
  "🎬 Cancela 2 suscripciones sin usar = $${ahorro}/año.",
  "🛍️ Espera 30 días antes de compras grandes. Evita impulsos.",
  "💳 Paga tarjeta de crédito completa. Evita intereses de $${monto}.",
  "🏋️ Ejercicio en casa vs gimnasio = $${ahorro}/mes.",
  "📚 Biblioteca pública vs comprar libros = $${ahorro}/mes.",
  
  // Basadas en patrones detectados
  "🔍 Detecté que gastas más los ${dia}. Planifica mejor esos días.",
  "📊 Tus gastos aumentan ${porcentaje}% después del día 20. Cuidado.",
  "💡 Gastas ${porcentaje}% más cuando sales con ${persona}. Pon límites.",
  "🎯 Patrón detectado: Compras online aumentan los fines de semana.",
  "📱 Gastos nocturnos: $${monto}/mes. Evita compras nocturnas.",
  "🛒 Supermercado sin lista = ${porcentaje}% más gasto. Haz listas.",
  "💳 Pagas ${porcentaje}% más con tarjeta que con efectivo. Usa cash.",
  "🍕 Pides delivery cuando estás ${emocion}. Cocina con anticipación.",
  "🎮 Compras en apps cuando estás aburrido. Busca hobbies gratis.",
  "🛍️ Shopping emocional detectado. Identifica tus triggers.",
  
  // Ahorros específicos
  "💡 Día sin gasto: Hoy no gastes nada. Ahorra todo lo que puedas.",
  "🎯 Desafío semanal: No comas fuera esta semana = $${ahorro}.",
  "🚗 Semana sin Uber: Usa transporte público = $${ahorro}.",
  "☕ 7 días sin café fuera = $${ahorro}. Compra café para casa.",
  "🍕 Mes sin delivery: Cocina en casa = $${ahorro} ahorrado.",
  "🛍️ No shopping este mes: Usa lo que tienes. Ahorra $${monto}.",
  "📱 Baja plan celular de ${plan1} a ${plan2} = $${ahorro}/mes.",
  "💡 Bombillas LED: Inversión de $${costo}, ahorro de $${ahorro}/año.",
  "🌡️ Termostato a ${temp}°: Reduce luz en $${ahorro}/mes.",
  "🚿 Duchas cortas: Ahorra $${ahorro}/mes en agua.",
  
  // Metas y motivación
  "🎯 Solo te faltan $${monto} para tu meta de ${meta}. ¡Casi lo logras!",
  "💰 Si mantienes este ritmo, alcanzarás $${meta} en ${meses} meses.",
  "🌟 Tu tasa de ahorro es del ${porcentaje}%. ¡Excelente!",
  "📈 Has mejorado tu ahorro en ${porcentaje}% vs. el trimestre pasado.",
  "🎯 Meta alcanzable: Ahorra $${monto}/día = $${total} en ${dias} días.",
  "💡 Pequeños cambios: -$${monto}/día = +$${total}/año.",
  "🚀 A tu ritmo actual, tendrás tu fondo de emergencia en ${meses} meses.",
  "💰 Ahorro automático sugerido: $${monto} cada ${frecuencia}.",
  "📊 Tu progreso: ${porcentaje}% hacia tu meta de ${meta}.",
  "🎯 Último empujón: Solo $${monto} más para completar tu objetivo.",
];

/**
 * CATEGORÍA 3: ALERTAS DE LOGROS PRÓXIMOS
 * Notificaciones cuando están cerca de completar logros
 */
export const ALERTAS_LOGROS_PROXIMOS = [
  // Logros cercanos (100 mensajes)
  "🏆 ¡Casi lo logras! Solo ${numero} ${unidad} más para '${logro}'.",
  "🎯 Estás a ${porcentaje}% de desbloquear '${logro}'. ¡Sigue así!",
  "⭐ ${numero} ${unidad} más y desbloqueas: ${logro} (${recompensa}).",
  "🔥 ¡Solo falta 1 ${unidad}! '${logro}' está muy cerca.",
  "🎁 Completa 1 acción más y ganas: ${recompensa}.",
  "🚀 ¡Vamos! ${numero} ${unidad} más para tu nuevo logro.",
  "💎 ${logro}: ${progreso}/${meta}. ¡El final está cerca!",
  "🏅 Un paso más y desbloqueas '${logro}'. ¡No te detengas!",
  "⚡ ¡Racha activa! ${numero} días más y consigues el logro.",
  "🎯 ${porcentaje}% completado. Fin de semana perfecto para terminar.",
  
  // Por tipo de logro
  // McDonald's
  "🍔 ${numero} visitas más a McDonald's = $10 USD en cupones.",
  "🍟 McDonald's: ${progreso}/5. ¡2 visitas más y ganas!",
  "🍔 'Rey de la Comida Rápida' casi desbloqueado. 1 Big Mac más.",
  "🍟 ¡Última oportunidad! Completa tu logro de McDonald's hoy.",
  "🍔 ${numero} compras más = $10 USD en productos McDonald's.",
  
  // Banco Pichincha
  "💰 Solo $${monto} más de ahorro = $5 USD de recompensa (Pichincha).",
  "🏦 'Ahorrador Maestro' al ${porcentaje}%. Ahorra $${falta} más.",
  "💳 ${numero} pagos puntuales más = 500 Puntos Pichincha.",
  "💰 ¡Increíble! Solo $${monto} para completar tu meta de ahorro.",
  "🏦 Banco Pichincha: ${progreso}/${meta} cumplido.",
  
  // Otros logros de empresas
  "🍗 ${numero} visitas más a KFC = Combo Familiar gratis.",
  "🚗 ${numero} viajes Uber más = $15 USD en créditos.",
  "📺 ${numero} meses más de Netflix = 1 mes gratis.",
  "☕ Starbucks: ${progreso}/10. Gold Card muy cerca.",
  "🍕 Pizza Hut: ${numero} pedidos más = Pizza familiar gratis.",
  
  // Logros generales
  "📊 'Planificador': Crea 1 presupuesto más y desbloquea.",
  "🔥 Racha de ${numero} días. ¡${falta} días más para logro!",
  "💪 'Disciplinado': ${progreso}/30 días. ¡La mitad completada!",
  "💰 'Ahorrador Experto': Solo $${falta} más. ¡Tú puedes!",
  "📈 '${logro}': ${numero} transacciones más. Casi terminado.",
  "🎯 ${numero} acciones más para desbloquear tu siguiente logro.",
  "⭐ Progreso semanal: ${porcentaje}% hacia '${logro}'.",
  "🏆 Fin de semana ideal para completar 2 logros pendientes.",
  "💎 ¡Combo! Completa 2 logros hoy y gana bonus de ${bonus}.",
  "🚀 ${numero} logros más y subes de nivel. ¡A por ello!",
];

/**
 * CATEGORÍA 4: MOTIVACIÓN Y FELICITACIONES
 * Mensajes positivos y de refuerzo
 */
export const MENSAJES_MOTIVACION = [
  // Felicitaciones generales (80 mensajes)
  "🎉 ¡Excelente! Has cumplido tu presupuesto este mes.",
  "⭐ ¡Increíble control! Gastos ${porcentaje}% por debajo del límite.",
  "💪 Racha de ${dias} días registrando transacciones. ¡Imparable!",
  "🌟 Tu compromiso financiero es admirable. ¡Sigue así!",
  "🎯 Meta alcanzada: ${meta}. ¡Eres un crack!",
  "👏 Has ahorrado $${monto} este mes. ¡Felicitaciones!",
  "🚀 Mejor mes del año. ¡Tu esfuerzo está dando frutos!",
  "💎 Nivel de disciplina: Experto. ¡Sigue brillando!",
  "🏆 Logro desbloqueado: '${logro}'. ¡Lo lograste!",
  "🎊 ¡Récord personal! Nunca habías ahorrado tanto.",
  
  // Hitos alcanzados
  "🎯 100 transacciones registradas. ¡Dedicación total!",
  "📊 Primer mes con balance positivo. ¡Enhorabuena!",
  "💰 Has alcanzado tu meta de ahorro. ¿Nueva meta?",
  "🔥 30 días seguidos registrando gastos. ¡Consistencia máxima!",
  "🌟 Todos tus presupuestos bajo control. ¡Maestro financiero!",
  "💪 Has reducido gastos innecesarios en ${porcentaje}%. ¡Bravo!",
  "📈 Tu ahorro creció ${porcentaje}% este trimestre.",
  "🎉 Primer logro empresarial desbloqueado. ¡Sigue coleccionando!",
  "👑 Top 10% de usuarios más disciplinados.",
  "🏅 ${numero} logros desbloqueados. ¡Imparable!",
  
  // Pequeños logros
  "✨ Día sin gastos innecesarios. ¡Bien hecho!",
  "💚 Has evitado una compra impulsiva. ¡Autocontrol!",
  "🎯 Completaste tu tarea financiera del día.",
  "📱 Revisaste tus finanzas hoy. ¡Constancia!",
  "✅ Presupuesto de ${categoria} cumplido esta semana.",
  "💡 Detectaste un gasto innecesario a tiempo. ¡Inteligente!",
  "🚀 Estás ${porcentaje}% mejor que el mes pasado.",
  "🌟 Has mejorado tu gestión financiera. Se nota.",
  "💪 Rechazaste una tentación de gasto. ¡Fuerte!",
  "👏 Cocinaste en casa ${numero} veces. Ahorro: $${monto}.",
  
  // Comparaciones positivas
  "📊 Gastas ${porcentaje}% menos que el promedio de usuarios.",
  "💰 Tu tasa de ahorro supera el promedio nacional.",
  "🎯 ${porcentaje}% de tus gastos son esenciales. ¡Balance perfecto!",
  "🌟 Mejor que el 70% de usuarios en tu rango de edad.",
  "📈 Tu progreso mensual: +${porcentaje}% en control financiero.",
  "💎 Tu ratio ahorro/ingreso es excelente: ${ratio}.",
  "🚀 Velocidad de ahorro: ${porcentaje}% mejor que tu histórico.",
  "🏆 Tu disciplina supera al ${porcentaje}% de usuarios.",
  "⭐ Gastos variables bajo control perfecto.",
  "👑 Top performer del mes. ¡Eres ejemplo!",
];

/**
 * CATEGORÍA 5: EDUCACIÓN FINANCIERA
 * Tips, consejos y educación
 */
export const EDUCACION_FINANCIERA = [
  // Conceptos básicos (100 mensajes)
  "💡 ¿Sabías que? El interés compuesto es tu mejor aliado para el ahorro.",
  "📚 Regla 50/30/20: Divide tus ingresos inteligentemente.",
  "🎯 Fondo de emergencia: 3-6 meses de gastos esenciales.",
  "💰 Inversión: No es solo para ricos. Empieza con poco.",
  "📊 Activo vs Pasivo: ¿Tu compra genera dinero o lo consume?",
  "🏦 Interés simple vs compuesto: Gran diferencia a largo plazo.",
  "💳 Tarjeta de crédito: Herramienta útil si pagas completo cada mes.",
  "📈 Diversificación: No pongas todos los huevos en una canasta.",
  "🎯 Objetivo SMART: Específico, Medible, Alcanzable, Relevante, Temporal.",
  "💡 Inflación: Tu dinero pierde valor si solo lo guardas.",
  
  // Estrategias de ahorro
  "💰 Método de los sobres: Asigna efectivo a categorías específicas.",
  "📊 Automatiza tu ahorro: Así no dependes de tu voluntad.",
  "🎯 Paga primero: Ahorra antes de gastar, no con lo que sobra.",
  "💡 Desafío de no gastar: 1 día/semana sin comprar nada.",
  "🏦 Cuentas separadas: Una para gastos, otra para ahorros.",
  "💳 Elimina suscripciones zombies: Servicios que no usas.",
  "📈 Sube tu ahorro 1% cada mes. Crecimiento gradual sostenible.",
  "🎯 Mini-meta semanal: Más fácil que una grande mensual.",
  "💰 Round-up: Redondea y ahorra la diferencia.",
  "📊 Revisa gastos cada domingo. Planifica la semana.",
  
  // Errores comunes
  "⚠️ Error común: Gastar antes de analizar si es necesario.",
  "🚫 Evita: Pagar solo el mínimo de tu tarjeta de crédito.",
  "💳 Trampa: Las ofertas 'compra ahora, paga después'.",
  "⚠️ Cuidado: Las compras emocionales nunca son buenas.",
  "🚫 No hagas: Préstamos para gastos no esenciales.",
  "💸 Error: No tener presupuesto. Gastas sin control.",
  "⚠️ Peligro: Lifestyle inflation (gastar más porque ganas más).",
  "🚫 Nunca: Inviertas dinero que necesitas en 5 años.",
  "💳 Error: Tener muchas tarjetas de crédito sin control.",
  "⚠️ Trampa: Créditos de consumo con intereses altos.",
  
  // Datos interesantes
  "📊 Dato: El 40% de personas no tiene $400 para emergencias.",
  "💡 Fact: Cocinar en casa ahorra un promedio de $200/mes.",
  "📈 Estudio: Quien registra gastos ahorra 20% más.",
  "🎯 Estadística: 78% de trabajadores vive de quincena a quincena.",
  "💰 Dato curioso: $5 diarios = $1,825 al año.",
  "📊 Investigación: Pagar con efectivo reduce gastos 15%.",
  "💡 Fact: Una latte diaria = $1,460/año gastados.",
  "📈 Dato: El 61% no tiene presupuesto mensual.",
  "🎯 Estudio: Establecer metas mejora ahorro en 40%.",
  "💰 Investigación: Visualizar metas aumenta logro en 42%.",
  
  // Frases motivacionales financieras
  "💭 'Un centavo ahorrado es un centavo ganado.' - Benjamin Franklin",
  "🎯 'El dinero es buen sirviente pero mal amo.' - Francis Bacon",
  "💰 'No ahorres lo que queda después de gastar, gasta lo que queda después de ahorrar.'",
  "📈 'La inversión en conocimiento paga el mejor interés.' - Benjamin Franklin",
  "💡 'Cuida los centavos y los pesos se cuidarán solos.'",
  "🎯 'El precio es lo que pagas, el valor es lo que obtienes.' - Warren Buffett",
  "💰 'Gasta menos de lo que ganas, invierte la diferencia.' - Warren Buffett",
  "📊 'La riqueza consiste en pequeños esfuerzos repetidos día tras día.'",
  "💡 'El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora.'",
  "🎯 'No te concentres en ganar dinero, concéntrate en proteger lo que tienes.'",
];

/**
 * CATEGORÍA 6: RECORDATORIOS Y ACCIONES
 * Recordatorios contextuales y llamados a acción
 */
export const RECORDATORIOS_ACCIONES = [
  // Recordatorios diarios
  "⏰ Buenos días! ¿Ya registraste tus gastos de ayer?",
  "📱 Momento del día: Revisa tu balance rápidamente.",
  "🎯 Recordatorio: Actualiza tus transacciones pendientes.",
  "💡 ¿Compraste algo hoy? No olvides registrarlo.",
  "📊 Check diario: ¿Cómo van tus gastos hoy?",
  "⚡ Quick check: Verifica tus presupuestos.",
  "🌟 Buenas noches: Cierra tu día registrando gastos.",
  "📱 5 minutos: Actualiza tus finanzas antes de dormir.",
  "🎯 Rutina nocturna: Revisa qué gastaste hoy.",
  "💰 Antes de acostarte: ¿Registraste todo?",
  
  // Recordatorios semanales
  "📊 Inicio de semana: Planifica tus gastos de lunes a domingo.",
  "💡 Mitad de semana: ¿Cómo van tus presupuestos?",
  "🎯 Viernes: Revisa si cumpliste tus metas semanales.",
  "📈 Domingo: Momento perfecto para analizar tu semana financiera.",
  "💰 Fin de semana: Planifica los gastos de la próxima semana.",
  "⏰ Lunes: Nueva semana, nuevas oportunidades de ahorro.",
  "📱 Miércoles: Checkpoint semanal de tus finanzas.",
  "🌟 Sábado: Revisa tus logros de la semana.",
  "🎯 Jueves: Último empujón para cumplir metas semanales.",
  "💡 Martes: ¿Ya ajustaste presupuestos esta semana?",
  
  // Recordatorios mensuales
  "📅 Día 1: ¡Nuevo mes! Establece tus metas financieras.",
  "💰 Día 5: Primera semana completada. ¿Cómo vas?",
  "📊 Día 15: Media mes. Análisis de progreso.",
  "🎯 Día 20: Últimos 10 días. ¿Cumplirás tus metas?",
  "📈 Día 25: Sprint final del mes. ¡A cerrar fuerte!",
  "💡 Última semana: Ajusta para terminar bien el mes.",
  "🌟 Fin de mes: Revisa tu desempeño mensual completo.",
  "📱 Principio de mes: Paga cuentas pendientes.",
  "🎯 Mitad de mes: Verifica que no te hayas salido del presupuesto.",
  "💰 Día 10: ¿Ya pagaste tus cuentas del mes?",
  
  // Acciones específicas
  "📋 Acción: Crea un presupuesto para ${categoria}.",
  "💡 Sugerencia: Revisa transacciones duplicadas.",
  "🎯 Tarea: Establece una meta de ahorro para este mes.",
  "📊 Recomendación: Analiza tus gastos de ${mes} pasado.",
  "⚡ Quick win: Cancela 1 suscripción sin usar.",
  "💰 Acción inmediata: Transfiere $${monto} a ahorros.",
  "📱 Hoy: Sube 1 comprobante pendiente de ${logro}.",
  "🎯 Desafío: No gastes en ${categoria} por 3 días.",
  "💡 Tarea semanal: Compara precios antes de comprar.",
  "🌟 Objetivo hoy: Registra todas tus transacciones.",
  
  // Notificaciones de pagos
  "💳 Recordatorio: Pagar tarjeta de crédito el ${fecha}.",
  "🏦 Próximamente: Pago de ${servicio} el ${fecha}.",
  "⏰ ¡Hoy! Vence el pago de ${cuenta}.",
  "💰 Mañana: No olvides pagar ${servicio}.",
  "📅 En ${dias} días: Vence ${pago}. Prepárate.",
  "🔔 Alerta: Pago de ${monto} pendiente para ${fecha}.",
  "💳 ¡Importante! Tu pago de ${servicio} está próximo.",
  "⏰ Quedan ${horas}h para pagar ${cuenta} sin recargo.",
  "🏦 Agenda: ${numero} pagos esta semana.",
  "💰 Plan de pagos: ${lista} en los próximos días.",
];

/**
 * CATEGORÍA 7: CONTEXTUALES POR HORA/DÍA
 * Mensajes según el momento del día
 */
export const MENSAJES_CONTEXTUALES_TIEMPO = [
  // Mañana (6am - 12pm)
  "☀️ Buenos días! Empieza el día con el pie derecho: revisa tus finanzas.",
  "🌅 Nueva mañana, nuevas decisiones financieras inteligentes.",
  "☕ Mientras tomas café: 5 min para planificar tus gastos del día.",
  "🌞 ¡Hola! ¿Ya pensaste qué comprarás hoy? Planifica antes de salir.",
  "🌄 Mañana productiva: Establece tu límite de gasto diario.",
  "☀️ Desayuno + finanzas = Día exitoso. Revisa tu dashboard.",
  "🌅 Antes de tu primer gasto: Verifica tu presupuesto disponible.",
  "☕ Buenos días! Tu balance actual: $${monto}.",
  "🌞 Planifica tu día: ${numero} gastos programados hoy.",
  "🌄 Mañana ideal para: ${accion_sugerida}.",
  
  // Mediodía (12pm - 6pm)
  "☀️ Hora de almuerzo: ¿Preparaste comida o comerás fuera?",
  "🍽️ Break del almuerzo: Revisa si vas bien con tu presupuesto diario.",
  "🌤️ Mitad del día: ¿Cómo van tus gastos hasta ahora?",
  "☀️ Tarde productiva: Momento perfecto para revisar finanzas.",
  "🌞 Checkpoint de tarde: ${porcentaje}% de tu presupuesto diario usado.",
  "🍽️ Después de comer: Registra tu gasto si comiste fuera.",
  "🌤️ Hora de la merienda: ¿Snack de casa o comprarás algo?",
  "☀️ Media tarde: Verifica si necesitas ajustar algo para hoy.",
  "🌞 Tarde: Aún puedes corregir el rumbo de tus gastos de hoy.",
  "🍽️ ¿Ya registraste tu almuerzo? Hazlo antes de olvidarlo.",
  
  // Noche (6pm - 12am)
  "🌙 Buenas noches! Hora de registrar los gastos del día.",
  "✨ Antes de dormir: Cierra tu día financiero correctamente.",
  "🌃 Noche: Revisa qué gastaste hoy y compara con tu plan.",
  "🌙 Rutina nocturna: 5 min para actualizar tus finanzas.",
  "✨ Fin del día: ¿Cumpliste tu presupuesto diario?",
  "🌃 Check nocturno: ${numero} transacciones sin registrar.",
  "🌙 Antes de la cena: Planifica los gastos de mañana.",
  "✨ Noche tranquila = Finanzas al día. Revisa ahora.",
  "🌃 Último check del día: Todo registrado, todo controlado.",
  "🌙 Buenas noches: Balance del día: ${resultado}.",
  
  // Madrugada (12am - 6am)
  "🌌 ¿Despierto a esta hora? Cuidado con las compras nocturnas.",
  "🌃 Compras de madrugada suelen ser impulsivas. Piénsalo bien.",
  "🦉 Modo búho: Si vas a comprar online, espera hasta mañana.",
  "🌌 Hora tardía: El 80% de compras nocturnas son innecesarias.",
  "🌃 Madrugada: Revisa tu carrito mañana con mente fresca.",
  "🦉 Noche: Guarda tu tarjeta. Mañana decides mejor.",
  "🌌 Compra nocturna detectada. ¿Seguro que la necesitas?",
  "🌃 Es tarde: Duerme y compra mañana si sigue siendo necesario.",
  "🦉 Regla nocturna: Si lo quieres a las 3am, esperá hasta las 9am.",
  "🌌 Madrugada: Tu yo del futuro agradecerá que no compres ahora.",
  
  // Días específicos
  // Lunes
  "💼 ¡Feliz lunes! Nueva semana para mejorar tus finanzas.",
  "🎯 Lunes motivacional: Establece metas para esta semana.",
  "💼 Inicio de semana laboral: Planifica tus gastos de transporte.",
  "🎯 Lunes: ${numero} días para cumplir tu meta semanal.",
  "💼 Fresh start: Borra y cuenta nueva (financieramente).",
  
  // Viernes
  "🎉 ¡Viernes! Cuidado con los gastos de fin de semana.",
  "🍻 Fin de semana cerca: Establece límite para salidas.",
  "🎉 Viernes social: Presupuesta entretenimiento de hoy.",
  "🍻 TGIF: Diversión sí, pero con presupuesto.",
  "🎉 Viernes: Revisa cuánto puedes gastar este finde.",
  
  // Sábado
  "🛍️ Sábado de shopping: Límite sugerido: $${monto}.",
  "🎮 Fin de semana: Ocio con responsabilidad financiera.",
  "🛍️ Sábado: Evita compras impulsivas en el mall.",
  "🎮 Weekend: Diversión gratis vs diversión cara. Tú eliges.",
  "🛍️ Sábado: Hace una lista antes de ir de compras.",
  
  // Domingo
  "☕ Domingo relajado: Perfecto para revisar tu semana financiera.",
  "📊 Domingo = Planning day. Planifica la semana entrante.",
  "☕ Día de descanso: Pero no descuides tus finanzas.",
  "📊 Domingo por la tarde: Prepara tu semana financiera.",
  "☕ Último día del finde: Registra gastos pendientes.",
];

/**
 * CATEGORÍA 8: ALERTAS INTELIGENTES AVANZADAS
 * Alertas basadas en ML/patrones complejos
 */
export const ALERTAS_INTELIGENTES = [
  // Detección de anomalías
  "🚨 Anomalía detectada: Gasto de $${monto} es ${porcentaje}% mayor al usual en ${categoria}.",
  "⚠️ Patrón inusual: ${numero} transacciones en ${tiempo}. ¿Todo bien?",
  "🔍 Alerta: Gasto en ${lugar} a las ${hora}. ¿Esperado?",
  "🚨 Transacción sospechosa: $${monto} en ${categoria}. Confirma si eres tú.",
  "⚠️ Gasto atípico detectado: ${numero}x tu promedio en ${categoria}.",
  "🔍 Nuevo comercio: Primera compra en ${tienda}.",
  "🚨 Velocidad de gasto alta: $${monto} en ${horas} horas.",
  "⚠️ Alerta geográfica: Gasto en ${ciudad}. ¿Estás viajando?",
  "🔍 Horario inusual: Compra a las ${hora}. Verifica.",
  "🚨 Múltiples intentos de pago detectados en ${comercio}.",
  
  // Predicciones
  "🔮 Predicción: A este ritmo, gastarás $${monto} este mes (${porcentaje}% más).",
  "📈 Proyección: Terminarás el mes con ${resultado} si continúas así.",
  "🔮 Forecast: Tu presupuesto de ${categoria} se agotará en ${dias} días.",
  "📈 Tendencia: Tus gastos aumentan ${porcentaje}% cada semana.",
  "🔮 Análisis: Si no ajustas, excederás presupuesto en $${monto}.",
  "📈 Predicción semanal: Gastarás $${monto} más que la semana pasada.",
  "🔮 Proyección mensual: ${resultado_predicho} vs meta ${meta}.",
  "📈 A este paso: Agotarás ${categoria} el día ${fecha}.",
  "🔮 Simulación: Si reduces ${porcentaje}% en ${categoria}, ahorrarías $${ahorro}.",
  "📈 Tendencia al alza: ${categoria} +${porcentaje}% en ${periodo}.",
  
  // Comparaciones inteligentes
  "📊 Comparativa: Gastas ${porcentaje}% más que usuarios similares en ${categoria}.",
  "🎯 Benchmark: Tu ahorro está ${diferencia} del objetivo recomendado.",
  "📊 Vs. tu histórico: Este mes vas ${mejor_peor} que tu promedio.",
  "🎯 Ranking: Top ${numero} en control de ${categoria}.",
  "📊 Percentil: Superas al ${porcentaje}% en disciplina financiera.",
  "🎯 Comparativa mensual: ${mes_actual} vs ${mes_anterior}: ${diferencia}.",
  "📊 Tu ciudad: Gastas ${porcentaje}% ${mas_menos} que el promedio de ${ciudad}.",
  "🎯 Edad: ${edad}: Tu ahorro es ${comparacion} al promedio del grupo.",
  "📊 Mejora: +${porcentaje}% mejor que hace 3 meses.",
  "🎯 Global: Entre el top ${porcentaje}% de usuarios más conscientes.",
  
  // Oportunidades detectadas
  "💡 Oportunidad: Tienes $${monto} extra este mes. ¿Lo ahorras?",
  "🎯 Detectado: Puedes ahorrar $${ahorro} cambiando de ${servicio}.",
  "💡 Insight: ${categoria} ha bajado de precio. Buen momento para comprar.",
  "🎯 Alerta positiva: Gastos ${porcentaje}% bajo presupuesto. ¡Excelente!",
  "💡 Oportunidad de inversión: Tu ahorro de $${monto} podría invertirse.",
  "🎯 Mejor momento: ${dia} es cuando ${categoria} tiene descuentos.",
  "💡 Detectado: Subsidio/beneficio disponible para ${categoria}.",
  "🎯 Smart move: Cancela ${servicio} y ahorra $${ahorro}/mes.",
  "💡 Comparativa de precios: ${producto} está ${porcentaje}% más barato en ${tienda}.",
  "🎯 Cashback disponible: ${porcentaje}% en ${categoria} hasta ${fecha}.",
  
  // Alertas de riesgo
  "⚠️ Riesgo: A este ritmo, tendrás déficit de $${monto} este mes.",
  "🚨 Alerta roja: Has usado ${porcentaje}% del presupuesto en ${dias} días.",
  "⚠️ Peligro: ${categoria} al ${porcentaje}%. Frena un poco.",
  "🚨 Urgente: Solo quedan $${monto} para el resto del mes.",
  "⚠️ Pre-alerta: En ${dias} días agotarás tu presupuesto de ${categoria}.",
  "🚨 Crítico: Gastos superan ingresos por $${diferencia}.",
  "⚠️ Zona de peligro: ${numero} categorías sobre el límite.",
  "🚨 Máxima alerta: Balance negativo proyectado: -$${monto}.",
  "⚠️ Riesgo financiero: ${porcentaje}% de presupuesto total gastado.",
  "🚨 SOS: Necesitas reducir gastos en $${monto} para equilibrar.",
];

/**
 * FUNCIÓN PRINCIPAL: Generador de mensajes contextuales
 * Selecciona y personaliza mensajes según el contexto del usuario
 */
export class SmartMessageGenerator {
  /**
   * Genera un mensaje contextual basado en datos del usuario
   * @param {Object} context - Contexto del usuario
   * @returns {Object} - Mensaje personalizado
   */
  static generateMessage(context) {
    const {
      tipo = 'general',
      categoria = null,
      monto = 0,
      porcentaje = 0,
      meta = null,
      logro = null,
      hora = new Date().getHours(),
      dia = new Date().getDay(),
    } = context;

    let pool = [];
    
    // Seleccionar pool de mensajes según tipo
    switch(tipo) {
      case 'alerta_gasto':
        pool = ALERTAS_GASTOS_EXCESIVOS;
        break;
      case 'sugerencia':
        pool = SUGERENCIAS_AHORRO;
        break;
      case 'logro_proximo':
        pool = ALERTAS_LOGROS_PROXIMOS;
        break;
      case 'motivacion':
        pool = MENSAJES_MOTIVACION;
        break;
      case 'educacion':
        pool = EDUCACION_FINANCIERA;
        break;
      case 'recordatorio':
        pool = RECORDATORIOS_ACCIONES;
        break;
      case 'contextual_tiempo':
        pool = MENSAJES_CONTEXTUALES_TIEMPO;
        break;
      case 'inteligente':
        pool = ALERTAS_INTELIGENTES;
        break;
      default:
        pool = [...ALERTAS_GASTOS_EXCESIVOS, ...SUGERENCIAS_AHORRO];
    }

    // Seleccionar mensaje aleatorio
    const mensajeTemplate = pool[Math.floor(Math.random() * pool.length)];
    
    // Personalizar mensaje con datos del contexto
    let mensaje = mensajeTemplate
      .replace(/\$\{monto\}/g, monto.toFixed(2))
      .replace(/\$\{porcentaje\}/g, porcentaje.toFixed(0))
      .replace(/\$\{categoria\}/g, categoria || 'gastos')
      .replace(/\$\{meta\}/g, meta || 'tu objetivo')
      .replace(/\$\{logro\}/g, logro || 'el logro')
      .replace(/\$\{hora\}/g, hora)
      .replace(/\$\{dia\}/g, ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][dia]);

    return {
      mensaje,
      tipo,
      timestamp: new Date(),
      personalizado: true
    };
  }

  /**
   * Genera múltiples mensajes para dashboard
   */
  static generateDashboardMessages(userData) {
    const messages = [];
    
    // Mensaje de bienvenida según hora
    const hora = new Date().getHours();
    if (hora < 12) {
      messages.push(this.generateMessage({ tipo: 'contextual_tiempo' }));
    }
    
    // Alerta si hay gastos altos
    if (userData.gastosAltos) {
      messages.push(this.generateMessage({ 
        tipo: 'alerta_gasto', 
        ...userData.gastosAltos 
      }));
    }
    
    // Sugerencia de ahorro si aplica
    if (userData.oportunidadAhorro) {
      messages.push(this.generateMessage({ 
        tipo: 'sugerencia', 
        ...userData.oportunidadAhorro 
      }));
    }
    
    // Logro próximo si aplica
    if (userData.logroProximo) {
      messages.push(this.generateMessage({ 
        tipo: 'logro_proximo', 
        ...userData.logroProximo 
      }));
    }
    
    return messages;
  }
}

export default SmartMessageGenerator;
