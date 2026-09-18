<script setup lang="ts">
import { computed, onMounted, useTemplateRef, nextTick } from 'vue'
import { answerOptions, useStore } from '../store'
import type { Answer, Question } from '../content.config'
import AnswerIndicator from './AnswerIndicator.vue'
import AnswerButton from './AnswerButton.vue'
import IconForward from '~icons/material-symbols/arrow-forward'
import IconLess from '~icons/material-symbols/stat-minus-2-rounded'
import IconMore from '~icons/material-symbols/stat-2-rounded'
import IconRight from '~icons/material-symbols/check-rounded'
import IconEdit from '~icons/material-symbols/edit-rounded'
//import IconUnknown from '~icons/material-symbols/stat-unknown-med-rounded'

const props = defineProps<{
  questionsCount: number
  currentQuestionIndex: number
  currentQuestionProgress: number
  currentQuestion: Question
  transitionName?: string
  compact?: boolean
}>()

defineEmits<{
  (e: 'saveAnswer', answer: Answer): void
  (e: 'skipQuestion'): void
  (e: 'nextQuestion'): void
}>()

const { answers, deleteAnswer } = useStore()

const buttonContainer = useTemplateRef<HTMLDivElement>('button-container')

const answerButtons = computed(() => {
  const buttons: Record<string, any> = {
    'ano': { icon: IconRight },
    ne: { icon: IconLess },
    'nevím': { icon: IconEdit },
  }

  for (const button in buttons) {
    buttons[button].disabled = !props.currentQuestion.answers.some(
      (a) => a.answer === button,
    )
  }

  return buttons as Record<Answer, any>
})

const hasAnswer = computed(
  () => answers.value[props.currentQuestion.id] !== undefined,
)

const detectLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s\(\)]+)/g
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    })
}

const focusFirstButton = () => {
  buttonContainer.value?.querySelector?.('button')?.focus()
}

const editAnswer = () => {
  deleteAnswer(props.currentQuestion.id)
  nextTick(focusFirstButton)
}

onMounted(focusFirstButton)
</script>

<template>
  <div class="@container bg-white p-4 md:p-8">
    <div :class="compact ? 'mb-6' : 'min-h-72'">
      <Transition
        class="duration-250 ease-linear motion-safe:transition-opacity"
        enter-from-class="motion-safe:opacity-0"
        leave-to-class="motion-safe:opacity-0"
        mode="out-in"
      >
        <div
          class="flex text-gray-700 @md:mt-4 @md:text-2xl"
          :key="currentQuestionIndex"
        >
          {{ currentQuestionProgress }} / {{ questionsCount }}
          {{ currentQuestion.category }}
        </div>
      </Transition>
      <Transition mode="out-in" :name="transitionName">
        <div aria-live="assertive" :key="currentQuestionIndex">
          <h2 class="my-4 text-xl font-medium max-md:hyphens-auto @md:text-4xl">
            {{ currentQuestion.thesis }}
          </h2>
          <details class="my-4">
              <summary>Informace o této otázce</summary>
              <p class="mt-1 mb-2" v-html="detectLinks(line)" v-for="line in currentQuestion.thesisContext.split('\n')" />
          </details>
        </div>
      </Transition>
    </div>
    <Transition
      :name="transitionName"
      mode="out-in"
      @after-enter="focusFirstButton"
    >
      <div :key="currentQuestionIndex" ref="button-container">
        <div v-if="hasAnswer" class="flex flex-wrap items-center gap-4">
          Ihre Auswahl:
          <AnswerIndicator :answer="answers[currentQuestion.id].answer" />
          {{ answerOptions[answers[currentQuestion.id].answer].label }}

          <button class="btn-text" @click="editAnswer">
            <IconEdit aria-hidden="true" class="me-1" />
            Ändern
          </button>

          <div class="ms-auto self-center">
            <button @click="$emit('nextQuestion')" class="btn-outline">
              Weiter
              <IconForward aria-hidden="true" class="ms-1" />
            </button>
          </div>
        </div>

        <div class="flex flex-wrap gap-x-2 gap-y-3" v-else>
          <AnswerButton
            v-for="({ disabled, icon }, answer, i) in answerButtons"
            :key="i"
            :answer="answer"
            :disabled="disabled"
            @save="$emit('saveAnswer', answer)"
          >
            <component :is="icon" />
          </AnswerButton>
          <div class="ms-auto! self-center @max-md:pt-4">
            <button @click="$emit('skipQuestion')" class="btn-outline">
              Přeskočit otázku
              <IconForward aria-hidden="true" class="ms-1" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
