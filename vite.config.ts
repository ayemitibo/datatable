/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')
const svgLoader = require('vite-svg-loader')
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '/@src': path.resolve(__dirname, 'src'),
    },
  },
})
