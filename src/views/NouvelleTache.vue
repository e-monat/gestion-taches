<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ isEditing ? 'Modifier' : 'Nouvelle' }} tâche</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-input v-model="title" label="Titre" label-placement="floating" required />
      <ion-textarea v-model="description" label="Description" label-placement="floating" rows="6" />

      <ion-item v-if="isEditing">
        <ion-label>Terminée</ion-label>
        <ion-toggle v-model="isDone" />
      </ion-item>

      <ion-button expand="block" @click="submit">
        {{ isEditing ? 'Mettre à jour' : 'Créer' }}
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { state } from '../state'

const route = useRoute()
const router = useRouter()

const title = ref('')
const description = ref('')
const isDone = ref(false)
const isEditing = ref(false)
const taskId = ref(null)

onMounted(() => {
  const id = route.query.id
  if (id) {
    const task = state.tasks.find(t => t.id === id)
    if (task) {
      title.value = task.title
      description.value = task.description
      isDone.value = task.isDone
      taskId.value = task.id
      isEditing.value = true
    }
  }
})

async function submit() {
  if (!title.value.trim()) return

  if (isEditing.value && taskId.value) {
    await state.updateTask(taskId.value, {
      title: title.value,
      description: description.value,
      isDone: isDone.value
    })
  } else {
    await state.createTask(title.value, description.value)
  }

  router.push('/tabs/mes-taches')
}
</script>
