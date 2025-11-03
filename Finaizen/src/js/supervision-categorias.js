
const transactions = [
    { id: 1, desc: '"Salida al cine"', keyword: '"Cine"', category: 'Entretenimiento', confidence: 'alta', score: 98, status: 'Validado' },
    { id: 2, desc: '"Comprar medicina"', keyword: '"Medicina"', category: 'Salud', confidence: 'media', score: 74, status: 'Corregir' },
    { id: 3, desc: '"Pago de suscripcion spotify"', keyword: '"Pago"', category: 'Otros', confidence: 'baja', score: 45, status: 'Corregir y crear regla' },
    { id: 4, desc: '"Uber a casa"', keyword: '"Uber"', category: 'Transporte', confidence: 'media', score: 68, status: 'Corregir' },
    { id: 5, desc: '"Supermaxi compra semanal"', keyword: '"Supermaxi"', category: 'Supermercado', confidence: 'alta', score: 99, status: 'Validado' },
    { id: 6, desc: '"Cuota del gym"', keyword: '"Gym"', category: 'Salud', confidence: 'alta', score: 92, status: 'Validado' },
    { id: 7, desc: '"Netflix mensual"', keyword: '"Netflix"', category: 'Otros', confidence: 'baja', score: 51, status: 'Corregir y crear regla' }
];

let tbody, confidenceFilter, searchInput;

function renderTable() {
    if (!tbody || !confidenceFilter || !searchInput) return;
    
    const filterValue = confidenceFilter.value;
    const searchValue = searchInput.value.toLowerCase();
    tbody.innerHTML = '';

    transactions
        .filter(t => (filterValue === 'todos' || t.confidence === filterValue) && t.desc.toLowerCase().includes(searchValue))
        .forEach(t => {
            const row = document.createElement('tr');
            const actions = (t.status === 'Validado')
                ? `<span class="status-badge validado" style="display:inline-block;padding:4px 10px;border-radius:999px;background:#e6f4ea;color:#1e7e34;font-weight:600;">Validado</span>`
                : `<div class="row-actions">
                        <button class="btn action-validate" data-id="${t.id}" style="margin-right:6px;padding:6px 10px;border:1px solid #28a745;background:#28a745;color:#fff;border-radius:6px;cursor:pointer;">Validar</button>
                        <button class="btn action-correct" data-id="${t.id}" style="padding:6px 10px;border:1px solid #007bff;background:#007bff;color:#fff;border-radius:6px;cursor:pointer;">Corregir</button>
                   </div>`;
            row.innerHTML = `
                <td>${t.desc}</td>
                <td>${t.keyword}</td>
                <td>${t.category}</td>
                <td><span class="confidence-level ${t.confidence}">${t.confidence.charAt(0).toUpperCase() + t.confidence.slice(1)} (${t.score}%)</span></td>
                <td>${actions}</td>
            `;
            tbody.appendChild(row);
        });
}

function initializeTableEvents() {
    tbody = document.getElementById('supervision-tbody');
    confidenceFilter = document.getElementById('confidence-filter');
    searchInput = document.getElementById('search-input');

    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const target = e.target;
            // Acción: Corregir
            if (target.classList.contains('action-correct')) {
                const transactionId = parseInt(target.dataset.id);
                const transaction = transactions.find(t => t.id === transactionId);
                if (transaction && transaction.status !== 'Validado') {
                    openCorrectionModal(transaction);
                }
            }
            // Acción: Validar
            if (target.classList.contains('action-validate')) {
                const transactionId = parseInt(target.dataset.id);
                const transaction = transactions.find(t => t.id === transactionId);
                if (transaction) {
                    transaction.status = 'Validado';
                    renderTable();
                }
            }
        });
    }

    if (confidenceFilter) {
        confidenceFilter.addEventListener('change', renderTable);
    }

    if (searchInput) {
        searchInput.addEventListener('input', renderTable);
    }
}

