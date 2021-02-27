<template>
  <div class="navbar">
    
  </div>
  <div class="vue-tempalte" >
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class="navbar-brand float-left" href="https://www.positronx.io" target="_blank">
           positronX.io
        </a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <!-- <router-link class="nav-link pr-3" to="/login">Sign in</router-link> -->
             <button @click="currentMenu ='login'" class="btn btn-outline-primary">Sign in</button>
          </li>
          <li class="nav-item">
            <!-- <router-link class="btn btn-outline-primary" to="/">Sign up</router-link> -->
            <button @click="currentMenu ='signup'" class="btn btn-outline-primary">Sign up</button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
      <div class="vertical-center">

        <div class="inner-block">

          <div >


            <button class="btn btn-outline-success" @click="currentMenu = 'practice'" v-if="currentMenu === 'home'" >Practice</button>
          </div>

          <div class="vue-template" v-if="currentMenu === 'practice'">
             <div>
                <div class='chatBox' style="height: 400px;overflow:auto;margin-top:50px" id='chatBox'>
                  <div v-for="(data, i) in practiceGameData" :key="i" >
                    <p :class="[data.who === 'computer' ? 'p-left': 'p-right']" class="margin-top:20px">{{practiceGameData[i].who}}: {{practiceGameData[i].word}}</p>
                  </div>
                </div>

                <div>
                  <!-- <input type="text"  v-model="unchekedWord" @keyup.enter="pCheck()"> -->
                  <input type="text"  v-model="unchekedWord" :placeholder="allOptions" @keyup.enter="checkWord()">
                  <button @click="checkWord()">Send</button>
                  <!-- <button>Give Up</button> -->
                  <!-- <button @click="checkcheck()">check</button> -->
                </div>
               
               <br><br>
             </div>
            <!-- <button class="btn btn-outline-primary" @click="currentMenu = 'home'" >Go back home</button> -->
          </div>

          <div class="vue-template" v-if="currentMenu === 'chat'">
             <div>
                <div class='chatBox' style="height: 400px;overflow:auto;margin-top:50px" id='chatBox'>
                  <div v-for="(data, i) in chatData" :key="i" >
                    <p :class="[data.who === 'computer' ? 'p-left': 'p-right']" class="margin-top:20px">{{chatData}}</p>
                  </div>
                </div>

                <div>
                  <!-- <input type="text"  v-model="unchekedWord" @keyup.enter="pCheck()"> -->
                  <form action=""   v-on:submit.prevent="sendMessage()">
                    <input type="text"  v-model="currentMessage" :placeholder="allOptions">
                    <!-- <button @click="sendMessage()">Sende</button> -->
                  </form>

                  <button @click="checkDB()">hey</button>
                  
                  
                  <!-- <button>Give Up</button> -->
                  <!-- <button @click="checkcheck()">check</button> -->
                </div>
               
               <br><br>
             </div>
            <!-- <button class="btn btn-outline-primary" @click="currentMenu = 'home'" >Go back home</button> -->
          </div>
          

          <div v-if="currentMenu === 'signup'" class="vue-tempalte">
    <form @submit.prevent="userRegistration">
      <h3>Sign Up</h3>

      <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control form-control-lg" v-model="user.name" />
      </div>

      <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control form-control-lg" v-model="user.email" />
      </div>

      <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control form-control-lg" v-model="user.password" />
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block">
          Sign Up
      </button>

      <p class="forgot-password text-right">
        Already registered 
          <!-- <router-link :to="{name: 'login'}">sign in?</router-link> -->
        <button type="submit"  class="btn btn-dark btn-lg btn-block"  @click="currentMenu='login'">Sign in?</button>
      </p>
    </form>
          </div>

          <div v-if="currentMenu === 'login'" class="vue-tempalte">
            <form @submit.prevent="userLogin">
              <h3>Sign In</h3>

              <div class="form-group">
                  <label>Email address</label>
                  <input type="email" class="form-control form-control-lg" v-model="user.email" />
              </div>

              <div class="form-group">
                  <label>Password</label>
                  <input type="password" class="form-control form-control-lg" v-model="user.password" />
              </div>

              <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
              <p class="forgot-password text-right">
                New user?
                  <!-- <router-link :to="{name: 'login'}">sign in?</router-link> -->
                <button type="submit"  class="btn btn-dark btn-lg btn-block"  @click="currentMenu='signup'">Sign up?</button>
              </p>

              <p class="forgot-password text-right mt-2 m'b-4">
                  <!-- <router-link to="/forgot-password">Forgot password ?</router-link> -->
              </p>
            </form>
          </div>

          <div v-if="currentMenu === 'after'">
            <h3>Welcome</h3>
              <p>{{user.displayName}}</p>
              <p>{{user.email}}</p>
              
              <button type="submit"  class="btn btn-dark btn-lg btn-block"  @click="logOut()"> Log out</button>
          </div>
          
        </div>
      </div>
    </div>
  </div>

  
