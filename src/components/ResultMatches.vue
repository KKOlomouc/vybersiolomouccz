<script setup lang="ts">
defineProps<{
  partyMatches: { party: string; score: number; percentage: number }[]
}>()
</script>

<template>
  <div class="bg-white/75 p-4 backdrop-blur md:p-8">
    <h2>Čí odpovědi se nejvíce shodují s Vašimi preferencemi?</h2>
    <div class="mt-6">
      <dl class="mt-2 grid items-center gap-x-4 gap-y-8">
        <template v-for="({ party, percentage }, index) in partyMatches" :key="party">
          <dt class="font-medium whitespace-nowrap md:text-xl">
            {{index + 1}}. {{ party }}
          </dt>
          <dd class="flex items-center space-x-4">
            <div class="flex-1">
              <div class="overflow-hidden rounded-full bg-white">
                <div
                  class="progress-result h-3"
                  v-bind:class="{
                    'bg-primary-red': (percentage < 33),
                    'bg-primary-orange': (percentage >= 33 && percentage < 66),
                    'bg-primary-green': (percentage >= 66),
                  }"
                  :style="{
                    width: `${percentage}%`,
                  }"
                />
              </div>
            </div>
            <span>{{ percentage }}%</span>
          </dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/style.css";

dl {
  grid-template-columns: min-content auto;
}

.progress-result {
  transform-origin: left;
}

@media (prefers-reduced-motion: no-preference) {
  .progress-result {
    animation: result-bar 1s cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes result-bar {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}
</style>
