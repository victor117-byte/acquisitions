import { NextRequest, NextResponse } from 'next/server';
import { db, users } from '@/lib/db/neon';
import { verifyPassword, signToken } from '@/lib/auth/utils';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validaciones básicas
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar el usuario por email
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Si no tiene password (usuario de Supabase), no puede hacer login local
    if (!user.password) {
      return NextResponse.json(
        { error: 'Esta cuenta fue creada con un proveedor externo' },
        { status: 401 }
      );
    }

    // Verificar la contraseña
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Generar token JWT
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Datos del usuario (sin la contraseña)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    };

    // Configurar cookie
    const response = NextResponse.json({
      user: userData,
      message: 'Inicio de sesión exitoso',
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return response;
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}