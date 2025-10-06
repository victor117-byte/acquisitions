import { useState, useEffect } from 'react';
import { subscriptionPlans, findPlanById } from '@/lib/stripe/config';
import { getStripe } from '@/lib/stripe/client';
import { useAuth } from '@/components/auth/auth-provider';

export const useSubscription = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(subscriptionPlans[0]); // Default to free plan

  const createCheckoutSession = async (planId: string) => {
    if (!user) {
      throw new Error('User must be logged in');
    }

    setLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error creating checkout session');
      }

      // Si es plan gratuito, no necesita Stripe
      if (planId === 'gratuito') {
        setCurrentPlan(findPlanById(planId) || subscriptionPlans[0]);
        return { success: true };
      }

      // Redirigir a Stripe Checkout
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    // TODO: Implementar cancelación de suscripción
    console.log('Cancel subscription - to be implemented');
  };

  const updateSubscription = async (planId: string) => {
    // TODO: Implementar actualización de suscripción
    console.log('Update subscription - to be implemented');
  };

  // TODO: Cargar suscripción actual del usuario desde la base de datos
  useEffect(() => {
    const loadCurrentSubscription = async () => {
      if (!user) return;
      
      // Por ahora, usar el plan gratuito por defecto
      setCurrentPlan(subscriptionPlans[0]);
    };

    loadCurrentSubscription();
  }, [user]);

  return {
    currentPlan,
    loading,
    createCheckoutSession,
    cancelSubscription,
    updateSubscription,
    subscriptionPlans,
  };
};