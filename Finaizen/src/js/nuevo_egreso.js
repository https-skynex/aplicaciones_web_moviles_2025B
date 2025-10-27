// src/js/nuevo_egreso.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias a elementos ---
    const frequencyItems = document.querySelectorAll('.frequency-list li');
    const daysSelector = document.getElementById('days-selector');
    const monthDaySelector = document.getElementById('month-day-selector');
    const dateSelector = document.getElementById('date-selector');
    const timeSelectorLabel = document.getElementById('time-selector-label');
    const dayCheckboxes = document.querySelectorAll('.days-selector input[type="checkbox"]');
    const calendarGrid = document.getElementById('calendar-grid');
    const dayOfMonthInput = document.getElementById('day-of-month');

    // --- Función para generar el calendario de días (1-31) ---
    function generateCalendar() {
        calendarGrid.innerHTML = '';
        for (let i = 1; i <= 31; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day');
            dayDiv.textContent = i;
            dayDiv.dataset.day = i;
            
            dayDiv.addEventListener('click', function() {
                // Quitar selección previa
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                // Seleccionar el día clickeado
                this.classList.add('selected');
                dayOfMonthInput.value = i;
            });
            
            calendarGrid.appendChild(dayDiv);
        }
    }

    // --- Función para actualizar el selector según la frecuencia ---
    function updateTimeSelector(frequency) {
        // Ocultar todos los selectores
        daysSelector.style.display = 'none';
        monthDaySelector.style.display = 'none';
        dateSelector.style.display = 'none';

        switch(frequency) {
            case 'diario':
                timeSelectorLabel.textContent = 'Días de la semana:';
                daysSelector.style.display = 'grid';
                // Seleccionar todos los checkboxes (Lunes a Domingo)
                dayCheckboxes.forEach(checkbox => {
                    checkbox.checked = true;
                });
                break;

            case 'semanal':
                timeSelectorLabel.textContent = 'Seleccione los días:';
                daysSelector.style.display = 'grid';
                // Deseleccionar todos los checkboxes
                dayCheckboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
                break;

            case 'mensual':
                timeSelectorLabel.textContent = 'Seleccione el día del mes:';
                monthDaySelector.style.display = 'block';
                // Generar calendario si no existe
                if (!calendarGrid.children.length) {
                    generateCalendar();
                }
                // Seleccionar el día actual del mes por defecto
                const today = new Date();
                const currentDay = today.getDate();
                dayOfMonthInput.value = currentDay;
                document.querySelectorAll('.calendar-day').forEach(d => {
                    d.classList.remove('selected');
                    if (parseInt(d.dataset.day) === currentDay) {
                        d.classList.add('selected');
                    }
                });
                break;

            case 'anual':
                timeSelectorLabel.textContent = 'Seleccione una fecha:';
                dateSelector.style.display = 'block';
                // Establecer la fecha actual
                const currentDate = new Date().toISOString().split('T')[0];
                document.getElementById('specific-date').value = currentDate;
                break;

            case 'ocasional':
                // No mostrar ningún selector
                timeSelectorLabel.textContent = '';
                break;
        }
    }

    // --- Lógica para la Lista de Frecuencia ---
    frequencyItems.forEach(item => {
        item.addEventListener('click', () => {
            frequencyItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            
            // Actualizar el selector de tiempo
            const selectedFrequency = item.dataset.value;
            updateTimeSelector(selectedFrequency);
        });
    });

    // --- Lógica para los checkboxes de días ---
    dayCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkedCount = Array.from(dayCheckboxes).filter(cb => cb.checked).length;
            const currentFrequency = document.querySelector('.frequency-list li.active')?.dataset.value;
            
            // Si se deselecciona un día y la frecuencia es "diario", cambiar a "semanal"
            if (checkedCount < 7 && currentFrequency === 'diario') {
                frequencyItems.forEach(el => el.classList.remove('active'));
                const semanalItem = document.querySelector('.frequency-list li[data-value="semanal"]');
                if (semanalItem) {
                    semanalItem.classList.add('active');
                }
            }
        });
    });

    // --- Lógica para los Botones de Clasificación ---
    const classificationBtns = document.querySelectorAll('.classification-btn');
    classificationBtns.forEach(button => {
        button.addEventListener('click', () => {
            classificationBtns.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // --- Inicializar con la frecuencia activa por defecto ---
    const activeFrequency = document.querySelector('.frequency-list li.active');
    if (activeFrequency) {
        updateTimeSelector(activeFrequency.dataset.value);
    }

    // --- Lógica del Formulario al Guardar ---
    const expenseForm = document.querySelector('.expense-form');
    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const descripcion = document.getElementById('descripcion-egreso').value;
        const frecuencia = document.querySelector('.frequency-list li.active')?.dataset.value;
        const clasificacion = document.querySelector('.classification-btn.active')?.dataset.value;

        let timeInfo = '';
        
        if (frecuencia === 'diario' || frecuencia === 'semanal') {
            const diasSeleccionados = [];
            dayCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    diasSeleccionados.push(checkbox.dataset.day);
                }
            });
            timeInfo = `Días: ${diasSeleccionados.join(', ')}`;
        } else if (frecuencia === 'mensual') {
            const dayOfMonth = dayOfMonthInput.value;
            timeInfo = `Día del mes: ${dayOfMonth}`;
        } else if (frecuencia === 'anual') {
            const specificDate = document.getElementById('specific-date').value;
            timeInfo = `Fecha: ${specificDate}`;
        } else if (frecuencia === 'ocasional') {
            timeInfo = 'Sin fecha específica';
        }

        console.log({
            descripcion: descripcion,
            frecuencia: frecuencia,
            clasificacion: clasificacion,
            detalles: timeInfo
        });

        alert(`✅ ¡Nuevo egreso guardado!\n\nDescripción: ${descripcion}\nFrecuencia: ${frecuencia}\nClasificación: ${clasificacion}\n${timeInfo}`);
    });
});