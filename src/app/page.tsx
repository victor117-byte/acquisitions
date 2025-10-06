import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, TrendingUp, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-xl font-bold">Acquisitions</h1>
          </div>
          <nav className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Iniciar Sesión</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Registrarse</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Sistema de Gestión Fiscal para Contadores
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Procesa documentos fiscales, gestiona clientes y obtén información
          tributaria en tiempo real con nuestra plataforma SaaS.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/register">
            <Button size="lg">Comenzar Gratis</Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline">
              Ver Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Características Principales
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <FileText className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Procesamiento de Documentos</CardTitle>
              <CardDescription>
                Sube y procesa PDFs y XMLs de facturas y documentos fiscales
                automáticamente.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Dashboard Analítico</CardTitle>
              <CardDescription>
                Visualiza métricas, gráficas y reportes de tus documentos
                procesados.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Seguridad Garantizada</CardTitle>
              <CardDescription>
                Tus datos están protegidos con encriptación de nivel empresarial
                y autenticación robusta.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Integración API</CardTitle>
              <CardDescription>
                Conéctate con sistemas externos y automatiza tus procesos
                fiscales.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Planes y Precios
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Gratuito</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold">$0</span> /mes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ 10 documentos por mes</li>
                <li>✓ Procesamiento básico</li>
                <li>✓ Soporte por email</li>
              </ul>
              <Link href="/auth/register">
                <Button className="w-full mt-4" variant="outline">
                  Comenzar
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold">$29.99</span> /mes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ 100 documentos por mes</li>
                <li>✓ Procesamiento avanzado</li>
                <li>✓ Soporte prioritario</li>
                <li>✓ API access</li>
              </ul>
              <Link href="/auth/register">
                <Button className="w-full mt-4">Elegir Plan</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Empresarial</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold">$99.99</span> /mes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ Documentos ilimitados</li>
                <li>✓ Procesamiento premium</li>
                <li>✓ Soporte 24/7</li>
                <li>✓ API dedicada</li>
                <li>✓ Gestor de cuenta</li>
              </ul>
              <Link href="/auth/register">
                <Button className="w-full mt-4" variant="outline">
                  Contactar Ventas
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 Acquisitions. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
