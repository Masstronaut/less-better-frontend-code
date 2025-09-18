<template>
  <!-- Modal backdrop -->
  <div v-if="isOpen" class="modal-backdrop" @click="handleBackdropClick">
    <!-- Modal content -->
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h1 class="modal-type">&lt;div&gt; modal</h1>
      </div>
      <div class="modal-body" autofocus>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, onUnmounted } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const handleBackdropClick = () => {
  emit("close");
};

const handleEscape = (event) => {
  if (event.key === "Escape" && props.isOpen) {
    emit("close");
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});
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
  color: black;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  min-width: 300px;
  border: none;
  overflow: hidden;
}

.dark .modal-content {
  background: #1a1a1a;
  color: white;
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
}
</style>
