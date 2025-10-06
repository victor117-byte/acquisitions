import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  console.log('🔄 Iniciando prueba de flujo completo de autenticación HTTP...');
  
  try {
    const baseUrl = 'http://localhost:3000';
    const testResults = {
      registrarUsuario: false,
      iniciarSesion: false,
      verificarSesion: false,
      cerrarSesion: false,
      verificarSesionCerrada: false,
      cleanup: false
    };
    
    const testEmail = `test-integration-${Date.now()}@example.com`;
    const testPassword = 'testPassword123';
    const testName = 'Usuario Prueba Integración';
    let authCookie = '';
    
    // 1. Probar registro de usuario
    console.log('📝 1. Probando registro de usuario...');
    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        name: testName
      }),
    });
    
    if (registerResponse.ok) {
      const registerData = await registerResponse.json();
      const setCookieHeader = registerResponse.headers.get('Set-Cookie');
      if (setCookieHeader) {
        authCookie = setCookieHeader.split(';')[0]; // Extraer solo la cookie auth-token
      }
      testResults.registrarUsuario = true;
      console.log('✅ Registro exitoso:', registerData.user);
      console.log('🍪 Cookie recibida:', authCookie ? 'Sí' : 'No');
    } else {
      const error = await registerResponse.json();
      console.log('❌ Error en registro:', error);
    }
    
    // 2. Probar logout después del registro
    console.log('🚪 2. Probando logout...');
    const logoutResponse = await fetch(`${baseUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Cookie': authCookie
      }
    });
    
    if (logoutResponse.ok) {
      console.log('✅ Logout exitoso');
    }
    
    // 3. Probar login con credenciales
    console.log('🔑 3. Probando login con credenciales...');
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      }),
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      const setCookieHeader = loginResponse.headers.get('Set-Cookie');
      if (setCookieHeader) {
        authCookie = setCookieHeader.split(';')[0];
      }
      testResults.iniciarSesion = true;
      console.log('✅ Login exitoso:', loginData.user);
      console.log('🍪 Cookie de login:', authCookie ? 'Sí' : 'No');
    } else {
      const error = await loginResponse.json();
      console.log('❌ Error en login:', error);
    }
    
    // 4. Probar verificación de sesión con cookie
    console.log('🔍 4. Probando verificación de sesión...');
    const meResponse = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        'Cookie': authCookie
      }
    });
    
    if (meResponse.ok) {
      const meData = await meResponse.json();
      testResults.verificarSesion = true;
      console.log('✅ Sesión verificada:', meData.user);
    } else {
      const error = await meResponse.json();
      console.log('❌ Error verificando sesión:', error);
    }
    
    // 5. Probar logout
    console.log('🚪 5. Probando logout...');
    const finalLogoutResponse = await fetch(`${baseUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Cookie': authCookie
      }
    });
    
    if (finalLogoutResponse.ok) {
      testResults.cerrarSesion = true;
      console.log('✅ Logout exitoso');
    }
    
    // 6. Verificar que la sesión se cerró
    console.log('🔒 6. Verificando que la sesión se cerró...');
    const verifyLogoutResponse = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        'Cookie': authCookie
      }
    });
    
    if (!verifyLogoutResponse.ok) {
      testResults.verificarSesionCerrada = true;
      console.log('✅ Sesión cerrada correctamente');
    } else {
      console.log('❌ La sesión sigue activa después del logout');
    }
    
    // 7. Limpiar - eliminar usuario de prueba
    console.log('🧹 7. Limpiando datos de prueba...');
    const cleanupResponse = await fetch(`${baseUrl}/api/test/cleanup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: testEmail }),
    });
    
    testResults.cleanup = cleanupResponse.ok;
    console.log(testResults.cleanup ? '✅ Limpieza completada' : '⚠️ No se pudo limpiar completamente');
    
    const allTestsPassed = Object.values(testResults).every(result => result === true);
    
    return NextResponse.json({
      success: allTestsPassed,
      message: allTestsPassed ? 
        '🎉 ¡Todas las pruebas de integración HTTP pasaron exitosamente!' : 
        '⚠️ Algunas pruebas de integración fallaron',
      results: testResults,
      testData: {
        email: testEmail,
        name: testName
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error en las pruebas de integración:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}