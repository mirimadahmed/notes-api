const Note = require('./Note')
const { NOTE } = require('../utils/constants')
class PersonalNote extends Note {
    constructor() {
        super(NOTE.TYPE.PERSONAL)
    }
}

module.exports = PersonalNote;