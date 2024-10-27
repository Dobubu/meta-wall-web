<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useModalStore } from '@/store/modal';

const { showModal } = storeToRefs(useModalStore());
const { updateShowModal } = useModalStore();
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showModal" class="modal_overlay" @click.self="updateShowModal(false)">
        <div class="modal_overlay_container">
          <div class="modal_overlay_header">
            <slot name="header"></slot>
            <button @click="updateShowModal(false)">✖️</button>
          </div>

          <div class="modal_overlay_body">
            <slot name="body"></slot>
          </div>

          <div class="modal_overlay_footer">
            <slot name="footer">
              <!-- <button class="modal_overlay_default_button" @click="updateShowModal(false)">
                OK
              </button> -->
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.modal_overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;

  &_container {
    width: 600px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 7px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  &_header {
    display: flex;
    align-items: center;

    h3 {
      margin-top: 0;
      color: #42b983;
    }

    button {
      margin-left: auto;
      font-size: 1.5rem;
    }
  }

  &_body {
    margin: 0 0 20px;
  }

  &_default_button {
    float: right;
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal_overlay_container,
.modal-leave-to .modal_overlay_container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
