import React from 'react';
import { Router, Switch, Route } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { createBrowserHistory } from 'history';

import {HomeContainer} from '../containers';
import store from '../redux/store/store';

const history = syncHistoryWithStore(createBrowserHistory(), store);

export const Routes = () =>  {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={HomeContainer}/>
            </Switch>
        </Router>
    );
}