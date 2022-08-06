

const fs = require('fs');
const tables = require('./tables');
const { v4: uuidV4 } = require('uuid')
module.exports = {
    get(key, field) {
        let db = this.getDb()
        if (!field)
            return Object.values(db[key])
        return db[key][field]
    },
    add(key, field, value) {
        let db = this.getDb()
        let temp = { ...db };
        temp[key][field] = value
        this.updateFile(temp)
        return value
    },
    update(key, field, value) {
        let db = this.getDb()
        let temp = { ...db };
        temp[key][field] = value;
        this.updateFile(temp)
        return value
    },
    updateFile(data) {
        fs.writeFileSync('src/db/db.json', JSON.stringify(data, null, 2))
    },
    getDb() {
        let data = fs.readFileSync('src/db/db.json')
        return JSON.parse(data)
    },
    init() {
        let _data = tables.questionData;
        let questions = {}
        let answers = {}
        _data.map(it => {
            let questionId = uuidV4();
            let question = { question: it.question, id: questionId }
            questions[questionId] = question
            it.choices.map(_it => {
                id = uuidV4()
                answers[id] = { questionId, id, answer: _it }
            })
        })
        let data = {
            [tables.tests]: {},
            [tables.questions]: questions,
            [tables.answers]: answers
        }
        this.updateFile(data)
    }

}