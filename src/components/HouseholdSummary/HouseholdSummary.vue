<script setup>
  import { thousandSep } from '@/utils/formatStrings'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const users = computed(() => store.state.users)

  const sum = computed(() => {
    if (users.value.every(e => e.calculated == null))
      return '—'
    return thousandSep(users.value.reduce((acc, e) => acc + (+e.calculated), 0), '.') + ' Ft'
  })
</script>

<template>
  <div  class="bg-muted rounded-xl p-5">
    <h2 class="w-[100%] text-center font-bold text-xl mt-16 mb-8">Háztartás összesített jövedelme</h2>
    <table class="w-[90%] mx-auto bg-background border-collapse table-fixed">
      <thead>
        <tr>
          <th class="border-2 border-muted text-start px-2">Családtag</th>
          <th class="border-2 border-muted text-start px-2">Nettó bér</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in users" :key="i">
          <td class="border-2 border-muted px-2 ellipsis">{{ user.name === '' ? '—' : user.name }}</td>
          <td class="border-2 border-muted px-2">{{ user.calculated == null ? '—' : thousandSep(user.calculated, '.') + ' Ft' }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="border-2 border-muted px-2">Összesen:</td>
          <td class="border-2 border-muted px-2">{{ sum }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>