// src/js/configPerfiles.js

// Datos de perfiles simulados (en producción vendrían de la BD)
const profilesData = [
    {
        id: 1,
        name: 'Finanzas Personales',
        currency: 'USD'
    },
    {
        id: 2,
        name: 'Emprendimiento',
        currency: 'EUR'
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar el modal
    const modalInstance = new ProfileModal();
    console.log('✅ Inicializando modal de perfil...');

    // Renderizar perfiles
    renderProfiles();

    // Función para renderizar los perfiles
    function renderProfiles() {
        const container = document.querySelector('.profiles-container');
        if (!container) return;

        // Limpiar el contenedor
        container.innerHTML = '';

        // Crear tarjetas de perfiles existentes
        profilesData.forEach((profile, index) => {
            const profileCard = createProfileCard(profile, index);
            container.appendChild(profileCard);
        });

        // Agregar tarjeta de "Agregar perfil"
        const addCard = createAddProfileCard();
        container.appendChild(addCard);
    }

    // Función para crear una tarjeta de perfil
    function createProfileCard(profile, index) {
        const article = document.createElement('article');
        article.className = 'profile-card';
        article.dataset.id = profile.id;

        // Header con icono
        const header = document.createElement('div');
        header.className = 'profile-card__header';
        
        const icon = document.createElement('div');
        icon.className = 'profile-icon';
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
        
        header.appendChild(icon);

        // Body con información
        const body = document.createElement('div');
        body.className = 'profile-card__body';

        const nameDiv = document.createElement('div');
        nameDiv.className = 'profile-name';
        const nameLabel = document.createElement('span');
        nameLabel.textContent = 'Nombre del perfil';
        const nameValue = document.createElement('strong');
        nameValue.textContent = profile.name;
        nameDiv.appendChild(nameLabel);
        nameDiv.appendChild(nameValue);

        const currencyDiv = document.createElement('div');
        currencyDiv.className = 'profile-currency';
        const currencyLabel = document.createElement('span');
        currencyLabel.textContent = 'Moneda';
        const currencyValue = document.createElement('strong');
        currencyValue.textContent = profile.currency;
        currencyDiv.appendChild(currencyLabel);
        currencyDiv.appendChild(currencyValue);

        // Acciones
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'profile-card__actions';
        
        const editLink = document.createElement('a');
        editLink.href = '#';
        editLink.className = 'action-link';
        editLink.textContent = 'Editar';
        editLink.dataset.index = index;
        
        const separator = document.createTextNode(' | ');
        
        const deleteLink = document.createElement('a');
        deleteLink.href = '#';
        deleteLink.className = 'action-link';
        deleteLink.textContent = 'Eliminar';
        deleteLink.dataset.index = index;

        actionsDiv.appendChild(editLink);
        actionsDiv.appendChild(separator);
        actionsDiv.appendChild(deleteLink);

        body.appendChild(nameDiv);
        body.appendChild(currencyDiv);
        body.appendChild(actionsDiv);

        article.appendChild(header);
        article.appendChild(body);

        // Event listeners
        editLink.addEventListener('click', (e) => {
            e.preventDefault();
            modalInstance.openForEdit(profile);
        });

        deleteLink.addEventListener('click', (e) => {
            e.preventDefault();
            handleDeleteProfile(index, article);
        });

        return article;
    }

    // Función para crear la tarjeta "Agregar perfil"
    function createAddProfileCard() {
        const card = document.createElement('article');
        card.className = 'profile-card profile-card--add';

        const icon = document.createElement('div');
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;

        const text = document.createElement('div');
        text.textContent = 'Agregar Perfil';
        text.style.fontSize = '1.1em';

        card.appendChild(icon);
        card.appendChild(text);

        card.addEventListener('click', () => {
            modalInstance.openForAdd();
        });

        return card;
    }

    // --- Función para manejar la eliminación de un perfil ---
    function handleDeleteProfile(index, cardElement) {
        const profileData = profilesData[index];
        
        if (confirm(`¿Estás seguro de que quieres eliminar el perfil "${profileData.name}"?\n\nEsta acción no se puede deshacer.`)) {
            // TODO: En producción, hacer petición a la API para eliminar
            // await fetch(`/api/profiles/${profileData.id}`, {
            //     method: 'DELETE'
            // });
            
            console.log(`Eliminando perfil:`, profileData);
            
            // Remover del DOM con animación
            cardElement.style.opacity = '0';
            cardElement.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                cardElement.remove();
                alert(`✅ Perfil "${profileData.name}" eliminado correctamente`);
            }, 300);
            
            // Remover del array de datos
            profilesData.splice(index, 1);
        }
    }
});