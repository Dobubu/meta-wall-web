<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

import { useUserStore } from '@/store/user';
import { UpdateProfileReq } from '@/api/user';
import { SexType } from '@/api/user';
import { useUser } from '@/service/useUser';
import { useUpload } from '@/service/useUpload';
import { useUserPhoto } from '@/lib/useUserPhoto';

import TitleBlock from '@/components/TitleBlock.vue';
import UserItem from '@/components/UserItem.vue';
import themeRilakkuma from '@/assets/images/theme_rilakkuma.jpg';
import themeKorilakkuma from '@/assets/images/theme_korilakkuma.jpeg';
import themeChairoikoguma from '@/assets/images/theme_chairoikoguma.jpeg';
import themeConversation from '@/assets/images/login_conversation.svg';

const store = useUserStore();
const userService = useUser();
const uploadService = useUpload();

const activeTab = ref('info');
const tabList = ref([
  {
    type: 'info',
    title: '暱稱修改',
  },
  {
    type: 'password',
    title: '重設密碼',
  },
  {
    type: 'theme',
    title: '更換主題',
  },
]);
const globalErrMsg = ref('');
const loadingProfile = ref(false);

const user = reactive({
  name: store.user?.name,
  sex: store.user?.sex,
  photo: store.user?.photo,
});

const rulesUser = {
  name: { required, minLength: minLength(2) },
};

const v$User = useVuelidate(rulesUser, user);

const userPhotoService = useUserPhoto();

const userPhoto = computed(() => uploadService.file.url || userPhotoService.getUserPhoto.value);

const updateUser = async () => {
  try {
    if (!user.name) throw new Error('上述欄位有誤！');

    const isValidate = await v$User.value.$validate();
    if (!isValidate) return;

    loadingProfile.value = true;

    let dict: UpdateProfileReq = {
      name: user.name,
      sex: user.sex,
    };

    if (uploadService.file.file) {
      const res = await uploadService.uploadFile('user');

      user.photo = res;
      dict = { ...dict, photo: user.photo };
    }

    await userService.updateProfile(dict);

    uploadService.resetFile();
    globalErrMsg.value = '';
    alert('資料更新成功！');
  } catch (e: any) {
    globalErrMsg.value = e.message;
  } finally {
    loadingProfile.value = false;
  }
};

const password = reactive({
  new: '',
  repeatNew: '',
});

const rulesPassword = {
  new: { required, minLength: minLength(8) },
  repeatNew: { required, minLength: minLength(8) },
};

const v$Password = useVuelidate(rulesPassword, password);

const updatePassword = async () => {
  try {
    if (!password.new || !password.repeatNew) throw new Error('上述欄位有誤！');
    if (password.new !== password.repeatNew) throw new Error('密碼不一致！');

    const isValidate = await v$Password.value.$validate();
    if (!isValidate) return;

    const dict = {
      password: password.new,
      confirmPassword: password.repeatNew,
    };

    await userService.updatePassword(dict);

    globalErrMsg.value = '';
    alert('密碼更新成功！');
  } catch (e: any) {
    globalErrMsg.value = e.message;
  }
};

watch(
  () => store.user,
  v => {
    if (v) {
      user.name = v.name;
      user.sex = v.sex;
    }
  },
);

const resetStatus = () => {
  user.name = store.user?.name;
  user.sex = store.user?.sex;
  uploadService.resetFile();

  globalErrMsg.value = '';
  v$User.value.$reset();
  v$Password.value.$reset();
};

const updateActive = (type: string) => {
  activeTab.value = type;

  resetStatus();
};

const isActive = (type: string) => (activeTab.value === type ? 'meta-primary-bg' : 'bg-white');

const isResetPassword = computed(() => {
  return {
    'bg-disable-100 cursor-not-allowed':
      !password.new || !password.repeatNew || password.new !== password.repeatNew,
    'meta-active-bg': password.new && password.repeatNew && password.new === password.repeatNew,
  };
});

