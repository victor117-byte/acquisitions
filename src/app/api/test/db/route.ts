import { NextRequest, NextResponse } from 'next/server';
import { db, users } from '@/lib/db/neon';
import { hashPassword } from '@/lib/auth/utils';
import { eq } from 'drizzle-orm';

export async function GET() {
  console.log('🔌 Iniciando prueba de conexión a la base de datos...');
  
  try {
    // 1. Verificar conexión básica
    console.log('📡 Verificando conexión...');
    const result = await db.select().from(users).limit(5);
    console.log('✅ Conexión exitosa a la base de datos');
    console.log('📊 Usuarios encontrados:', result.length);
    
    // 2. Mostrar algunos datos existentes (sin passwords)
    const usersData = result.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt
    }));
    
    // 3. Verificar que podemos hacer una query específica
    const userCount = await db.select().from(users);
    console.log('📈 Total de usuarios en la base de datos:', userCount.length);
    
    return NextResponse.json({
      success: true,
      message: '✅ Base de datos funcionando correctamente',
      data: {
        totalUsers: userCount.length,
        recentUsers: usersData,
        databaseConnected: true,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ Error en la prueba de base de datos:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}