<script setup lang="ts">
defineProps({
  photo: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '40px',
  },
  margin: {
    type: String,
    default: '1rem',
  },
});
</script>

<template>
  <div
    class="user"
    :style="{
      'background-image': `url(${photo})`,
    }"
    bg="center cover no-repeat"
    border="2 dark-500 rounded-1/2"
  ></div>
</template>

<style scoped>
.user {
  width: v-bind(size);
  height: v-bind(size);
  margin-right: v-bind(margin);
}
</style>
