<script setup>
  const props = defineProps(['value', 'max'])
  const emits = defineEmits(['change'])
</script>

<template>
  <div class="flex">
    <button
      @click="$emit('change', Math.max(0, value - 1))"
      class="h-4 w-4 mt-0.5 rounded-full bg-background border-muted-foreground border relative"
    >
      <span class="leading-4 text-xl text-muted-foreground absolute -top-0.5 -inset-x-0.5 font-light">-</span>
    </button>
    <span class="block text-center mx-1 text-accent text-sm font-semibold">{{ value }}</span>
    <button
      @click="$emit('change', max == null ? value + 1 : Math.min(max, value + 1))"
      class="h-4 w-4 mt-0.5 rounded-full bg-background border-muted-foreground border relative"
    >
      <span class="leading-4 text-xl text-muted-foreground absolute -top-0.5 -inset-x-0.5 font-light">+</span>
    </button>
  </div>
</template>