</template>


<script> 
import firebase from 'firebase'
// import { auth, AuthStore, db } from './main2.js'
// import { db } from '@/main.js'
import db from './db';
// import firebase from 'firebase/app';
import 'firebase/firestore';
import { onMounted } from 'vue';
import { wordsList } from './const/wordsList'


// import firebase from 'firebase'


export default {
  setup(){
    onMounted(() => {
      // const messagesRef = db.database().ref("messages");
      // let docRef = db.collection('database').doc('practice')
      // let docRef = db.collection('database').doc('mainData')
      // let val = await docRef.get()
      // console.log(val)
      // const messagesRef = db.collection('database').doc('practice')
      
      // messagesRef.on('value', snapshot => {
      //   const data = snapshot.val();
      //   console.log(data)
      //   // let messages = [];
      //   // Object.keys(data).forEach(key => {
      //   //   messages.push({
      //   //     id: key,
      //   //     username: data[key].username,
      //   //     content: data[key].content
      //   //   });
      //   // });
      //   // state.messages = messages;
      // });


    });
  },
  name: 'App',
  data(){
    return {
      currentMenu: 'chat',

      user: {
        name: '',
        email: '',
        password: ''
      },

      chatData: [],
      currentMessage: undefined,



      unchekedWord: '',
      practiceGameData: [],
      pracrticeWordData: [],
      theLetter: undefined,
      alphabet: undefined,
      firstLetter: undefined,
      lastLetter: undefined,
      theWord: undefined,
      secondOption: undefined,
      thirdOption: undefined,
      allOptions: undefined,

      firstList: undefined,
      secondList: undefined,

      flag:true,


      wordsList,
    }
  },

  methods: {
    assignAllWordsToList(){

    

      // console.log(this.wordsList)
      // console.log(listU)


    },
    userRegistration() {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: this.user.name
          })
          .then(() => {
            // this.$router.push('/login')
            this.currentMenu = 'after'

            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                this.user = user;
              } else {
                this.user = null;
              }
            });
          });
      })
      .catch((error) => {
         alert(error.message);
      });
    },
    userLogin() {
      firebase
      .auth()
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(() => {
          // this.$router.push('/home')
          this.currentMenu = 'after'

          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                this.user = user;
              } else {
                this.user = null;
              }
            });
      })
      .catch((error) => {
        alert(error.message);
      });
    },
    logOut() {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          // this.$router.push('/login')
          this.currentMenu = 'home'
        })
      })
    },
    checkcheck(){
      console.log(this.practiceGameData)
    },
    pCheck(){
      alert('enter') 
    },
    hiraganaCheck(word){
      if(word ==='／'||word ==='ー'||word ==='っ'||word ==='ゃ'|| word ==='ゅ'||word ==='ょ'||word ==='ぁ'||word ==='ぃ'|| word ==='ぅ'||word === 'ぇ'|| word === 'ぉ'|| word === 'あ'|| word ==='い'|| word ==='う'|| word === 'え'|| word === 'お'|| word === 'か'||word === 'き' || word === 'く' ||word === 'け'|| word === 'こ' ||word === 'が' ||word === 'ぎ' || word === 'ぐ' ||word === 'げ' || word === 'ご'||word === 'さ'|| word === 'し'||word === 'す' || word === 'せ' ||word === 'そ' ||word === 'ざ' ||word === 'じ' || word === 'ず' ||word === 'ぜ' || word === 'ぞ'|| word === 'た'||word === 'ち'|| word === 'つ'||word === 'て' || word === 'と' ||word === 'だ' || word === 'ぢ' ||word === 'づ' || word === 'で' ||word === 'ど' || word === 'な' ||word === 'に' || word === 'ぬ' ||word === 'ね'|| word === 'の' ||word === 'は' ||word === 'ひ' ||word === 'ふ' ||word === 'へ' ||word === 'ば' || word === 'び' ||word === 'ぶ' || word === 'べ' ||word === 'ぼ'||word === 'ぱ' || word === 'ぴ' ||word === 'ぷ' ||word === 'ぺ' ||word === 'ぽ' ||word === 'ま' || word === 'ま' ||word === 'み' ||word === 'む' ||word === 'め' ||word === 'も' ||word === 'や'||word === 'ゆ'|| word === 'よ'||word === 'ら' ||word === 'り'|| word === 'る' ||word === 'れ'|| word === 'ろ' ||word === 'わ' ||word === 'を'||word === 'ん'){ 
        return true;
      }else{
        return false
      }
    },
    moreOptions(word){
      // console.log(word)
      if(word === 'あ'|| word ==='い'|| word ==='う'|| word === 'え'|| word === 'お'|| word === 'か'||word === 'き' || word === 'く' ||word === 'け'|| word === 'こ' ||word === 'さ'|| word === 'し'||word === 'す' || word === 'せ' ||word === 'そ' || word === 'た'||word === 'ち'|| word === 'つ'||word === 'て' || word === 'と' || word === 'な' ||word === 'に' || word === 'ぬ' ||word === 'ね'|| word === 'の' ||word === 'ま' || word === 'ま' ||word === 'み' ||word === 'む' ||word === 'め' ||word === 'も' ||word === 'や'||word === 'ゆ'|| word === 'よ'||word === 'ら' ||word === 'り'|| word === 'る' ||word === 'れ'|| word === 'ろ' ||word === 'わ' ||word === 'を'){
        this.secondOption = 'nothing';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter} から始まる言葉`
      }
      
      else if(word ==='ゃ'){
        this.theLetter = 'や'
        this.secondOption = 'nothing';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter} から始まる言葉`
      }else if(word ==='ゅ'){
        this.theLetter = 'ゆ'
        this.secondOption = 'nothing';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter} から始まる言葉`
      }else if(word ==='ょ'){
        this.theLetter = 'よ'
        this.secondOption = 'nothing';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter} から始まる言葉`
      }
      
      else if(word ==='ぁ'){
        this.theLetter = 'あ'
       this.secondOption = 'nothing';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter} から始まる言葉`
      }else if(word ==='ぃ'){
        this.theLetter = 'い'
       this.secondOption = 'nothing';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter} から始まる言葉`
      }else if(word ==='ぅ'){
        this.theLetter = 'う'
       this.secondOption = 'nothing';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter} から始まる言葉`
      }else if(word ==='ぇ'){
        this.theLetter = 'え'
       this.secondOption = 'nothing';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter} から始まる言葉`
      }else if(word ==='ぉ'){
        this.theLetter = 'お'
       this.secondOption = 'nothing';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter} から始まる言葉`
      }

      else if(word ==='が'){
       this.secondOption = 'か';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='ぎ'){
       this.secondOption = 'き';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='ぐ'){
       this.secondOption = 'く';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='げ'){
       this.secondOption = 'k';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='ご'){
       this.secondOption = 'こ';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }

      else if(word ==='ざ'){
       this.secondOption = 'さ';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='じ'){
       this.secondOption = 'し';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='ず'){
       this.secondOption = 'す';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`

      }else if(word ==='ぜ'){
       this.secondOption = 'せ';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`

      }else if(word ==='ぞ'){
        this.secondOption = 'そ';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }

      else if(word ==='だ'){
        this.secondOption = 'た';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='ぢ'){
        this.secondOption = 'ち';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='づ'){
        this.secondOption = 'つ';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='で'){
        this.secondOption = 'て';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='ど'){
        this.secondOption = 'と';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }
      else if(word ==='ぱ' ||word ==='ば' ){
        this.secondOption = 'は';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='ぴ' ||word ==='び' ){
        this.secondOption = 'ひ';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='ぷ' ||word ==='ぼ' ){
        this.secondOption = 'ふ';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='ぺ' ||word ==='べ' ){
        this.secondOption = 'へ';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }else if(word ==='ぽ' ||word ==='ぼ' ){
        this.secondOption = 'ほ';
        this.thirdOption = 'nothing';
        this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
      }

      else if(word === 'special'){
        console.log('more options special'+ `${this.theLetter}`)
        if(this.theLetter === 'か'|| this.theLetter === 'さ'||this.theLetter === 'た'||this.theLetter === 'な'||this.theLetter === 'は'||this.theLetter === 'ま'||this.theLetter === 'や'||this.theLetter === 'ら'||this.theLetter === 'わ'||this.theLetter === 'が'||this.theLetter === 'ざ'||this.theLetter === 'だ'||this.theLetter === 'ば'||this.theLetter === 'ぱ'){
          this.secondOption = 'あ'
          this.thirdOption = 'nothing';
          this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
        }
        
        else if(this.theLetter === 'き'|| this.theLetter === 'し'||this.theLetter === 'ち'||this.theLetter === 'に'||this.theLetter === 'ひ'||this.theLetter === 'み'||this.theLetter === 'り'||this.theLetter === 'ぎ'||this.theLetter === 'じ'||this.theLetter === 'ぢ'||this.theLetter === 'び'||this.theLetter === 'ぴ'){
          this.secondOption = 'い'
          this.thirdOption = 'nothing';
          this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
        }
        
        else if(this.theLetter === 'く'|| this.theLetter === 'す'||this.theLetter === 'つ'||this.theLetter === 'ぬ'||this.theLetter === 'ふ'||this.theLetter === 'む'||this.theLetter === 'ゆ'||this.theLetter === 'る'||this.theLetter === 'ぐ'||this.theLetter === 'ず'||this.theLetter === 'づ'||this.theLetter === 'ぶ'||this.theLetter === 'ぷ'){
          this.secondOption = 'う'
          this.thirdOption = 'nothing';
          this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
        }
        
        else if(this.theLetter === 'け'|| this.theLetter === 'せ'||this.theLetter === 'て'||this.theLetter === 'ね'||this.theLetter === 'へ'||this.theLetter === 'め'||this.theLetter === 'れ'||this.theLetter === 'げ'||this.theLetter === 'ぜ'||this.theLetter === 'で'||this.theLetter === 'べ'||this.theLetter === 'ぺ'){
          this.secondOption = 'え'
          this.thirdOption = 'nothing';
          this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
        }
        
        else if(this.theLetter === 'こ'|| this.theLetter === 'そ'||this.theLetter === 'と'||this.theLetter === 'の'||this.theLetter === 'ほ'||this.theLetter === 'も'||this.theLetter === 'よ'||this.theLetter === 'ろ'||this.theLetter === 'を'||this.theLetter === 'ご'||this.theLetter === 'ぞ'||this.theLetter === 'ど'||this.theLetter === 'ぼ'||this.theLetter === 'ぽ'){
          this.secondOption = 'お'
          this.thirdOption = 'nothing';
          this.allOptions = `${this.theLetter}、${this.secondOption} から始まる言葉`
        }
      }
    },

    // checkDB(){
    //   console.log(db)
    //    console.log(db)
    //   // firebase.firestore()
    //   const docRef = db.collection('database').doc('practice')
    //   docRef.on("value", snapshot => {
    //       // eslint-disable-line
    //       if (snapshot) {
    //         const rootList = snapshot.val();
    //         console.log(snapshot.val)
    //         let list = [];
    //         Object.keys(rootList).forEach((val) => {
    //           rootList[val].id = val;
    //           list.push(rootList[val]);
    //         });
    //         this.chatData = list;
    //       }else{
    //         console.log('nope')
    //       }
    //     });
    // },

    checkWord(){
      this.flag = true;
      let wordCount = 0
      while(wordCount < this.unchekedWord.length){
        // console.log(this.unchekedWord.charAt(wordCount))
        if(this.hiraganaCheck(this.unchekedWord.charAt(wordCount))){
          wordCount++
        }else{
          alert('「ひらがな」だけしか受け付けていません')
          this.flag =false
          break;
        }
      }

      if(!this.flag){
        return;
      }
      // check if every words were hiragana or not

      // str.charAt(0);
      this.firstLetter= this.unchekedWord.charAt(0);
      if(this.firstLetter === this.theLetter || this.firstLetter === this.secondOption || this.firstLetter === this.thirdOption){
        // pass with any of the options
      }else{
        alert(`「${this.theLetter}}」から始まる言葉しか受け付けていません`)
        return;
      }


      this.lastLetter = this.unchekedWord.substr(this.unchekedWord.length - 1)
      if(this.lastLetter === 'を' || this.lastLetter ==='ん'||this.lastLetter ==='っ' ){
        alert('っ、を、ん では終われません')
        return;
      }
      // console.log((this.unchekedWord.substr(this.unchekedWord.length - 2)).charAt(0))



      if(this.pracrticeWordData.includes(this.unchekedWord)){
        alert(`「${this.unchekedWord}」は使用済みです`)
        return;
      }
      
      if(this.unchekedWord.substr(this.unchekedWord.length - 1) === 'ー'){
        console.log('---??')
        // console.log(this.unchekedWord.substr(this.unchekedWord.length - 2))
        if((this.unchekedWord.substr(this.unchekedWord.length - 2)).charAt(0) === 'ー'){
          alert(`「ー」は文末に2回連続しようすることはできません`)
          return;
        }else{
          // console.log('1')


          this.lastLetter = (this.unchekedWord.substr(this.unchekedWord.length - 2)).charAt(0)
          if(this.lastLetter === 'を' || this.lastLetter ==='ん'||this.lastLetter ==='っ' ){
            alert('っ、を、ん では終われません')

            return;
          }else{
            this.theLetter = this.lastLetter
            this.moreOptions('special');
            // console.log('2')
          }
        }
      }else{
        this.theLetter = this.unchekedWord.substr(this.unchekedWord.length - 1)
        this.moreOptions(this.theLetter)
        // console.log('3')
      }

      // this.theLetter = this.unchekedWord.substr(this.unchekedWord.length - 1)
      

      this.practiceGameData.push({who: 'you',word: this.unchekedWord });
      this.pracrticeWordData.push(this.unchekedWord)
      // this.moreOptions(this.theLetter)
      this.unchekedWord = ''
      window.setInterval(function() {
        var chatBox = document.getElementById('chatBox');
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 5000);
      // this.returnNewWord();
      // this.interval = setInterval(() => this.returnNewWord(), 2000);  
      setTimeout(this.returnNewWord, 1500);
      // setTimeout(this.returnNewWord(), 5000);
      // setTimeout(

      
    },

    returnNewWord(){
      // console.log(this.wordsList)
      this.convertHiragana(this.theLetter);
      // console.log(this.firstList)

      let randomNum = undefined;
      let randomFlag = false;

      // check the list and if the length is 0 and alert the victory
      if(this.firstList.length === 0){
        alert('You won against the CPU!')
        return;
      }

      while(!randomFlag){
        randomNum = Math.floor(Math.random() * this.firstList.length)
        if(this.pracrticeWordData.includes(this.firstList[randomNum])){
          // this.firstList.spli[randomNum]
          this.firstList.splice(randomNum,1);
        }else{
          // this.firstList.slice(randomNum,1);
          // this.firstList.splice(randomNum,1);

          randomFlag = true
        }
       
        // randomFlag = true
      }

      this.practiceGameData.push({who: 'computer',word: this.firstList[randomNum] });
      this.pracrticeWordData.push(this.firstList[randomNum])
      window.setInterval(function() {
        var chatBox = document.getElementById('chatBox');
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 5000);
      // updated list 
      // get the first letter so I can start it 

      // get the letter 
      

      if(this.firstList[randomNum].substr(this.firstList[randomNum].length - 1) === 'ー'){
        this.lastLetter = (this.firstList[randomNum].substr(this.firstList[randomNum].length - 2)).charAt(0)
        this.theLetter = this.lastLetter
        this.moreOptions('special');
        // console.log('this')
        
      }else{
        this.theLetter = this.firstList[randomNum].substr(this.firstList[randomNum].length - 1)
        this.moreOptions(this.theLetter)
        // console.log('thisthis')
        // console.log(this.theLetter)
      }

      // console.log(this.firstList)
      // console.log(randomNum)

      // this.firstList.splice(randomNum,1);
      // this.wordsList.ru = this.firstList
      // console.log(this.firstList.length)



      // randomNum = Math.floor(Math.random() * this.firstList.length)
      // used list
      // Second option you can use it too

      // nu 56 ru 46


      // arr[Math.floor(Math.random() * arr.length)]

      // after check, if valid take the word and update the actual list

      // check the list and if the length is 0 and alert the victory

      // this.results.splice(num,1);
    


    },
    convertHiragana(letter){
      switch(letter){
        case 'あ':
          this.firstList = this.wordsList.a
          // this.alphabet = 'a';
          this.secondOption = null
          break;

        case 'い':
          this.alphabet = 'i';
          this.firstList = this.wordsList.i
          this.secondOption = null
          break;

        case 'う':
          this.alphabet = 'u';
          this.firstList = this.wordsList.u
          this.secondOption = null
          break;
          
        case 'え':
          this.alphabet = 'e';
          this.firstList = this.wordsList.e
          this.secondOption = null
          break;
        
        case 'お':
          this.alphabet = 'o';
          this.firstList = this.wordsList.o
          this.secondOption = null
          break;


        case 'か':
          this.alphabet = 'ka';
          this.firstList = this.wordsList.ka
          this.secondOption = null
          break;

        case 'き':
          this.alphabet = 'ki';
          this.firstList = this.wordsList.ki
          this.secondOption = null
          break;

        case 'く':
          this.alphabet = 'ku';
          this.firstList = this.wordsList.ku
          this.secondOption = null
          break;
          
        case 'け':
          this.alphabet = 'ke';
          this.firstList = this.wordsList.ke
          this.secondOption = null
          break;
      
        case 'こ':
          this.alphabet = 'ko';
          this.firstList = this.wordsList.ko
          this.secondOption = null
          break;


        case 'さ':
          this.alphabet = 'sa';
          this.firstList = this.wordsList.sa
          this.secondOption = null
          break;

        case 'し':
          this.alphabet = 'si';
          this.firstList = this.wordsList.si
          this.secondOption = null
          break;

        case 'す':
          this.alphabet = 'u';
          this.firstList = this.wordsList.su
          this.secondOption = null
          break;
          
        case 'せ':
          this.alphabet = 'se';
          this.firstList = this.wordsList.se
          this.secondOption = null
          break;
          
        case 'そ':
          this.alphabet = 'so';
          this.firstList = this.wordsList.so
          this.secondOption = null
          break;


        case 'た':
          this.alphabet = 'ta';
          this.firstList = this.wordsList.ta
          this.secondOption = null
          break;

        case 'ち':
          this.alphabet = 'ti';
          this.firstList = this.wordsList.ti
          this.secondOption = null
          break;

        case 'つ':
          this.alphabet = 'tu';
          this.firstList = this.wordsList.tu
          this.secondOption = null
          break;
          
        case 'て':
          this.alphabet = 'te';
          this.firstList = this.wordsList.te
          this.secondOption = null
          break;    
          
        case 'と':
          this.alphabet = 'to';
          this.firstList = this.wordsList.to
          this.secondOption = null
          
          break;


        case 'な':
          this.alphabet = 'na';
          this.firstList = this.wordsList.na
          this.secondOption = null
          break;

        case 'に':
          this.alphabet = 'ni';
          this.firstList = this.wordsList.ni
          this.secondOption = null
          break;

        case 'ぬ':
          this.alphabet = 'nu';
          this.firstList = this.wordsList.nu
          this.secondOption = null
          break;
          
        case 'ね':
          this.alphabet = 'ne';
          this.firstList = this.wordsList.ne
          this.secondOption = null
          break;      
          
        case 'の':
          this.alphabet = 'no';
          this.firstList = this.wordsList.no
          this.secondOption = null
          break;


        case 'は':
          this.alphabet = 'ha';
          this.firstList = this.wordsList.ha
          this.secondOption = null
          break;

        case 'ひ':
          this.alphabet = 'hi';
          this.firstList = this.wordsList.hi
          this.secondOption = null
          break;

        case 'ふ':
          this.alphabet = 'hu';
          this.firstList = this.wordsList.hu
          this.secondOption = null
          break;
          
        case 'へ':
          this.alphabet = 'he';
          this.firstList = this.wordsList.he
          this.secondOption = null
          break; 
         
        case 'ほ':
          this.alphabet = 'ho';
          this.firstList = this.wordsList.ho
          this.secondOption = null
          break;



        case 'ま':
          this.alphabet = 'ma';
          this.firstList = this.wordsList.ma
          this.secondOption = null
          break;

        case 'み':
          this.alphabet = 'mi';
          this.firstList = this.wordsList.mi
          this.secondOption = null
          break;

        case 'む':
          this.alphabet = 'mu';
          this.firstList = this.wordsList.mu
          this.secondOption = null
          break;
          
        case 'め':
          this.alphabet = 'me';
          this.firstList = this.wordsList.me
          this.secondOption = null
          break;
          
        case 'も':
          this.alphabet = 'mo';
          this.firstList = this.wordsList.mp
          this.secondOption = null
          break;


        case 'や':
          this.alphabet = 'ya';
          this.firstList = this.wordsList.ya
          this.secondOption = null
          break;

        case 'ゆ':
          this.alphabet = 'yu';
          this.firstList = this.wordsList.yu
          this.secondOption = null
          break;
        
        case 'よ':
          this.alphabet = 'yo';
          this.firstList = this.wordsList.yo
          this.secondOption = null
          break;


        case 'ら':
          this.alphabet = 'ra';
          this.firstList = this.wordsList.ra
          this.secondOption = null
          break;

        case 'り':
          this.alphabet = 'ri';
          this.firstList = this.wordsList.ri
          this.secondOption = null
          break;


        case 'る':
          this.alphabet = 'ru';
          this.firstList = this.wordsList.ru
          this.secondOption = null
          break;
          
        case 'れ':
          this.alphabet = 're';
          this.firstList = this.wordsList.re
          this.secondOption = null
          break;
        
          
        case 'ろ':
          this.alphabet = 'ro';
          this.firstList = this.wordsList.ro
          this.secondOption = null
          break;

        case 'わ':
          this.alphabet = 'wa';
          this.firstList = this.wordsList.wa
          this.secondOption = null
          break;

        


        
        

        
        

      }
    },

    async sendMessage(){

      // this.firstMove = true;
      // let docRef = db.collection('database').doc('mainData')
      // let val = await docRef.get()
      
      // let favoriteData = val.exists ? val.data() : {}
      // // console.log(doc.data())
      // if(!(favoriteData[this.currentUser.uid])){
      //   favoriteData[this.currentUser.uid] = [1,0,0,0];
      // }else{
      //   favoriteData[this.currentUser.uid][0]++
      // }
      
      // await docRef.set(favoriteData)
      // this.getMasterData()




      console.log('jeu')
      // this.practiceGameData.push({who: 'you',word: this.currentMessage });
      

      let docRef = db.collection('database').doc('practice')
      let val = await docRef.get()
      
      let messageData = val.exists ? val.data() : messageData ={}
      console.log(val.data())
      messageData[this.currentMessage] = 'nidino256'
      // if(!(favoriteData[this.currentUser.uid])){
      //   favoriteData[this.currentUser.uid] = [1,0,0,0];
      // }else{
      //   favoriteData[this.currentUser.uid][0]++
      // }
      // messageData.push({})
      // messageData.push({who: this.user.displayName ,message: this.currentMessage  });
      // messageData.push({who: 'nisino25' ,message: this.currentMessage  });

      
      await docRef.set(messageData)
      this.currentMessage = ''

    },
    async listen() {
      // const messagesRef = db.database().ref("messages");
      // let docRef = db.collection('database').doc('practice')


      // let docRef = db.collection('database').doc('practice')
      // let val = await docRef.get()
      // console.log(val.data())


      const messagesRef = db.collection('database').doc('practice').ref
      console.log(messagesRef)
      
      messagesRef.on('value', snapshot => {
        const data = snapshot.val();
        console.log(data)
        // let messages = [];
        // Object.keys(data).forEach(key => {
        //   messages.push({
        //     id: key,
        //     username: data[key].username,
        //     content: data[key].content
        //   });
        // });
        // state.messages = messages;
      });

    },

  },
  mounted(){

    this.practiceGameData.push({who: 'computer',word: 'しりとり' });
    this.pracrticeWordData.push('しりとり')
    this.theWord = 'しりとり'
    this.theLetter = this.theWord.substr(this.theWord.length - 1)
    this.allOptions = `${this.theLetter} から始まる言葉`

    

    console.log('mounted')
    this.listen();


  },
  
}
</script>

<style>
.chatBox{
  /* position: absolute; */
  width: 100%;
  top: 8.5%;
  height:28%;
  /* width: 60em; */
  /* background-color: #304455; */
  border: solid 1px black;
  margin-bottom: 25px;
}

.p-left{
  text-align: left;
  margin-left: 10px;
}

.p-right{
  text-align: right;
  margin-left: 10px;
}
</style>