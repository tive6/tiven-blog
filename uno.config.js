// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetIcons,
  presetUno,
  presetWebFonts
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    // ...
  ]
})