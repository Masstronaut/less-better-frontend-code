import { defineCodeRunnersSetup } from '@slidev/types'

export default defineCodeRunnersSetup(() => {
  return {
    css(code, ctx) {
      // Remove any existing demo styles
      const existingStyle = document.getElementById('demo-css-runner')
      if (existingStyle) {
        existingStyle.remove()
      }

      // Create new style element
      const style = document.createElement('style')
      style.id = 'demo-css-runner'
      style.textContent = code
      document.head.appendChild(style)

      return {
        text: '✅ CSS applied to page'
      }
    }
  }
})