<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import { RouterLink } from 'vue-router';

import { useUserStore } from '@/store/user';
import { usePost } from '@/service/usePost';
import { User, Post, LikeType } from './type';

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    default: () => ({}),
  },
  post: {
    type: Object as PropType<Post>,
    default: () => ({}),
  },
});

const emit = defineEmits(['updateLike']);

const store = useUserStore();
const postService = usePost();

const comment = ref('');
const isLoading = ref(false);

const createPostClass = computed(() => {
  return {
    'bg-disable-100 cursor-not-allowed': !comment.value,
    'bg-primary text-white hover:(bg-active text-dark-500)': comment.value,
  };
});

const isLikesExistUser = computed(() => !!props.post.likes.find(o => o === store.user?._id));

const likesIconClass = computed(() => {
  return {
    'text-primary': props.post.likes,
    'text-dark-300': !props.post.likes,
    'border-2 rounded-1/2 p-1 border-primary': isLikesExistUser.value,
  };
});

const likesWording = computed(() => {
  if (isLikesExistUser.value && props.post.likes.length - 1 === 0) return '你說了說讚';
  if (isLikesExistUser.value) return `你，和 ${props.post.likes.length - 1} 位朋友說讚`;
  if (!isLikesExistUser.value && props.post.likes.length)
    return `${props.post.likes.length} 位朋友說讚`;
  return '成為第一個按讚的朋友';
});

const addLike = async () => {
  try {
    await postService.addLike(props.post._id);
  } catch (e: any) {
    console.error(e.message);
  }
};

const deleteLike = async () => {
  try {
    await postService.deleteLike(props.post._id);
  } catch (e: any) {
    console.error(e.message);
  }
};

const updateLike = () => {
  if (isLikesExistUser.value) {
    deleteLike();
    emit('updateLike', props.post._id, LikeType.DELETE);
  } else {
    addLike();
    emit('updateLike', props.post._id, LikeType.ADD);
  }
};

const postComment = () => {
  if (!comment.value) return alert('留言內容必填');

  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    comment.value = '';
    alert('留言成功');
  }, 1500);
};
</script>

<template>
  <div bg="white" border="2 b-4 dark-500 rounded-lg" w="full min-300px" p="6" m="b-4">
    <div display="flex items-center" m="b-4">
      <div
        :style="{
          'background-image': `url(${post.user.photo})`,
        }"
        bg="center cover no-repeat"
        border="2 dark-500 rounded-1/2"
        w="45px"
        h="45px"
        m="r-4"
      ></div>
      <div display="flex flex-col justify-center">
        <RouterLink
          :to="{ name: 'UserWall' }"
          class="text-dark-500"
          font="bold"
          hover="text-primary underline"
        >
          {{ post.user.name }}
        </RouterLink>
        <p text="xs dark-300">{{ post.createdAt }}</p>
      </div>
    </div>
    <p m="b-4">{{ post.content }}</p>
    <div
      v-if="post.image"
      :style="{ backgroundImage: `url(${post.image})` }"
      h="40"
      border="2 rounded dark-500"
      m="b-5"
      bg="center no-repeat"
    ></div>

    <div display="flex items-center" m="b-5">
      <font-awesome-icon
        :class="likesIconClass"
        :icon="['far', 'thumbs-up']"
        size="lg"
        m="r-2"
        cursor="pointer"
        @click="updateLike"
      />
      <span :class="{ 'text-dark-300': !post.likes.length }">
        {{ likesWording }}
      </span>
    </div>

    <div display="flex" m="b-4">
      <div>
        <div
          :style="{
            'background-image': `url(${user.photo})`,
          }"
          bg="center cover no-repeat"
          border="2 dark-500 rounded-1/2"
          w="40px"
          h="40px"
          m="r-8.5px"
        ></div>
      </div>
      <input
        v-model="comment"
        type="text"
        placeholder="留言..."
        border="2 dark-500"
        w="full"
        h="10"
        p="l-6"
      />
      <div w="128px" position="relative">
        <button
          type="button"
          w="full"
          h="full"
          border="2 dark-500 rounded-none"
          :class="createPostClass"
          @click="postComment"
        >
          留言
          <span v-show="isLoading" class="animate__animated animate__flash infinite">...</span>
        </button>
      </div>
    </div>

    <div v-for="o in post.comments" :key="o.name" bg="dark-100" p="4" m="b-4" border="rounded-12px">
      <div display="flex" m="r-2.5 b-4">
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
          <RouterLink
            :to="{ name: 'UserWall' }"
            class="text-dark-500"
            font="bold"
            hover="text-primary underline"
          >
            {{ o.name }}
          </RouterLink>
          <p text="xs dark-300">{{ o.createdAt }}</p>
        </div>
      </div>
      <div m="l-56px">{{ o.content }}</div>
    </div>
  </div>
</template>

<style scoped></style>