import { createContext, useContext, useState, useEffect } from 'react';
import mockDB from '../utils/mockDatabase';

/**
 * AuthContext - Contexto de Autenticación Global
 * Maneja el estado de autenticación en toda la aplicación
 */
const AuthContext = createContext(null);

/**
 * Hook personalizado para usar el contexto de autenticación
 * @returns {Object} Contexto de autenticación
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

/**
 * AuthProvider - Proveedor del contexto de autenticación
 * Envuelve la aplicación para proveer estado global de auth
 */
export const AuthProvider = ({ children }) => {
  // Estados
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPerfil, setCurrentPerfil] = useState(null);
  const [perfiles, setPerfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar sesión guardada al iniciar
  useEffect(() => {
    const loadSession = () => {
      try {
        // Intentar cargar sesión desde localStorage
        const savedSession = localStorage.getItem('finaizen_session');
        if (savedSession) {
          const { userId, perfilId } = JSON.parse(savedSession);
          
          // Buscar usuario en mockDB
          const user = mockDB.users.find(u => u.id === userId);
          if (user) {
            mockDB.currentUser = user;
            setCurrentUser(user);

            // Cargar perfiles del usuario
            const userPerfiles = mockDB.getPerfilesDeUsuario(userId);
            setPerfiles(userPerfiles);

            // Buscar perfil activo
            const perfil = userPerfiles.find(p => p.id === perfilId) || userPerfiles[0];
            if (perfil) {
              mockDB.currentPerfil = perfil;
              setCurrentPerfil(perfil);
            }
          }
        }
      } catch (error) {
        console.error('Error al cargar sesión:', error);
        localStorage.removeItem('finaizen_session');
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  /**
   * Inicia sesión
   * @param {string} correoOUsername - Correo o nombre de usuario
   * @param {string} contraseña - Contraseña
   * @returns {Object} Resultado del login
   */
  const login = (correoOUsername, contraseña) => {
    const result = mockDB.login(correoOUsername, contraseña);
    
    if (result.success) {
      setCurrentUser(result.user);
      setCurrentPerfil(result.perfil);
      
      // Cargar perfiles del usuario
      const userPerfiles = mockDB.getPerfilesDeUsuario(result.user.id);
      setPerfiles(userPerfiles);

      // Guardar sesión en localStorage
      localStorage.setItem('finaizen_session', JSON.stringify({
        userId: result.user.id,
        perfilId: result.perfil.id
      }));
    }
    
    return result;
  };

  /**
   * Cierra sesión
   */
  const logout = () => {
    mockDB.logout();
    setCurrentUser(null);
    setCurrentPerfil(null);
    setPerfiles([]);
    localStorage.removeItem('finaizen_session');
  };

  /**
   * Registra un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Object} Resultado del registro
   */
  const register = (userData) => {
    const result = mockDB.register(userData);
    
    if (result.success) {
      setCurrentUser(result.user);
      setCurrentPerfil(result.perfil);
      setPerfiles([result.perfil]);

      // Guardar sesión
      localStorage.setItem('finaizen_session', JSON.stringify({
        userId: result.user.id,
        perfilId: result.perfil.id
      }));
    }
    
    return result;
  };

  /**
   * Cambia el perfil activo
   * @param {string} perfilId - ID del perfil
   */
  const cambiarPerfil = (perfilId) => {
    const perfil = perfiles.find(p => p.id === perfilId);
    if (perfil) {
      mockDB.currentPerfil = perfil;
      setCurrentPerfil(perfil);

      // Actualizar sesión guardada
      const session = JSON.parse(localStorage.getItem('finaizen_session') || '{}');
      session.perfilId = perfilId;
      localStorage.setItem('finaizen_session', JSON.stringify(session));
    }
  };

  /**
   * Actualiza la lista de perfiles (útil después de crear uno nuevo)
   */
  const actualizarPerfiles = () => {
    if (currentUser) {
      const userPerfiles = mockDB.getPerfilesDeUsuario(currentUser.id);
      setPerfiles(userPerfiles);
    }
  };

  // Valor del contexto
  const value = {
    // Estado
    currentUser,
    currentPerfil,
    perfiles,
    loading,
    
    // Computed
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.esAdmin || false,
    
    // Métodos
    login,
    logout,
    register,
    cambiarPerfil,
    actualizarPerfiles
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
