<script setup lang="ts">
import { mock } from './mockData';

import TitleBlock from '@/components/TitleBlock.vue';

const { list } = mock;
</script>

<template>
  <TitleBlock>追蹤名單</TitleBlock>

  <div
    v-for="o in list"
    :key="o.name"
    display="flex justify-between items-end"
    border="2 dark-500 rounded-lg"
    bg="white"
    p="4"
    m="b-4"
    shadow="item-bottom"
  >
    <div display="flex">
      <div
        :style="{
          'background-image': `url(${o.photo})`,
        }"
        bg="center cover no-repeat"
        border="2 dark-500 rounded-1/2"
        w="40px"
        h="40px"
        m="r-4"
      ></div>
      <div display="flex flex-col justify-center">
        <p font="bold" cursor="pointer" m="b-5px" text="16px hover:(primary underline)">
          {{ o.name }}
        </p>
        <p text="14px dark-300">追蹤時間：{{ o.createAt }}</p>
      </div>
    </div>
    <p text="14px dark-500">您已追蹤07天!</p>
  </div>
</template>

<style scoped></style>
