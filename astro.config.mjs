import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'   // add
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  output: 'static',
  integrations: [vue()],
  vite: {
    plugins: [
      tailwindcss(),                            // uncomment/enable
      Icons({ compiler: 'vue3' }),
    ],
  },
})
