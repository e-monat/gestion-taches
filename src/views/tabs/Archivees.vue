<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Archivées</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
            v-for="task in state.archivedTasks"
            :key="task.id"
            lines="full"
        >
          <ion-label>
            <h2>{{ task.title }}</h2>
            <p>{{ task.description }}</p>
            <small>{{ formatDate(task.date) }} - {{ getOwnerName(task.ownerId) }}</small>
          </ion-label>
          <ion-checkbox
              slot="end"
              :checked="task.isDone"
              :disabled="task.ownerId !== state.user.userId"
              @ionChange="toggleArchived(task)"
          />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { state } from '../../state'

function toggleArchived(task) {
  if (task.ownerId !== state.user.userId) {
    console.warn("Vous ne pouvez pas modifier cette tache")
    return
  }
  state.updateTask(task.id, { isDone: !task.isDone })
}

function getOwnerName(ownerId) {
  const t = state.tasks.find(t => t.ownerId === ownerId)
  if (!t) return ''
  return t.firstName + ' ' + t.lastName
}

function formatDate(d) {
  return new Date(d).toLocaleString()
}
</script>
