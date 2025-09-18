<template>
  <div class="slidev-layout">
    <div class="title">
      <slot name="title" />
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>
<style scoped>
.slidev-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.title {
  text-align: left;
  font-size: 3em;
  margin: 0;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5em;
  height: 100%;
}
</style>
