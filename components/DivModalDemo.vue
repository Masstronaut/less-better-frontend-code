<template>
  <div>
    <FocusButton @click="openFirstModal" fullWidth>
      Open Div Modal
    </FocusButton>

    <!-- First Modal -->
    <DivModal :isOpen="isFirstOpen" @close="closeFirstModal">
      <h2 class="text-xl mb-4">Is this a dialog element?</h2>
      <div class="thinking-emoji mb-4">🤔</div>
      <div class="button-group">
        <FocusButton @click="closeFirstModal" defaultColor="#22c55e" fullWidth>
          go away
        </FocusButton>
        <FocusButton @click="openSecondModal" defaultColor="#ef4444" fullWidth>
          No
        </FocusButton>
      </div>
    </DivModal>

    <!-- Second Modal -->
    <DivModal :isOpen="isSecondOpen" @close="closeSecondModal">
      <h2 class="text-xl mb-4">You should use a dialog element</h2>
      <div class="button-group">
        <FocusButton @click="closeSecondModal" defaultColor="#3b82f6">
          Close
        </FocusButton>
      </div>
    </DivModal>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import DivModal from './DivModal.vue'

const isFirstOpen = ref(false)
const isSecondOpen = ref(false)

const openFirstModal = () => {
  isFirstOpen.value = true
  // Prevent body scrolling
  document.body.style.overflow = 'hidden'
}

const closeFirstModal = () => {
  isFirstOpen.value = false
  // Restore body scrolling if no modals are open
  if (!isSecondOpen.value) {
    document.body.style.overflow = ''
  }
}

const openSecondModal = () => {
  isSecondOpen.value = true
}

const closeSecondModal = () => {
  isSecondOpen.value = false
}

onUnmounted(() => {
  // Cleanup in case component unmounts while modal is open
  document.body.style.overflow = ''
})
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
  margin: 0 auto 1rem auto;
}

.button-group {
  display: flex;
  gap: 1rem;
  width: 100%;
}


</style>