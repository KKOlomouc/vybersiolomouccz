import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import type { Answer, Party, Question } from './content.config.ts'
import IconNo from '~icons/material-symbols/close-rounded'
import IconRight from '~icons/material-symbols/check-rounded'
import IconUnknown from './components/IconUnknown.vue'

export type UserPosition = {
  answer: Answer
  weight: number
  questionId: string
}

export const answerOptions = {
  'ano': {
    label: 'ano',
    icon: IconRight,
    class: 'bg-primary-green',
  },
  nevim: {
    label: 'nevím',
    // icon: IconLess,
    class: 'bg-primary-orange',
  },
  ne: {
    label: 'ne',
    icon: IconNo,
    class: 'bg-primary-red',
  },
  '/': {
    label: 'nezodpovězeno',
    icon: IconUnknown,
    class: 'bg-gray-600',
  },
}

export enum Stage {
  Intro,
  Tutorial,
  Questionnaire,
  Weights,
  Results,
}

export const partyNames: Record<Party, string> = {
matous_pelikan:"Matouš Pelikán (KDU-ČSL)",
josef_kastil:"Josef Kaštil (ODS)",
otakar_bacak:"Otakar Bačák (spOLečně)",
ales_prstek:"Aleš Prstek (ProOlomouc)",
miroslav_janosek:"Miroslav Janošek (spOLečně)",
lucie_tungul:"Lucie Tungul (Milujeme Olomouc)",
roman_koutek:"Roman Koutek (Milujeme Olomouc)",
robert_runtak:"Robert Runták (spOLečně)",
zdenek_cernohouz:"Zdeněk Černohouz (ODS)",
kristina_machacikova:"Kristina Machačíková (Milujeme Olomouc)",
zdenek_zak:"Zdeněk Žák (Milujeme Olomouc)",
jakub_jurka:"Jakub Jurka (KDU-ČSL)",
rostislav_hainc:"Rostislav Hainc (KDU-ČSL)",
vaclav_huttel:"Václav Hüttel (LOL)",
antonin_kropacek:"Antonín Kropáček (LOL)",
robert_pokorny:"Robert Pokorný (LOL)",
marek_zelenka:"Marek Zelenka (STAN)",
michal_langer:"Michal Langer (Milujeme Olomouc)",
pavel_grasse:"Pavel Grasse (ProOlomouc)",
tomas_pejpek:"Tomáš Pejpek (ProOlomouc)"
}

export const parties = Object.keys(partyNames) as Party[]

export function useStore() {
  const answers = useStorage(
    'vybersiolomouc-answers',
    {} as Record<string, UserPosition>,
  )

  const answerCount = computed(() => Object.values(answers.value).length)
  const deleteAnswer = (questionId: string) => {
    if (answers.value[questionId]) delete answers.value[questionId]
  }

  const currentQuestionIndex = useStorage('vybersiolomouc-current-question', 0)
  const currentQuestionProgress = computed(() => currentQuestionIndex.value + 1)

  const currentStage = useStorage<Stage>('vybersiolomouc-stage', Stage.Intro)

  const viewTransition = ref('slide' as 'slide' | 'slide-back')

  const getPartyMatches = (questions: Question[]) => {
    const results: Record<Party, number> = {
matous_pelikan: 0,
josef_kastil: 0,
otakar_bacak: 0,
ales_prstek: 0,
miroslav_janosek: 0,
lucie_tungul: 0,
roman_koutek: 0,
robert_runtak: 0,
zdenek_cernohouz: 0,
kristina_machacikova: 0,
zdenek_zak: 0,
jakub_jurka: 0,
rostislav_hainc: 0,
vaclav_huttel: 0,
antonin_kropacek: 0,
robert_pokorny: 0,
marek_zelenka: 0,
michal_langer: 0,
pavel_grasse: 0,
tomas_pejpek: 0
    }

    let denominator = 0

    for (const question of questions) {
      const { answer: userAnswer, weight } = answers.value[question.id] ?? {}
      if (!userAnswer) continue

      for (const { answer: partyAnswer, party } of question.answers) {
        if (userAnswer === partyAnswer) {
          results[party] += weight
        }
      }

      denominator += weight
    }

    return Object.entries(results)
      .map(([party, score]) => ({
        party: partyNames[party as Party],
        score,
        percentage: Math.round((score / denominator) * 100),
      }))
      .sort((a, b) => b.score - a.score)
  }

  return {
    answers,
    deleteAnswer,
    answerCount,
    currentQuestionIndex,
    currentQuestionProgress,
    currentStage,
    viewTransition,
    getPartyMatches,
  }
}
