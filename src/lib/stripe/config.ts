import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

export const PLANS = {
  free: {
    name: 'Gratuito',
    price: 0,
    documents_limit: 10,
    features: [
      '10 documentos por mes',
      'Procesamiento básico',
      'Soporte por email',
    ],
  },
  pro: {
    name: 'Pro',
    price: 29.99,
    priceId: process.env.STRIPE_PRICE_ID_PRO,
    documents_limit: 100,
    features: [
      '100 documentos por mes',
      'Procesamiento avanzado',
      'Soporte prioritario',
      'API access',
      'Reportes personalizados',
    ],
  },
  enterprise: {
    name: 'Empresarial',
    price: 99.99,
    priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE,
    documents_limit: -1, // unlimited
    features: [
      'Documentos ilimitados',
      'Procesamiento premium',
      'Soporte 24/7',
      'API dedicada',
      'Reportes avanzados',
      'Integración personalizada',
      'Gestor de cuenta dedicado',
    ],
  },
};
