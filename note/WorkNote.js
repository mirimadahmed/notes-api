const Note = require('./Note')
const { NOTE: TYPE } = require('../utils/constants')
class WorkNote extends Note {
    constructor() {
        super(TYPE.WORK)
    }
}

module.exports = WorkNote;