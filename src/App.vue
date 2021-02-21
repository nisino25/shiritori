<template>
  <div class="wrapper" >
    <div class="auth" v-if="currentMenu ==='auth'">
      <button @click="currentMenu= 'menu'">Login</button>
      <button @click="currentMenu= 'menu'">Sign Up</button>
    </div>

    <div class="menu" v-if="currentMenu ==='menu'">
      <button>Make a room</button>
      <button>Join a room</button>
      <button>Play against CPU</button>
      <button>Stats</button>
      <button @click="currentMenu= 'auth'">Logout</button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      currentMenu: 'auth',
    }
  },
    
}
</script>

<style>

</style>
