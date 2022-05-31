<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

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

const emit = defineEmits(['updateLike', 'fetchUserPostList', 'fetchPostList']);

const route = useRoute();
const store = useUserStore();
const postService = usePost();

const comment = ref('');

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

const showDeletePost = computed(
  () => route.name === 'UserWall' && props.user._id === props.post.user._id,
);

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

const addPostComment = async () => {
  try {
    if (!comment.value) return alert('留言內容必填');

    const dict = {
      comment: comment.value,
    };

    await postService.addPostComment(props.post._id, dict);

    emit('fetchPostList');
    comment.value = '';
    alert('留言成功');
  } catch (e: any) {
    console.error(e.message);
    throw e;
  }
};

const deletePost = async (postId: string, userId: string) => {
  let isDelete = confirm('確定該刪除貼文嗎？');

  if (isDelete) {
    await postService.deletePost(postId);
    emit('fetchUserPostList', userId);
    alert('刪除成功！');
  }
};
</script>

<template>
  <div bg="white" border="2 b-4 dark-500 rounded-lg" w="full min-300px" p="6" m="b-4">
    <div display="flex items-center" bg="red-500x" m="b-4">
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
          :to="{ name: 'UserWall', params: { id: post.user._id } }"
          class="text-dark-500"
          font="bold"
          hover="text-primary underline"
        >
          {{ post.user.name }}
        </RouterLink>
        <p text="xs dark-300">{{ post.createdAt }}</p>
      </div>
      <font-awesome-icon
        v-if="showDeletePost"
        text="red-600"
        :icon="['fas', 'trash-can']"
        size="lg"
        m="l-auto"
        cursor="pointer"
        @click="deletePost(post._id, user._id)"
      />
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
        :disabled="postService.loading.comment"
        @keyup.enter="addPostComment"
      />
      <div w="128px" position="relative">
        <button
          type="button"
          w="full"
          h="full"
          border="2 dark-500 rounded-none"
          :class="createPostClass"
          :disabled="postService.loading.comment"
          @click="addPostComment"
        >
          留言

          <font-awesome-icon
            v-show="postService.loading.comment"
            :icon="['fa', 'circle-notch']"
            pulse
            size="lg"
            m="l-2"
          />
        </button>
      </div>
    </div>

    <div v-for="o in post.comments" :key="o._id" bg="dark-100" p="4" m="b-4" border="rounded-12px">
      <div display="flex" m="r-2.5 b-4">
        <div
          :style="{
            'background-image': `url(${o.user.photo})`,
          }"
          bg="center cover no-repeat"
          border="2 dark-500 rounded-1/2"
          w="40px"
          h="40px"
          m="r-4"
        ></div>
        <div display="flex flex-col justify-center">
          <RouterLink
            :to="{ name: 'UserWall', params: { id: o.user._id } }"
            class="text-dark-500"
            font="bold"
            hover="text-primary underline"
          >
            {{ o.user.name }}
          </RouterLink>
          <p text="xs dark-300">{{ o.createdAt }}</p>
        </div>
      </div>
      <div m="l-56px">{{ o.comment }}</div>
    </div>
  </div>
</template>

<style scoped></style>
