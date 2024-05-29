<script setup>
  import Toaster from '@/components/ui/toast/Toaster.vue'
  import HouseholdSalaryCalculator from './components/HouseholdSalaryCalculator.vue'
  import { onBeforeMount } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  onBeforeMount(() => store.commit('initState'))
</script>

<template>
  <HouseholdSalaryCalculator />
  <Toaster />
</template>
