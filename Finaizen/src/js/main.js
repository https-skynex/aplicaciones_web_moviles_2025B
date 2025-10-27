
document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainer = document.getElementById("sidebar-container");
    // Usamos una clase genérica para todo el contenido principal
    const mainContent = document.querySelector(".main-content");

    if (!sidebarContainer || !mainContent) {
        console.error("No se encontraron los contenedores #sidebar-container o .main-content en esta página.");
        return;
    }

    // Leemos qué sidebar cargar desde el HTML (ver Paso 3)
    const sidebarType = sidebarContainer.dataset.sidebar; // 'admin' o 'user'

    if (!sidebarType) {
        console.error("El contenedor #sidebar-container no tiene el atributo 'data-sidebar'.");
        return;
    }

    const sidebarFile = `../../components/sidebar_${sidebarType}.html`;

    // --- Cargar el Sidebar y Activar el Toggle ---
    fetch(sidebarFile)
        .then(response => {
            if (!response.ok) throw new Error(`No se pudo cargar ${sidebarFile}`);
            return response.text();
        })
        .then(html => {
            sidebarContainer.innerHTML = html;
            
            // Adjuntar el evento al botón DESPUÉS de que la sidebar se haya cargado
            const menuToggleButton = document.getElementById("menu-toggle");
            if (menuToggleButton) {
                menuToggleButton.addEventListener("click", () => {
                    sidebarContainer.classList.toggle("collapsed");
                    mainContent.classList.toggle("sidebar-collapsed");
                });
            }

            // --- CARGAR MENÚ FLOTANTE DEL USUARIO ---
            loadSidebarMenu();
        })
        .catch(err => console.error("Error al cargar y configurar el sidebar:", err));
});

// Función para cargar el menú flotante del usuario
function loadSidebarMenu() {
    const dropdownContainer = document.getElementById("user-dropdown-container");
    
    if (!dropdownContainer) {
        return; // No hay contenedor para el dropdown
    }

    // Cargar el componente del dropdown
    fetch('../../components/sidebar_menu.html')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar sidebar_menu.html');
            return response.text();
        })
        .then(html => {
            dropdownContainer.innerHTML = html;
            
            // Inicializar eventos del dropdown
            initSidebarMenu();
        })
        .catch(err => console.error("Error al cargar el menú flotante:", err));
}

// Función para inicializar el menú flotante del usuario
function initSidebarMenu() {
    const userMenuTrigger = document.getElementById("user-menu-trigger");
    const userDropdown = document.getElementById("user-dropdown");

    if (!userMenuTrigger || !userDropdown) {
        return; // No hay menú en esta página
    }

    // Toggle del menú al hacer clic en el usuario
    userMenuTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle("active");
    });

    // Cerrar el menú al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!userMenuTrigger.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove("active");
        }
    });

    // Prevenir que el menú se cierre al hacer clic dentro de él
    userDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}