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
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonToast
} from '@ionic/vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { state } from '../state'

const email = ref('')
const password = ref('')
const error = ref('')
const showToast = ref(false)
const router = useRouter()

async function login() {
  console.log('Tentative de connexion...')
  error.value = ''
  if (!email.value || !password.value) {
    error.value = "Champs requis"
    return
  }
  try {
    await state.signIn(email.value, password.value)
    await state.loadTasks()
    showToast.value = true
    setTimeout(() => {
      router.push('/tabs/mes-taches')
    }, 2000)
  } catch (err) {
    console.error(err)
    error.value = "Email ou mot de passe invalide"
  }
}
</script>

