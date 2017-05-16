import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker'
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Signup from '../ui/signup'
import Login from '../ui/login'
import Link from '../ui/link'
import NotFound from '../ui/notFound'


const unauthenticatedPage = ['/','/signup','/login'];
const authenticatedPage = ['/link'];


export const authenticatedFunc = (isAuthenticated, history) =>{
  Tracker.autorun(()=>{

    const routes = (
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={()=>(Meteor.userId()?<Redirect to={"/link"}/>:<Login/>)}/>
              <Route path="/login" render={()=>(Meteor.userId()?<Redirect to={"/link"}/>:<Login/>)}/>
              <Route path="/signup" render={()=>(Meteor.userId()?<Redirect to={"/link"}/>:<Signup/>)}/>
              <Route path="/link" render={()=>(Meteor.userId()?<Link/>:<Redirect to={"/login"}/>)}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>
      )

    const isUnauthenticatedPage = unauthenticatedPage.includes(location.pathname);
    const isAuthenticatedPage = authenticatedPage.includes(location.pathname);

    if(isUnauthenticatedPage && isAuthenticated){
      history.push('/link')
    }else if(isAuthenticatedPage && !isAuthenticated){
      history.push('/')
    }
    console.log('isAuthenticated',isAuthenticated, location.pathname);


    Meteor.startup(()=>{
      ReactDOM.render(routes, document.getElementById('app'))
    })

  })

}
