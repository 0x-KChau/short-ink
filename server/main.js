import {Meteor} from 'meteor/meteor'
import {WebApp} from 'meteor/webapp'
import {Links} from '../import/api/links'
import '../import/api/users'

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((req,res,next)=>{
    const _id = req.url.slice(1);
    const link = Links.findOne({_id});

    if(link){
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      Meteor.call('links.trackVisit', _id)
      res.end();
    }else{
      next();
    }
  })
});
