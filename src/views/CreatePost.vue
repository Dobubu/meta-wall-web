<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import { usePost } from '@/service/usePost';
import { useUpload } from '@/service/useUpload';

import TitleBlock from '@/components/TitleBlock.vue';

const router = useRouter();
const postService = usePost();
const uploadService = useUpload();

const globalErrMsg = ref('');
const tmpImageUrl = ref('');
const loading = ref(false);

const post = reactive({
  content: '',
  photos: '',
});

const rules = {
  content: { required },
};

const v$ = useVuelidate(rules, post);

const postImgs = computed(() => uploadService.file.url);
const createPostClass = computed(() => {
  return {
    'bg-disable-100 cursor-not-allowed': !post.content || loading.value,
    'meta-active-bg': post.content,
  };
});

const createPost = async () => {
  try {
    if (!post.content) throw new Error('貼文內容必填');

    const isValidate = await v$.value.$validate();
    if (!isValidate) return;

    loading.value = true;

    if (uploadService.file.file) {
      const res = await uploadService.uploadFile();
      post.photos = res;
    }

    const dict = {
      image: post.photos,
      content: post.content,
    };

    await postService.addPost(dict);

    alert('貼文成功！');
    router.push({ name: 'Post' });
  } catch (e: any) {
    globalErrMsg.value = e.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <TitleBlock>張貼動態</TitleBlock>

  <div bg="white" border="2 dark-500 rounded-lg" display="flex flex-col items-center" p="8">
    <div w="full">
      <p text="dark-500" m="b-1">貼文內容</p>
      <span
        v-for="error of v$.content.$errors"
        :key="error.$uid"
        m="b-4 -t-2"
        text="14px danger left"
      >
        {{ error.$message }}
      </span>
      <textarea
        v-model="post.content"
        data-cy="create-post-content"
        rows="4"
        cols="50"
        w="full"
        h="40"
        text="dark-500"
        border="2 dark-500"
        p="4"
        m="b-4"
        placeholder="輸入您的貼文內容..."
        @blur="v$.content.$touch"
      ></textarea>

      <div display="flex items-center" m="b-4">
        <label htmlFor="uploadPostImage">
          <div display="flex items-center">
            <div
              w="128px"
              display="flex justify-center items-center"
              bg="dark-500"
              text="white"
              border="rounded"
              p="y-1"
              m="r-4"
              cursor="pointer"
            >
              選擇新圖片
            </div>

            <div v-if="false" display="flex flex-col items-center" w="full">
              <input
                v-model="tmpImageUrl"
                type="text"
                placeholder="貼上圖片網址"
                border="2 dark-500"
                w="full"
                h="12"
                p="l-6"
                m="b-2"
              />
              <img v-if="tmpImageUrl" :src="tmpImageUrl" alt="" />
            </div>
          </div>
          <input
            id="uploadPostImage"
            type="file"
            accept="image/jpg,image/jpeg,image/png"
            class="hidden"
            h="0"
            @change="uploadService.onChangeFile"
          />
        </label>

        <template v-if="uploadService.file.file">
          <span>{{ uploadService.file.name }}</span>
          <font-awesome-icon
            :icon="['fa', 'xmark']"
            size="lg"
            m="l-5"
            cursor="pointer"
            @click="uploadService.resetFile"
          />
        </template>
      </div>

      <div
        v-if="uploadService.file.file"
        :style="{
          'background-image': `url(${postImgs})`,
        }"
        position="relative"
        h="40"
        border="2 rounded dark-500"
        m="b-6"
        bg="center no-repeat"
      ></div>
    </div>
    <p text="danger sm" m="b-4">{{ globalErrMsg }}</p>
    <button
      type="button"
      data-cy="create-post-btn"
      :class="createPostClass"
      p="y-4"
      w="3/5"
      text="white"
      border="2 black rounded-8px"
      :disabled="loading"
      @click="createPost"
    >
      送出貼文
      <font-awesome-icon v-if="loading" :icon="['fa', 'circle-notch']" pulse size="lg" m="l-2" />
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
