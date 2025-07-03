<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inscription</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-input
          v-model="firstName"
          label="Prénom"
          label-placement="floating"
          required
      />
      <ion-input
          v-model="lastName"
          label="Nom"
          label-placement="floating"
          required
      />
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

      <ion-button expand="block" @click="register">S'inscrire</ion-button>
      <ion-text color="danger" v-if="error">
        <p>{{ error }}</p>
      </ion-text>

      <ion-button fill="clear" router-link="/login">Déjà un compte ?</ion-button>

      <ion-toast
          :is-open="showToast"
          message="Compte créé avec succès!"
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

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const showToast = ref(false)

const router = useRouter()

async function register() {
  error.value = ''
  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs'
    return
  }
  try {
    await state.signUp(firstName.value, lastName.value, email.value, password.value)
    await state.loadTasks()
    showToast.value = true
    setTimeout(() => {
      router.push('/tabs/mes-taches')
    }, 2000)
  } catch (err) {
    error.value = "Erreur lors de l'inscription"
  }
}
</script>

