// uno.config.ts
import { defineConfig, presetTypography, presetUno } from 'unocss'
// import presetWind from '@unocss/preset-wind'

export default defineConfig({
  presets: [
    presetUno({
      // preflight: false,
    }),
    presetTypography(),
    // ...
  ],
})
