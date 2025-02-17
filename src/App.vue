<template>
  <div
    class="min-h-screen grid grid-rows-[auto_1fr] grid-cols-1 md:grid-cols-[250px_1fr] gap-4 p-4 ">

    <header class="col-span-1 md:col-span-2 bg-gray-50 p-4 rounded-lg text-center  ">
      <h1 class="text-4xl font-bold text-gray-800">Laravel API Authentication with Sanctum</h1>
      <p class="text-gray-600 mt-2">Secure authentication API using Laravel Sanctum with essential features.</p>
    </header>


    <Nav/>

    <RouterView />
    

  </div>
</template>
<script setup>
  import Nav from './components/Nav.vue';

</script>