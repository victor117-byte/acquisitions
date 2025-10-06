import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder',
  {
    apiVersion: '2025-02-24.acacia',
    typescript: true,
  }
);

// Planes de suscripción para contadores
export const subscriptionPlans = [
  {
    id: 'gratuito',
    name: 'Plan Gratuito',
    description: 'Perfecto para comenzar',
    price: 0,
    interval: 'month',
    features: [
      'Hasta 10 documentos por mes',
      'Procesamiento básico de PDF',
      'Soporte por email',
      'Dashboard básico'
    ],
    stripePriceId: '', // No tiene precio en Stripe
    maxDocuments: 10,
    maxStorage: 100, // 100MB
  },
  {
    id: 'pro',
    name: 'Plan Pro',
    description: 'Para contadores profesionales',
    price: 2999, // $29.99 USD
    interval: 'month',
    features: [
      'Hasta 500 documentos por mes',
      'Procesamiento avanzado PDF y XML',
      'Soporte prioritario',
      'Dashboard completo con reportes',
      'Integraciones con APIs fiscales',
      'Backup automático'
    ],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_placeholder',
    maxDocuments: 500,
    maxStorage: 5000, // 5GB
  },
  {
    id: 'empresarial',
    name: 'Plan Empresarial', 
    description: 'Para empresas y despachos contables',
    price: 9999, // $99.99 USD
    interval: 'month',
    features: [
      'Documentos ilimitados',
      'Procesamiento masivo en lote',
      'Soporte telefónico 24/7',
      'Dashboard ejecutivo personalizable',
      'API completa para integraciones',
      'Gestión de múltiples clientes',
      'Reportes avanzados y exportación',
      'Storage ilimitado'
    ],
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise_placeholder',
    maxDocuments: -1, // Ilimitado
    maxStorage: -1, // Ilimitado
  }
];

export const findPlanById = (planId: string) => {
  return subscriptionPlans.find(plan => plan.id === planId);
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100);
};