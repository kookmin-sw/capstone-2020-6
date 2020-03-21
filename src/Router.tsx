import React from 'react';
import './Router.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Header, Container, Menu, Image } from "semantic-ui-react"

// for Pages
import PageMain from './pages/PageMain'
import PageLogin from './pages/PageLogin'
import PageRegister from './pages/PageRegister'
import PageAbout from './pages/PageAbout'

// for Mobx
import { observer, inject } from 'mobx-react'
import MenuStore from './stores/MenuStore'

export interface Props {
    menuStore?: MenuStore
}

@inject("menuStore") @observer
class App extends React.Component<Props> {
  constructor(props:any) {
    super(props)
    console.log(props)
  }
  render() {
    return (
      <Router>
        <Header>
          <Container className="main_top_header">
            <Link to="/"><img src="/logo.png" className="router_top_logo"/></Link>
            <div className="main_top_menu">
              <Link to="/about">About</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </Container>
        </Header>
        <Switch>
          <Route path="/about">
            <PageAbout/>
          </Route>
          <Route path="/login">
            <PageLogin/>
          </Route>
          <Route path="/register">
            <PageRegister/>
          </Route>
          <Route path="/">
            <PageMain/>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;