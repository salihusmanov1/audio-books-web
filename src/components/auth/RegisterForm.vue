<template>
  <div>
    <div v-show="alert.show" :class="alert.variant" class="p-4 my-2 rounded text-white text-center">
      {{ alert.message }}
    </div>
    <form @submit="submit">
      <!-- Name -->
      <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <input type="text" v-model="name" v-bind="nameAttrs"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Name" :class="errors.name ? 'border-red-500 focus:border-red-500' : ''" />
        <div class="text-red-500 ml-1">{{ errors.name }}</div>
      </div>
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <input v-model="email" v-bind="emailAttrs" type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email" :class="errors.email ? 'border-red-500 focus:border-red-500' : ''" />
        <div class="text-red-500 ml-1">{{ errors.email }}</div>
      </div>
      <!-- Age -->
      <div class="mb-3">
        <label class="inline-block mb-2">Age</label>

        <input v-model.number="age" v-bind="ageAttrs" type="number"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          :class="errors.age ? 'border-red-500 focus:border-red-500' : ''" />
        <div class="text-red-500 ml-1">{{ errors.age }}</div>
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <input v-model="password" v-bind="passwordAttrs" type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password" :class="errors.password ? 'border-red-500 focus:border-red-500' : ''" />
        <div class="text-red-500 ml-1">{{ errors.password }}</div>
      </div>
      <!-- Confirm Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Confirm Password</label>
        <input v-model="confirmPassword" v-bind="confirmPasswordAttrs" type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Confirm Password" :class="errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''" />
        <div class="text-red-500 ml-1">{{ errors.confirmPassword }}</div>
      </div>
      <!-- Country -->
      <div class="mb-3">
        <label class="inline-block mb-2">Country</label>
        <select v-model="country" v-bind="countryAttrs"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          :class="errors.country ? 'border-red-500 focus:border-red-500' : ''">
          <option value="USA">USA</option>
          <option value="Mexico">Mexico</option>
          <option value="Germany">Germany</option>
        </select>
        <div class="text-red-500 ml-1">{{ errors.country }}</div>
      </div>
      <!-- TOS -->
      <div class="mb-3 pl-6">
        <input v-model="tos" v-bind="tosAttrs" type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
        <label class="inline-block">Accept terms of service</label>
        <div class="text-red-500">{{ errors.tos }}</div>
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
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';
import { useModalStore } from '@/stores/modal';

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
      name: yup.string().required('Name is required').matches(/^[A-Za-z\s]+$/, 'Invalid type').min(3, 'Name must be at least 3 characters').max(30, 'Too many characters'),
      email: yup.string().email('Email must be a valid email').required('Email is required'),
      age: yup.number().required('Age is required')
        .min(18, 'Age must be at least 18')
        .max(65, 'Age must be at most 65')
        .typeError('Age must be a number'),
      password: yup.string().min(6).required('Password is required'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      country: yup.string().required('Country is required'),
      tos: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    }),
});

const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [age, ageAttrs] = defineField('age');
const [password, passwordAttrs] = defineField('password');
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword');
const [country, countryAttrs] = defineField('country');
const [tos, tosAttrs] = defineField('tos');

country.value = "USA"
// tos.value = false

const submit = handleSubmit(async values => {

  loading.value = true
  try {
    await userStore.register(values)

    alert.value.show = true
    alert.value.message = 'Success! Your account has been created.'
    alert.value.variant = 'bg-green-500'
    setTimeout(() => {
      isOpen.value = false
    }, 500);

  }
  catch (error) {
    alert.value.show = true
    alert.value.message = 'An unexpected error occured. Please try again later.'
    alert.value.variant = 'bg-red-500'
    console.log(error);

  }
  loading.value = false

}) // handleSubmit is a callback function
</script>