import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api";
import { Context as AppContext } from "../../context/app/AppContext"

export default function () {
    let history = useHistory();
    let { state, setDataAction } = React.useContext(AppContext)
    const [answer, setAnswer] = useState({})
    let { testId, question, answers, hasNext } = state
    if (!testId || !question || !answers.length)
        return null;

    const onSubmit = async () => {
        if (!answer.id) return
        let res = await api.post(hasNext ? "personality/next-question" : "personality/submit", { testId, questionId: question.id, answerId: answer.id })
        if (res.success) {
            setDataAction(res.data)
            if (!hasNext) history.replace("result")
        } else {
            alert(res?.message)
        }
        setAnswer({})
    }
    return <div className="card" >
        <h2 >{question.question}</h2>
        <h2 className="text-left">Answers</h2>
        {
            answers.map(ans => {
                return <p onClick={() => setAnswer(ans)} className="text-left"><input type="checkbox" checked={answer?.id == ans.id} />{ans.answer}</p>
            })
        }
        <button className="button" onClick={onSubmit} >Submit</button>
    </div >
}