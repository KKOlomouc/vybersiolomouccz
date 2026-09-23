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
robert_runtak:"Robert Runták (ProOlomouc)",
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
renata_konecna: 0,
radek_petrik: 0,
miroslava_ferancova: 0,
miroslav_tichy: 0,
tomas_sykora: 0,
jaromir_lostak: 0,
magdalena_vaneckova: 0,
jan_vasir: 0,
ivana_vyletalova: 0,
jan_holpuch: 0,
pavel_frysak: 0,
jaroslav_kratky: 0,
petra_bastanova: 0,
robert_srejma: 0,
eva_machova: 0,
josef_suchanek: 0,
karel_mesicek: 0,
pavel_andrs: 0,
pavel_jelinek: 0,
martin_jirotka: 0,
bohuslav_coufal: 0,
david_alt: 0,
katerina_dobrozemska: 0,
eva_lebedova: 0,
tomas_pejpek: 0,
jan_rytir: 0
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
