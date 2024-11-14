<template>
  <header id="header" class="bg-gray-700 m-2 rounded">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link class="text-white font-bold uppercase text-2xl mr-4" :to="{ name: 'home' }"
        exact-active-class="no-active">Earbound</router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white cursor-pointer" @click="isOpen = !isOpen">Login / Register</a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white cursor-pointer" :to="{ name: 'manage' }">Manage</router-link>
            </li>
            <li>
              <a class="px-2 text-white cursor-pointer" @click="signOut">Logout</a>
            </li>
          </template>

        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

const modalStore = useModalStore()
const { isOpen } = storeToRefs(modalStore)

async function signOut() {
  await userStore.logout()

  if (route.meta.auth) {
    router.push({ name: 'home' })
  }
}


</script>