
const db = require('./db.json')
const fs = require('fs');
const tables = require('./tables');
const { v4: uuidV4 } = require('uuid')
module.exports = {
    get(key, field) {
        return db[key][field]
    },
    add(key, field, value) {
        let temp = { ...db };
        temp[key][field] = value
        updateFile(temp)
        return value
    },
    update(key, field, value) {
        let temp = { ...db };
        temp[key][field] = value;
        updateFile(temp)
        return value
    },
    updateFile(data) {
        fs.writeFileSync('src/db/db.json', JSON.stringify(data))
    },
    init() {
        let _data = tables.questionData;
        let questions = {}
        let answers = {}
        _data.map(it => {
            let id = uuidV4();
            let question = { question: it.question, id }
            it.choices.map(_it => {
                id = uuidV4()
                answers[id] = { questionId: id, id, answer: it }
            })
            questions[id] = question
        })
        let data = {
            [tables.tests]: {},
            [tables.questions]: questions,
            [tables.answers]: answers
        }
        this.updateFile(data)
    }

}