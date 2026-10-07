<script setup lang="ts">
import Popper from 'vue3-popper'
import type { Answer } from '../content.config'
import { answerOptions } from '../store'

defineProps<{
  answer: Answer
  popup?: boolean,
  popupPrefix?: string,
  small?: boolean,
}>()
</script>

<template>
  <Popper
    arrow
    hover
    placement="top"
    :content="(popupPrefix ?? '') + answerOptions[answer].label"
    :disabled="popup !== false"
  >
    <div
      :class="{
        'flex items-center justify-center rounded-full text-white': true,
        'h-10': !small,
        'w-10': !small,
        'h-5': small,
        'w-5': small,
        [answerOptions[answer].class]:true,
      }"
      v-bind="$attrs"
    >
      <span class="sr-only">{{ answerOptions[answer].label }}</span>
      <component
        :is="answerOptions[answer].icon"
        :class="small ? 'h-3 w-3' : 'h-7 w-7'"
        aria-hidden="true"
      />
    </div>
  </Popper>
</template>
