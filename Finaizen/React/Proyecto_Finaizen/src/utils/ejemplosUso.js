// Ejemplo de uso de MockDatabase en React

import mockDB from '../utils/mockDatabase';

// ============================================
// EJEMPLO 1: LOGIN
// ============================================

function loginExample() {
  // Login con correo
  const result1 = mockDB.login('maria@example.com', 'maria123');
  console.log('Login exitoso:', result1.success); // true
  console.log('Usuario:', result1.user.nombreCompleto); // "María González"
  console.log('Edad:', result1.user.edad); // Calculada automáticamente
  console.log('Perfil activo:', result1.perfil.nombre); // "Personal"

  // Login con nombre de usuario
  const result2 = mockDB.login('admin', 'admin123');
  console.log('Es admin:', result2.user.esAdmin); // true
}

// ============================================
// EJEMPLO 2: REGISTRO DE NUEVO USUARIO
// ============================================

function registerExample() {
  const nuevoUsuario = mockDB.register({
    nombre: 'Juan',
    apellido: 'Pérez',
    correo: 'juan@example.com',
    nombreUsuario: 'juan.perez',
    contraseña: 'juan123',
    pais: 'México',
    fechaNacimiento: '1990-01-15'
  });

  if (nuevoUsuario.success) {
    console.log('Usuario creado:', nuevoUsuario.user);
    console.log('Perfil inicial:', nuevoUsuario.perfil);
    console.log('Logros inicializados:', mockDB.getLogrosDePerfil(nuevoUsuario.perfil.id).length);
    // Automáticamente autenticado
    console.log('Sesión activa:', mockDB.currentUser.nombreCompleto);
  }
}

// ============================================
// EJEMPLO 3: OBTENER DATOS DEL PERFIL ACTUAL
// ============================================

function getDashboardData() {
  // Asumiendo que ya hay una sesión activa
  if (!mockDB.currentPerfil) {
    console.error('No hay perfil activo');
    return;
  }

  const perfilId = mockDB.currentPerfil.id;

  // Obtener todos los datos
  const ingresos = mockDB.getIngresosDePerf(perfilId);
  const egresos = mockDB.getEgresosDePerf(perfilId);
  const presupuestos = mockDB.getPresupuestosDePerfil(perfilId);
  const logros = mockDB.getLogrosDePerfil(perfilId);
  const historial = mockDB.getHistorialDePerfil(perfilId, 11, 2024); // Noviembre 2024
  const notificaciones = mockDB.getNotificacionesDeUsuario(mockDB.currentUser.id, true); // Solo no leídas

  console.log('=== DASHBOARD DATA ===');
  console.log('Ingresos activos:', ingresos.filter(i => i.activo).length);
  console.log('Egresos activos:', egresos.filter(e => e.activo).length);
  console.log('Presupuestos:', presupuestos.length);
  console.log('Logros desbloqueados:', logros.filter(l => l.desbloqueado).length);
  console.log('Transacciones en historial:', historial.length);
  console.log('Notificaciones no leídas:', notificaciones.length);

  // Calcular ahorro mensual
  const ingresosNov = historial.filter(h => h.tipo === 'ingreso').reduce((sum, h) => sum + h.monto, 0);
  const egresosNov = historial.filter(h => h.tipo === 'egreso').reduce((sum, h) => sum + h.monto, 0);
  const ahorroMensual = ingresosNov - egresosNov;
  
  console.log('Ahorro Noviembre:', ahorroMensual);

  return {
    ingresos,
    egresos,
    presupuestos,
    logros,
    historial,
    notificaciones,
    ahorroMensual
  };
}

// ============================================
// EJEMPLO 4: CREAR NUEVO INGRESO
// ============================================

import Ingreso from '../models/Ingreso';

function crearNuevoIngreso() {
  const nuevoIngreso = new Ingreso({
    id: `ing_${Date.now()}`,
    perfilId: mockDB.currentPerfil.id,
    monto: 800,
    descripcion: 'Bono trimestral',
    categoria: 'Salario',
    frecuencia: 'ocasional',
    fechaEspecifica: new Date(),
    horaNotificacion: null,
    notificacionActiva: false
  });

  // Guardar en la base de datos
  mockDB.ingresos.push(nuevoIngreso);
  mockDB.currentPerfil.agregarIngreso(nuevoIngreso.id);

  console.log('✅ Ingreso creado:', nuevoIngreso.descripcion);
  console.log('Próxima ejecución:', nuevoIngreso.proximaEjecucion);
}

