<script setup lang="ts"></script>

<template>
  <div position="relative" w="full min-350px" h="16" m="b-8">
    <div
      w="full min-350px"
      m="b-8"
      bg="white"
      h="full"
      display="flex justify-center items-center"
      position="absolute top-0 left-0"
      text="center dark-500"
      border="2 dark-500"
      z="10"
      font="bold"
    >
      <slot />
    </div>

    <div bg="white" position="absolute -bottom-1 -left-1" w="full" h="16" border="2 black"></div>
  </div>
</template>

<style scoped></style>
