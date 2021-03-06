import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import BaseLayout from './layout/BaseLayout';
import About from './page/About';
import SettingsLayout from './page/settings/SettingsLayout';


function App() {
  return (
    <Router>
      <BaseLayout>
        <Switch>
          <Redirect exact from="/" to="/settings/playlist" />
          <Route path="/settings" component={SettingsLayout} />
          <Route path="/about" component={About} />
        </Switch>
      </BaseLayout>
    </Router >
  );
}

export default App;
