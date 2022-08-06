import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainLayout from './Layout/MainLayout';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/main">
          <MainLayout />
        </Route>
        <Redirect
          to="/main"
          from='/'
        />
      </Switch>
    </Router>
  );
}
