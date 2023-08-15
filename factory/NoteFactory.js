const PersonalNote = require("../note/PersonalNote")
const WorkNote = require("../note/WorkNote")
const { NOTE: TYPE } = require('../utils/constants')

class NoteFactory {
    static createInstance(type) {
        if (type === TYPE.PERSONAL) return new PersonalNote();
        if (type === TYPE.WORK) return new WorkNote();
        throw new Error("Note type not recognized");
    }
}

module.exports = NoteFactory;