# Acquisitions - Sistema de Gestión Fiscal

Plataforma SaaS orientada a contadores y contribuyentes para procesar documentos fiscales y obtener información tributaria.

## 🚀 Tecnologías

- **Next.js 15+** - Framework React con App Router
- **TypeScript** - Tipado estático
- **TailwindCSS** - Estilos utilitarios
- **shadcn/ui** - Componentes UI
- **Supabase** - Autenticación y base de datos
- **Stripe** - Pagos y suscripciones
- **Recharts** - Visualizaciones y gráficas
- **Drizzle ORM** - ORM para PostgreSQL

## 📋 Características

### ✅ Implementado

- ✅ Autenticación completa con Supabase
  - Registro de usuarios
  - Inicio de sesión
  - Recuperación de contraseña
  - Cierre de sesión
  - Protección de rutas con middleware

- ✅ Dashboard principal
  - Visualización de estadísticas
  - Gráficas con Recharts
  - Indicadores de documentos procesados
  - Resumen de actividad

- ✅ Sistema de gestión de documentos
  - Carga de archivos drag & drop
  - Soporte para PDF y XML
  - Indicador de progreso
  - Historial de documentos

- ✅ Sistema de facturación
  - Integración con Stripe
  - Tres planes: Gratuito, Pro y Empresarial
  - Gestión de suscripciones
  - Historial de pagos

- ✅ Configuración de cuenta
  - Actualización de perfil
  - Cambio de contraseña
  - Gestión de API keys

- ✅ Tema claro/oscuro
  - Soporte completo para modo oscuro
  - Conmutador de tema en el dashboard

## 🛠️ Configuración

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_stripe_publishable_key
STRIPE_SECRET_KEY=tu_stripe_secret_key
STRIPE_WEBHOOK_SECRET=tu_stripe_webhook_secret
STRIPE_PRICE_ID_PRO=price_id_plan_pro
STRIPE_PRICE_ID_ENTERPRISE=price_id_plan_enterprise

# FastAPI Backend
NEXT_PUBLIC_FASTAPI_URL=http://localhost:8000

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start
```

### Configuración de Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Copia las credenciales (URL y Anon Key) a tu archivo `.env.local`
3. Habilita Email Auth en la configuración de autenticación

### Configuración de Stripe

1. Crea una cuenta en [Stripe](https://stripe.com)
2. Copia las API keys a tu archivo `.env.local`
3. Crea productos y precios para los planes Pro y Enterprise
4. Configura los webhooks apuntando a `/api/stripe/webhook`

## 📁 Estructura del Proyecto

```
src/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   └── stripe/          # Stripe endpoints
│   ├── auth/                # Páginas de autenticación
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── dashboard/           # Dashboard y páginas protegidas
│   │   ├── documents/
│   │   ├── billing/
│   │   └── settings/
│   ├── layout.tsx           # Layout raíz
│   ├── page.tsx            # Página de inicio
│   └── globals.css         # Estilos globales
├── components/
│   ├── providers/          # Context providers
│   └── ui/                 # Componentes shadcn/ui
├── hooks/                  # Custom React hooks
├── lib/                    # Utilidades y configuraciones
│   ├── stripe/            # Configuración de Stripe
│   ├── supabase/          # Clientes de Supabase
│   ├── utils.ts           # Utilidades generales
│   └── fastapi-client.ts  # Cliente para FastAPI
└── types/                 # TypeScript types
```

## 🎨 Planes y Precios

### Plan Gratuito
- 10 documentos por mes
- Procesamiento básico
- Soporte por email
- **$0/mes**

### Plan Pro
- 100 documentos por mes
- Procesamiento avanzado
- Soporte prioritario
- API access
- Reportes personalizados
- **$29.99/mes**

### Plan Empresarial
- Documentos ilimitados
- Procesamiento premium
- Soporte 24/7
- API dedicada
- Reportes avanzados
- Integración personalizada
- Gestor de cuenta dedicado
- **$99.99/mes**

## 🔌 Integración con FastAPI

La aplicación incluye un cliente para conectarse con el backend de FastAPI:

```typescript
import { fastAPIClient } from '@/lib/fastapi-client';

// Obtener información fiscal
const fiscalInfo = await fastAPIClient.getFiscalInfo(userId, token);

// Procesar documento
const result = await fastAPIClient.processDocument(file, userId, token);
```

## 🔐 Roles de Usuario

- **user** - Usuario estándar con acceso básico
- **contador** - Contador con acceso a funcionalidades avanzadas
- **admin** - Administrador con acceso completo

## 🚢 Despliegue en Vercel

1. Conecta tu repositorio en Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

```bash
# O usa Vercel CLI
vercel
```

## 📝 Desarrollo

### Agregar nuevos componentes shadcn/ui

Los componentes básicos ya están incluidos. Para agregar más:

```bash
npx shadcn-ui@latest add [component-name]
```

### Linting y Formateo

```bash
# Ejecutar linter
npm run lint

# Formatear código
npm run format
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 📧 Contacto

Para soporte o consultas, contacta a través de [GitHub Issues](https://github.com/victor117-byte/acquisitions/issues).
