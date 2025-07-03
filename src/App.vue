<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue' // ← Ceci est obligatoire
import { onMounted } from 'vue'
import { state } from './state'

onMounted(() => {
  state.listenAuthState()
})
</script>

<style>

</style>
