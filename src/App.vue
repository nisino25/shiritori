<template>
  <div class="navbar">
    
  </div>
  <div class="vue-tempalte" >
   

    <!-- Main -->
    <div class="App">
      <div class="vertical-center">

        <div class="inner-block">

          <div class="vue-template" v-if="currentMenu === 'register'">
            <form @submit.prevent="register()">
              <div class="form-group">
                <label for="exampleInputEmail1">User Name</label>
                <input class="form-control" id="exampleInputEmail1"  placeholder="Enter your user name" v-model="username">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>


          <div class='vue-template' v-if="currentMenu === 'menu'">
            <h3>Welcome, {{ username }}! </h3>
            <hr>
            <form @submit.prevent="joinARoom()">
              <div class="form-group">
                <label for="exampleInputEmail1">Room Code</label>
                <input class="form-control" id="exampleInputEmail1"  placeholder="Enter the code" v-model="roomcode" style="width:40%; margin-right: auto;
  margin-left: auto; text-align:center">
              </div>
              <button type="submit" class="btn btn-primary" style="margin-bottom:2px">Join a room</button>
            </form>
            <h5>OR</h5>
            <button type="submit" class="btn btn-primary" @click="createARoom" >Create a room</button>
            <hr>
            <button type="submit" class="btn btn-danger"  style="margin-top:20px">Practice against CPU(maintance)</button>
          </div>

          <div class="vue-template" v-if="currentMenu=== 'playing'">
            <div>
              <h4>Your room code is [ {{roomcode}} ]</h4>
            </div>

            <div>
              <section >
                  <!-- <div 
                    v-for="message in messages" :key="message.key" 
                    :class="(username == message.username ? 'message current-user' : 'message')" style="overflow:auto">
                    <div class="message-inner">
                      <div class="username">{{ message.username }}</div>
                      <div class="content">{{ message.content }}</div>
                    </div>
                  </div> -->

                  <div v-for="message in messages" :key="message.key">
                    <div>
                      <article class="msg-container" id="msg-0" :class="(username == message.username ? 'msg-self' : 'msg-remote')" >
                        <div class="msg-box">
                          <img class="user-img" id="user-0" :src="message.avatar" />
                          <div class="flr">
                            <div class="messages" v-if="message.content !== 'giveup'">
                              <p class="msg" id="msg-0">{{message.content}} </p>
                            </div>
                            <div v-else>
                              <p class="msg" id="msg-0">{{message.username}} has given up!</p>
                              <p class="msg" id="msg-0">The game is over</p>
                            </div>
                            <span class="timestamp"><span class="username">{{message.username}}</span></span>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </section>
            </div>
            <hr style="height: 1px;
        background-color: #ccc;
        border: none;">
            <div>

              <form class="chat-input" onsubmit="return false;" @submit.prevent="newProcessGame()" style="margin-bottom:30px" v-if="this.username !== this.lastPlayedBy">
                <input type="text" autocomplete="on" :placeholder="placeholderText" v-model="uncheckedWord">
                <button>
                              <svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="rgba(0,0,0,.38)" d="M17,12L12,17V14H8V10H12V7L17,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" /></svg>
                          </button>
              </form>
              <h5 v-else>Waiting for the other players's reply... <hr style="height: 1px;
        background-color: #ccc;
        border: none;"></h5>
              
              <h6>Your room code is [ {{roomcode}} ]</h6>
              <button class="btn btn-danger" @click="giveUp()" v-if="this.username !== this.lastPlayedBy">Give up</button>
              <h6>Total word count is {{messages.length-2}}</h6>
              
            </div>
          </div>

          

          








          <div class="vue-template" v-if="currentMenu === 'chatapp'">
             <header>
              <button class="logout" @click="Logout">Logout</button>
              <h1>Welcome, {{ username }}. Room code is {{this.roomcode}}</h1>
              
            </header>

            <!-- <section class="chat-box"  > -->
              <section >
              <div 
                v-for="message in messages" 
                :key="message.key" 
                :class="(username == message.username ? 'message current-user' : 'message')" style="overflow:auto">
                <div class="message-inner">
                  <div class="username">{{ message.username }}</div>
                  <div class="content">{{ message.content }}</div>
                  <!-- <br><br><br> -->
                </div>
              </div>
            </section>
            
            <form class="login-form" @submit.prevent="joinARoom()">
              <div class="form-inner"  style=margin-top:20px>
                <h1>Join a room</h1>
                <!-- <label for="username">Username</label> -->
                <input 
                  type="text" 
                  v-model="roomcode" 
                  placeholder="Please enter the room code..." />
                <input 
                  type="submit" 
                  value="Join a room" />
              </div>
            </form>
            <button @click="createARoom()">Create</button><br>
            <button>Practice with CPU</button>



            <footer>
              <form @submit.prevent="SendMessage">
                <input 
                  type="text" 
                  v-model="inputMessage" 
                  placeholder="Write a message..." />
                <input 
                  type="submit" 
                  value="Send" />
              </form>
            </footer>
          </div>

          <div >


            <button class="btn btn-outline-success" @click="currentMenu = 'practice'" v-if="currentMenu === 'home'" >Practice</button>
          </div>

          <div class="vue-template" v-if="currentMenu === 'firePractice'">
            <button @click="testFire()">hey</button>
            fire
            {{firePLists}}
          </div>

          <div class="vue-template" v-if="currentMenu === 'practice'">
             <div>
                <div class='chatBox' style="height: 400px;overflow:auto;margin-top:50px" id='chatBox'>
                  <div v-for="data in gameHistory" :key="gameHistoryKey(data)" >
                    <p :class="[data.player === 'computer' ? 'p-left': 'p-right']" class="margin-top:20px">{{data.player}}: {{data.word}}</p>
                  </div>
                </div>
  
                <div v-if="currentPlayer === 'me'">
                  <div>
                    <!-- <input type="text"  v-model="uncheckedWord" @keyup.enter="pCheck()"> -->
                    <input type="text"  v-model="uncheckedWord" :placeholder="placeholderText">
                    <button @click="processGame()" :disabled="!isCandidateWordValid">Send</button>
                    <!-- <button>Give Up</button> -->
                    <!-- <button @click="checkcheck()">check</button> -->
                  </div>

                  <ul v-if="!!candidateWordErrors.length" class="errors">
                    <li v-for="err in candidateWordErrors" :key="err" >{{ err }}</li>
                  </ul>
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
                  <!-- <input type="text"  v-model="uncheckedWord" @keyup.enter="pCheck()"> -->
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
// import firebase from 'firebase'
// import { auth, AuthStore, db } from './main2.js'
// import { db } from '@/main.js'
import db from './db';
// import firebase from 'firebase/app';
import 'firebase/firestore';
import { onMounted } from 'vue';
import { tmpWordList } from './const/wordsList'
import { acceptableLetters, fallbackLetters } from './const/acceptableLetters'


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

      isRoomSelected: false, 
			roomcode: null,
			username: null,
			messages: null,
			inputMessage: null,
			inputUsername: null,
      generalFlag: true,
      
      avatarLink: 'https://robohash.org/668d5b3d4c78d1a3aa4cd98b7e654b2c?set=set4&bgset=&size=400x400',
      operatorLink: 'https://gravatar.com/avatar/2f95324ba05dbbb7224d481104a25864?s=400&d=robohash&r=x',


      currentMenu: 'register',
      firePLists: [],

      user: {
        name: '',
        email: '',
        password: ''
      },

      chatData: [],
      currentMessage: undefined,



      uncheckedWord: '',
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

      players: ['computer', 'me'],
      currentPlayer: 'me',
      wordsList: tmpWordList,
      cpuDict: {},
      nextHeadCandidates: [],
      gameHistory: [], // Array<{ player: string; word: string; timestamp: Date }>
    }
  },

  computed: {
    placeholderText() {
      return `「${this.nextHeadCandidates.join(',')}」から始まる言葉`
    },
    wordHitory() {
      return this.gameHistory.map(h => h.word)
    },
    candidateWordErrors() {
      const word = this.uncheckedWord
      let errors = []

      // 長さをチェック
      if (word.length < 1) {
        errors.push('文字を入力してください')
      }

      // ひらがなかどうかチェック
      if (!this.hiraganaCheck(word)) {
        errors.push('ひらがなで入力してください')
      }

      // 使用済みかチェック
      if (this.wordHitory.includes(word)) {
        errors.push('すでに利用されたワードです')
      }

      // 「を」「ん」「っ」で終われない
      if (word.endsWith('を') || word.endsWith('ん') || word.endsWith('っ')) {
        errors.push('「を」「ん」「っ」で終わることはできません')
      }

      // 最後の答えの末尾と、先頭が一致しているか
      if (!this.nextHeadCandidates.includes(word[0])) {
        errors.push(`「${this.nextHeadCandidates.join(',')}」から始まる言葉を入力してくだい`)
      }

      return errors
    },
    isCandidateWordValid() {
      return !this.candidateWordErrors.length
    },
    lastPlayedBy(){
      return this.messages[this.messages.length-1].username
    },
  },

  watch: {
    currentPlayer: {
      handler(val) {
        if (val === 'computer') {
          // CPUにプレイさせる
          this.playAsComputer()
        }
      },
      immediate: true
    }
  },


  methods: {
    register(){
      if (this.username === "" || this.username === null) {
        return
      }
      this.currentMenu = 'menu'
    },
    joinARoom(){
      // console.log('hey')
      let r= confirm(`Joining a room [ ${this.roomcode} ]?`);
      if(!r){
        return;
      }
			// this.roomcode= ;
			this.isRoomSelected = true
      this.currentMenu= 'playing'
      this.avatarLink = 'https://gravatar.com/avatar/b0a8c4bbc0ef26b4f5be6d8f2af30634?s=400&d=robohash&r=x'
      this.notify();
			this.refresh();
      
      
    },
    createARoom(){
			var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			var result = '';
      var char = null;
			for ( var i = 0; i < 5; i++ ) {

        char = randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        if(char === 'l' || char === 'I' || char === 'o'  || char === 'O' || char === '0'){
          // since it is really hard to distinguishj I and l
          console.log(`I hate ${char} || ${i}`) 
          i--;
        }else{
					result += char
        }
			}
			// console.log(result)

			let r= confirm(`Would you like to make a room [ ${result} ]?`);
      if(!r){
        return;
      }
			this.roomcode = result;
			console.log(this.roomcode)

			this.isRoomSelected = true
      this.startingGame()
			this.refresh();
      this.currentMenu= 'playing'
      
		},
    refresh(){
			db.database().ref(this.roomcode).on('value', snapshot => {
				const data = snapshot.val();
				let messages = [];

				Object.keys(data).forEach(key => {
					messages.push({
						id: key,
						username: data[key].username,
						content: data[key].content,
            avatar: data[key].avatar,
					});
				});
				// console.log('update')

				this.messages = messages;

        let theWord = this.messages[this.messages.length-1].content
        // let theChar = theWord.slice(-1)
        // console.log(theWord)
        // console.log(theChar)
        
        // if(theChar !== '.' || theChar !== '!'  )
        if(this.messages.length > 2  ){
          this.wordHitory.push(theWord)
          // console.log(this.wordHitory)
          const headCandidates = this.getHeadCandidate(theWord)
          this.nextHeadCandidates = headCandidates
        }
        

				window.scrollTo(0,document.body.scrollHeight);
				// console.log(document.getElementById('chattt').scrollHeight)
			});
		},
    SendMessage(){
      if(this.username === this.lastPlayedBy){
        alert('It is not your turn yet')
        return;
      }
			const messagesRef = db.database().ref(this.roomcode);

      // if (this.inputMessage === "" || this.inputMessage === null) {
      //   return;
      // }

      const message = {
        username: this.username,
        content: this.uncheckedWord,
        avatar: this.avatarLink,
      }

      messagesRef.push(message);
      this.uncheckedWord = ''
      // this.inputMessage = "";
      // console.log(this.avatarLink)
		},
    async  notify(){
      // console.log(this.roomcode)
      const messagesRef = db.database().ref(this.roomcode);

      // if (this.inputMessage === "" || this.inputMessage === null) {
      //   return;
      // }
      // this.username = 'nozozozo'

      const message = {
        username: this.username,
        content: `${this.username}, joins now!`,
        avatar: this.operatorLink,
      }
      

      messagesRef.push(message);
      this.inputMessage = "";


      const messagesRef2 = db.database().ref(this.roomcode);
      const message2 = {
        username: this.username,
        content: 'しりとり',
        avatar: this.avatarLink,
      }

      messagesRef2.push(message2);
    },
    async  startingGame(){
      const messagesRef = db.database().ref(this.roomcode);
      
      
			

      // if (this.inputMessage === "" || this.inputMessage === null) {
      //   return;
      // }
      // this.username = 'nozozozo'

      const message = {
        username: this.username,
        content: `Waiting for the other player...`,
        avatar: this.operatorLink,
      }

      messagesRef.push(message);
      this.inputMessage = "";
      console.log('notified')
    },
    giveUp(){


      let r= confirm(`Are you ready to give up?`);
      if(!r){
        return;
      }
			const messagesRef = db.database().ref(this.roomcode);

      const message = {
        username: this.username,
        content: 'giveup',
        avatar: this.avatarLink,
      }

      messagesRef.push(message);
      this.inputMessage = "";
		},



    
    hiraganaCheck(word){
      return /^([ぁ-ん]|／|ー)*$/.test(word)
    },
    gameHistoryKey(gameHistoryItem) {
      const { player, word, timestamp } = gameHistoryItem
      return `${player}-${word}-${timestamp}`
    },
    playAsComputer() {
      const word = this.pickWordFromCPUdict(this.nextHeadCandidates)
      if (!word) alert('ゲームが終了しました!')

      this.gameHistory.push({ player: 'computer', word, timestamp: new Date() })
      const headCandidates = this.getHeadCandidate(word)
      this.nextHeadCandidates = headCandidates
      this.currentPlayer = 'me'
    },
    pickWordFromCPUdict(headCandidates) {
      for (const headCandidate of headCandidates) {
        const sourceList = this.cpuDict[headCandidate]
        if (!sourceList.length) continue;

        const randomIndex = Math.floor(Math.random() * sourceList.length)
        const word = sourceList[randomIndex]
        if (!word) continue;

        this.omitFromCPUDict(headCandidate, randomIndex)

        return word
      }

      return null
    },
    omitFromCPUDict(key, index) {
      const oldSource = this.cpuDict[key]

      this.cpuDict = {
        ...this.cpuDict,
        [key]: [...oldSource.slice(0, index), ...oldSource.slice(index + 1)]
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

    generalCheck(){
      if(this.username === this.lastPlayedBy){
        alert('It is not your turn yet')
        this.generalFlag = false
        return;
      }
      
      let word = this.uncheckedWord

      if (word.length < 1) {
        // errors.push('文字を入力してください')
        alert('文字を入力してください')
        this.generalFlag = false
        return 
      }

      // ひらがなかどうかチェック
      if (!this.hiraganaCheck(word)) {
        // errors.push('ひらがなで入力してください')
        alert('ひらがなで入力してください')
        this.generalFlag = false
        return 
      }

      // 使用済みかチェック
      if (this.wordHitory.includes(word)) {
        // errors.push('すでに利用されたワードです')
        alert('すでに利用されたワードです')
        this.generalFlag = false
        return 
      }

      // 「を」「ん」「っ」で終われない
      if (word.endsWith('を') || word.endsWith('ん') || word.endsWith('っ')) {
        // errors.push('「を」「ん」「っ」で終わることはできません')
        alert('「を」「ん」「っ」で終わることはできません')
        this.generalFlag = false
        return 
      }

      // ーで終わる場合

      if(word.endsWith('ー')){
        let special = word.slice(0, -1);

        if (special.length < 1) {
          // errors.push('文字を入力してください')
          alert('文字数が足りません')
          this.generalFlag = false
          return false
        }

        

        

        // 「を」「ん」「っ」で終われない
        if (special.endsWith('を') || special.endsWith('ん') || special.endsWith('っ') || special.endsWith('ー')){
          // errors.push('「を」「ん」「っ」で終わることはできません')
          alert('この場合は「を」「ん」「っ」「ー」で終わることはできません')
          this.generalFlag = false
          return false
        }
          
      }

      // 最後の答えの末尾と、先頭が一致しているか
      if (!this.nextHeadCandidates.includes(word[0])) {
        // errors.push(`「${this.nextHeadCandidates.join(',')}」から始まる言葉を入力してくだい`)
        alert(`「${this.nextHeadCandidates.join(',')}」から始まる言葉を入力してくだい`)
        this.generalFlag = false
        return false
      }
      return true
    },

    newProcessGame(){
      // 1. uncheckedWordが不正だったらreturn
      // 2. uncheckedWordがgameHistoryにあったらreturn
     
      // 4. send


      // 1. uncheckedWordが不正だったらreturn

      this.generalFlag = true
      this.generalCheck()
      if(!this.generalFlag){
        return;
      }

      // 2. uncheckedWordがgameHistoryにあったらreturn
      // console.log(this.messages)
      if(this.wordHitory.includes(this.uncheckedWord)){
        alert('使用済みです')
        return
      }

      //4 sending

      this.SendMessage();
      // this.uncheckedWord === ''
    },



    processGame() {
      // 1. uncheckedWordが不正だったらreturn
      // 2. uncheckedWordがcpuDictに存在したらcpuDictから取り除く
      // 3. gameHistoryに新規にpush
      // 4. nextHeadCandidatesを更新
      // 5. ターンを相手に変更

      if (!this.isCandidateWordValid) return

      const word = this.uncheckedWord

      // check from cpuDict
      const indexInCPUDict = this.cpuDict[word[0]].findIndex(w => w === word)
      const isInCPUDict = indexInCPUDict !== -1
      if (isInCPUDict) {
        this.omitFromCPUDict(word[0], indexInCPUDict)
      }

      this.gameHistory.push({ player: this.currentPlayer, word, timestamp: new Date() })

      const headCandidates = this.getHeadCandidate(word)
      this.nextHeadCandidates = headCandidates

      this.currentPlayer = this.currentPlayer === 'computer' ? 'me' : 'computer'
      this.uncheckedWord = ''
    },
    getHeadCandidate(word) {
      if (word.endsWith('ー')) {
        // if (word.length < 1) {
        //   errors.push('文字を入力してください')
        // }
        const lastLetter = word.slice(word.length - 2, word.length - 1)
        let candidates1 = acceptableLetters[lastLetter] || []

        // optional letter
        const candidates2 = fallbackLetters[lastLetter] || []

        return [...candidates1, ...candidates2]
      } else {
        const lastLetter = word.slice(word.length - 1)
        const candidates = acceptableLetters[lastLetter] || []
        return candidates
      }
    },

    checkWord(){
      if (!this.isCandidateWordValid) return

      // this.flag = true;
      // let wordCount = 0

      // if(!this.flag){
      //   return;
      // }
      // check if every words were hiragana or not

      // str.charAt(0);
      this.firstLetter= this.uncheckedWord.charAt(0);
      if(this.firstLetter === this.theLetter || this.firstLetter === this.secondOption || this.firstLetter === this.thirdOption){
        // pass with any of the options
      }else{
        alert(`「${this.theLetter}}」から始まる言葉しか受け付けていません`)
        return;
      }


      this.lastLetter = this.uncheckedWord.substr(this.uncheckedWord.length - 1)
      if(this.lastLetter === 'を' || this.lastLetter ==='ん'||this.lastLetter ==='っ' ){
        alert('っ、を、ん では終われません')
        return;
      }
      // console.log((this.uncheckedWord.substr(this.uncheckedWord.length - 2)).charAt(0))



      if(this.pracrticeWordData.includes(this.uncheckedWord)){
        alert(`「${this.uncheckedWord}」は使用済みです`)
        return;
      }
      
      if(this.uncheckedWord.substr(this.uncheckedWord.length - 1) === 'ー'){
        console.log('---??')
        // console.log(this.uncheckedWord.substr(this.uncheckedWord.length - 2))
        if((this.uncheckedWord.substr(this.uncheckedWord.length - 2)).charAt(0) === 'ー'){
          alert(`「ー」は文末に2回連続しようすることはできません`)
          return;
        }else{
          // console.log('1')


          this.lastLetter = (this.uncheckedWord.substr(this.uncheckedWord.length - 2)).charAt(0)
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
        this.theLetter = this.uncheckedWord.substr(this.uncheckedWord.length - 1)
        this.moreOptions(this.theLetter)
        // console.log('3')
      }

      // this.theLetter = this.uncheckedWord.substr(this.uncheckedWord.length - 1)
      

      this.practiceGameData.push({who: 'you',word: this.uncheckedWord });
      this.pracrticeWordData.push(this.uncheckedWord)
      // this.moreOptions(this.theLetter)
      this.uncheckedWord = ''
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


    


  },
  mounted(){
    // let wooord = 'たべるasoijsio'
    // wooord = wooord.slice(0, -1);
    // console.log(wooord)
    this.cpuDict = tmpWordList // FIDME: use wordList
    // const firstWord = 'すきー'

    // this.gameHistory.push({ player: 'computer', word: firstWord, timestamp: new Date() })
    // const headCandidates = this.getHeadCandidate(firstWord)
    // this.nextHeadCandidates = headCandidates
    // this.currentPlayer = 'me'










    // Legacy

    this.practiceGameData.push({who: 'computer',word: 'しりとり' });
    this.pracrticeWordData.push('しりとり')
    this.theWord = 'しりとり'
    this.theLetter = this.theWord.substr(this.theWord.length - 1)
    this.allOptions = `${this.theLetter} から始まる言葉`


  },
  
}
</script>

<style>
body {
    background: #1c1e22;
}
.chatBox{
  /* position: absolute; */
  width: 100%;
  top: 8.5%;
  /* height:28%; */
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

.errors {
  padding-left: 0;
  color: red;
}

.chat-input {
    flex: 0 0 auto;
    height: 60px;
    background: #40434e;
    border-top: 1px solid #2671ff;
    box-shadow: 0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28);
    /* width: 100%; */
}

.chat-input input {
    height: 59px;
    line-height: 60px;
    outline: 0 none;
    border: none;
    width: calc(100% - 60px);
    color: white;
    text-indent: 10px;
    font-size: 12pt;
    padding: 0;
    background: #40434e;
}
.chat-input button {
    float: right;
    outline: 0 none;
    border: none;
    background: rgba(255,255,255,.25);
    height: 40px;
    width: 40px;
    border-radius: 50%;
    padding: 2px 0 0 0;
    margin: 10px;
    transition: all 0.15s ease-in-out;
}

.msg-box {
    display: flex;
    background: #5b5e6c;
    padding: 10px 10px 0 10px;
    border-radius: 0 6px 6px 0;
    max-width: 80%;
    width: auto;
    float: left;
    box-shadow: 0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24);
}

.user-img {
    display: inline-block;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background: #2671ff;
    margin: 0 10px 10px 0;
}

.username {
    margin-right: 3px;
}

.timestamp {
    color: rgba(0,0,0,.38);
    font-size: 8pt;
    margin-bottom: 10px;
}

.msg {
    display: inline-block;
    font-size: 11pt;
    line-height: 13pt;
    color: rgba(255,255,255,.7);
    margin: 0 0 4px 0;
}
.msg:first-of-type {
    margin-top: 8px;
}

.msg-container {
    position: relative;
    display: inline-block;
    width: 100%;
    margin: 0 0 10px 0;
    padding: 0;
}

.messages {
    flex: 1 0 auto;
}

.msg-self .msg-box {
    border-radius: 6px 0 0 6px;
    background: #2671ff;
    float: right;
}
.msg-self .user-img {
    margin: 0 0 10px 10px;
}
.msg-self .msg {
    text-align: right;
}
.msg-self .timestamp {
    text-align: right;
}
.flr {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    width: calc(100% - 50px);
}

</style>