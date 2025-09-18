<template>
  <!-- Modal backdrop -->
  <div v-if="isOpen" class="modal-backdrop" @click="handleBackdropClick">
    <!-- Modal content -->
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h1 class="modal-type">&lt;div&gt; modal</h1>
      </div>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const handleBackdropClick = () => {
  emit('close')
}

const handleEscape = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  min-width: 300px;
  border: none;
  overflow: hidden;
}

.modal-header {
  background: #ef4444;
  padding: 16px 24px;
  text-align: center;
}

.modal-type {
  font-size: 1.5rem;
  margin: 0;
  color: white;
  font-weight: bold;
}

.modal-body {
  padding: 24px;
  text-align: center;
}

.modal-body h2 {
  font-size: 1.25rem;
  margin: 0 0 1rem 0;
  color: #333;
}

.thinking-emoji {
  font-size: 250px;
  line-height: 1;
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.yes-button, .no-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
}

.yes-button {
  background: #22c55e;
}

.yes-button:hover {
  background: #16a34a;
}

.no-button {
  background: #ef4444;
}

.no-button:hover {
  background: #dc2626;
}

.confirm-button {
  background: #3b82f6;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
}

.confirm-button:hover {
  background: #2563eb;
}
</style>