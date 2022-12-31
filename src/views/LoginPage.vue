<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

import { useAuth } from '@/service/useAuth';

const router = useRouter();
const authService = useAuth();

const isLogin = ref(true);
const globalErrMsg = ref('');

const user = reactive({
  name: '',
  email: '',
  password: '',
});

const rules = {
  name: { required, minLength: minLength(2) },
  email: { required, email },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, user);

const changeStatus = () => {
  isLogin.value = !isLogin.value;

  v$.value.$reset();
  globalErrMsg.value = '';

  user.name = '';
  user.email = '';
  user.password = '';
};

const signUp = async () => {
  try {
    const isValidate = await v$.value.$validate();
    if (!isValidate || !user.name || !user.email || !user.password)
      throw new Error('上述欄位有誤！');

    const dict = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    await authService.signUp(dict);

    await router.push({ name: 'Post' });
    alert('註冊、登入成功！');
  } catch (e: any) {
    globalErrMsg.value = e.message;
  }
};

const login = async () => {
  try {
    const isValidateEmail = await v$.value.email.$validate();
    const isValidatePassword = await v$.value.password.$validate();
    if (!isValidateEmail || !isValidatePassword || !user.email || !user.password)
      throw new Error('上述欄位有誤！');

    const dict = {
      email: user.email,
      password: user.password,
    };

    await authService.login(dict);

    await router.push({ name: 'Post' });
    alert('登入成功！');
  } catch (e: any) {
    globalErrMsg.value = e.message;
  }
};
</script>

<template>
  <div class="bg" h="screen" bg="repeat" display="flex justify-center items-center">
    <div
      w="869px"
      bg="dark-100"
      shadow="main"
      p="y-96px x-50px"
      display="flex justify-between items-center"
      border="2 dark-500"
    >
      <div class="login-bg" h="350px" w="350px" bg="center no-repeat contain"></div>
      <div>
        <form action="." display="flex flex-col" text="center">
          <h1 class="meta-primary-text" leading="text" text="60px" font="paytone bold">MetaWall</h1>
          <h2 m="b-9" text="24px dark-500" font="helvetica bold">
            {{ isLogin ? '到元宇宙展開全新社交圈' : '註冊' }}
          </h2>

          <template v-if="!isLogin">
            <input
              v-model="user.name"
              data-cy="register-name"
              type="text"
              w="373px"
              h="51px"
              border="2 dark-500"
              m="b-4"
              placeholder="暱稱"
              @blur="v$.name.$touch"
            />
            <span
              v-for="error of v$.name.$errors"
              :key="error.$uid"
              m="b-4 -t-2"
              text="14px danger left"
            >
              {{ error.$message }}
            </span>
          </template>

          <input
            v-model="user.email"
            data-cy="auth-email"
            type="text"
            w="373px"
            h="51px"
            border="2 dark-500"
            m="b-4"
            placeholder="Email"
            @blur="v$.email.$touch"
          />
          <span
            v-for="error of v$.email.$errors"
            :key="error.$uid"
            data-cy="auth-email-error"
            m="b-4 -t-2"
            text="14px danger left"
          >
            {{ error.$message }}
          </span>

          <input
            v-model="user.password"
            data-cy="auth-password"
            type="password"
            w="373px"
            h="51px"
            border="2 dark-500"
            m="b-8"
            placeholder="Password"
            @blur="v$.password.$touch"
          />
          <span
            v-for="error of v$.password.$errors"
            :key="error.$uid"
            m="b-4 -t-6"
            text="14px danger left"
          >
            {{ error.$message }}
          </span>

          <span m="b-4" text="14px danger">{{ globalErrMsg }}</span>
          <template v-if="isLogin">
            <button
              v-if="isLogin"
              class="meta-primary"
              transition="duration-base"
              type="submit"
              p="y-4"
              m="b-4"
              border="2 dark-500 rounded-8px"
              :disabled="authService.loading.auth"
              @click.prevent="login"
            >
              登入
              <font-awesome-icon
                v-if="authService.loading.auth"
                :icon="['fa', 'circle-notch']"
                pulse
                size="lg"
                m="l-2"
              />
            </button>
            <span
              data-cy="toggle-register"
              cursor="pointer"
              text="center"
              display="block"
              @click="changeStatus"
            >
              註冊帳號
            </span>
          </template>
          <template v-else>
            <button
              type="submit"
              data-cy="register-btn"
              class="meta-primary"
              transition="duration-base"
              p="y-4"
              m="b-4"
              border="2 dark-500 rounded-8px"
              :disabled="authService.loading.auth"
              @click.prevent="signUp"
            >
              註冊
              <font-awesome-icon
                v-if="authService.loading.auth"
                :icon="['fa', 'circle-notch']"
                pulse
                size="lg"
                m="l-2"
              />
            </button>
            <span cursor="pointer" text="center" display="block" @click="changeStatus"> 登入 </span>
          </template>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background-image: url('@/assets/images/bg.svg');
}

.login-bg {
  background-image: var(--login-bg);
}
</style>
