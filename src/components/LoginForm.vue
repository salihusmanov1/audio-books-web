<template>
  <div>
    <div v-show="alert.show" :class="alert.variant" class="p-4 my-2 rounded text-white text-center">
      {{ alert.message }}
    </div>
    <form @submit="submit">
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <input v-model="email" v-bind="emailAttrs" type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email" :class="errors.email ? 'border-red-500 focus:border-red-500' : ''" />
        <div class="text-red-500 ml-1">{{ errors.email }}</div>
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <input v-model="password" v-bind="passwordAttrs" type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password" :class="errors.password ? 'border-red-500 focus:border-red-500' : ''" />
        <div class="text-red-500 ml-1">{{ errors.password }}</div>

      </div>
      <button type="submit" :disabled="loading" :class="loading ? 'opacity-75' : ''"
        class="block w-full flex justify-center items-center bg-amber-700 text-white h-11 px-3 rounded transition hover:bg-amber-600">
        <svg v-if="loading" class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        <span v-else class="font-medium">Submit</span>
      </button>
    </form>

  </div>
</template>

<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useUserStore } from '@/stores/user';
import { useModalStore } from '@/stores/modal';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';


const userStore = useUserStore()
const modalStore = useModalStore()

const { isOpen } = storeToRefs(modalStore)

const alert = ref({
  show: false,
  message: '',
  variant: null
})

const loading = ref(false)

const { errors, defineField, handleSubmit } = useForm({
  validationSchema:
    yup.object({
      email: yup.string().email('Email must be a valid email').required('Email is required'),
      password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    }),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const submit = handleSubmit(async values => {

  loading.value = true
  try {
    await userStore.authenticate(values)
    alert.value.show = true
    alert.value.message = 'Success! Your have logged in successfully.'
    alert.value.variant = 'bg-green-500'
    setTimeout(() => {
      isOpen.value = false
    }, 500);
  }
  catch (error) {
    alert.value.show = true
    alert.value.message = 'Invalid login details.'
    alert.value.variant = 'bg-red-500'
    console.log(error);

  }
  loading.value = false

})

</script>