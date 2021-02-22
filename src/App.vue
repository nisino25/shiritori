<template>

  <div class="wrapper" >

    <div class="auth" >

      <div class="auth-button" v-if="currentMenu ==='auth'">
        <button @click="currentMenu= 'signup'">Sign Up</button>
        <button @click="currentMenu= 'signin'">Sign in</button>
      </div>

      <div class="signup" v-if="currentMenu ==='signup'">
        <div class="signup">
          <table>
            <tr>
              <th>Email</th>
            </tr>
            <tr>
              <td><input type="email" v-model="mailaddress"/></td>
            </tr>
            <tr>
              <th>Password</th>
            </tr>
            <tr>
              <td><input type="password" v-model="password"/></td>
            </tr>
          </table>
          <button @click="signUp">Sign Up</button>
          <button @click="currentMenu ='auth'"> Go Back  </button>
        </div>

      </div>

      <div class="signup" v-if="currentMenu ==='signin'">
        <div class="signin">
          <table>
            <tr>
              <th>Email:</th>
            </tr>
            <tr>
              <td><input type="email" v-model="mailaddress"/></td>
            </tr>
            <tr>
              <th>Password:</th>
            </tr>
            <tr>
              <td><input type="password" v-model="password"/></td>
            </tr>
          </table>
          <button @click="login">Sign In </button>
          <p>Make a new account</p>
            <button @click="currentMenu= 'signup'">Register</button>
            <button @click="currentMenu ='auth'"> Go Back  </button>
        </div>
      </div>
      
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
import firebase from 'firebase'

export default {
  name: 'App',
  data(){
    return{
      currentMenu: 'auth',
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.mailaddress, this.password)
      .then(
        this.currentMenu ='menu',
        alert('Success!')
        // 成功時の処理
      )
      .catch(
        // エラー時の処理 
      )
    },
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.mailaddress, this.password)
      // .then(data => {
      //   this.$router.replace({ name: "Dashboard" });
      // })
      // .catch(err => {
      //   this.error = err.message;
      // });
    .then(
        this.currentMenu ='menu',
        alert('Success!')
      )
      .catch(
        // エラー時の処理 
        alert('Failed')
      )
    },
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        
  }

  },
    
}
</script>

<style>

</style>
