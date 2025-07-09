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
            v-for="task in archivedTasks"
            :key="task.taskId"
            lines="full"
        >
          <ion-label>
            <h2>{{ task.title }}</h2>
            <p>{{ task.description }}</p>
            <small>{{ formatDate(task.date) }} - {{ getOwnerName(task) }}</small>
          </ion-label>
          <ion-checkbox
              slot="end"
              :checked="task.isDone"
              :disabled="!task.isOwner"
              @ionChange="toggleArchived(task)"
          />
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

const archivedTasks = computed(() => tasks.value.filter(t => t.isDone))

function toggleArchived(task) {
  if (!task.isOwner) return

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

function getOwnerName(task) {
  return task.isOwner ? 'Moi' : `${task.firstName} ${task.lastName}`
}

function formatDate(d) {
  return new Date(d).toLocaleString()
}
</script>