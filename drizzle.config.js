import 'dotenv/config';
import { defineConfig } from 'drizzle-kit'; // ← Importar defineConfig

// Validar variable de entorno
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definida en las variables de entorno');
}

export default defineConfig({ // ← Usar defineConfig
    schema: './src/models/*.js',
    out: './drizzle',
    dialect: 'postgresql', // ← Correcto para tu versión
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});