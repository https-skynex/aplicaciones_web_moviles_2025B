/**
 * Configuración compartida de menús del sidebar para administrador
 */

export const adminSidebarMenuItems = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Gestión de Usuarios', path: '/admin/gestion-usuarios' },
  { label: 'Gestión de Roles', path: '/admin/gestion-roles' },
  { label: 'Supervisión de Categorías', path: '/admin/supervision-categorias' },
  { label: 'Registro de Seguridad', path: '/admin/registro-seguridad' },
  { label: 'Inteligencia de Mercado', path: '/admin/inteligencia-mercado' },
  { label: 'Reportes y Soporte', path: '/admin/reportes-soporte' }
];

export const adminDropdownMenuItems = [
  { icon: '👤', label: 'Mi Perfil', path: '/admin/config/perfil' },
  { icon: '⚙️', label: 'Configuración', path: '/admin/config/cuenta' }
];