<script setup lang="ts">
import { computed, ref, type ComputedRef } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import type { Party, Position, Question } from '../content.config'
import IconBack from '~icons/material-symbols/arrow-back'
import IconForward from '~icons/material-symbols/arrow-forward'
import IconChevron from '~icons/material-symbols/keyboard-arrow-down-rounded'
import { parties, partyNames } from '../store'
import AnswerIndicator from './AnswerIndicator.vue'

const currentPartyIndex = ref(0);
const currentParty = computed(
  () => props.partyMatches[currentPartyIndex.value],
);

const getPartyFromName = (partyName: string): Party => {

  const party = parties.find((p) => partyNames[p] === partyName);

  // This error should never come up, because parties is created out of partyNames in store.ts, but TypeScript is complaning about the type mismatch in undefined because of Array.prototype.find.
  if (party === undefined) {
    throw new TypeError('Nenalezená strana.');
  }

  return party;

}

const getAnswersForPartyName = (partyName: string) => {
  const partyId = getPartyFromName(partyName);
  const answers: Position[]  = [];
  props.questions.forEach((q: Question) => {
    const answer: Position|undefined = q.answers.find((a) => a.party === partyId);
    if (!!answer) {
      answers.push(answer);
    }
  });
  return answers;
}

const currentAnswers: ComputedRef<Position[]> = computed(
  () => getAnswersForPartyName(currentParty.value.party)
)

const transitionName = ref<string | undefined>('slide')

const previousSlide = () => {
  transitionName.value = 'slide-back'
  if (currentPartyIndex.value > 0) {
    currentPartyIndex.value--
  }
}

const nextSlide = () => {
  transitionName.value = 'slide'

  if (currentPartyIndex.value < props.partyMatches.length - 1) {
    currentPartyIndex.value++
  }
}

const props = defineProps<{
  questions: Question[]
  partyMatches: { party: string; score: number; percentage: number }[]
}>();

</script>

<template>
  <div class="bg-white p-4 md:p-8">
    <h2>Komentáře k odpovědím</h2>
    <p class="mb-6">
        Jak kandidátstvo zdůvodňuje své postoje? Podívejte se na komentáře ke konkrétním otázkám.
    </p>

    <hr class="border-gray-200" />

    <nav class="grid-r mt-6 grid grid-cols-3 justify-center">
      <button
        @click="previousSlide"
        :disabled="currentPartyIndex === 0"
        class="btn-text justify-self-start"
      >
        <IconBack aria-hidden="true" class="me-1" />
        Předchozí
      </button>
      <div class="text-center">
        <select
          class="w-full rounded-md border-gray-300 bg-purple-100 px-4 py-1 shadow-sm outline-none focus:ring-3 focus:ring-purple-600/50 motion-safe:transition"
          v-model="currentPartyIndex"
          aria-label="Přejít na kandidátstvo"
          @change="transitionName = undefined"
        >
          <option
            v-for="(party, index) in props.partyMatches"
            :key="index"
            :value="index"
          >
            {{ party.party }}
          </option>
        </select>
      </div>
      <button
        @click="nextSlide"
        class="btn-text justify-self-end"
        :disabled="currentPartyIndex === props.partyMatches.length - 1"
      >
        Další
        <IconForward aria-hidden="true" class="me-1" />
      </button>
    </nav>

    <Transition mode="out-in" :name="transitionName">
      <article :key="currentPartyIndex">
        <h3 class="my-8 text-xl font-medium md:text-2xl">
          {{ partyMatches[currentPartyIndex].party }}
        </h3>
        <ul class="mt-8 grid gap-4 md:grid-cols-2">
          <Disclosure
            as="li"
            v-slot="{ open }"
            v-for="({ answer, comment }, i) in currentAnswers"
            :key="i"
            class="flex flex-col"
          >
            <DisclosureButton
              class="flex flex-1 h-full w-full items-center justify-between rounded bg-purple-100 px-4 py-2 outline-none focus:ring-3 focus:ring-purple-600/50 motion-safe:transition"
              :class="{ 'rounded-b-none': open }"
            >
              <AnswerIndicator :answer="answer ?? '/'" />
              <h4 class="text-lg text-left w-3/4">Otázka {{ i + 1 }}: {{ questions[i].thesis }}</h4>
              <IconChevron
                aria-hidden="true"
                class="h-5 w-5 transform text-purple-900 motion-safe:transition-transform"
                :class="{
                  'rotate-180': open,
                }"
              />
            </DisclosureButton>
            <DisclosurePanel class="flex-1 rounded-b-lg bg-purple-50 p-4">
              <div class="comment" v-if="comment" v-html="comment" />
              <em v-else>Žádný komentář</em>
            </DisclosurePanel>
          </Disclosure>
        </ul>
      </article>
    </Transition>
  </div>
</template>

<style scoped>
@reference "../assets/style.css";

.comment:deep(a) {
  @apply text-purple-600 underline hover:text-purple-700;
}
</style>
