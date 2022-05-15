<script lang="ts">
interface UploadFile {
  file: File | null;
  url: String;
  size: Number;
  name: String;
}
</script>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { usePost } from '@/service/usePost';
import TitleBlock from '@/components/TitleBlock.vue';

const postService = usePost();
const router = useRouter();

const content = ref('');
const tmpImageUrl = ref('');

const file = reactive<UploadFile>({
  file: null,
  url: '',
  size: 0,
  name: '',
});

const uploadFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.files) return;

  file.file = target.files[0];
  file.url = URL.createObjectURL(target.files[0]);
  file.size = target.files[0].size;
  file.name = target.files[0].name;
};

const uploadFileStyle = computed(() => `url(${file.url})`);
const createPostClass = computed(() => {
  return {
    'bg-disable-100 cursor-not-allowed': !content.value,
    'bg-active': content.value,
  };
});

const createPost = async () => {
  try {
    if (!content.value) throw new Error('貼文內容必填');

    const dict = {
      image: tmpImageUrl.value,
      content: content.value,
    };

    await postService.addPost(dict);

    alert('貼文成功');
    router.push({ name: 'Post' });
  } catch (e: any) {
    alert(e.message);
  }
};
</script>

<template>
  <TitleBlock>張貼動態</TitleBlock>

  <div bg="white" border="2 dark-500 rounded-lg" display="flex flex-col items-center" p="8">
    <div w="full">
      <p text="dark-500" m="b-1">貼文內容</p>
      <textarea
        v-model="content"
        rows="4"
        cols="50"
        w="full"
        h="40"
        text="dark-500"
        border="2 dark-500"
        p="4"
        m="b-4"
        placeholder="輸入您的貼文內容..."
      ></textarea>

      <label htmlFor="uploadPostImage">
        <div display="flex items-center" m="b-4">
          <div
            v-if="false"
            w="128px"
            display="flex justify-center items-center"
            bg="dark-500"
            text="white"
            border="rounded"
            p="y-1"
            m="r-4"
            cursor="pointer"
          >
            上傳新圖片
          </div>

          <div display="flex flex-col items-center" w="full">
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
          <span v-if="file.file">{{ file.name }}</span>
        </div>
        <input
          id="uploadPostImage"
          type="file"
          accept="image/jpg,image/jpeg,image/png"
          class="hidden"
          h="0"
          @change="uploadFile"
        />
      </label>
      <div
        v-if="file.file"
        class="upload-file"
        position="relative"
        h="40"
        border="2 rounded dark-500"
        m="b-6"
        bg="center no-repeat"
      ></div>
    </div>
    <p v-if="false" text="danger sm" m="b-4">圖片檔案過大，僅限 1mb 以下檔案</p>
    <button
      type="button"
      :class="createPostClass"
      p="y-4"
      w="3/5"
      text="white"
      border="2 black rounded-8px"
      @click="createPost"
    >
      送出貼文
    </button>
  </div>
</template>

<style lang="scss" scoped>
.upload-file {
  background-image: v-bind(uploadFileStyle);
}
</style>
