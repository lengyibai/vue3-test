import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite"; //组件自动注册
import VueSetupExtend from "vite-plugin-vue-setup-extend"; //设置name
import legacyPlugin from "@vitejs/plugin-legacy";

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    VueSetupExtend(),
    Components({
      dts: "src/typings/components.d.ts", //生成在src路径下名为auto-import.d.ts的声明文件
      dirs: ["src/components"], //配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
    }),
    legacyPlugin({
      targets: ["last 2 versions", "safari >=7", "chrome >= 30"], //需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"], //面向IE11时需要此插件
    }),
  ],
  css: {
    //css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/styles/index.less";', //全局less变量文件
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 9527,
    open: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    minify: "terser",
    chunkSizeWarningLimit: 1500,
    cssTarget: "chrome61",
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
