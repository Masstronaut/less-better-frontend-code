<script setup lang="ts">
import { ref } from 'vue'

const firstDialog = ref<HTMLDialogElement>()
const secondDialog = ref<HTMLDialogElement>()

const openFirstDialog = () => {
  if (firstDialog.value) {
    firstDialog.value.showModal()
  }
}

const closeFirstDialog = () => {
  if (firstDialog.value) {
    firstDialog.value.close()
  }
}

const openSecondDialog = () => {
  if (secondDialog.value) {
    secondDialog.value.showModal()
  }
}

const closeSecondDialog = () => {
  if (secondDialog.value) {
    secondDialog.value.close()
  }
}

const handleFirstDialogResponse = (isYes: boolean) => {
  if (isYes) {
    closeFirstDialog()
  } else {
    openSecondDialog()
  }
}
</script>

<template>
  <div>
    <FocusButton @click="openFirstDialog">
      Open Dialog Modal
    </FocusButton>

    <!-- First Dialog -->
    <dialog
      ref="firstDialog"
      class="dialog-element backdrop:bg-black backdrop:bg-opacity-20 backdrop:backdrop-blur-lg rounded-lg shadow-xl"
    >
      <div class="modal-header">
        <h1 class="modal-type">&lt;dialog&gt; modal</h1>
      </div>
      <div class="text-center dialog-body">
        <h2 class="text-xl mb-4">Is this a dialog element?</h2>
        <div class="thinking-emoji mb-4">🤔</div>
        <div class="flex gap-4 justify-center">
          <FocusButton
            @click="handleFirstDialogResponse(true)"
            defaultColor="#22c55e"
          >
            Yes
          </FocusButton>
          <FocusButton
            @click="handleFirstDialogResponse(false)"
            defaultColor="#ef4444"
          >
            No
          </FocusButton>
        </div>
      </div>
    </dialog>

    <!-- Second Dialog -->
    <dialog
      ref="secondDialog"
      class="dialog-element backdrop:bg-black backdrop:bg-opacity-20 backdrop:backdrop-blur-lg rounded-lg shadow-xl"
    >
      <div class="modal-header">
        <h1 class="modal-type">&lt;dialog&gt; modal</h1>
      </div>
      <div class="text-center dialog-body">
        <h2 class="text-xl mb-4">You should use a dialog element</h2>
        <div class="flex justify-center">
          <FocusButton
            @click="closeSecondDialog"
            defaultColor="#3b82f6"
          >
            Close
          </FocusButton>
        </div>
      </div>
    </dialog>
  </div>
</template>

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

.thinking-emoji {
  font-size: 250px;
  line-height: 1;
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>