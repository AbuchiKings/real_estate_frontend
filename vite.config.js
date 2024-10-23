import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      port: 5173,
      host: true,
      proxy: {
        '/api': {
          target: env['BASE_API_URL'], // Replace with your actual server URL
          changeOrigin: true,
          secure: env['ENVIRONMENT'] === 'production' ? true : true
          //rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    },

    define: {
      'process.env': env,
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [react()],
  }
})
