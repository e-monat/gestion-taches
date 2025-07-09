<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Autres</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="task in otherTasks" :key="task.taskId">
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
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../../state'

const userStore = useUserStore()
const tasks = ref([])

onMounted(fetchTasks)

async function fetchTasks() {
  const res = await fetch(`https://server-1-t93s.onrender.com/api/tasks-management/get-tasks/${userStore.user.userId}`)
  const data = await res.json()
  tasks.value = data.tasks || []
}

const otherTasks = computed(() => tasks.value.filter(t => !t.isOwner))

function formatDate(d) {
  return new Date(d).toLocaleString()
}
</script>