export type UserRole = 'user' | 'admin' | 'contador';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export type SubscriptionPlan = 'free' | 'pro' | 'enterprise';

export interface Subscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  status: 'active' | 'canceled' | 'past_due';
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  current_period_start?: string;
  current_period_end?: string;
  created_at: string;
  updated_at: string;
}

export interface Usage {
  id: string;
  user_id: string;
  documents_processed: number;
  period_start: string;
  period_end: string;
  created_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  filename: string;
  file_type: 'pdf' | 'xml';
  status: 'pending' | 'processing' | 'completed' | 'error';
  result?: unknown;
  error_message?: string;
  created_at: string;
  updated_at: string;
}