const themeList = ref([
  {
    theme: 'theme-rilakkuma',
    url: themeRilakkuma,
  },
  {
    theme: 'theme-korilakkuma',
    url: themeKorilakkuma,
  },
  {
    theme: 'theme-chairoikoguma',
    url: themeChairoikoguma,
  },
  {
    theme: 'theme-conversation',
    url: themeConversation,
  },
]);

const previewTheme = async (theme: string) => {
  store.theme = theme;
};

const isCurrentTheme = computed(() => store.theme === store.user?.theme);
const themeBtnClass = computed(() => {
  return {
    'bg-disable-100 !cursor-not-allowed': store.theme === store.user?.theme,
    'meta-active-bg': store.theme !== store.user?.theme,
  };
});

const changeTheme = async () => {
  if (isCurrentTheme.value) return;

  await userService.updateTheme({ theme: store.theme });
  alert('主題更新成功！');
};
</script>

<template>
  <TitleBlock>修改個人資料</TitleBlock>

  <div display="flex flex-col" w="min-500px">
    <div>
      <button
        v-for="o in tabList"
        :key="o.title"
        type="button"
        :class="isActive(o.type)"
        p="y-2 x-6"
        m="first:l-4"
        border="2 rounded-t-8px dark-500 border-b-0 rounded-b-none"
        @click="updateActive(o.type)"
      >
        {{ o.title }}
      </button>
    </div>

    <div v-if="store.user" p="y-8" border="2 rounded-8px dark-500" shadow="item-bottom" bg="white">
      <div v-show="activeTab === 'info'" display="flex flex-col items-center">
        <div m="b-4">
          <UserItem :photo="(userPhoto as string)" size="107px" margin="0" />
        </div>

        <div v-if="uploadService.file.file" display="flex items-center" m="b-2">
          <span>{{ uploadService.file.name }}</span>
          <font-awesome-icon
            :icon="['fa', 'xmark']"
            size="lg"
            m="l-5"
            cursor="pointer"
            @click="uploadService.resetFile"
          />
        </div>
        <label htmlFor="uploadPostImage">
          <div bg="dark-500" text="white" p="y-2 x-6" m="b-3" cursor="pointer">選擇大頭照</div>

          <input
            id="uploadPostImage"
            type="file"
            accept="image/jpg,image/jpeg,image/png"
            class="hidden"
            h="0"
            @change="uploadService.onChangeFile"
          />
        </label>

        <div display="flex flex-col" w="3/5">
          <p text="dark-500" m="b-1">暱稱</p>
          <input
            v-model="user.name"
            type="text"
            placeholder="輸入暱稱"
            m="b-4"
            border="2 dark-500"
            w="full"
            h="12"
            p="l-6"
            @blur="v$User.name.$touch"
          />
          <span
            v-for="error of v$User.name.$errors"
            :key="error.$uid"
            m="b-4 -t-2"
            text="14px danger left"
          >
            {{ error.$message }}
          </span>

          <p text="dark-500" m="b-2">性別</p>
          <div display="flex items-center" m="b-9">
            <input
              id="male"
              v-model="user.sex"
              type="radio"
              name="gender"
              :value="SexType.MALE"
              m="r-3"
            />
            <label for="male" m="r-6">男性</label>

            <input
              id="female"
              v-model="user.sex"
              type="radio"
              name="gender"
              :value="SexType.FEMALE"
              m="r-3"
            />
            <label for="female" m="r-6">女性</label>
          </div>

          <!-- <div display="flex flex-col justify-center items-center" m="b-4">
            <p text="danger sm">1.圖片寬高比必需為 1:1,請重新輸入</p>
            <p text="danger sm">2.解析度寬度至少 300像素以上,請重新輸入</p>
          </div> -->
          <span m="b-4" text="14px danger center">{{ globalErrMsg }}</span>

          <button
            type="submit"
            class="meta-active-bg"
            p="y-4"
            border="2 dark-500 rounded-8px"
            shadow="item-bottom"
            :disabled="loadingProfile"
            @click.prevent="updateUser"
          >
            送出更新
            <font-awesome-icon
              v-if="loadingProfile"
              :icon="['fa', 'circle-notch']"
              pulse
              size="lg"
              m="l-2"
            />
          </button>
        </div>
      </div>

      <div v-show="activeTab === 'password'" display="flex flex-col items-center">
        <div display="flex flex-col" w="3/5">
          <p text="dark" m="b-1">輸入新密碼</p>
          <input
            v-model="password.new"
            type="text"
            placeholder="請輸入新密碼"
            m="b-4"
            border="2 dark-500"
            w="full"
            h="12"
            p="l-6"
            @blur="v$Password.new.$touch"
          />
          <span
            v-for="error of v$Password.new.$errors"
            :key="error.$uid"
            m="b-4 -t-2"
            text="14px danger left"
          >
            {{ error.$message }}
          </span>

          <p text="dark" m="b-1">再次輸入</p>
          <input
            v-model="password.repeatNew"
            type="text"
            placeholder="再次輸入新密碼"
            m="b-4"
            border="2 dark-500"
            w="full"
            h="12"
            p="l-6"
            @blur="v$Password.repeatNew.$touch"
          />
          <span
            v-for="error of v$Password.repeatNew.$errors"
            :key="error.$uid"
            m="b-4 -t-2"
            text="14px danger left"
          >
            {{ error.$message }}
          </span>

          <span m="b-4" text="14px danger center">{{ globalErrMsg }}</span>

          <button
            :class="isResetPassword"
            type="submit"
            p="y-4"
            w="full"
            text="dark-500"
            border="2 dark-500 rounded-8px"
            shadow="item-bottom"
            :disabled="userService.loading.password"
            @click.prevent="updatePassword"
          >
            重設密碼
            <font-awesome-icon
              v-if="userService.loading.password"
              :icon="['fa', 'circle-notch']"
              pulse
              size="lg"
              m="l-2"
            />
          </button>
        </div>
      </div>

      <div v-show="activeTab === 'theme'" display="flex flex-col items-center">
        <div display="flex justify-center items-center">
          <div
            v-for="o in themeList"
            :key="o.theme"
            display="flex flex-col items-center"
            m="not-first:l-10"
            cursor="pointer"
            @click="previewTheme(o.theme)"
          >
            <div
              class="theme-img overflow-hidden"
              :class="{ active: o.theme === store.theme, 'preview-text': o.theme !== store.theme }"
              w="max-150px"
              z="1"
              border="rounded-1/2"
            >
              <img :src="o.url" alt="" border="rounded-1/2x " />
            </div>
            <span :class="{ 'text-amber-500': o.theme === store.theme }" m="t-4" font="bold">
              {{ o.theme }}
            </span>
          </div>
        </div>

        <button
          type="submit"
          :class="themeBtnClass"
          w="3/5"
          m="t-10"
          p="y-4"
          border="2 dark-500 rounded-8px"
          shadow="item-bottom"
          :disabled="userService.loading.theme"
          @click.prevent="changeTheme"
        >
          送出更新
          <font-awesome-icon
            v-if="userService.loading.theme"
            :icon="['fa', 'circle-notch']"
            pulse
            size="lg"
            m="l-2"
          />
        </button>
        <span v-show="!isCurrentTheme" m="t-4" text="14px danger left">
          提醒您，預覽的樣式尚未儲存
        </span>
        <span v-show="isCurrentTheme" class="meta-primary-text" m="t-4" text="14px left">
          該樣式是您當前樣式
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme-img {
  img {
    transition: 0.5s ease all;
    width: 100%;
    object-fit: cover;
  }

  &.active {
    @apply border-amber-500 border-7;
  }

  &:hover img {
    transform: scale(1.1);
  }
}

.preview-text {
  position: relative;

  &::before {
    content: 'preview';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
    background: rgba(229, 229, 229, 0.5);
    z-index: 10;
  }
}
</style>
