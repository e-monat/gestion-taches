<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Connexion</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-input
          v-model="email"
          label="Email"
          type="email"
          label-placement="floating"
          required
      />
      <ion-input
          v-model="password"
          label="Mot de passe"
          type="password"
          label-placement="floating"
          required
      />

      <ion-button expand="block" @click="login">Se connecter</ion-button>

      <ion-text color="danger" v-if="error">
        <p>{{ error }}</p>
      </ion-text>

      <ion-button fill="clear" router-link="/register">Créer un compte</ion-button>

      <ion-toast
          :is-open="showToast"
          message="Connexion réussie!"
          duration="2000"
          color="success"
          @didDismiss="showToast = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../state.js'

const email = ref('')
const password = ref('')
const error = ref('')
const showToast = ref(false)
const router = useRouter()
const userStore = useUserStore()

const login = async () => {
  try {
    const res = await fetch('https://server-1-t93s.onrender.com/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Connexion échouée')
    }

    const user = await res.json()
    userStore.setUser(user)

    showToast.value = true
    setTimeout(() => {
      router.push('/tabs/mes-taches')
    }, 1000)
  } catch (err) {
    error.value = err.message
  }
}
</script>