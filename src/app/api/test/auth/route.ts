import { NextRequest, NextResponse } from 'next/server';
import { db, users } from '@/lib/db/neon';
import { hashPassword, verifyPassword, signToken, verifyToken } from '@/lib/auth/utils';
import { eq } from 'drizzle-orm';

export async function GET() {
  console.log('🔐 Iniciando prueba completa de autenticación...');
  
  try {
    const testResults = {
      databaseConnection: false,
      passwordHashing: false,
      userCreation: false,
      loginFlow: false,
      tokenGeneration: false,
      tokenVerification: false,
      cookieFlow: false,
      cleanup: false
    };
    
    const testEmail = `test-auth-${Date.now()}@example.com`;
    const testPassword = 'testPassword123';
    let testUserId: number | null = null;
    
    // 1. Probar conexión a la base de datos
    console.log('📡 1. Probando conexión a base de datos...');
    await db.select().from(users).limit(1);
    testResults.databaseConnection = true;
    console.log('✅ Conexión a BD exitosa');
    
    // 2. Probar hashing de contraseñas
    console.log('🔒 2. Probando hash de contraseñas...');
    const hashedPassword = await hashPassword(testPassword);
    const isPasswordValid = await verifyPassword(testPassword, hashedPassword);
    testResults.passwordHashing = isPasswordValid;
    console.log('✅ Hash de contraseñas funcionando');
    
    // 3. Probar creación de usuario
    console.log('👤 3. Probando creación de usuario...');
    const [newUser] = await db
      .insert(users)
      .values({
        email: testEmail,
        password: hashedPassword,
        name: 'Usuario de Prueba Auth',
        role: 'user',
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
      });
    
    testUserId = newUser.id;
    testResults.userCreation = true;
    console.log('✅ Usuario creado:', newUser);
    
    // 4. Probar flujo de login (buscar usuario y verificar contraseña)
    console.log('🔑 4. Probando flujo de login...');
    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, testEmail))
      .limit(1);
    
    if (foundUser && foundUser.password) {
      const loginValid = await verifyPassword(testPassword, foundUser.password);
      testResults.loginFlow = loginValid;
      console.log('✅ Flujo de login exitoso');
    }
    
    // 5. Probar generación de token JWT
    console.log('🎫 5. Probando generación de token...');
    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });
    testResults.tokenGeneration = !!token;
    console.log('✅ Token generado');
    
    // 6. Probar verificación de token
    console.log('🔍 6. Probando verificación de token...');
    const payload = verifyToken(token);
    testResults.tokenVerification = !!(payload && payload.userId === newUser.id);
    console.log('✅ Token verificado:', payload);
    
    // 7. Limpiar - eliminar usuario de prueba
    console.log('🧹 7. Limpiando datos de prueba...');
    if (testUserId) {
      await db.delete(users).where(eq(users.id, testUserId));
      testResults.cleanup = true;
      console.log('✅ Limpieza completada');
    }
    
    const allTestsPassed = Object.values(testResults).every(result => result === true);
    
    return NextResponse.json({
      success: allTestsPassed,
      message: allTestsPassed ? '✅ Todas las pruebas de autenticación pasaron' : '❌ Algunas pruebas fallaron',
      results: testResults,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error en las pruebas de autenticación:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}