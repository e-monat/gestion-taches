<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="mes-taches" href="/tabs/mes-taches">
          <ion-icon :icon="checkmarkOutline" />
          <ion-label>Mes tâches</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="autres" href="/tabs/autres">
          <ion-icon :icon="peopleOutline" />
          <ion-label>Autres</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="archivees" href="/tabs/archivees">
          <ion-icon :icon="archiveOutline" />
          <ion-label>Archivées</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue'
import { checkmarkOutline, peopleOutline, archiveOutline } from 'ionicons/icons'
</script>
