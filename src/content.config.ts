import { defineCollection } from 'astro:content'
import { file } from 'astro/loaders'
import { z } from 'astro/zod';

export const answerSchema = z.enum([
  'ano',
  'ne',
  'nevim',
  '/', // unklar
])
export type Answer = z.infer<typeof answerSchema>

export const partySchema = z.enum([
'matous_pelikan',
'josef_kastil',
'otakar_bacak',
'ales_prstek',
'miroslav_janosek',
'lucie_tungul',
'roman_koutek',
'robert_runtak',
'zdenek_cernohouz',
'kristina_machacikova',
'zdenek_zak',
'jakub_jurka',
'rostislav_hainc',
'vaclav_huttel',
'antonin_kropacek',
'robert_pokorny',
'marek_zelenka',
'michal_langer',
'pavel_grasse'
])
export type Party = z.infer<typeof partySchema>

export const positionSchema = z.object({
  party: partySchema,
  answer: answerSchema,
  comment: z.string().optional(),
})
export type Position = z.infer<typeof positionSchema>

const questionSchema = z.object({
  id: z.string(),
  index: z.number(),
  thesis: z.string(),
  thesisContext: z.string(),
  category: z.string(),
  answers: z.array(positionSchema),
})
export type Question = z.infer<typeof questionSchema>

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
})
export type FAQItem = z.infer<typeof faqItemSchema>

const questions = defineCollection({
  loader: file('src/data/theses.yaml'),
  schema: questionSchema,
})

const faq = defineCollection({
  loader: file('src/data/faq.yaml'),
  schema: faqItemSchema,
})

const partners = defineCollection({
  loader: file('src/data/partners.yaml'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      logo: image(),
      link: z.url().optional(),
    }),
})
export type PartnersSchema = typeof partners.schema

export const collections = { questions, partners, faq }
