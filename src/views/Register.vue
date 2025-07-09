<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inscription</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-input v-model="firstName" label="Prénom" label-placement="floating" required />
      <ion-input v-model="lastName" label="Nom" label-placement="floating" required />
      <ion-input v-model="email" label="Email" type="email" label-placement="floating" required />
      <ion-input v-model="password" label="Mot de passe" type="password" label-placement="floating" required />

      <ion-button expand="block" @click="register">S'inscrire</ion-button>
      <ion-text color="danger" v-if="error">
        <p>{{ error }}</p>
      </ion-text>

      <ion-button fill="clear" router-link="/login">Déjà un compte ? Se connecter</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const register = async () => {
  try {
    const response = await fetch('https://server-1-t93s.onrender.com/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value })
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Inscription échouée')
    }

    await response.json()
    await router.push('/login')
  } catch (err) {
    error.value = err.message
  }
}
</script>