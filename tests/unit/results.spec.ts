import { expect, test } from 'vitest'
import type { Question } from '../../src/content.config'
import { partyNames, useStore, type UserPosition } from '../../src/store'

const questions: Question[] = [
  {
    id: 'test-1',
    index: 0,
    thesis: 'Test 1',
    category: 'Category',
    answers: [
      { party: 'ano2011', answer: 'nevím' },
      { party: 'spolecne', answer: 'ne' },
    ],
  },
  {
    id: 'test-2',
    index: 1,
    thesis: 'Test 2',
    category: 'Category',
    answers: [
      { party: 'ano2011', answer: 'ano' },
      { party: 'spolecne', answer: 'ne' },
    ],
  },
  {
    id: 'test-3',
    index: 2,
    thesis: 'Test 3',
    category: 'Category',
    answers: [
      { party: 'ano2011', answer: 'ne' },
      { party: 'spolecne', answer: 'nevím' },
    ],
  },
]

test('calculate correct results', async () => {
  const exampleAnswers: Record<string, UserPosition> = {
    'test-1': { answer: 'nevím', weight: 1, questionId: 'test-1' },
    'test-2': { answer: 'ne', weight: 1, questionId: 'test-2' },
    'test-3': { answer: 'nevím', weight: 1, questionId: 'test-3' },
  }

  const { answers, getPartyMatches } = useStore()
  answers.value = exampleAnswers

  const matches = getPartyMatches(questions)
  expect(matches[0].party).toBe(partyNames['spolecne'])
  expect(matches[0].percentage).toBe(67)
  expect(matches[1].party).toBe(partyNames['ano2011'])
  expect(matches[1].percentage).toBe(33)

  matches.slice(2).forEach((match) => {
    expect(match.percentage).toBe(0)
  })

  expect.assertions(matches.length + 2)
})

test('calculate correct results with weights', async () => {
  const exampleAnswers: Record<string, UserPosition> = {
    'test-1': { answer: 'nevím', weight: 2, questionId: 'test-1' },
    'test-2': { answer: 'ne', weight: 1, questionId: 'test-2' },
    'test-3': { answer: 'nevím', weight: 1, questionId: 'test-3' },
  }

  const { answers, getPartyMatches } = useStore()
  answers.value = exampleAnswers

  const matches = getPartyMatches(questions)
  expect(matches[0].party).toBe(partyNames['ano2011'])
  expect(matches[0].percentage).toBe(50)
  expect(matches[1].party).toBe(partyNames['spolecne'])
  expect(matches[1].percentage).toBe(50)

  matches.slice(2).forEach((match) => {
    expect(match.percentage).toBe(0)
  })

  expect.assertions(matches.length + 2)
})
