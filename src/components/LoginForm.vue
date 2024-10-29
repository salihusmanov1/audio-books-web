<template>
  <div>
    <form>
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <input v-model="email" v-bind="emailAttrs" type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email" />
        <div class="text-red-500 ml-2">{{ errors.email }}</div>
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <input v-model="password" v-bind="passwordAttrs" type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password" />
        <div class="text-red-500 ml-2">{{ errors.password }}</div>
      </div>
      <button type="submit"
        class="block w-full bg-amber-700 text-white py-1.5 px-3 rounded transition hover:bg-amber-600">
        Submit
      </button>
    </form>

  </div>
</template>

<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const { errors, defineField } = useForm({
  validationSchema:
    yup.object({
      email: yup.string().email('Email must be a valid email').required('Email is required'),
      password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    }),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');


</script>