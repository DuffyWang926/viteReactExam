import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// import { default as vitePluginImport }  from 'vite-plugin-babel-import';
// import vitePluginImport  from 'vite-plugin-babel-import';
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ 
    react(), 
    // vitePluginImp.default([
    //   {
    //     libraryName: "antd",
    //     libraryDirectory: "es",
    //     style: (name) => `${name}/style/css`,
    //     ignoreStyles: []
    //   },
    // ]),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `${name}/style/index`,
        }
      ]
    })

  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
   
