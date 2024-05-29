<script setup>
  import FamilyMemberTabs from './FamilyMemberTabs/FamilyMemberTabs.vue'
  import SalaryCalculator from './SalaryCalculator/SalaryCalculator.vue'
  import EmptyCalculator from './SalaryCalculator/EmptyCalculator.vue'
  import HouseholdSummary from './HouseholdSummary/HouseholdSummary.vue'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const users = computed(() => store.state.users)
</script>

<template>
  <header>
    <FamilyMemberTabs />
  </header>
  <main>
    <SalaryCalculator v-if="users.length > 0" />
    <EmptyCalculator v-else />
    <HouseholdSummary />
  </main>
</template>