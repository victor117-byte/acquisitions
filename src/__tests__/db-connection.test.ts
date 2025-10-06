// Test de conexión a la base de datos
import { db, users } from '@/lib/db/neon';
import { hashPassword } from '@/lib/auth/utils';
import { eq } from 'drizzle-orm';

async function testDatabaseConnection() {
  console.log('🔌 Probando conexión a la base de datos...');
  
  try {
    // 1. Verificar conexión básica
    const result = await db.select().from(users).limit(1);
    console.log('✅ Conexión exitosa a la base de datos');
    console.log('📊 Usuarios encontrados:', result.length);
    
    // 2. Verificar esquema - intentar crear un usuario de prueba
    const testEmail = `test-${Date.now()}@example.com`;
    const hashedPassword = await hashPassword('test123');
    
    console.log('🧪 Creando usuario de prueba...');
    const [newUser] = await db
      .insert(users)
      .values({
        email: testEmail,
        password: hashedPassword,
        name: 'Usuario de Prueba',
        role: 'user',
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
      });
    
    console.log('✅ Usuario de prueba creado:', newUser);
    
    // 3. Verificar que podemos buscar el usuario
    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, testEmail))
      .limit(1);
      
    console.log('✅ Usuario encontrado:', foundUser ? 'Sí' : 'No');
    
    // 4. Limpiar - eliminar el usuario de prueba
    await db.delete(users).where(eq(users.email, testEmail));
    console.log('🧹 Usuario de prueba eliminado');
    
    return {
      success: true,
      message: 'Todas las pruebas de base de datos pasaron exitosamente'
    };
    
  } catch (error) {
    console.error('❌ Error en la prueba de base de datos:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      details: error
    };
  }
}

export default testDatabaseConnection;