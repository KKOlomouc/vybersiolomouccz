import { defineCollection } from 'astro:content'
import { file } from 'astro/loaders'
import { z } from 'astro/zod';

export const answerSchema = z.enum([
  'ano',
  'ne',
  'nevím',
  '/', // unklar
])
export type Answer = z.infer<typeof answerSchema>

export const partySchema = z.enum([
  'ano2011',
  'milujeme_olomouc',
  'spd_trikolora_svobodni',
  'kducsl',
  'ods',
  'spolecne',
  'proolomouc',
  'stan',
  'koruna_ceska',
  'levice',
'nico_breitenberg',
'shanna_west',
'aleen_purdy',
'freeman_brakus',
'candida_carroll',
'emery_heaney',
'murl_bernhard',
'myrna_reynolds',
'kip_murphy',
'jeremy_boyle',
'bertrand_o_conner',
'shawna_dickinson',
'ashlynn_kris',
'vada_kuphal',
'arno_gaylord',
'sam_king',
'katelin_upton',
'gregoria_feest',
'nicklaus_lemke',
'diamond_koch',
'darian_hettinger',
'eldon_wunsch',
'nicole_orn',
'jerrod_bruen',
'marjorie_mclaughlin',
'nicola_grimes',
'mya_mante',
'griffin_braun',
'damian_pfeffer',
'ruth_lowe',
'nicole_swaniawski',
'alaina_tromp',
'dennis_stroman',
'payton_shields'
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
    }),
})
export type PartnersSchema = typeof partners.schema

export const collections = { questions, partners, faq }
