<script setup>
  import { cn } from '@/lib/utils'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const idx = computed(() => store.state.idx)
  const users = computed(() => store.state.users)
</script>

<template>
  <div
    v-if="users[idx].date"
    :class="cn(users[idx].eligible ? 'bg-emerald-500' : ' bg-red-500', 'inline-block leading-5 h-5 w-28 text-center -translate-y-0.4 ml-2 font-semibold text-background text-sm rounded-md')"
  >
    {{ users[idx].eligible ? 'Jogosult' : 'Nem jogosult' }}
  </div>
</template>