'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileText, Users, Shield, BarChart3 } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirigir a dashboard si el usuario está autenticado
  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  // Mostrar contenido solo si no está cargando y no hay usuario
  if (loading || user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gradient">Acquisitions</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Iniciar Sesión</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Registrarse</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Gestión Fiscal{' '}
            <span className="text-gradient">Inteligente</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Plataforma SaaS diseñada para contadores y contribuyentes. 
            Automatiza tu gestión fiscal, procesa documentos y optimiza tu trabajo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto">
                Comenzar Gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Ver Planes
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Procesamiento Inteligente</CardTitle>
              <CardDescription>
                Carga PDFs y XMLs. Extrae información fiscal automáticamente.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Gestión de Clientes</CardTitle>
              <CardDescription>
                Organiza la información de tus contribuyentes de forma eficiente.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Seguridad Garantizada</CardTitle>
              <CardDescription>
                Protección de datos con los más altos estándares de seguridad.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Pricing Preview */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Planes que se adaptan a ti</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Gratuito</CardTitle>
                <CardDescription>Perfecto para empezar</CardDescription>
                <div className="text-3xl font-bold">$0<span className="text-sm font-normal">/mes</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ 10 documentos/mes</li>
                  <li>✓ 1 usuario</li>
                  <li>✓ Soporte básico</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>Para profesionales</CardDescription>
                <div className="text-3xl font-bold">$29<span className="text-sm font-normal">/mes</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ 500 documentos/mes</li>
                  <li>✓ 5 usuarios</li>
                  <li>✓ Soporte prioritario</li>
                  <li>✓ Reportes avanzados</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Empresarial</CardTitle>
                <CardDescription>Para empresas</CardDescription>
                <div className="text-3xl font-bold">$99<span className="text-sm font-normal">/mes</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Documentos ilimitados</li>
                  <li>✓ Usuarios ilimitados</li>
                  <li>✓ Soporte 24/7</li>
                  <li>✓ API completa</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t mt-16">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2024 Acquisitions. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}