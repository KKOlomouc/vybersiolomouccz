<script setup lang="ts">
import Popper from 'vue3-popper'
import type { Answer } from '../content.config'
import { answerOptions } from '../store'

defineProps<{
  answer: Answer
  disabled: boolean
}>()

const emit = defineEmits<{
  save: [Answer]
}>()
</script>

<template>
  <div class="answer-button" v-once>
    <Popper
      :disabled="!disabled"
      :hover="true"
      arrow
      placement="top"
      content="Tato možnost není k dispozici, protože nikdo z kandidátstva tímto způsobem nehlasovalx."
    >
      <button
        class="btn"
        :class="answer"
        @click="emit('save', answer)"
        :disabled="disabled"
        tabindex="0"
      >
        <slot class="me-1" />
        {{ answerOptions[answer].label }}
      </button>
    </Popper>
  </div>
</template>
