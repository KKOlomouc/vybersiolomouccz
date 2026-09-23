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
matous_pelikan:"Matouš Pelikán (KDU-ČSL)",
josef_kastil:"Josef Kaštil (ODS)",
otakar_bacak:"Otakar Bačák (spOLečně)",
ales_prstek:"Aleš Prstek (ProOlomouc)",
miroslav_janosek:"Miroslav Janošek",
lucie_tungul:"Lucie Tungul (Milujeme Olomouc)",
roman_koutek:"Roman Koutek (Milujeme Olomouc)",
robert_runtak:"Robert Runták (ProOlomouc)",
zdenek_cernohouz:"Zdeněk Černohouz (ODSú",
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
renata_konecna:"Renata Konečná (KDU-ČSL)",
radek_petrik:"Radek Petřík (KDU-ČSL)",
miroslava_ferancova:"Miroslava Ferancová (ANO 2011)",
miroslav_tichy:"Miroslav Tichý (ANO 2011)",
tomas_sykora:"Tomáš Sýkora (ANO 2011)",
jaromir_lostak:"Jaromír Lošťák (ANO 2011)",
magdalena_vaneckova:"Magdaléna Vanečková (ANO 2011)",
jan_vasir:"Jan Vašíř (ODS)",
ivana_vyletalova:"Ivana Vyleťalová (ODS)",
jan_holpuch:"Jan Holpuch (ODS)",
pavel_frysak:"Pavel Fryšák (spOLečně)",
jaroslav_kratky:"Jaroslav Krátký (spOLečně)",
petra_bastanova:"Petra Baštanová (STAN)",
robert_srejma:"Robert Šrejma (STAN)",
eva_machova:"Eva Machová (STAN)",
josef_suchanek:"Josef Suchánek (STAN)",
karel_mesicek:"Karel Měsíček (KČ)",
pavel_andrs:"Pavel Andrš (KČ)",
pavel_jelinek:"Pavel Jelínek (SPD/Trikolora/Svobodní)",
martin_jirotka:"Martin Jirotka (SPD/Trikolora/Svobodní)",
bohuslav_coufal:"Bohuslav Coufal (SPD/Trikolora/Svobodní)",
david_alt:"David Alt (SPD/Trikolora/Svobodní)",
katerina_dobrozemska:"Kateřina Dobrozemská (ProOlomouc)",
eva_lebedova:"Eva Lebedová (ProOlomouc)",
tomas_pejpek:"Tomáš Pejpek (ProOlomouc)",
jan_rytir:"Jan Rytíř (LOL)",
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
