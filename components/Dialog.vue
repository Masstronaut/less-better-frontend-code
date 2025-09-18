<template>
  <dialog
    closedby="any"
    ref="dialogRef"
    class="dialog-element backdrop:bg-black backdrop:bg-opacity-20 backdrop:backdrop-blur-lg rounded-lg shadow-xl"
  >
    <div class="modal-header">
      <h1 class="modal-type">&lt;dialog&gt; modal</h1>
    </div>
    <div class="text-center dialog-body">
      <slot />
    </div>
  </dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const dialogRef = ref();

const showModal = () => {
  if (dialogRef.value) {
    dialogRef.value.showModal();
  }
};

const close = () => {
  if (dialogRef.value) {
    dialogRef.value.close();
  }
  emit("close");
};

// Expose methods for parent to call
defineExpose({
  showModal,
  close,
});
</script>

<style scoped>
.dialog-element {
  border: none;
  min-width: 300px;
  padding: 0;
  overflow: hidden;
}

.dialog-element::backdrop {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
}

.modal-header {
  background: #22c55e;
  padding: 16px 24px;
  text-align: center;
}

.modal-type {
  font-size: 1.5rem;
  margin: 0;
  color: white;
  font-weight: bold;
}

.dialog-body {
  padding: 24px;
}
</style>