function openCorrectionModal(transaction) {
    const modalOverlay = document.querySelector('.modal-overlay-ia');
    if (!modalOverlay) return;

    // Poblar categorías y palabras clave
    populateCategories();

    // Información original
    const descElement = document.querySelector('.original-description');
    const keywordElement = document.querySelector('.original-keyword');
    const categoryElement = document.querySelector('.original-category');
    const confidenceElement = document.querySelector('.original-confidence');

    if (descElement) descElement.textContent = transaction.desc;
    if (keywordElement) keywordElement.textContent = transaction.keyword;
    if (categoryElement) categoryElement.textContent = transaction.category;
    if (confidenceElement) confidenceElement.textContent = `${transaction.confidence.charAt(0).toUpperCase() + transaction.confidence.slice(1)} (${transaction.score}%)`;

    // Formulario
    const correctedKeyword = document.getElementById('corrected-keyword');
    const correctedCategory = document.getElementById('corrected-category');
    const permanentRule = document.getElementById('create-permanent-rule');

    if (correctedKeyword) correctedKeyword.value = (transaction.keyword || '').replace(/"/g, '');
    if (correctedCategory) correctedCategory.value = transaction.category || '';
    if (permanentRule) permanentRule.checked = transaction.status === 'Corregir y crear regla';

    // Palabras clave detectadas
    populateKeywords(transaction);

    // Mostrar modal
    modalOverlay.style.display = 'flex';
}

function closeCorrectionModal() {
    const modalOverlay = document.querySelector('.modal-overlay-ia');
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
    }
}

function populateCategories() {
    const categorySelect = document.getElementById('corrected-category');
    if (!categorySelect) return;

    const categories = ['Entretenimiento', 'Salud', 'Transporte', 'Supermercado', 'Suscripciones', 'Servicios', 'Otros'];
    
    // Limpiar opciones existentes (excepto la primera)
    while (categorySelect.options.length > 1) {
        categorySelect.remove(1);
    }
    
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

// Extrae palabras clave simples desde una descripción en español
function extractKeywords(text) {
    if (!text) return [];
    // Eliminar comillas y normalizar acentos
    const cleaned = text
        .replace(/"/g, '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // quitar tildes
        .replace(/[^a-záéíóúñ0-9\s]/gi, ' ');

    const stopwords = new Set([
        'el','la','los','las','un','una','unos','unas','de','del','al','a','y','o','u','en','con','por','para','sin','sobre',
        'se','su','sus','mi','mis','tu','tus','su','sus','nuestro','nuestra','nuestros','nuestras','vos','usted','ustedes',
        'yo','me','te','lo','le','les','que','como','es','son','fue','fueron','sera','seran','estoy','esta','estas','estamos',
        'muy','mas','menos','ya','no','si','pero','porque','cuando','donde','cuanto','pago','pagar'
    ]);

    const words = cleaned.split(/\s+/).filter(w => w && w.length >= 3 && !stopwords.has(w));
    // deduplicar conservando orden
    const seen = new Set();
    const unique = [];
    for (const w of words) {
        if (!seen.has(w)) { seen.add(w); unique.push(w); }
    }
    return unique;
}

// Rellena la sección de palabras clave detectadas y vincula la selección al input principal
function populateKeywords(transaction) {
    const container = document.querySelector('.keywords-detected');
    if (!container) return;

    const desc = (transaction.desc || '').replace(/"/g, '');
    const aiKeyword = (transaction.keyword || '').replace(/"/g, '').toLowerCase();
    let candidates = extractKeywords(desc);

    if (aiKeyword && !candidates.includes(aiKeyword)) {
        candidates.unshift(aiKeyword);
    }

    // Limitar a las primeras 8 palabras representativas
    candidates = candidates.slice(0, 8);

    container.innerHTML = '';

    if (candidates.length === 0) {
        container.innerHTML = '<em>No se detectaron palabras clave en la descripción.</em>';
        return;
    }

    const correctedInput = document.getElementById('corrected-keyword');

    candidates.forEach((word, idx) => {
        const id = `kw-${transaction.id}-${idx}`;
        const label = document.createElement('label');
        label.className = 'keyword-pill';
        // Estilos mínimos por si no hay CSS específico
        label.style.cssText = 'display:inline-flex;align-items:center;gap:6px;margin:4px;padding:6px 10px;border:1px solid #d0d0d0;border-radius:999px;cursor:pointer;font-size:0.9rem;';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'keyword-choice';
        input.value = word;
        input.id = id;
        input.style.margin = '0';
        if (idx === 0) input.checked = true;

        const span = document.createElement('span');
        span.textContent = word;

        label.appendChild(input);
        label.appendChild(span);
        container.appendChild(label);
    });

    const updateCorrected = () => {
        const selected = container.querySelector('input[name="keyword-choice"]:checked');
        if (selected && correctedInput) {
            correctedInput.value = selected.value;
        }
    };

    // Enlazar cambios
    container.querySelectorAll('input[name="keyword-choice"]').forEach(r => {
        r.addEventListener('change', updateCorrected);
    });
    // Set inicial
    updateCorrected();
}

function initializeModalEvents() {
    const modalOverlay = document.querySelector('.modal-overlay-ia');
    const closeBtn = document.querySelector('.modal-close-ia');
    const cancelBtn = document.querySelector('.cancel-correction');
    const form = document.querySelector('.correction-form');
    const weightRange = document.getElementById('keyword-weight');
    const weightValue = document.querySelector('.weight-value');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeCorrectionModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeCorrectionModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeCorrectionModal();
            }
        });
    }

    if (weightRange && weightValue) {
        weightRange.addEventListener('input', (e) => {
            weightValue.textContent = e.target.value;
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Corrección guardada:', {
                keyword: document.getElementById('corrected-keyword').value,
                category: document.getElementById('corrected-category').value,
                weight: document.getElementById('keyword-weight').value,
                createRule: document.getElementById('create-permanent-rule').checked,
                applySimilar: document.getElementById('apply-similar').checked,
                retrain: document.getElementById('retrain-model').checked,
                notes: document.getElementById('correction-notes').value
            });
            closeCorrectionModal();
        });
    }
}

