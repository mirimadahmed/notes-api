const PersonalNote = require("../note/PersonalNote")
const WorkNote = require("../note/WorkNote")
const { NOTE } = require('../utils/constants')

class NoteFactory {
    static createInstance(type) {
        if (type === NOTE.TYPE.PERSONAL) return new PersonalNote();
        if (type === NOTE.TYPE.WORK) return new WorkNote();
        throw new Error("Note type not recognized");
    }
}

module.exports = NoteFactory;