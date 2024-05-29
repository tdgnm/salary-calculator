<script setup>
  import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
  import { Button } from '@/components/ui/button'
  import { computed, onUpdated, onMounted, onUnmounted } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const idx = computed(() => store.state.idx)
  const users = computed(() => store.state.users)
  const setIdx = (value) => store.commit('setIdx', value)
  const addUser = () => store.commit('addUser')

  const addScrollPadding = () => {
    const element = document.querySelector('#scp')
    if (element.scrollWidth > element.clientWidth) {
      element.classList.add('scroll-padding')
    } else {
      element.classList.remove('scroll-padding')
    }
  }

  onMounted(() => {
    window.addEventListener('resize', addScrollPadding)
    addScrollPadding()
  })
  onUnmounted(() => {
    window.removeEventListener('resize', addScrollPadding)
  })

  onUpdated(() => {
    const tabs = document.querySelectorAll('button[role=tab]')
    if (idx.value === users.value.length - 1) {
      tabs.forEach((e, i) => {
        if (i < tabs.length - 1) {
          e.setAttribute('data-state', 'inactive')
          e.setAttribute('data-active', 'false')
          e.setAttribute('aria-selected', 'false')
          e.setAttribute('tabindex', '-1')
        } else {
          e.setAttribute('data-state', 'active')
          e.setAttribute('data-active', 'true')
          e.setAttribute('aria-selected', 'true')
          e.setAttribute('tabindex', '0')
        }
      })
    } else {
      tabs[tabs.length - 1].setAttribute('data-state', 'inactive')
      tabs[tabs.length - 1].setAttribute('data-active', 'false')
      tabs[tabs.length - 1].setAttribute('aria-selected', 'false')
      tabs[tabs.length - 1].setAttribute('tabindex', '-1')
    }
  })
</script>

<template>
  <div class="relative">
    <div class="blocker"></div>
    <div class="blocker"></div>
    <div id="scp" class="flex gap-2 mx-3 mt-3 overflow-y-auto rounded-md">
      <Tabs v-if="users.length > 0" :key="idx" :default-value="idx">
        <TabsList>
          <TabsTrigger v-for="(user, i) in users" :key="i" :value="i" class="max-w-40" @click="setIdx(i)">
            <span class="ellipsis">{{ user.name === '' ? '—' : user.name }}</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Button
        @click="addUser"
        class="bg-secondary text-muted-foreground hover:bg-secondary hover:text-muted-foreground font-bold"
      >
        <span class="scale-150 react -translate-y-0.5">+</span>
      </Button>
    </div>
  </div>
</template>