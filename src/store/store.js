import { createStore } from 'vuex'

export default createStore({
  state: {
    idx: 0,
    users: []
  },
  mutations: {
    addUser(state) {
      state.users.push({
          name: '',
          salary: null,
          calculated: null,
          under25: false,
          married: false,
          date: null,
          eligible: false,
          personal: false,
          family: false,
          sustained: 0,
          beneficiary: 0,
      })
      state.idx = state.users.length - 1
    },
    removeUser(state) {
      state.idx = Math.min(state.idx, state.users.length - 2)
      state.users.pop()
    },
    setIdx(state, value) {
      state.idx = value
    },
    setProperty(state, [name, value]) {
      state.users[state.idx][name] = value
    },
    initState(state) {
      const u = localStorage.getItem('users')
      state.users = u ? JSON.parse(u) : []
      const i = localStorage.getItem('idx')
      state.idx = i ? JSON.parse(i) : 0
    },
  }
})