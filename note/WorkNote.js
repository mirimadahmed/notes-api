const Note = require('./Note')
const { NOTE } = require('../utils/constants')
class WorkNote extends Note {
    constructor() {
        super(NOTE.TYPE.WORK)
    }
}

module.exports = WorkNote;