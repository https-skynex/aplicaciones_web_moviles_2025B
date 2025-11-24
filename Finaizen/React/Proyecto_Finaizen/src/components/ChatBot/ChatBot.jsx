import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import mockDB from '../../utils/mockDatabase';
import styles from './ChatBot.module.css';

/**
 * ChatBot Premium
 * Asistente con IA exclusivo para usuarios premium
 * Analiza finanzas y proporciona recomendaciones personalizadas
 */
export default function ChatBot({ isOpen, onClose }) {
  const { currentUser, currentPerfil } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Cargar historial de mensajes del localStorage
  useEffect(() => {
    if (isOpen && currentUser) {
      const savedMessages = localStorage.getItem(`chatbot_${currentUser.id}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        // Mensaje de bienvenida
        setMessages([{
          id: 1,
          type: 'bot',
          text: `¡Hola ${currentUser.nombre}! 👋 Soy tu asistente financiero premium con IA. Puedo ayudarte a:

🎯 Analizar tus gastos e ingresos
📊 Crear presupuestos inteligentes
💡 Encontrar oportunidades de ahorro
📈 Predecir tendencias financieras
🔍 Detectar gastos innecesarios

¿En qué puedo ayudarte hoy?`,
          timestamp: new Date().toISOString()
        }]);
      }
    }
  }, [isOpen, currentUser]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Guardar mensajes en localStorage
  useEffect(() => {
    if (messages.length > 0 && currentUser) {
      localStorage.setItem(`chatbot_${currentUser.id}`, JSON.stringify(messages));
    }
  }, [messages, currentUser]);

  if (!isOpen || !currentUser?.premiumActivo) return null;

  // Función helper para navegar y cerrar el chat
  const navigateAndClose = (path, delay = 2000) => {
    setTimeout(() => {
      navigate(path);
      onClose();
    }, delay);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        text: botResponse,
        timestamp: new Date().toISOString()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Análisis financiero
    const ingresos = mockDB.getIngresosDePerf(currentPerfil.id);
    const egresos = mockDB.getEgresosDePerf(currentPerfil.id);
    const logros = mockDB.getLogrosDePerfil(currentPerfil.id);
    
    const totalIngresos = ingresos.reduce((sum, ing) => sum + ing.monto, 0);
    const totalEgresos = egresos.reduce((sum, eg) => sum + eg.monto, 0);
    const balance = totalIngresos - totalEgresos;
    
    // Análisis por categorías
    const gastosPorCategoria = {};
    egresos.forEach(eg => {
      gastosPorCategoria[eg.categoria] = (gastosPorCategoria[eg.categoria] || 0) + eg.monto;
    });
    
    const categoriaConMasGastos = Object.entries(gastosPorCategoria)
      .sort((a, b) => b[1] - a[1])[0];

    // DETECCIÓN DE LOGROS Y NAVEGACIÓN
    const marcasLogros = {
      'mcdonalds': 'McDonald\'s',
      'mcdonald': 'McDonald\'s',
      'kfc': 'KFC',
      'uber': 'Uber',
      'netflix': 'Netflix',
      'banco pichincha': 'Banco Pichincha',
      'pichincha': 'Banco Pichincha'
    };

    // Buscar si menciona alguna marca de logro
    for (const [keyword, marcaNombre] of Object.entries(marcasLogros)) {
      if (input.includes(keyword)) {
        const logroEncontrado = logros.find(l => 
          l.titulo && l.titulo.toLowerCase().includes(marcaNombre.toLowerCase())
        );
        
        if (logroEncontrado) {
          // Navegar a la página de logros después de 2 segundos
          navigateAndClose('/user/logros', 2000);
          
          return `🎯 **Logro encontrado: ${logroEncontrado.titulo}**

${logroEncontrado.desbloqueado ? '✅ ¡Ya completaste este logro!' : '🔒 Aún no has desbloqueado este logro'}

📝 **Descripción:** ${logroEncontrado.descripcion}

${logroEncontrado.desbloqueado 
  ? `🏆 Desbloqueado el: ${new Date(logroEncontrado.fechaDesbloqueo).toLocaleDateString('es-ES')}
  
💡 **Consejo:** ¡Excelente! Sigue usando la app para desbloquear más logros.`
  : `📊 **Progreso:** ${logroEncontrado.progreso || 0}/${logroEncontrado.objetivo || 10}

💡 **Consejo:** ${logroEncontrado.titulo.includes('McDonald') 
    ? 'Registra más transacciones en McDonald\'s para desbloquear este logro.' 
    : 'Continúa registrando transacciones para completar este logro.'}`}

🔄 **Te llevaré a la página de logros en 2 segundos...**`;
        }
      }
    }

    // DETECCIÓN DE NAVEGACIÓN GENERAL
    if (input.includes('logro') || input.includes('insignia') || input.includes('desbloque')) {
      navigateAndClose('/user/logros', 2000);
      
      const logrosDesbloqueados = logros.filter(l => l.desbloqueado).length;
      
      return `🏆 **Tus Logros:**

✅ Desbloqueados: ${logrosDesbloqueados}/${logros.length}
🔒 Por desbloquear: ${logros.length - logrosDesbloqueados}

📊 **Progreso total:** ${((logrosDesbloqueados / logros.length) * 100).toFixed(1)}%

${logrosDesbloqueados > 0 
  ? `¡Excelente trabajo! Has desbloqueado ${logrosDesbloqueados} logros.` 
  : 'Comienza a registrar transacciones para desbloquear logros.'}

🔄 **Te llevaré a la página de logros en 2 segundos...**`;
    }

    if (input.includes('historial') || input.includes('transacci')) {
      navigateAndClose('/user/historial', 2000);
      
      return `📋 **Tu Historial:**

📊 Total de transacciones: ${ingresos.length + egresos.length}
💰 Ingresos registrados: ${ingresos.length}
💸 Egresos registrados: ${egresos.length}

🔄 **Te llevaré al historial completo en 2 segundos...**`;
    }

    if (input.includes('presupuesto') && !input.includes('plan')) {
      navigateAndClose('/user/presupuestos', 2000);
      
      return `💼 **Presupuestos:**

Voy a llevarte a la página de presupuestos donde podrás:
• Ver tus presupuestos activos
• Crear nuevos presupuestos
• Editar límites de gasto
• Monitorear tu progreso

🔄 **Redirigiendo en 2 segundos...**`;
    }

    if (input.includes('dashboard') || input.includes('inicio') || input.includes('principal')) {
      navigateAndClose('/user/dashboard', 2000);
      
      return `🏠 **Dashboard Principal:**

Te llevaré de regreso al dashboard donde verás:
• Resumen financiero
• Gráficas de ingresos y egresos
• Presupuestos activos
• Transacciones recientes

🔄 **Redirigiendo en 2 segundos...**`;
    }

    // Respuestas inteligentes
    if (input.includes('analiz') || input.includes('resumen') || input.includes('estado')) {
      return `📊 **Análisis Financiero Actual:**

💰 **Balance General:**
• Ingresos totales: ${currentPerfil.simboloMoneda}${totalIngresos.toFixed(2)}
• Egresos totales: ${currentPerfil.simboloMoneda}${totalEgresos.toFixed(2)}
• Balance: ${currentPerfil.simboloMoneda}${balance.toFixed(2)} ${balance >= 0 ? '✅' : '⚠️'}

📈 **Categoría con más gastos:**
${categoriaConMasGastos ? `${categoriaConMasGastos[0]}: ${currentPerfil.simboloMoneda}${categoriaConMasGastos[1].toFixed(2)}` : 'N/A'}

${balance < 0 ? '⚠️ **Alerta:** Tus gastos superan tus ingresos. Te recomiendo revisar gastos en ' + (categoriaConMasGastos ? categoriaConMasGastos[0] : 'varias categorías') + '.' : '✅ **Excelente:** Estás manteniendo un balance positivo. ¡Sigue así!'}`;
    }

    if (input.includes('ahorr') || input.includes('guard')) {
      const potencialAhorro = totalIngresos * 0.2;
      return `💡 **Estrategia de Ahorro Personalizada:**

Basándome en tus ingresos de ${currentPerfil.simboloMoneda}${totalIngresos.toFixed(2)}, te recomiendo:

🎯 **Meta de ahorro mensual:** ${currentPerfil.simboloMoneda}${potencialAhorro.toFixed(2)} (20% de tus ingresos)

📝 **Recomendaciones:**
1. Automatiza transferencias a una cuenta de ahorros
2. Usa la regla 50/30/20: 50% necesidades, 30% gustos, 20% ahorros
3. Revisa suscripciones que no uses frecuentemente
${categoriaConMasGastos ? `4. Reduce gastos en ${categoriaConMasGastos[0]} (actualmente: ${currentPerfil.simboloMoneda}${categoriaConMasGastos[1].toFixed(2)})` : ''}

¿Quieres que te ayude a crear un plan de ahorro específico?`;
    }

    if (input.includes('gast') || input.includes('egres')) {
      const gastosAltos = egresos.filter(e => e.monto > (totalEgresos / egresos.length) * 1.5);
      
      return `📊 **Análisis de Gastos:**

Total de egresos registrados: ${egresos.length}
Gasto promedio: ${currentPerfil.simboloMoneda}${(totalEgresos / egresos.length).toFixed(2)}

${gastosAltos.length > 0 ? `⚠️ **Gastos superiores al promedio:**
${gastosAltos.slice(0, 3).map(e => `• ${e.descripcion || e.categoria}: ${currentPerfil.simboloMoneda}${e.monto.toFixed(2)}`).join('\n')}

Estos gastos están por encima del promedio. ¿Son necesarios o podrías reducirlos?` : '✅ Tus gastos están bien distribuidos.'}

${categoriaConMasGastos ? `\n🔍 **Categoría dominante:** ${categoriaConMasGastos[0]} (${((categoriaConMasGastos[1] / totalEgresos) * 100).toFixed(1)}% del total)` : ''}`;
    }

    if (input.includes('ingres') || input.includes('entrada')) {
      const ingresosRecurrentes = ingresos.filter(i => i.esRecurrente);
      const ingresosOcasionales = ingresos.filter(i => !i.esRecurrente);
      
      return `💰 **Análisis de Ingresos:**

📈 **Total:** ${currentPerfil.simboloMoneda}${totalIngresos.toFixed(2)}

🔄 **Ingresos recurrentes:** ${ingresosRecurrentes.length}
${ingresosRecurrentes.slice(0, 3).map(i => `• ${i.fuente}: ${currentPerfil.simboloMoneda}${i.monto.toFixed(2)}`).join('\n')}

💵 **Ingresos ocasionales:** ${ingresosOcasionales.length}
${ingresosOcasionales.length > 0 ? ingresosOcasionales.slice(0, 2).map(i => `• ${i.fuente}: ${currentPerfil.simboloMoneda}${i.monto.toFixed(2)}`).join('\n') : 'Ninguno registrado'}

💡 **Recomendación:** ${ingresosRecurrentes.length > 0 ? 'Excelente, tienes ingresos estables. Considera invertir una parte.' : 'Intenta crear fuentes de ingreso recurrentes para mayor estabilidad financiera.'}`;
    }

    if (input.includes('presupuesto') || input.includes('plan')) {
      return `📋 **Plan de Presupuesto Inteligente:**

Basado en tus ingresos de ${currentPerfil.simboloMoneda}${totalIngresos.toFixed(2)}:

🏠 **Necesidades (50%):** ${currentPerfil.simboloMoneda}${(totalIngresos * 0.5).toFixed(2)}
• Vivienda, alimentación, transporte, servicios básicos

🎨 **Gustos (30%):** ${currentPerfil.simboloMoneda}${(totalIngresos * 0.3).toFixed(2)}
• Entretenimiento, restaurantes, hobbies

💎 **Ahorros/Inversiones (20%):** ${currentPerfil.simboloMoneda}${(totalIngresos * 0.2).toFixed(2)}
• Fondo de emergencia, inversiones, metas futuras

${totalEgresos > totalIngresos * 0.8 ? '⚠️ Estás gastando más del 80% de tus ingresos. Ajusta gastos en categorías no esenciales.' : '✅ Tu nivel de gasto está dentro del rango saludable.'}

¿Quieres que te ayude a desglosar alguna categoría específica?`;
    }

    if (input.includes('reduci') || input.includes('disminui') || input.includes('baj')) {
      return `💡 **Estrategias para Reducir Gastos:**

1️⃣ **Método del Desafío de 30 días:**
   Antes de comprar algo no esencial, espera 30 días. El 80% de las veces ya no lo querrás.

2️⃣ **Audita suscripciones:**
   Revisa servicios de streaming, apps, gimnasios. Cancela lo que no uses mensualmente.

3️⃣ **Planifica comidas:**
   Hacer lista de compras reduce gastos en supermercado en un 25%.

4️⃣ **Usa la regla de las 24 horas:**
   Para compras >$50, espera 24 horas antes de decidir.

${categoriaConMasGastos ? `\n5️⃣ **Enfócate en ${categoriaConMasGastos[0]}:**
   Está consumiendo ${currentPerfil.simboloMoneda}${categoriaConMasGastos[1].toFixed(2)} de tu presupuesto. Reduce un 20% aquí para ahorrar ${currentPerfil.simboloMoneda}${(categoriaConMasGastos[1] * 0.2).toFixed(2)} al mes.` : ''}

¿Quieres tips específicos para alguna categoría?`;
    }

    if (input.includes('premium') || input.includes('benefit') || input.includes('ventaj')) {
      return `👑 **Beneficios de Finaizen Premium:**

✨ Ya estás disfrutando de ventajas exclusivas:

🤖 **Este ChatBot con IA** - Análisis personalizado 24/7
📊 **Reportes Avanzados** - Gráficas predictivas y tendencias
🎯 **Recomendaciones Personalizadas** - Basadas en tu comportamiento
📈 **Análisis Predictivo** - Proyecciones de ahorro e inversión
🔔 **Notificaciones Prioritarias** - Alertas inteligentes en tiempo real
💎 **Acceso Anticipado** - Nuevas funciones antes que nadie

¡Gracias por confiar en Finaizen Premium! 🌟`;
    }

    if (input.includes('hola') || input.includes('ayud')) {
      return `¡Hola ${currentUser.nombre}! 👋

Estoy aquí para ayudarte con tus finanzas. Puedo:

📊 Analizar tu estado financiero actual
💰 Sugerir estrategias de ahorro
📈 Crear presupuestos personalizados
🔍 Identificar gastos innecesarios
💡 Dar tips para mejorar tus finanzas

¿Qué te gustaría saber?`;
    }

    // Respuesta por defecto
    return `Entiendo tu consulta sobre "${userInput}". 

Soy tu asistente premium y puedo ayudarte con:

• **"Analiza mis finanzas"** - Estado actual completo
• **"Cómo ahorrar más"** - Estrategias personalizadas  
• **"Revisa mis gastos"** - Análisis de egresos
• **"Plan de presupuesto"** - Presupuesto inteligente
• **"Reducir gastos"** - Tips para gastar menos

¿Qué prefieres que hagamos? 😊`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearHistory = () => {
    if (confirm('¿Estás seguro de que quieres borrar el historial de chat?')) {
      setMessages([{
        id: Date.now(),
        type: 'bot',
        text: `Historial limpiado. ¿En qué puedo ayudarte ${currentUser.nombre}?`,
        timestamp: new Date().toISOString()
      }]);
      localStorage.removeItem(`chatbot_${currentUser.id}`);
    }
  };

  return (
    <div className={styles.chatbotOverlay} onClick={onClose}>
      <div className={styles.chatbotContainer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.botAvatar}>
              <span className={styles.botIcon}>🤖</span>
              <span className={styles.statusDot}></span>
            </div>
            <div className={styles.botInfo}>
              <h3>Asistente Premium</h3>
              <p>Con inteligencia artificial</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.clearBtn} onClick={clearHistory} title="Limpiar historial">
              🗑️
            </button>
            <button className={styles.closeBtn} onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messagesContainer}>
          {messages.map(msg => (
            <div key={msg.id} className={`${styles.message} ${styles[msg.type]}`}>
              {msg.type === 'bot' && (
                <div className={styles.messageAvatar}>🤖</div>
              )}
              <div className={styles.messageContent}>
                <div className={styles.messageBubble}>
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
                <span className={styles.messageTime}>
                  {new Date(msg.timestamp).toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              {msg.type === 'user' && (
                <div className={styles.messageAvatar}>
                  {currentUser.nombre.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className={`${styles.message} ${styles.bot}`}>
              <div className={styles.messageAvatar}>🤖</div>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={styles.inputContainer}>
          <textarea
            className={styles.input}
            placeholder="Escribe tu pregunta..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="1"
          />
          <button 
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
          >
            <span className={styles.sendIcon}>📤</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button onClick={() => setInputValue('Analiza mis finanzas')}>
            📊 Análisis
          </button>
          <button onClick={() => setInputValue('Cómo ahorrar más')}>
            💰 Ahorro
          </button>
          <button onClick={() => setInputValue('Revisa mis gastos')}>
            🔍 Gastos
          </button>
        </div>
      </div>
    </div>
  );
}
