const Note = require('./Note')
const { NOTE: TYPE } = require('../utils/constants')
class PersonalNote extends Note {
    constructor() {
        super(TYPE.PERSONAL)
    }
}

module.exports = PersonalNote;