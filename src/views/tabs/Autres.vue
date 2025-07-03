<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Autres</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="task in state.otherTasks" :key="task.id">
          <ion-label>
            <h2>{{ task.title }}</h2>
            <p>{{ task.description }}</p>
            <small>{{ formatDate(task.date) }} - {{ task.firstName }} {{ task.lastName }}</small>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { state } from '../../state'

function formatDate(d) {
  return new Date(d).toLocaleString()
}
</script>
