<script setup lang="ts">
import UserItem from '@/components/UserItem.vue';

defineProps({
  photo: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div display="flex" m="b-8">
    <UserItem :photo="photo" display="flex-none self-end" m="b-4" margin="0.5rem" />
    <div>
      <div bg="msg-100" w="5/6" border="rounded-r-3xl rounded-t-3xl" p="4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, alias! Ex aperiam
        aliquam quam odit sequi qui delectus quidem repudiandae rerum nulla praesentium nemo dicta
        numquam, impedit similique, optio recusandae deleniti maxime accusantium eveniet, non
        itaque. Velit dolores officiis ex, inventore ut quis fugiat rerum in quae dolorem ad nisi.
      </div>
      <p text="msg-300" m="t-2">Message send 1:13pm</p>
    </div>
  </div>
</template>

<style scoped></style>
