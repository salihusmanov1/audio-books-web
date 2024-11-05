import { ref } from 'vue'
import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const useUserStore = defineStore('user', () => {

  const userLoggedIn = ref(false)

  //actions
  async function register(values) {
    const userCredentials = await createUserWithEmailAndPassword(auth, values.email, values.password)

    await setDoc(doc(usersCollection, userCredentials.user.uid), {
      name: values.name,
      email: values.email,
      age: values.age,
      country: values.country
    });
    userLoggedIn.value = true
  }

  async function authenticate(values) {
    await signInWithEmailAndPassword(auth, values.email, values.password)
    userLoggedIn.value = true
  }

  async function logout() {
    await signOut(auth)
    userLoggedIn.value = false
  }

  return { userLoggedIn, register, authenticate, logout }
})
