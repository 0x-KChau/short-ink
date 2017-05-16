import React from 'react';
import {Meteor} from 'meteor/meteor';
import Modal from 'react-modal'

export default class AddLink extends React.Component{
  constructor(props){
    super(props);
    this.state={
      url: '',
      isOpen: false,
      err: ''
    }
  }
  onSubmit(e){
    const url = this.state.url;

    e.preventDefault();

    Meteor.call('links.insert',url,(err, res)=>{
      if(err) this.setState({err:err.reason});
      else this.setState({url:'', isOpen:false, err:''})
    })
  }

  onChange(e){
    this.setState({url:e.target.value.trim()})
  }

  render(){
    return(
      <div>
        <button className="button" onClick={()=>this.setState({isOpen:true})}>+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onRequestClose={()=>this.setState({isOpen:false,url:'',err:''})}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Add Link(s)</h1>
          {this.state.err?<p>{this.state.err}</p>:undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input type="text" ref="url" placeholder="URL" value={this.state.url} onChange={this.onChange.bind(this)}/>
            <button className="button">Add Link</button>
          </form>
          <button type="button" className="button button-secondary" onClick={()=>this.setState({isOpen:false,url:'',err:''})}>Cancel</button>
        </Modal>

      </div>
    )
  }
}
