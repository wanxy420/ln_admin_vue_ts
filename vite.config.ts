import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { createHtmlPlugin } from "vite-plugin-html";
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

export default defineConfig(({ mode, command }) => {
  console.log(command);
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_SERVER_OPEN, VITE_APP_HOST, VITE_APP_PORT, VITE_APP_LOGO, VITE_APP_TITLE } = env;
  return {
    plugins: [vue(),
    vueSetupExtend(),
    createHtmlPlugin({
      inject: {
        data: {
          logo: VITE_APP_LOGO,
          title: VITE_APP_TITLE,
        },
      },
    })],
    server: {
      port: +VITE_APP_PORT,
      host: VITE_APP_HOST,
      open: VITE_APP_SERVER_OPEN == 'true',
    },
    resolve: {
      // 别名
      alias: {
        "@": path.join(__dirname, "./src"),
      },
      extensions: [".ts", ".js"],
    },
  }
})
