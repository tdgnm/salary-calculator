<script setup>
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useToast } from '@/components/ui/toast/use-toast'
  import { Button } from '@/components/ui/button'
  import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogTrigger,
    DialogFooter
  } from '@/components/ui/dialog'
  import { VisuallyHidden } from 'radix-vue'
  import LabelInput from './LabelInput.vue'
  import { dateToString } from '@/utils/formatStrings'

  const props = defineProps(['input-id'])
  const emits = defineEmits(['submit'])

  const { toast } = useToast()
  const store = useStore()
  const idx = computed(() => store.state.idx)
  const users = computed(() => store.state.users)

  const date = ref('')
  const dateKey = ref(0)
  const dateFocus = ref(false)

  const handleDateInput = val => {
    const value = val.replace(/[^\d/]/g, '')
      .replace(/^0|^(\d{4}\/)[^01]|^(\d{4}\/0)0|^(\d{4}\/1)[^0-2]/, '$1$2$3')
      .replace(/^(\d{4}\/\d{2}\/)[^0-3]|^(\d{4}\/\d{2}\/0)0|^(\d{4}\/\d{2}\/3)[^01]/, '$1$2$3')
      .replace(/^\/|^(\d)\/|^(\d{2})\/|^(\d{3})\//, '$1$2$3')
      .replace(/^(\d{4}\/)\/|^(\d{4}\/\d)\//, '$1$2')
      .replace(/^(\d{4}\/\d{2}\/)\/|^(\d{4}\/\d{2}\/\d)\//, '$1$2')
      .replace(/^(.{4})\d/, '$1')
      .replace(/^(.{4}\/.{2})\d/, '$1')
      .replace(/^(.{4}\/.{2}\/.{2})\d/, '$1')
      .substring(0, 10)

    if (val === value
      && (value === date.value.substring(0, date.value.length - 1)
      || value.substring(0, value.length - 1) === date.value)) {
      date.value = value
      dateFocus.value = false
    }  else {
      dateKey.value = (dateKey.value + 1) % 10
      dateFocus.value = true
    } 
  }

  const handleSubmit = () => {
    let dt = new Date(date.value)
    if (dt != null && (dateToString(dt) !== date.value || date.value.length !== 10 || new Date() < dt)) {
      dt = null
    }

    if (!dt) {
      toast({
        title: "Helytelen dátum!",
        description: "Dátum megadása sikertelen, próbáld újra",
      })
    } else {
      emits('submit', dt)
    }
    date.value = ''
  }
</script>

<template>
  <Dialog>
    <DialogTrigger class="leading-5 h-5 -translate-y-0.4 ml-2 bg-accent hover:bg-accent font-semibold text-background text-sm rounded-md px-4">
      {{ users[idx]?.date == null ? 'Dátum hozzáadása' : 'Dátum módosítása' }}
    </DialogTrigger>
    <DialogContent>
      <VisuallyHidden as-child>
        <DialogTitle>
          Dátum megadása
        </DialogTitle>
      </VisuallyHidden>
      <DialogHeader>
        <DialogDescription>
          A kedvezmény először a házasságkötést követő hónapra vehető igénybe
          és a házassági életközösség alatt legfeljebb 24 hónapon keresztül jár.
        </DialogDescription>
      </DialogHeader>
      <LabelInput
        :focused="dateFocus"
        :key="dateKey"
        :id="input-id"
        label="Add meg a házasságkötés dátumát:"
        type="text"
        placeholder="YYYY/MM/DD"
        note="Például: 2000/10/25"
        :value="date"
        @input="handleDateInput"
      />
      <DialogFooter>
        <DialogClose as-child>
          <Button type="submit" @click="handleSubmit">Mentés</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>