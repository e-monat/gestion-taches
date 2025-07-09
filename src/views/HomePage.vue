<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mes Tâches</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list v-if="tasks.length">
        <ion-item
            v-for="task in sortedTasks"
            :key="task.taskId"
            @click="goToEdit(task)"
        >
          <ion-label>
            <h2>{{ task.title }}</h2>
            <p>{{ task.description }}</p>
            <small>
              {{ new Date(task.date).toLocaleString() }} -
              <span v-if="!task.isOwner">
                Partagée par {{ task.firstName }} {{ task.lastName }}
              </span>
              <span v-else>
                (Moi)
              </span>
            </small>
          </ion-label>
          <ion-checkbox slot="end" :checked="task.isDone" disabled />
        </ion-item>
      </ion-list>

      <ion-text v-else>
        <p>Aucune tâche trouvée.</p>
      </ion-text>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="goToNew">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
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
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonText,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../state.js'
import { add } from 'ionicons/icons'

const router = useRouter()
const userStore = useUserStore()
const tasks = ref([])

const fetchTasks = async () => {
  const userId = userStore.user?.userId
  if (!userId) return

  const res = await fetch(`https://server-1-t93s.onrender.com/api/tasks-management/get-tasks/${userId}`)
  const data = await res.json()
  tasks.value = data.tasks || []
}

onMounted(fetchTasks)

const sortedTasks = computed(() =>
    tasks.value.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
)

const goToNew = () => {
  router.push('/tabs/new')
}

const goToEdit = (task) => {
  router.push({ path: '/tabs/new', query: task })
}
</script>