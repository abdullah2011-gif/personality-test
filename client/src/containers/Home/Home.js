import React from "react";
import { useHistory } from "react-router-dom";
import api from "../../api";
import { Context as AppContext } from "../../context/app/AppContext"
export default function () {
    let history = useHistory();
    let { setDataAction } = React.useContext(AppContext)
    const submit = async () => {
        let res = await api.post('personality/start')
        if (res.success) {
            setDataAction(res.data)
            history.replace("questions")
        } else {
            alert(res?.message)
        }
    }
    return <div >
        <h1>
            Lets Start Your Personality Test

        </h1>
        <button onClick={submit} className="button">Start Test</button>
    </div >
}