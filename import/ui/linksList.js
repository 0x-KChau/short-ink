import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';
import {Links} from '../api/links';
import LinkListItem from './linkListItem'
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      links:[]
    };
  }

  componentDidMount(){
    console.log('componentDidMount');
    Tracker.autorun(()=>{
      Meteor.subscribe('links');
      const myLinks = Links.find({visible:Session.get('showVisible')}).fetch();
      this.setState({links:myLinks})
    })
  }

  componentWillUnmount(){
    console.log('componentWillUnmount');

  }

  renderLinksListItems(){
    if(this.state.links.length===0){
      return(
        <div className="item">
          <p className="item__status-message">No Links Found</p>
        </div>

      )
    }else {
      return this.state.links.map((link)=>{
        const shortUrl = Meteor.absoluteUrl(link._id)
        return(
          <LinkListItem key={link._id} shortUrl={shortUrl} {...link}/>
        )
      })
    }
  }

  render(){
    return (
      <div className="">
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}
