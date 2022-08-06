import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import routes from "../routes";
import { Provider as AppProvider } from '../context/app/AppContext'
export default function () {
    return <div className="App">
        <AppProvider>
            <Router>
                <Switch>
                    {routes.map(route => {
                        return <Route path={`/main${route.path}`} render={props => <route.component {...props} />} />
                    })}
                    <Redirect
                        to="/main/home"
                        from='/main/'
                    />
                </Switch>
            </Router>
        </AppProvider>
    </div>
}