function initializeAITest() {
    const testBtn = document.getElementById('ai-test-btn');
    if (testBtn) {
        testBtn.addEventListener('click', () => {
            const input = document.getElementById('ai-test-input').value;
            const resultDiv = document.getElementById('ai-prediction-result');
            if (!input) return;
            
            // Simulación de una llamada a la API de la IA
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = `<strong>Predicción para "${input}":</strong><br>
                                   Palabra Clave: "Pago"<br>
                                   Categoría: "Servicios"<br>
                                   Confianza: Media (65%)`;
        });
    }
}

function renderCharts() {
    const confidenceCanvas = document.getElementById('confidenceChart');
    const trendCanvas = document.getElementById('correctionsTrendChart');

    if (!confidenceCanvas || !trendCanvas) {
        console.error('Canvas elements not found');
        return;
    }

    // Gráfico de distribución de confianza
    const confidenceCounts = transactions.reduce((acc, t) => { 
        acc[t.confidence] = (acc[t.confidence] || 0) + 1; 
        return acc; 
    }, {});

    new Chart(confidenceCanvas.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Alta', 'Media', 'Baja'],
            datasets: [{
                data: [confidenceCounts.alta || 0, confidenceCounts.media || 0, confidenceCounts.baja || 0],
                backgroundColor: ['#d4edda', '#fff3cd', '#f8d7da'],
                borderColor: ['#155724', '#856404', '#721c24'],
                borderWidth: 1
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: true,
            plugins: { 
                legend: { position: 'top' } 
            } 
        }
    });
    
    // Gráfico de tendencia de correcciones
    new Chart(trendCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jul', 'Ago', 'Sep', 'Oct'],
            datasets: [{
                label: 'Correcciones Manuales',
                data: [120, 95, 88, 82],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                tension: 0.1,
                fill: true
            }]
        },
        options: { 
            responsive: true,
            maintainAspectRatio: true,
            plugins: { 
                legend: { display: true } 
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar eventos del modal (cerrar, cancelar, sliders, submit)
    initializeModalEvents();

    // Inicializar eventos de la tabla
    initializeTableEvents();
    
    // Renderizar la tabla
    renderTable();
    
    // Renderizar gráficos
    renderCharts();
    
    // Inicializar test de IA
    initializeAITest();
});