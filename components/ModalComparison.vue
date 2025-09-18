<template>
  <div style="display: flex; flex-direction: column; gap: 50px; align-items: stretch; max-width: min-content;">
    <DivModalDemo />
    <DialogModalDemo />
  </div>
</template>

<script setup>
import DivModalDemo from './DivModalDemo.vue'
import DialogModalDemo from './DialogModalDemo.vue'
</script>