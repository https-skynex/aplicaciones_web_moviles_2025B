import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Base/Login';
import Landing from './pages/Base/Landing';
import Register from './pages/Base/Register';
import DashboardUser from './pages/User/DashboardUser';
import NuevoIngreso from './pages/User/NuevoIngreso';
import NuevoEgreso from './pages/User/NuevoEgreso';
import Historial from './pages/User/Historial';
import AdministrarRegistros from './pages/User/AdministrarRegistros';
import Presupuestos from './pages/User/Presupuestos';

// Configuración
import ConfigLayout from './components/layout/ConfigLayout';
import ConfigCuenta from './pages/User/Config/ConfigCuenta';
import ConfigSeguridad from './pages/User/Config/ConfigSeguridad';
import ConfigPerfiles from './pages/User/Config/ConfigPerfiles';
import ConfigNotificaciones from './pages/User/Config/ConfigNotificaciones';
import ConfigAyuda from './pages/User/Config/ConfigAyuda';

// User Layout
import UserLayout from './components/layout/UserLayout';

// Admin
import { DashboardAdmin, InteligenciaMercado, GestionRoles, GestionUsuarios, SupervisionCategorias, RegistroSeguridad, ReportesSoporte } from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Landing pública */}
        <Route path="/" element={<Landing />} />

        {/* Auth públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard de Usuario */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<DashboardUser />} />
          <Route path="nuevo-ingreso" element={<NuevoIngreso />} />
          <Route path="nuevo-egreso" element={<NuevoEgreso />} />
          <Route path="historial" element={<Historial />} />
          <Route path="administrar-registros" element={<AdministrarRegistros />} />
          <Route path="presupuestos" element={<Presupuestos />} />
        </Route>

        {/* Configuración - Rutas anidadas */}
        <Route path="/user/config" element={<ConfigLayout />}>
          <Route path="cuenta" element={<ConfigCuenta />} />
          <Route path="seguridad" element={<ConfigSeguridad />} />
          <Route path="perfiles" element={<ConfigPerfiles />} />
          <Route path="notificaciones" element={<ConfigNotificaciones />} />
          <Route path="ayuda" element={<ConfigAyuda />} />
          {/* Redirigir /user/config a cuenta por defecto */}
          <Route index element={<Navigate to="cuenta" replace />} />
        </Route>

        {/* Ruta temporal para dashboard admin (crear después) */}
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/inteligencia-mercado" element={<InteligenciaMercado />} />
        <Route path="/admin/gestion-roles" element={<GestionRoles />} />
        <Route path="/admin/gestion-usuarios" element={<GestionUsuarios />} />
        <Route path="/admin/supervision-categorias" element={<SupervisionCategorias />} />
        <Route path="/admin/registro-seguridad" element={<RegistroSeguridad />} />
        <Route path="/admin/reportes-soporte" element={<ReportesSoporte />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App
