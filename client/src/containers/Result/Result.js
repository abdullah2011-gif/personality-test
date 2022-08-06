import React from "react";
import { useHistory } from "react-router-dom";
import { Context as AppContext } from "../../context/app/AppContext"

export default function () {
    let { state, setDataAction } = React.useContext(AppContext)
    let history = useHistory();
    const submit = () => {
        setDataAction({})
        history.replace("home")
    }
    return <div >
        <h1>{`Your Total Score Is ${state.totalScore}`}</h1>
        <button className="button" onClick={submit} >Start Again</button>
    </div>
}