// ============================================
// EJEMPLO 5: CREAR NUEVO EGRESO CON IA
// ============================================

import Egreso from '../models/Egreso';

function crearNuevoEgreso() {
  const nuevoEgreso = new Egreso({
    id: `egr_${Date.now()}`,
    perfilId: mockDB.currentPerfil.id,
    monto: 19.99,
    descripcion: 'Amazon Prime',
    categoria: 'Otros', // Será clasificado por IA
    frecuencia: 'mensual',
    diaMes: 1,
    horaNotificacion: '10:00',
    notificacionActiva: true
  });

  // Clasificar con IA
  nuevoEgreso.clasificarConIA();
  console.log('Clasificación IA:', nuevoEgreso.clasificacionIA); // "Suscripciones"

  // Guardar
  mockDB.egresos.push(nuevoEgreso);
  mockDB.currentPerfil.agregarEgreso(nuevoEgreso.id);

  console.log('✅ Egreso creado:', nuevoEgreso.descripcion);
  console.log('Categoría detectada:', nuevoEgreso.clasificacionIA);
}

// ============================================
// EJEMPLO 6: VERIFICAR Y EJECUTAR TRANSACCIONES PENDIENTES
// ============================================

import RegistroHistorial from '../models/RegistroHistorial';
import Notificacion from '../models/Notificacion';

function ejecutarTransaccionesPendientes() {
  let ejecutadas = 0;

  // Ejecutar ingresos pendientes
  mockDB.ingresos.forEach(ingreso => {
    if (ingreso.debeEjecutarse()) {
      // Crear registro en historial
      const registro = RegistroHistorial.fromIngreso(ingreso, ingreso.perfilId);
      mockDB.historial.push(registro);

      // Marcar como ejecutado y calcular próxima ejecución
      ingreso.marcarComoEjecutado();

      // Crear notificación
      const notif = Notificacion.crearNotificacionTransaccion(
        mockDB.currentUser.id,
        ingreso.perfilId,
        ingreso,
        'ingreso'
      );
      mockDB.notificaciones.push(notif);

      ejecutadas++;
      console.log(`💰 Ingreso ejecutado: ${ingreso.descripcion} - $${ingreso.monto}`);
    }
  });

  // Ejecutar egresos pendientes
  mockDB.egresos.forEach(egreso => {
    if (egreso.debeEjecutarse()) {
      // Crear registro en historial
      const registro = RegistroHistorial.fromEgreso(egreso, egreso.perfilId);
      mockDB.historial.push(registro);

      // Actualizar presupuesto correspondiente
      const presupuesto = mockDB.presupuestos.find(
        p => p.perfilId === egreso.perfilId && p.categoria === egreso.categoria
      );

      if (presupuesto) {
        presupuesto.agregarGasto(egreso.monto);
        
        // Si excede o está cerca del límite, crear notificación
        if (presupuesto.estado === 'warning' || presupuesto.estado === 'danger') {
          const notifPresupuesto = Notificacion.crearNotificacionPresupuesto(
            mockDB.currentUser.id,
            egreso.perfilId,
            presupuesto
          );
          mockDB.notificaciones.push(notifPresupuesto);
        }
      }

      // Marcar como ejecutado
      egreso.marcarComoEjecutado();

      // Crear notificación
      const notif = Notificacion.crearNotificacionTransaccion(
        mockDB.currentUser.id,
        egreso.perfilId,
        egreso,
        'egreso'
      );
      mockDB.notificaciones.push(notif);

      ejecutadas++;
      console.log(`💸 Egreso ejecutado: ${egreso.descripcion} - $${egreso.monto}`);
    }
  });

  console.log(`✅ Total de transacciones ejecutadas: ${ejecutadas}`);
  return ejecutadas;
}

// ============================================
// EJEMPLO 7: VERIFICAR LOGROS
// ============================================

