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
        <ion-item v-for="task in myTasks" :key="task.taskId" button @click="edit(task)">
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
import { useRouter } from 'vue-router'
import { useUserStore } from '../../state'
import {onMounted, ref, computed, onActivated} from 'vue'
import { addOutline } from 'ionicons/icons'

const router = useRouter()
const userStore = useUserStore()
const tasks = ref([])

onMounted(fetchTasks)
onActivated(fetchTasks)

async function fetchTasks() {
  const res = await fetch(`https://server-1-t93s.onrender.com/api/tasks-management/get-tasks/${userStore.user.userId}`)
  const data = await res.json()
  tasks.value = data.tasks || []
}

const myTasks = computed(() => tasks.value.filter(t => t.isOwner))

function toggleDone(task) {
  fetch('https://server-1-t93s.onrender.com/api/tasks-management/update-task', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userStore.user.userId,
      taskId: task.taskId,
      isDone: !task.isDone
    })
  }).then(fetchTasks)
}

function formatDate(d) {
  return new Date(d).toLocaleString()
}

function create() {
  window.location.href = '/nouvelle-tache'
}

function edit(task) {
  router.push({
    path: '/nouvelle-tache',
    query: {
      taskId: task.taskId,
      title: task.title,
      description: task.description,
      isDone: task.isDone
    }
  })
}

function logout() {
  userStore.clearUser()
  router.push('/login')
}
</script>