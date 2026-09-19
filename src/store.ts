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
  'nevím': {
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
  ano2011: 'ANO 2011',
  milujeme_olomouc: 'Milujeme Olomouc - Piráti, Zelení, TOP09',
  spd_trikolora_svobodni: 'SPD, Trikolora, Svobodní',
  kducsl: 'KDU-ČSL',
  ods: 'ODS',
  spolecne: 'spOLečně',
  proolomouc: 'ProOlomouc',
  stan: 'Starostové a nezávislí',
  koruna_ceska: 'Koruna česká',
  levice: 'Levice',
  nico_breitenberg: "Nico Breitenberg",
shanna_west: "Shanna West",
aleen_purdy: "Aleen Purdy",
freeman_brakus: "Freeman Brakus",
candida_carroll: "Candida Carroll",
emery_heaney: "Emery Heaney",
murl_bernhard: "Murl Bernhard",
myrna_reynolds: "Myrna Reynolds",
kip_murphy: "Kip Murphy",
jeremy_boyle: "Jeremy Boyle",
bertrand_o_conner: "'Bertrand O''Conner'",
shawna_dickinson: "Shawna Dickinson",
ashlynn_kris: "Ashlynn Kris",
vada_kuphal: "Vada Kuphal",
arno_gaylord: "Arno Gaylord",
sam_king: "Sam King",
katelin_upton: "Katelin Upton",
gregoria_feest: "Gregoria Feest",
nicklaus_lemke: "Nicklaus Lemke",
diamond_koch: "Diamond Koch",
darian_hettinger: "Darian Hettinger",
eldon_wunsch: "Eldon Wunsch",
nicole_orn: "Nicole Orn",
jerrod_bruen: "Jerrod Bruen",
marjorie_mclaughlin: "Marjorie McLaughlin",
nicola_grimes: "Nicola Grimes",
mya_mante: "Mya Mante",
griffin_braun: "Griffin Braun",
damian_pfeffer: "Damian Pfeffer",
ruth_lowe: "Ruth Lowe",
nicole_swaniawski: "Nicole Swaniawski",
alaina_tromp: "Alaina Tromp",
dennis_stroman: "Dennis Stroman",
payton_shields: "Payton Shields"
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
  ano2011: 0,
  milujeme_olomouc: 0,
  spd_trikolora_svobodni: 0,
  kducsl: 0,
  ods: 0,
  spolecne: 0,
  proolomouc: 0,
  stan: 0,
  koruna_ceska: 0,
  levice: 0,
  nico_breitenberg: 0,
shanna_west: 0,
aleen_purdy: 0,
freeman_brakus: 0,
candida_carroll: 0,
emery_heaney: 0,
murl_bernhard: 0,
myrna_reynolds: 0,
kip_murphy: 0,
jeremy_boyle: 0,
bertrand_o_conner: 0,
shawna_dickinson: 0,
ashlynn_kris: 0,
vada_kuphal: 0,
arno_gaylord: 0,
sam_king: 0,
katelin_upton: 0,
gregoria_feest: 0,
nicklaus_lemke: 0,
diamond_koch: 0,
darian_hettinger: 0,
eldon_wunsch: 0,
nicole_orn: 0,
jerrod_bruen: 0,
marjorie_mclaughlin: 0,
nicola_grimes: 0,
mya_mante: 0,
griffin_braun: 0,
damian_pfeffer: 0,
ruth_lowe: 0,
nicole_swaniawski: 0,
alaina_tromp: 0,
dennis_stroman: 0,
payton_shields: 0
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
