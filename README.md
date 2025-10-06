# SaaS para Contadores - Sistema de Gestión Documental

Una aplicación web moderna construida con Next.js 15 para ayudar a contadores y profesionales financieros a gestionar documentos, clientes y procesos contables.

## 🚀 Características

- ✅ **Autenticación completa** con JWT y Neon PostgreSQL
- ✅ **Dashboard interactivo** con métricas y gráficos
- ✅ **Sistema de planes** (Gratuito, Pro, Enterprise)
- ✅ **Gestión de documentos** con procesamiento automatizado
- ✅ **Integración con Stripe** para pagos
- ✅ **UI moderna** con Tailwind CSS y shadcn/ui
- ✅ **Base de datos robusta** con Drizzle ORM

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Drizzle ORM
- **Base de datos**: Neon PostgreSQL
- **Autenticación**: JWT personalizada con bcrypt
- **Pagos**: Stripe
- **UI**: shadcn/ui components
- **Gráficos**: Recharts

## 🏃‍♂️ Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd acquisitions
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Copia `.env.example` a `.env` y configura:
```env
# Base de datos Neon PostgreSQL
DATABASE_URL=your_neon_database_url

# JWT para autenticación
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Stripe para pagos
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
```

4. **Ejecutar migraciones**
```bash
npx drizzle-kit push
```

5. **Iniciar la aplicación**
```bash
npm run dev
```

## 📱 Uso de la Aplicación

### Registro e Inicio de Sesión
1. Ve a `http://localhost:3000/auth/register`
2. Crea una cuenta con email y contraseña
3. Inicia sesión en `http://localhost:3000/auth/login`

### Dashboard
- Visualiza métricas de documentos procesados
- Revisa gráficos de ingresos y estado de procesos
- Gestiona notificaciones

### Planes y Suscripciones
- **Gratuito**: 10 documentos/mes, 1 usuario
- **Pro**: 100 documentos/mes, 5 usuarios, $29/mes
- **Enterprise**: Documentos ilimitados, usuarios ilimitados, $99/mes

## 🗄️ Estructura de la Base de Datos

### Tablas Principales

#### `users`
- `id`: Identificador único
- `email`: Email del usuario (único)
- `password`: Contraseña hasheada
- `name`: Nombre del usuario
- `role`: Rol (user, admin, contador)

#### `documents`
- `id`: Identificador único
- `user_id`: Referencia al usuario
- `file_name`: Nombre del archivo
- `file_type`: Tipo (pdf, xml)
- `status`: Estado (pending, processing, completed, failed)

#### `subscriptions`
- `id`: Identificador único
- `user_id`: Referencia al usuario
- `plan_id`: Referencia al plan
- `status`: Estado de la suscripción

## 🔧 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Información del usuario actual

### Stripe
- `POST /api/stripe/checkout` - Crear sesión de pago
- `POST /api/stripe/webhook` - Webhook para eventos de Stripe

## 🚀 Próximas Características

- [ ] Subida y procesamiento de documentos PDF/XML
- [ ] Sistema de notificaciones en tiempo real
- [ ] API para integración con software contable
- [ ] Dashboard avanzado con más métricas
- [ ] Sistema de roles y permisos granulares
- [ ] Exportación de reportes en PDF

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Soporte

Si tienes preguntas o necesitas ayuda:
- Abre un issue en GitHub
- Contacta por email: [tu-email@ejemplo.com]

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**¡Tu SaaS para contadores está listo! 🎉**

Ahora puedes:
1. Registrar usuarios
2. Gestionar autenticación
3. Ver el dashboard interactivo
4. Configurar planes de suscripción

La aplicación está corriendo en: http://localhost:3000