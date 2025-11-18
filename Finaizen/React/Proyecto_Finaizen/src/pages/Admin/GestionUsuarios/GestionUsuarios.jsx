import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Sidebar from '../../../components/layout/Sidebar';
import KPICards from '../../../components/users/KPICards';
import UsersFilters from '../../../components/users/UsersFilters';
import UsersTable from '../../../components/users/UsersTable';
import { 
  ViewUserModal, 
  EditRoleModal, 
  InviteUserModal, 
  ConfirmActionModal 
} from '../../../components/users/UserModals';
import { usersData, ROLES } from '../../../utils/usersData';
import { adminSidebarMenuItems, adminDropdownMenuItems } from '../../../config/adminSidebarConfig';
import styles from './GestionUsuarios.module.css';

function GestionUsuarios() {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Estado de usuarios
  const [users, setUsers] = useState(usersData);
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  
  // Estados de modales
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  
  // Usuario seleccionado
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(null);

  // Filtros
  const [filters, setFilters] = useState({
    search: '',
    role: 'todos',
    status: 'todos'
  });

  // Proteger ruta
  useEffect(() => {
    if (!currentUser || !isAdmin) {
      navigate('/login');
    }
  }, [currentUser, isAdmin, navigate]);

  // Calcular KPIs
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'activo').length;
  const suspendedUsers = users.filter(u => u.status === 'suspendido').length;

  // Aplicar filtros
  const applyFilters = (searchTerm, role, status) => {
    let filtered = [...users];

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por rol
    if (role !== 'todos') {
      filtered = filtered.filter(u => u.role === role);
    }

    // Filtrar por estado
    if (status !== 'todos') {
      filtered = filtered.filter(u => u.status === status);
    }

    setFilteredUsers(filtered);
  };

  // Handlers de filtros
  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    applyFilters(searchTerm, filters.role, filters.status);
  };

  const handleRoleFilter = (role) => {
    setFilters(prev => ({ ...prev, role }));
    applyFilters(filters.search, role, filters.status);
  };

  const handleStatusFilter = (status) => {
    setFilters(prev => ({ ...prev, status }));
    applyFilters(filters.search, filters.role, status);
  };

  // Handlers de acciones
  const handleViewUser = (userId) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handleEditRole = (userId) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleToggleStatus = (userId) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(user);
    setActionType(user.status === 'activo' ? 'suspend' : 'activate');
    setConfirmModalOpen(true);
  };

  const handleInviteUser = () => {
    setInviteModalOpen(true);
  };

  // Handlers de modales
  const handleSaveRole = (userId, newRole) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ));
    setFilteredUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ));
  };

  const handleConfirmAction = (userId) => {
    setUsers(prev => prev.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'activo' ? 'suspendido' : 'activo' } 
        : u
    ));
    setFilteredUsers(prev => prev.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'activo' ? 'suspendido' : 'activo' } 
        : u
    ));
  };

  const handleInvite = (email, role) => {
    const newUser = {
      id: users.length + 1,
      name: email.split('@')[0],
      email: email,
      role: role,
      status: 'activo',
      date: new Date().toLocaleDateString('es-ES')
    };
    
    setUsers(prev => [...prev, newUser]);
    setFilteredUsers(prev => [...prev, newUser]);
    alert(`Invitación enviada a ${email}`);
  };

  return (
    <div className={styles.container}>
      <Sidebar 
        menuItems={adminSidebarMenuItems}
        userMenuItems={adminDropdownMenuItems}
        variant="admin"
        onCollapsedChange={setIsCollapsed}
      />
      
      <main className={`${styles.mainContent} ${isCollapsed ? styles.expanded : ''}`}>
        <div className={styles.header}>
          <h1>Gestión de Usuarios</h1>
          <button className={styles.btnInvite} onClick={handleInviteUser}>
            Invitar Usuario
          </button>
        </div>

        <KPICards 
          total={totalUsers}
          active={activeUsers}
          suspended={suspendedUsers}
        />

        <UsersFilters
          onSearch={handleSearch}
          onRoleFilter={handleRoleFilter}
          onStatusFilter={handleStatusFilter}
        />

        <UsersTable 
          users={filteredUsers}
          onViewUser={handleViewUser}
          onEditRole={handleEditRole}
          onToggleStatus={handleToggleStatus}
        />

        {/* Modales */}
        <ViewUserModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          user={selectedUser}
        />

        <EditRoleModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          user={selectedUser}
          roles={ROLES}
          onSave={handleSaveRole}
        />

        <InviteUserModal
          isOpen={inviteModalOpen}
          onClose={() => setInviteModalOpen(false)}
          roles={ROLES}
          onInvite={handleInvite}
        />

        <ConfirmActionModal
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          user={selectedUser}
          action={actionType}
          onConfirm={handleConfirmAction}
        />
      </main>
    </div>
  );
}

export default GestionUsuarios;
