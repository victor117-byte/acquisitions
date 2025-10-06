import { pgTable, serial, varchar, timestamp, integer, boolean, text, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Tabla de usuarios
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }), // Para autenticación local
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('user'), // 'user', 'admin', 'contador'
  avatar: varchar('avatar', { length: 500 }),
  supabaseUserId: varchar('supabase_user_id', { length: 255 }).unique(),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tabla de planes
export const plans = pgTable('plans', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  interval: varchar('interval', { length: 20 }).notNull(), // 'month', 'year'
  documentsLimit: integer('documents_limit'), // null = unlimited
  usersLimit: integer('users_limit'), // null = unlimited
  storageLimit: integer('storage_limit'), // in MB, null = unlimited
  features: text('features').array(), // JSON array of features
  stripePriceId: varchar('stripe_price_id', { length: 255 }),
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tabla de suscripciones
export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  planId: integer('plan_id').references(() => plans.id).notNull(),
  status: varchar('status', { length: 50 }).notNull(), // 'active', 'cancelled', 'past_due', 'unpaid'
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tabla de documentos
export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileType: varchar('file_type', { length: 10 }).notNull(), // 'pdf', 'xml'
  fileSize: integer('file_size').notNull(), // in bytes
  filePath: varchar('file_path', { length: 500 }), // storage path
  status: varchar('status', { length: 50 }).notNull().default('pending'), // 'pending', 'processing', 'completed', 'failed'
  extractedData: text('extracted_data'), // JSON string
  processedAt: timestamp('processed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tabla de notificaciones
export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'info', 'success', 'warning', 'error'
  read: boolean('read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tabla de configuraciones de la aplicación
export const appConfig = pgTable('app_config', {
  id: serial('id').primaryKey(),
  maxFileSize: integer('max_file_size').notNull().default(10485760), // 10MB en bytes
  allowedFileTypes: text('allowed_file_types').array().notNull().default(['pdf', 'xml']),
  maintenanceMode: boolean('maintenance_mode').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relaciones
export const usersRelations = relations(users, ({ many, one }) => ({
  subscriptions: many(subscriptions),
  documents: many(documents),
  notifications: many(notifications),
}));

export const plansRelations = relations(plans, ({ many }) => ({
  subscriptions: many(subscriptions),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  plan: one(plans, {
    fields: [subscriptions.planId],
    references: [plans.id],
  }),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, {
    fields: [documents.userId],
    references: [users.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));