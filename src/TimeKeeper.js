class TimeKeeper {
  constructor() {
    // this.index = 0
    // this.timestamp = null
    this.sessions = []
    this.testMessage = "Test!"
  }

  sessionExists(index) {
    if (this.sessions[index] !== 'undefined') {
      return true
    } else {
      return false
    }
  }

  getSessions() {
    return this.sessions
  }

  addSession(reading) {
    this.sessions.push(reading)
  }

  removeSession(index) {
    this.sessions.splice(index, 1)
    return this.sessions
  }
}
