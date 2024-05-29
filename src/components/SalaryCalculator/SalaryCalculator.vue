<script setup>
  import { Switch } from '@/components/ui/switch'
  import { Button } from '@/components/ui/button'
  import { Slider } from '@/components/ui/slider'
  import { Label } from '@/components/ui/label'
  import LabelInput from './components/LabelInput.vue'
  import NumberInput from './components/NumberInput.vue'
  import DateModal from './components/DateModal.vue'
  import Eligible from './components/Eligible.vue'
  import { thousandSep } from '@/utils/formatStrings'
  import { calculateSalary } from '@/utils/calculator'
  import { OhVueIcon } from 'oh-vue-icons'
  import { RiDeleteBinLine } from 'oh-vue-icons/icons'
  import { ref, computed, watch } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const idx = computed(() => store.state.idx)
  const users = computed(() => store.state.users)
  const setProperty = (name, value) => store.commit('setProperty', [name, value])
  const removeUser = () => store.commit('removeUser')

  const salaryInputFocus = ref(false)
  const salaryKey = ref(0)
  const salaryFocus = ref(false)
  const sliderValue = computed({
    get() {
      return [Math.floor(9_999_999_999 * Math.pow((1 / 9_999_999_999) * users.value[idx.value]?.salary, 1 / 6))]
    },
    set(value) {
      value = Math.floor(9_999_999_999 * Math.pow((1 / 9_999_999_999) * value[0], 6))
      setProperty('salary', value)
    },
  })
  const salaryStr = computed({
    get() {
      if (salaryInputFocus.value)
        return users.value[idx.value]?.salary ?? ''
      return users.value[idx.value]?.salary == null ? '' : thousandSep(users.value[idx.value]?.salary, '.') + ' Ft'
    },
    set(value) {
      if (salaryInputFocus.value) {
        const filteredValue = value.replace(/\D/g, '').replace(/^0(\d)/, '$1').substring(0, 10)
        if (value !== filteredValue) {
          salaryFocus.value = true
          salaryKey.value = (salaryKey.value + 1) % 10
        } else {
          salaryFocus.value = false
        }
        setProperty('salary', +filteredValue)
      }
    },
  })

  watch(users.value, () => {
    setProperty('calculated', calculateSalary(users.value[idx.value]))
  })

  const handleDateInput = value => {
    const plusTwoY = new Date(value)
    plusTwoY.setFullYear(plusTwoY.getFullYear() + 2)
    const current = new Date()
    const eligible = current <= plusTwoY
    setProperty('date', +value)
    setProperty('eligible', eligible)
  }
</script>

