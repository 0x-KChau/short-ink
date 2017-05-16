import {Meteor} from 'meteor/meteor';
import {Sesson} from 'meteor/session';
import createHistory from 'history/createBrowserHistory'
import {authenticatedFunc} from '../import/routes/routes';

const history = createHistory();

Meteor.startup(()=>{
  const isAuthenticated = !!Meteor.userId();
  authenticatedFunc(isAuthenticated, history)

  //show & hide links
  Session.set('showVisible', true)
})
