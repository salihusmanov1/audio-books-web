<template>
  <div>
    <form>
      <!-- Name -->
      <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <input type="text" v-model="name" v-bind="nameAttrs"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Name" />
        <div class="text-red-500 ml-2">{{ errors.name }}</div>
      </div>
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <input v-model="email" v-bind="emailAttrs" type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email" />
        <div class="text-red-500 ml-2">{{ errors.email }}</div>
      </div>
      <!-- Age -->
      <div class="mb-3">
        <label class="inline-block mb-2">Age</label>

        <input v-model.number="age" v-bind="ageAttrs" type="number"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" />
        <div class="text-red-500 ml-2">{{ errors.age }}</div>
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <input v-model="password" v-bind="passwordAttrs" type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password" />
        <div class="text-red-500 ml-2">{{ errors.password }}</div>
      </div>
      <!-- Confirm Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Confirm Password</label>
        <input v-model="confirmPassword" v-bind="confirmPasswordAttrs" type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Confirm Password" />
        <div class="text-red-500 ml-2">{{ errors.confirmPassword }}</div>
      </div>
      <!-- Country -->
      <div class="mb-3">
        <label class="inline-block mb-2">Country</label>
        <select v-model="country" v-bind="countryAttrs"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
          <option value="USA">USA</option>
          <option value="Mexico">Mexico</option>
          <option value="Germany">Germany</option>
        </select>
        <div class="text-red-500 ml-2">{{ errors.country }}</div>
      </div>
      <!-- TOS -->
      <div class="mb-3 pl-6">

        <input v-model="tos" v-bind="tosAttrs" type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
        <label class="inline-block">Accept terms of service</label>
        <div class="text-red-500 ml-2">{{ errors.tos }}</div>
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

// tos.value = false
country.value = "USA"
</script>