<template>
  <div class="bg-muted rounded-xl p-5 h-screen relative">
    <div class="flex justify-between">
      <div class="grid mr-2">
        <h1 class="uppercase font-bold text-primary text-xl ellipsis">
          {{ users[idx]?.name === '' ? 'Bér kiszámítása' : `${users[idx]?.name} bérének kiszámítása` }}
        </h1>
      </div>
      <Button @click="removeUser" class="h-8 w-6 leading-6 text-primary hover:text-primary bg-background hover:bg-background">
        <div>
          <OhVueIcon name="ri-delete-bin-line" scale="1.3" />
        </div>
      </Button>
    </div>

    <div class="w-[70%] mt-2">
      <LabelInput 
        id="name"
        :value="users[idx]?.name"
        label="Családtag neve"
        type="text"
        note="Add meg a családtag nevét!"
        @input="value => setProperty('name', value)"
      />
      <LabelInput
        :focused="salaryFocus"
        :key="salaryKey"
        id="salary"
        label="Bruttó bér"
        type="text"
        note="Add meg a bruttó béredet!"
        :value="salaryStr"
        @focus="salaryInputFocus = true"
        @blur="salaryInputFocus = false"
        @input="value => salaryStr = value"
      />

      <Slider
        class="mt-2"
        :defaultValue="[0]"
        :max="9_999_999_999"
        :step="1"
        v-model="sliderValue"
      />

      <div class="flex gap-2 justify-center mb-8 mt-2">
        <Button
          @click="setProperty('salary', Math.min(Math.floor(users[idx]?.salary * 0.99), 9_999_999_999))"
          class="h-9 w-10 bg-muted-foreground text-background hover:bg-muted-foreground hover:text-background"
        >
          -1%
        </Button>
        <Button
          @click="setProperty('salary', Math.min(Math.floor(users[idx]?.salary * 0.95), 9_999_999_999))"
          class="h-9 w-10 bg-muted-foreground text-background hover:bg-muted-foreground hover:text-background"
        >
          -5%
        </Button>
        <Button
          @click="setProperty('salary', Math.min(Math.floor(users[idx]?.salary * 1.01), 9_999_999_999))"
          class="h-9 w-10 bg-muted-foreground text-background hover:bg-muted-foreground hover:text-background"
        >
          +1%
        </Button>
        <Button
          @click="setProperty('salary', Math.min(Math.floor(users[idx]?.salary * 1.05), 9_999_999_999))"
          class="h-9 w-10 bg-muted-foreground text-background hover:bg-muted-foreground hover:text-background"
        >
          +5%
        </Button>
      </div>
    </div>

    <h2 class="uppercase font-bold text-primary">Kedvezmények</h2>
    <ul>
      <li>
        <Switch
          id="under25"
          :checked="users[idx]?.under25"
          @update:checked="value => setProperty('under25', value)"
          class="translate-y-1 mr-2"
        />
        <Label for="under25">25 év alattiak SZJA mentessége</Label>
      </li>
      <li>
        <Switch
          id="married"
          :checked="users[idx]?.married"
          @update:checked="value => {
              setProperty('married', value)
              setProperty('date', value ? users[idx].date : null)
              setProperty('eligible', value ? users[idx].eligible : false)
          }"
          class="translate-y-1 mr-2"
        />
        <Label for="married">Friss házasok kedvezménye</Label>
        <div v-if="users[idx]?.married" class="inline-block">
          <DateModal input-id="date" @submit="value => handleDateInput(value)" />
          <Eligible />
        </div>
      </li>
      <li>
        <Switch
          id="personal"
          :checked="users[idx]?.personal"
          @update:checked="value => setProperty('personal', value)"
          class="translate-y-1 mr-2"
        />
        <Label for="personal">Személyi adókedvezmény</Label>
      </li>
      <li>
        <Switch
          id="family"
          :checked="users[idx]?.family"
          @update:checked="value => {
            setProperty('family', value)
            setProperty('sustained', value ? users[idx].sustained : 0)
            setProperty('beneficiary', value ? users[idx].beneficiary : 0)
          }"
          class="translate-y-1 mr-2"
        />
        <Label for="family">Családi adókedvezmény</Label>
        <div v-if="users[idx]?.family" class="flex mt-1">
          <NumberInput
            :value="users[idx]?.sustained"
            @change="value => {
              setProperty('sustained', value)
              setProperty('beneficiary', Math.min(users[idx]?.beneficiary, value))
            }"
          />
          <span class="text-sm mx-2">Eltartott, ebből kedvezményezett:</span>
          <NumberInput
            :max="Math.min(3, users[idx]?.sustained)"
            :value="Math.min(users[idx]?.beneficiary, users[idx]?.sustained)"
            @change="value => setProperty('beneficiary', value)"
          />
        </div>
      </li>
    </ul>

    <div class="absolute bottom-5 left-[50%] -translate-x-[50%]">
      <h3 class="w-[100%] text-center font-bold text-xl mb-3">Számított nettó bér:</h3>
      <div class="flex justify-center px-auto h-16 w-40 text-xl mx-auto rounded-lg bg-accent">
        <span class="text-background my-auto">
          {{ users[idx]?.calculated == null ? '—' : thousandSep(users[idx]?.calculated, '.') + ' Ft' }}
        </span>
      </div>
    </div>
  </div>
</template>