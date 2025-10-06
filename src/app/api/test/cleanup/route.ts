import { NextRequest, NextResponse } from 'next/server';
import { db, users } from '@/lib/db/neon';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }
    
    // Eliminar usuario por email
    const deletedRows = await db
      .delete(users)
      .where(eq(users.email, email))
      .returning({ id: users.id, email: users.email });
    
    return NextResponse.json({
      success: true,
      message: `Usuario ${email} eliminado`,
      deletedUsers: deletedRows.length,
      deletedData: deletedRows
    });
    
  } catch (error) {
    console.error('Error en limpieza:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}