function verificarLogros() {
  const perfilId = mockDB.currentPerfil.id;
  const logros = mockDB.getLogrosDePerfil(perfilId);
  
  // Verificar logro de primeros registros
  const logroPrimerIngreso = logros.find(l => l.id === 'logro_primer_ingreso');
  const ingresos = mockDB.getIngresosDePerf(perfilId);
  
  if (ingresos.length >= 1 && !logroPrimerIngreso.desbloqueado) {
    logroPrimerIngreso.desbloquear();
    
    // Crear notificación
    const notif = Notificacion.crearNotificacionLogro(
      mockDB.currentUser.id,
      perfilId,
      logroPrimerIngreso
    );
    mockDB.notificaciones.push(notif);
    
    console.log('🏆 Logro desbloqueado:', logroPrimerIngreso.nombre);
  }

  // Verificar logro de cantidad de registros
  const logro50Registros = logros.find(l => l.id === 'logro_50_registros');
  const totalRegistros = mockDB.getHistorialDePerfil(perfilId).length;
  
  logro50Registros.actualizarProgreso(totalRegistros);
  console.log(`Progreso "Detallista": ${logro50Registros.progreso}/${logro50Registros.meta}`);
  
  if (logro50Registros.desbloqueado) {
    console.log('🏆 Logro desbloqueado:', logro50Registros.nombre);
  }
}

// ============================================
// EJEMPLO 8: OBTENER ESTADO DE PRESUPUESTOS
// ============================================

function getPresupuestosConEstado() {
  const perfilId = mockDB.currentPerfil.id;
  const presupuestos = mockDB.getPresupuestosDePerfil(perfilId);

  const resumen = presupuestos.map(p => ({
    categoria: p.categoria,
    gastado: p.montoGastado,
    limite: p.montoLimite,
    porcentaje: p.porcentajeGastado,
    restante: p.montoRestante,
    estado: p.estado,
    alerta: p.mensajeAlerta,
    excedido: p.excedido
  }));

  console.table(resumen);
  return resumen;
}

// ============================================
// EJEMPLO 9: CAMBIAR DE PERFIL
// ============================================

function cambiarPerfil(perfilId) {
  const perfil = mockDB.perfiles.find(p => p.id === perfilId);
  
  if (!perfil) {
    console.error('Perfil no encontrado');
    return;
  }

  // Verificar que pertenece al usuario actual
  if (perfil.userId !== mockDB.currentUser.id) {
    console.error('No tienes permiso para acceder a este perfil');
    return;
  }

  mockDB.currentPerfil = perfil;
  console.log(`✅ Cambiado a perfil: ${perfil.nombre}`);
  console.log(`Moneda: ${perfil.simboloMoneda}${perfil.moneda}`);
}

// ============================================
// EJEMPLO 10: HOOK PERSONALIZADO (para React)
// ============================================

import { useState, useEffect } from 'react';

function useAuth() {
  const [currentUser, setCurrentUser] = useState(mockDB.currentUser);
  const [currentPerfil, setCurrentPerfil] = useState(mockDB.currentPerfil);

  const login = (correoOUsername, contraseña) => {
    const result = mockDB.login(correoOUsername, contraseña);
    if (result.success) {
      setCurrentUser(result.user);
      setCurrentPerfil(result.perfil);
    }
    return result;
  };

  const logout = () => {
    mockDB.logout();
    setCurrentUser(null);
    setCurrentPerfil(null);
  };

  const register = (userData) => {
    const result = mockDB.register(userData);
    if (result.success) {
      setCurrentUser(result.user);
      setCurrentPerfil(result.perfil);
    }
    return result;
  };

  const cambiarPerfil = (perfilId) => {
    const perfil = mockDB.perfiles.find(p => p.id === perfilId && p.userId === currentUser.id);
    if (perfil) {
      mockDB.currentPerfil = perfil;
      setCurrentPerfil(perfil);
    }
  };

  return {
    currentUser,
    currentPerfil,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.esAdmin || false,
    login,
    logout,
    register,
    cambiarPerfil
  };
}

// ============================================
// EXPORTAR EJEMPLOS
// ============================================

export {
  loginExample,
  registerExample,
  getDashboardData,
  crearNuevoIngreso,
  crearNuevoEgreso,
  ejecutarTransaccionesPendientes,
  verificarLogros,
  getPresupuestosConEstado,
  cambiarPerfil,
  useAuth
};

// ============================================
// USO EN COMPONENTE REACT
// ============================================

/*
import { useAuth } from './utils/ejemplosUso';

function App() {
  const { currentUser, currentPerfil, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <div>
      <h1>Bienvenido, {currentUser.nombreCompleto}</h1>
      <p>Perfil activo: {currentPerfil.nombre}</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}
*/
