'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getStripe } from '@/lib/stripe/client';
import { PLANS } from '@/lib/stripe/config';

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const currentPlan = 'free'; // This should come from user data

  const handleSubscribe = async (plan: 'pro' | 'enterprise') => {
    setIsLoading(plan);

    try {
      // Call API to create checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const { sessionId } = await response.json();
      const stripe = await getStripe();

      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo iniciar el proceso de pago',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    setIsLoading('manage');

    try {
      // Call API to create portal session
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo abrir el portal de facturación',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Facturación</h1>
        <p className="text-muted-foreground">
          Gestiona tu plan y facturación
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Actual</CardTitle>
          <CardDescription>
            Tu plan actual y límites de uso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                {PLANS[currentPlan as keyof typeof PLANS].name}
              </h3>
              <p className="text-muted-foreground">
                ${PLANS[currentPlan as keyof typeof PLANS].price}/mes
              </p>
            </div>
            {currentPlan !== 'free' && (
              <Button
                onClick={handleManageSubscription}
                disabled={isLoading === 'manage'}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Gestionar Suscripción
              </Button>
            )}
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Uso del Mes Actual</h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Documentos Procesados
                  </span>
                  <span className="text-sm font-medium">
                    82 /{' '}
                    {PLANS[currentPlan as keyof typeof PLANS].documents_limit ===
                    -1
                      ? '∞'
                      : PLANS[currentPlan as keyof typeof PLANS]
                          .documents_limit}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${
                        (82 /
                          (PLANS[currentPlan as keyof typeof PLANS]
                            .documents_limit === -1
                            ? 100
                            : PLANS[currentPlan as keyof typeof PLANS]
                                .documents_limit)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Planes Disponibles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(PLANS).map(([key, plan]) => (
            <Card
              key={key}
              className={
                currentPlan === key ? 'border-primary border-2' : ''
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {currentPlan === key && (
                    <Badge>Actual</Badge>
                  )}
                </div>
                <CardDescription>
                  <span className="text-3xl font-bold">${plan.price}</span> /mes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {currentPlan !== key && (
                  <Button
                    className="w-full"
                    onClick={() =>
                      key !== 'free' && handleSubscribe(key as 'pro' | 'enterprise')
                    }
                    disabled={isLoading === key || key === 'free'}
                  >
                    {key === 'free' ? 'Plan Actual' : 'Actualizar Plan'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Facturación</CardTitle>
          <CardDescription>
            Tus facturas y pagos recientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2024-01-01', amount: 29.99, status: 'Pagado', invoice: 'INV-2024-001' },
              { date: '2023-12-01', amount: 29.99, status: 'Pagado', invoice: 'INV-2023-012' },
              { date: '2023-11-01', amount: 29.99, status: 'Pagado', invoice: 'INV-2023-011' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{item.invoice}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">${item.amount}</span>
                  <Badge variant="outline">{item.status}</Badge>
                  <Button size="sm" variant="ghost">
                    Descargar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
