import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowLeft, Star } from 'lucide-react';

const plans = [
  {
    name: 'Gratuito',
    description: 'Perfecto para empezar y probar la plataforma',
    price: 0,
    interval: 'mes',
    features: [
      '10 documentos por mes',
      '1 usuario',
      'Procesamiento básico de PDF y XML',
      'Soporte por email',
      '100 MB de almacenamiento',
      'Exportación de reportes básicos',
    ],
    limitations: [
      'Sin análisis avanzado',
      'Sin integración API',
      'Sin soporte prioritario',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Ideal para profesionales y pequeñas oficinas contables',
    price: 29,
    interval: 'mes',
    features: [
      '500 documentos por mes',
      'Hasta 5 usuarios',
      'Procesamiento avanzado con IA',
      'Soporte prioritario por chat',
      '5 GB de almacenamiento',
      'Reportes avanzados y personalizables',
      'Integración con sistemas contables',
      'Alertas automáticas',
      'Backup automático',
    ],
    limitations: [],
    popular: true,
  },
  {
    name: 'Empresarial',
    description: 'Para empresas grandes y despachos contables',
    price: 99,
    interval: 'mes',
    features: [
      'Documentos ilimitados',
      'Usuarios ilimitados',
      'IA avanzada con machine learning',
      'Soporte 24/7 dedicado',
      'Almacenamiento ilimitado',
      'API completa para integraciones',
      'Análisis predictivo',
      'Cumplimiento normativo avanzado',
      'Onboarding personalizado',
      'Manager de cuenta dedicado',
    ],
    limitations: [],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Planes que se adaptan a{' '}
            <span className="text-gradient">tu negocio</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Desde profesionales independientes hasta grandes despachos contables, 
            tenemos el plan perfecto para automatizar tu gestión fiscal.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Más Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.interval}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">No incluye:</p>
                    <div className="space-y-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-start">
                          <span className="text-muted-foreground text-sm">• {limitation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-6">
                  <Link href="/auth/register" className="w-full block">
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.price === 0 ? 'Comenzar Gratis' : 'Elegir Plan'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
              <p className="text-muted-foreground text-sm">
                Sí, puedes actualizar o degradar tu plan en cualquier momento. 
                Los cambios se reflejarán en tu próximo ciclo de facturación.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">¿Hay límites en el procesamiento?</h3>
              <p className="text-muted-foreground text-sm">
                Cada plan tiene límites específicos de documentos mensuales. 
                Si necesitas procesar más, puedes actualizar tu plan o contactarnos.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">¿Qué tipos de documentos soportan?</h3>
              <p className="text-muted-foreground text-sm">
                Procesamos PDFs y XMLs fiscales, incluyendo facturas, recibos, 
                declaraciones y otros documentos contables estándar.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">¿Los datos están seguros?</h3>
              <p className="text-muted-foreground text-sm">
                Utilizamos encriptación de grado bancario y cumplimos con las 
                normativas de protección de datos más estrictas.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-primary/5 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas algo personalizado?</h2>
          <p className="text-muted-foreground mb-6">
            Contáctanos para planes empresariales personalizados con funcionalidades específicas para tu negocio.
          </p>
          <Button size="lg">
            Contactar Ventas
          </Button>
        </div>
      </div>
    </div>
  );
}