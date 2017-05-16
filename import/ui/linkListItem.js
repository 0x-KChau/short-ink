import {Meteor} from 'meteor/meteor';
import React from 'react'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'
import moment from 'moment'

export default class LinkListItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      justCopied: false,
      justVisited: false
    }
  }
  componentDidMount(){
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success', ()=>{
      this.setState({justCopied:true});
      setTimeout(()=>this.setState({justCopied:false}),1000);
    }).on('error',()=>{

    })

  }
  componentWillUnmount(){
    this.clipboard.destroy();
  }
  onClick(){
    this.setState({justVisited:true});
    window.open(this.props.shortUrl, '_blank');
  }
  renderStats(){
    const visitMessage = this.props.visitedCount===1? 'Visit':'Visits'
    let visitedMessage = null;
    if(typeof this.props.lastVisitedAt === 'number') visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`
    return <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
  }
  render(){
    return(
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <button className="button--pill button--link" onClick={this.onClick.bind(this)}>{this.state.justVisited?'Visited':'Visit'}</button>
        <button className="button--pill" ref='copy' data-clipboard-text={this.props.shortUrl}>{this.state.justCopied?'Copied':'Copy'}</button>
        <button className="button--pill" onClick={()=>Meteor.call('links.setVisiblility', this.props._id, !this.props.visible)}>{this.props.visible?'Hide':'Unhide'}</button>
      </div>
    )
  }
}


LinkListItem.propTypes={
  _id:PropTypes.string,
  url:PropTypes.string,
  userId:PropTypes.string,
  shortUrl:PropTypes.string,
  visible:PropTypes.bool,
  visitedCount:PropTypes.number,
  lastVisitedAt: PropTypes.number
}
