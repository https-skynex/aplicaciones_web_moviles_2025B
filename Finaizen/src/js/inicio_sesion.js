// inicio_sesion.js - Maneja el inicio de sesión de usuarios

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("No se encontró el formulario de inicio de sesión");
        return;
    }

    // Base de datos de usuarios (simulada)
    const users = [
        {
            email: "usuario@finaizen.com",
            password: "usuario123",
            role: "user",
            name: "Usuario Normal"
        },
        {
            email: "admin@finaizen.com",
            password: "admin123",
            role: "admin",
            name: "Administrador"
        }
    ];

    // Manejar el envío del formulario
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const remember = document.getElementById("remember").checked;

        // Validar que los campos no estén vacíos
        if (!email || !password) {
            alert("Error: Por favor completa todos los campos.");
            return;
        }

        // Buscar el usuario en la base de datos
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert("Error: Correo electrónico o contraseña incorrectos.\n\nIntenta con:\n• usuario@finaizen.com / usuario123\n• admin@finaizen.com / admin123");
            return;
        }

        // Si el usuario marcó "Recordarme", guardar en localStorage
        if (remember) {
            localStorage.setItem("rememberedUser", email);
            localStorage.setItem("userRole", user.role);
        }

        // Guardar información de sesión
        sessionStorage.setItem("currentUser", email);
        sessionStorage.setItem("userName", user.name);
        sessionStorage.setItem("userRole", user.role);

        // Mostrar información de inicio de sesión
        alert(`🔐 INFORMACIÓN DE INICIO DE SESIÓN\n\n📧 Correo: ${email}\n🔑 Contraseña: ${password}\n👤 Rol: ${user.role === 'admin' ? 'Administrador' : 'Usuario'}\n\n✅ ¡Bienvenido, ${user.name}!`);

        // Redirigir según el rol del usuario
        if (user.role === "admin") {
            // Redirigir al dashboard de administrador
            window.location.href = "../Admin/dashboard.html";
        } else {
            // Redirigir al dashboard de usuario
            window.location.href = "../User/dashboard.html";
        }
    });

    // Cargar usuario recordado si existe
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
        document.getElementById("email").value = rememberedUser;
        document.getElementById("remember").checked = true;
    }

    // Mostrar información de usuarios disponibles en consola (solo para desarrollo)
    console.log("👥 Usuarios disponibles para prueba:");
    console.log("📧 Usuario normal: usuario@finaizen.com | 🔑 Contraseña: usuario123");
    console.log("📧 Administrador: admin@finaizen.com | 🔑 Contraseña: admin123");
});
