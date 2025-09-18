<script setup lang="ts">
import { ref } from 'vue'

const selectedColor = ref('#3b82f6')
const hoveredStep = ref<number | null>(null)
</script>

<template>
  <div class="color-mixer">
    <div class="input-section">
      <input
        id="color-input"
        v-model="selectedColor"
        type="color"
        class="color-input"
      />
    </div>

    <div class="color-blocks-section mt-6">
      <div class="skeumorphic-container">
        <div class="color-blocks-grid">
        <div
          v-for="step in 10"
          :key="step"
          class="color-block"
          :style="{
            backgroundColor: `oklch(from ${selectedColor} calc(l - ${(10 - step) * 0.05}) c h)`
          }"
          :title="`${step * 10}% lightness`"
          @mouseenter="hoveredStep = step"
          @mouseleave="hoveredStep = null"
        />
        </div>
      </div>

      <div class="css-display mt-4">
        <code class="css-code">
          <span v-if="hoveredStep">
            oklch(from {{ selectedColor }} calc(l - {{ ((10 - hoveredStep) * 0.05).toFixed(2) }}) c h)
          </span>
          <span v-else class="placeholder">
            oklch(from {{ selectedColor }} calc(l - 0.25) c h)
          </span>
        </code>
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-mixer {
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
}

.color-input {
  width: 80px;
  height: 40px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  background: none;
}

.color-input::-webkit-color-swatch-wrapper {
  padding: 0;
  border: none;
  border-radius: 6px;
  overflow: hidden;
}

.color-input::-webkit-color-swatch {
  border: none;
  border-radius: 6px;
}

.skeumorphic-container {
  background: linear-gradient(145deg, #f0f0f0, #cacaca);
  border-radius: 12px;
  padding: 16px;
  box-shadow:
    6px 6px 12px rgba(0, 0, 0, 0.15),
    -6px -6px 12px rgba(255, 255, 255, 0.7),
    inset 2px 2px 4px rgba(0, 0, 0, 0.1),
    inset -2px -2px 4px rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 684px;
}

.color-blocks-grid {
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  box-shadow:
    inset 2px 2px 4px rgba(0, 0, 0, 0.2),
    inset -1px -1px 2px rgba(255, 255, 255, 0.5);
}

.color-block {
  flex: 1;
  height: 60px;
  border: none;
  border-radius: 0;
  cursor: pointer;
  transition: flex 100ms ease;
}

.color-block:hover {
  flex: 1.2;
}

.css-display {
  text-align: left;
  min-height: 24px;
}

.css-code {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', monospace;
  background-color: #f3f4f6;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.placeholder {
  color: #9ca3af;
  font-style: italic;
}
</style>