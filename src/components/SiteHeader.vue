<script setup lang="ts">
import { nextTick } from 'vue'
import { useStore, Stage } from '../store'
import logo from "../assets/logos/vso-logo.webp";

const props = defineProps<{ isApp: boolean }>()

const { currentStage, viewTransition } = useStore()

const toIntro = (e: Event) => {
  if (props.isApp) {
    e.preventDefault()
    viewTransition.value = 'slide-back'
    nextTick(() => {
      currentStage.value = Stage.Intro
    })
  }
}
</script>

<template>
  <header class="z-10 container mx-auto px-4 py-12">
    <a href="/" @click="toIntro">
      <h1 class="mb-3 text-5xl font-bold md:text-8xl">
        <img class="aspect-auto object-cover" :src="logo.src" alt="Logo webu Vyber si Olomouc" width="528"></h1>
    </a>
    <span class="text-xl font-medium text-red-500">
      Volby do zastupitelstva města 2026
    </span>
  </header>
</template>
