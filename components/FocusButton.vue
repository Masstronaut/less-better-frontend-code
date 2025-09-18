<template>
  <button class="focus-button" :style="{ '--default-color': defaultColor }">
    <slot>Focus me with Tab</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  defaultColor: {
    type: String,
    default: '#007bff'
  }
})
</script>

<style scoped>
.focus-button {
  background: var(--default-color);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
}

.focus-button:hover {
  background: oklch(from var(--default-color) calc(l - 0.2) c h);
}

.focus-button:focus {
  background: #f97316;
  outline: 2px solid #f97316;
  outline-offset: 2px;
}

.focus-button:active {
  transform: scale(0.98);
}
</style>