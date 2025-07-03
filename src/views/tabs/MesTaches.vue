<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mes tâches</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="logout">Déconnexion</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="task in state.myTasks" :key="task.id" button @click="edit(task)">
          <ion-label>
            <h2>{{ task.title }}</h2>
            <p>{{ task.description }}</p>
            <small>{{ formatDate(task.date) }}</small>
          </ion-label>
          <ion-checkbox
              slot="end"
              :checked="task.isDone"
              @ionChange="toggleDone(task)"
              @click.stop
          />
        </ion-item>

      </ion-list>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="create">
          <ion-icon :icon="addOutline" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { state } from '../../state'
import { useRouter } from 'vue-router'
import { addOutline } from 'ionicons/icons'

const router = useRouter()

function create() {
  router.push('/nouvelle-tache')
}

function edit(task) {
  router.push({ path: '/nouvelle-tache', query: { id: task.id } })
}

function toggleDone(task) {
  state.updateTask(task.id, { isDone: !task.isDone })
}

function formatDate(d) {
  return new Date(d).toLocaleString()
}

function logout() {
  state.signOut()
  router.push('/login')
}
</script>
