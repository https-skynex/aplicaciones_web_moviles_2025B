import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { userSidebarMenuItems, userDropdownMenuItems } from '../../../config/sidebarConfig';
import styles from './UserLayout.module.css';

/**
 * UserLayout - Layout para páginas de usuario
 * Usa el Sidebar reutilizable con variante 'user'
 */
const UserLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={styles.userLayout}>
      <Sidebar
        menuItems={userSidebarMenuItems}
        userMenuItems={userDropdownMenuItems}
        variant="user"
        onCollapsedChange={setSidebarCollapsed}
      />

      <main className={`${styles.mainContent} ${sidebarCollapsed ? styles.collapsed : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;