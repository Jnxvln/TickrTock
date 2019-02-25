class TimeKeeper {
  constructor () {
    this.index = 0
    // this.timestamp = null
    this.sessions = []
    this.testMessage = 'Test!'
  }

  getNumberOfSessions () {
    return this.sessions.length
  }

  sessionExists (index) {
    if (this.sessions[index] !== 'undefined' && this.sessions[index] !== undefined) {
      return true
    } else {
      return false
    }
  }

  getSessions () {
    return this.sessions
  }

  addSession (timestamp) {
    let entry = { index: this.index += 1, timestamp }
    this.sessions.push(entry)
    return this.getSessions()
  }

  removeSession (index) {
    this.sessions.splice(index, 1)
    return this.sessions
  }
}

export default TimeKeeper
