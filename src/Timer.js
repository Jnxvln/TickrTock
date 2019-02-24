class Timer {
  constructor () {
    this.interval = null
    this.hh = { measure: 'hour', pref: '', value: 9 }
    this.mm = { measure: 'minute', pref: '', value: 59 }
    this.tick = { measure: 'tick', pref: '', value: 56 }
    this.h_low = ''
    this.m_low = ''
    this.s_low = ''
    this.reading = `${this.hh.pref}${this.hh.value}:${this.mm.pref}${this.mm.value}:${this.tick.pref}${this.tick.value}`
  }

  checkDigit (time) {
    if (time.measure) {
      if (time.value <= 9) {
        time.pref = '0'
      } else {
        time.pref = ''
      }
    }
  }

  reset () {
    this.hh.value = 0
    this.mm.value = 0
    this.tick.value = 0
  }

  start () {
    this.interval = setInterval(() => {
      this.tick.value += 1
      this.checkDigit(this.hh)
      this.checkDigit(this.mm)
      this.checkDigit(this.tick)

      if (this.tick.value == 60) {
        this.mm.value += 1
        this.checkDigit(this.mm)
        this.tick.value = 0
        this.tick.pref = '0'
      }

      if (this.mm.value == 60) {
        this.hh.value += 1
        this.checkDigit(this.hh)
        this.mm.value = 0
        this.tick.value = 0
        this.mm.pref = '0'
        this.tick.pref = '0'
      }

      // Print the timer
      this.reading = `${this.hh.pref}${this.hh.value}:${this.mm.pref}${this.mm.value}:${this.tick.pref}${this.tick.value}`
      // console.log(this.reading)
    }, 1000)
  }

  stop () {
    if (!this.interval) {
      return
    }
    clearInterval(this.interval)
  }

  getReading () {
    return this.reading
  }
}

// module.exports = Timer