<script>
import axios from 'axios'
import router from '@/router'

import NInput from '@/components/NInput.vue'
import NButton from '@/components/NButton.vue'

export default {
  name: 'UserLogin',
  components: { NInput, NButton },
  data: () => {
    return {
      formItems: [
        { value: '', type: 'email', name: 'email', placeholder: 'E-mail Address', required: true },
        { value: '', type: 'password', name: 'password', placeholder: 'Password', required: true }
      ],
      isLoading: false
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true

        const payload = {}

        this.formItems.map((item) => {
          payload[item.name] = item.value
        })

        const response = await axios.post('http://localhost:8000/api/v1/auth/login', payload)

        if (response.status === 200) {
          await localStorage.setItem('token', response.data.token)
          router.push('/')
        }

        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log({ error })
      }
    }
  }
}
</script>

<template>
  <div class="login">
    <form class="login__form" @submit.prevent="onSubmit">
      <span class="login__title">Login</span>
      <n-input v-for="item in formItems" :key="item.name" v-model="item.value" v-bind="item" />
      <n-button text="Login" :disabled="isLoading" />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #141b2e;
  padding: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  &__title {
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
    margin-bottom: 32px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    width: 400px;
  }
}
</style>
