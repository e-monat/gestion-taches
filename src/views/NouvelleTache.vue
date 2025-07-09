<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ isEditing ? 'Modifier' : 'Nouvelle' }} Tâche</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-input
          v-model="title"
          label="Titre"
          label-placement="floating"
          required
      />

      <ion-textarea
          v-model="description"
          label="Description"
          label-placement="floating"
          rows="6"
      />

      <ion-item v-if="isEditing">
        <ion-label>Terminée</ion-label>
        <ion-toggle v-model="isDone" />
      </ion-item>

      <ion-button expand="block" @click="submit">
        {{ isEditing ? 'Mettre à jour' : 'Créer' }}
      </ion-button>

      <ion-button
          expand="block"
          color="danger"
          v-if="isEditing"
          @click="deleteTask"
      >
        Supprimer la tâche
      </ion-button>

      <ion-text color="danger" v-if="error">
        <p>{{ error }}</p>
      </ion-text>
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
  IonTextarea,
  IonItem,
  IonLabel,
  IonToggle,
  IonButton,
  IonText
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../state.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const title = ref('')
const description = ref('')
const isDone = ref(false)
const isEditing = ref(false)
const taskId = ref(null)
const error = ref('')

onMounted(() => {
  const task = route.query
  if (task && task.taskId) {
    isEditing.value = true
    title.value = task.title || ''
    description.value = task.description || ''
    isDone.value = task.isDone === 'true' || task.isDone === true
    taskId.value = task.taskId
  }
})

const submit = async () => {
  error.value = ''

  if (!title.value.trim() || !description.value.trim()) {
    error.value = 'Titre et description obligatoires.'
    return
  }

  const payload = {
    userId: userStore.user?.userId,
    title: title.value.trim(),
    description: description.value.trim()
  }

  const endpoint = isEditing.value
      ? 'https://server-1-t93s.onrender.com/api/tasks-management/update-task'
      : 'https://server-1-t93s.onrender.com/api/tasks-management/add-task'

  if (isEditing.value) {
    payload.taskId = taskId.value
    payload.isDone = isDone.value
  }

  try {
    const res = await fetch(endpoint, {
      method: isEditing.value ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Erreur lors de l’enregistrement')
    }

    router.push('/tabs/mes-taches')
  } catch (err) {
    error.value = err.message
  }
}

const deleteTask = async () => {
  const confirmed = confirm('Supprimer cette tâche ?')
  if (!confirmed) return

  try {
    const res = await fetch('https://server-1-t93s.onrender.com/api/tasks-management/remove-task', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userStore.user?.userId,
        taskId: taskId.value
      })
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Erreur lors de la suppression')
    }

    router.push('/tabs/mes-taches')
  } catch (err) {
    error.value = err.message
  }
}
</script>