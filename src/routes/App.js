import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/';

const App = () => {
    return(
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path="/" component={Home}/>
                {/* <Route component={NotFound} /> */}
            </Switch>
        </Layout>
        
    </BrowserRouter>);
}

export default App;