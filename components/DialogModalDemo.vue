<template>
  <div>
    <FocusButton @click="openFirstDialog" fullWidth>
      Open Dialog Modal
    </FocusButton>

    <!-- First Dialog -->
    <Dialog ref="firstDialog" @close="closeFirstDialog">
      <h2 class="text-xl mb-4">Is this a dialog element?</h2>
      <div class="thinking-emoji mb-4">🤔</div>
      <div class="flex gap-4 w-full">
        <FocusButton
          @click="handleFirstDialogResponse(true)"
          defaultColor="#22c55e"
          fullWidth
        >
          go away
        </FocusButton>
        <FocusButton
          @click="handleFirstDialogResponse(false)"
          defaultColor="#ef4444"
          fullWidth
        >
          No
        </FocusButton>
      </div>
    </Dialog>

    <!-- Second Dialog -->
    <Dialog ref="secondDialog" @close="closeSecondDialog">
      <h2 class="text-xl mb-4">You should use a dialog element</h2>
      <FocusButton
        @click="closeSecondDialog"
        defaultColor="#3b82f6"
      >
        Close
      </FocusButton>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dialog from './Dialog.vue'

const firstDialog = ref()
const secondDialog = ref()

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

const handleFirstDialogResponse = (isYes) => {
  if (isYes) {
    closeFirstDialog()
  } else {
    openSecondDialog()
  }
}
</script>

<style scoped>
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