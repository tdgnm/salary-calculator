<script setup>
  import { Label } from '@/components/ui/label'
  import { cn } from '@/lib/utils'
  import { ref, onMounted } from 'vue'

  const props = defineProps(['id', 'label', 'note', 'value', 'type', 'class', 'focused', 'placeholder'])
  const emits = defineEmits(['input', 'focus', 'blur'])

  const input = ref(null)
  onMounted(() => {
    if (props.focused && input.value) {
      input.value.focus()
    }
  })
</script>

<template>
  <Label class="font-bold text-primary text-sm" :for="id">{{ label }}</Label>
  <input
    ref="input"
    :id="id"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    @input="e => $emit('input', e.target.value)"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    :class="cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      props.class
    )"
  />
  <span v-if="note" class="text-muted-foreground text-sm block">{{ note }}</span>
</template>