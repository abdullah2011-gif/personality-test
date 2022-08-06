const {
    v4: uuidV4
} = require("uuid");
const dbFunctions = require("../db/dbFunctions");
const tables = require("../db/tables");
module.exports = {
    getAnswersForQuestion: getAnswersForQuestion = (questionId) => {
        let answers = dbFunctions.get(tables.answers)
        let data = answers.filter(ans => ans.questionId === questionId)
        return data
    },
    startTest() {
        let testId = uuidV4();
        let questions = dbFunctions.get(tables.questions,);
        let question = questions[0];
        let answers = this.getAnswersForQuestion(question.id);
        let data = questions.map(question => ({
            question,
        }))
        dbFunctions.add(tables.tests, testId, {
            id: testId,
            test: data
        })
        return {
            testId,
            question,
            answers
        }
    },
    getRandomScore() {
        return Math.ceil(Math.random() * 10)
    },
    getNextQuestion(obj = {}) {
        let {
            testId,
            questionId,
            answerId
        } = obj
        if (!testId || !questionId || !answerId) throw new Error("Please enter all feilds")
        let answer = dbFunctions.get(tables.answers, answerId)
        let test = dbFunctions.get(tables.tests, testId)
        let currentQuestion = null
        let nextQuestion = false
        test.test = test.test.map(_t => {
            if (_t.question.id === questionId && _t.answer) throw new Error("You have already been answered this question!")
            if (_t.question.id === questionId) return {
                ..._t,
                answer: answer,
                score: this.getRandomScore()
            }
            if (!currentQuestion && !_t.answer) currentQuestion = _t.question
            else if (!_t.answer) nextQuestion = true
            return _t
        })
        let answers = []
        if (currentQuestion)
            answers = this.getAnswersForQuestion(currentQuestion.id)
        dbFunctions.update(tables.tests, testId, test)
        return { question: currentQuestion, nextQuestion, answers }
    },
    submit(obj = {}) {
        let {
            testId,
            questionId,
            answerId
        } = obj
        if (!testId || !questionId || !answerId) throw new Error("Please enter all feilds")
        let answer = dbFunctions.get(tables.answers, answerId)
        let test = dbFunctions.get(tables.tests, testId)
        if (test.totalScore) throw new Error("test is already been cleared!")
        let remaining = test.test.filter(_t => !_t.answwer)
        if (remaining.length > 1) throw new Error("There are pending questions!")
        let index = test.test.findIndex(_t => _t.question.id == questionId)
        test.test[index] = { ...test.test[index], answer, score: this.getRandomScore() }
        let totalScore = 0
        test.test.map(_t => totalScore = _t.score + totalScore)
        totalScore = totalScore / test.test.length
        test.totalScore = totalScore
        dbFunctions.update(tables.tests, testId, test)
        return test
    }
}