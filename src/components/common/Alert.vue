<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useAlertStore } from '@/store/alert';

const { duration, showAlert, type, message } = storeToRefs(useAlertStore());
const { hide } = useAlertStore();

watch(
  () => showAlert.value,
  () => {
    setTimeout(() => {
      hide();
    }, duration.value);
  },
);
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="showAlert" class="alert" :class="[`alert-${type}`]" @click="hide">
        <span>{{ message }}</span>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="scss">
.alert {
  position: fixed;
  z-index: 9998;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1em 2em;
  margin: 1em 0;
  max-width: 90%;
  width: 400px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #fff;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;

  &-success {
    background-color: #d4edda;
    color: #155724;
  }

  &-error {
    background-color: #f8d7da;
    color: #721c24;
  }

  &-warning {
    background-color: #fff3cd;
    color: #856404;
  }

  &-info {
    background-color: #cce5ff;
    color: #004085;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
