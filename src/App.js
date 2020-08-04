import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from './features/Dashboard/Dashboard';
import AuditCreate from './features/Audit/AuditCreate';
import AuditList from './features/Audit/AuditList';
import AuditDetail from './features/Audit/AuditDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/audit/create" component={AuditCreate} />
        <Route exact path="/audit/list" component={AuditList} />
        <Route exact path="/audit/detail/:id" component={AuditDetail} />
      </Switch>
    </Router>
  );
}

export default App;
