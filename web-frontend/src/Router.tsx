import React from 'react';
import './Router.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// for Pages
import PageMain from './pages/PageMain';
import PageLogin from './pages/PageLogin';
import PageRegister from './pages/PageRegister';
import PageAbout from './pages/PageAbout';
import PageMypage from './pages/PageMypage';

// for Components
import Navigation from './components/Navigation';

// for Mobx
import {inject, observer} from 'mobx-react';
import MenuStore from './stores/MenuStore';

export interface Props {
    menuStore?: MenuStore
}

@inject('menuStore') @observer
class App extends React.Component<Props> {
  constructor(props:any) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Navigation/>
        <Switch>
          <Route path="/about">
            <PageAbout/>
          </Route>
          <Route path="/login">
            <PageLogin/>
          </Route>
          <Route path="/mypage">
            <PageMypage/>
          </Route>
          <Route path="/register">
            <PageRegister/>
          </Route>
          <Route path="/">
            <PageMain/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
