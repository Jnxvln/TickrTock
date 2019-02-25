<template>
  <div>
    <div class="test-component">
      <h1>TickrTock</h1>
      <div class="wrapper1">
        <button class="button session" id="btn-addSession" v-on:click="addSession" :disabled="addSession_disabled"><i class="fas fa-save"></i></button>
        <input type="text" id="time_display" v-model="timestamp" disabled/><br/>
        <button class="button session" id="btn-removeSession" v-on:click="removeSession" :disabled="removeSession_disabled"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="wrapper2">
        <button class="button" id="btn-start" v-on:click="timerStart" :disabled="timerCounting"><i class="fas fa-play"></i></button>
        <button class="button" id="btn-pause" v-on:click="timerPause"><i class="fas fa-pause"></i></button>
        <button class="button" id="btn-reset" v-on:click="timerReset"><i class="fas fa-undo"></i></button>
      </div>
      <div class="wrapper3">
        <p class="numberSessions"><strong>Sessions:</strong> {{ numberOfSessions }}</p>
        <div class="session-container">
          <ul class="session-list">
            <li v-for="(session, index) in sessionList" :key="index">
              <p>Session #{{ session.index }}: <strong>{{ session.timestamp }}</strong></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Timer from '@/Timer.js'
import TimeKeeper from '@/TimeKeeper.js'
const MyTimer = new Timer()
const MyKeeper = new TimeKeeper()

export default {
  data () {
    return {
      timestamp: '00:00:00',
      index: 0,
      displayInterval: null,
      addSession_disabled: true,
      numberOfSessions: 0,
      timerCounting: false,
      sessionList: []
      // removeSession_disabled: true
    }
  },
  computed: {
    removeSession_disabled: function () {
      if (this.numberOfSessions > 0) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    askNumber () {
      return this.numberOfSessions
    },
    timerStart () {
      document.querySelector('#btn-start').classList.add('isActive')
      document.querySelector('#btn-pause').classList.remove('isActive')
      this.addSession_disabled = false
      this.timerCounting = true
      MyTimer.start()
      this.displayInterval = setInterval(() => {
        this.timestamp = MyTimer.getReading()
      }, 1000)
    },
    timerPause () {
      this.timerCounting = false
      document.querySelector('#btn-start').classList.remove('isActive')
      document.querySelector('#btn-pause').classList.add('isActive')
      MyTimer.stop()
    },
    timerReset () {
      this.timerCounting = false
      MyTimer.stop()
      MyTimer.reset()
      this.timestamp = '00:00:00'
      clearInterval(this.displayInterval)
      this.addSession_disabled = true
    },
    addSession () {
      this.timerCounting = false
      MyTimer.stop()
      if (this.timestamp === '00:00:00') {
        alert('Cannot insert blank session')
      } else {
        console.log(MyKeeper.addSession(this.timestamp))
        MyTimer.reset()
        clearInterval(this.displayInterval)
        this.timestamp = '00:00:00'
        this.addSession_disabled = true
        this.numberOfSessions = MyKeeper.getNumberOfSessions()
        this.sessionList = MyKeeper.getSessions()
      }
    },
    removeSession () {
      this.timerCounting = false
      MyTimer.stop()
      const indexToRemove = prompt('Index to remove: ')

      if (MyKeeper.sessionExists(indexToRemove)) {
        const conf = confirm('Are you sure you want to remove this session?')
        if (conf) {
          console.log(MyKeeper.removeSession(indexToRemove))
          this.numberOfSessions = MyKeeper.getNumberOfSessions()
          this.sessionList = MyKeeper.getSessions()
        } else {
          alert('Session NOT removed!')
          console.log(MyKeeper.getSessions())
        }
      } else {
        alert('Session not found!')
      }
    }
  }
}
</script>

<style scoped>
  .test-component {
    display: flex;
    flex-wrap: wrap;
    width: 350px;
    margin: 0 auto;
  }
  .test-component h1 {
    text-align: center;
    width: 100%;
  }
  .wrapper1 {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .wrapper2 {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 5px;
  }
  .wrapper3 {
    width: 100%;
  }
  .numberSessions {
    margin-top: 25px;
  }
  .button {
    padding: 15px;
    border-radius: 0;
    border-color: transparent;
    background-color: #044e4e;
    color: white;
    font-weight: bold;
  }
  .wrapper2 .button {
    margin-right: 5px;
  }
  #btn-start, #btn-pause, #btn-reset {
    flex-grow: 1;
  }
  #btn-addSession, #btn-removeSession {
    flex-grow: 1;
  }
  .button:disabled, .button.session:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
  .button:disabled:hover, .button.session:disabled:hover {
    background-color: gray;
    cursor: not-allowed;
  }
  .button:hover {
    background-color: #08a0a0;
    cursor: pointer;
  }
  .button.session {
    background-color: #08708a;
  }
  .button.session:hover {
    background-color: #32b5cc;
  }
  .isActive {
    background-color: #ce3d2a;
  }
  #time_display {
    flex-grow: 2;
    margin: 0 5px;
    padding: 10px;
    font-size: 18pt;
    width: 200px;
    background-color: #f3f3f3;
    border: 1px dashed lightgray
  }

  .session-container {
    border: 1px solid gray;
    padding: 10px;
    width: 100%;
    height: 300px;
    overflow-y: scroll;
  }

  ul.session-list {
    margin: 0;
    padding: 0;
    text-align: left;
  }

  .session-list li {
    list-style: none;
    margin: 0;
    padding-left: 15px;
  }

  @media screen and (max-width: 600px) {
    #btn-addSession, #btn-removeSession {
      flex-grow: 1;
    }
    #btn-start, #btn-pause, #btn-reset {
      flex-grow: 1;
    }
    #time_display {
      flex-grow: 2;
    }
  }

  @media screen and (min-width: 2560px) {
    .test-component {
      width: 50%;
      margin: 0 auto;
      padding: 10px;
    }
  }

  @media screen and (max-width: 1440px) {
    .test-component {
      width: 50%;
      margin: 0 auto;
      padding: 10px;
    }
  }

  @media screen and (max-width: 1024px) {
    .test-component {
      width: 70%;
      margin: 0 auto;
      padding: 10px;
    }
  }

  @media screen and (max-width: 800px) {
    .test-component {
      width: 90%;
      margin: 0 auto;
      padding: 10px;
    }
  }
  @media screen and (max-width: 600px) {
    .test-component {
      width: 90%;
      margin: 0 auto;
      padding: 10px;
    }
  }
</style>
