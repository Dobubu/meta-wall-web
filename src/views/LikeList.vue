<script setup lang="ts">
import { mock } from './mockData';

import TitleBlock from '@/components/TitleBlock.vue';

const { list } = mock;
</script>

<template>
  <TitleBlock>我按讚的貼文</TitleBlock>

  <div
    v-for="o in list"
    :key="o.name"
    display="flex items-stretch justify-between items-end"
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
        <p text="14px dark-300">發文時間：{{ o.createAt }}</p>
      </div>
    </div>

    <div display="flex">
      <div display="flex flex-col justify-between" cursor="pointer" m="r-9">
        <font-awesome-icon text="primary" :icon="['far', 'thumbs-up']" size="lg" />
        <span text="14px dark-300">取消</span>
      </div>
      <div display="flex flex-col justify-between" cursor="pointer">
        <font-awesome-icon text="dark-500" :icon="['far', 'circle-right']" size="lg" />
        <span text="14px dark-300">查看</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>