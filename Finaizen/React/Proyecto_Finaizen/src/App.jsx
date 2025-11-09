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
import TestDashboard from './pages/User/TestDashboard';

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
        <Route path="/user/dashboard" element={<DashboardUser />} />
        <Route path="/user/nuevo-ingreso" element={<NuevoIngreso />} />
        <Route path="/user/nuevo-egreso" element={<NuevoEgreso />} />
        <Route path="/user/historial" element={<Historial />} />
        <Route path="/user/administrar-registros" element={<AdministrarRegistros />} />
        <Route path="/user/presupuestos" element={<Presupuestos />} />

        {/* Ruta temporal para dashboard admin (crear después) */}
        <Route path="/admin/dashboard" element={<div style={{padding: '2rem', textAlign: 'center'}}>Dashboard Admin - En construcción</div>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App
