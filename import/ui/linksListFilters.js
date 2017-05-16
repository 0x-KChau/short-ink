import React from 'react'
import {Session} from 'meteor/session'
import {Tracker} from 'meteor/tracker'

export default class LinksListFilters extends React.Component{
  constructor(props){
    super(props);
    this.state={
      checked: false
    }
  }
  componentDidMount(){
    Tracker.autorun(()=>{
      if(Session.get('showVisible')===true) this.setState({checked:false})
      else this.setState({checked:true})
    })
  }
  componentWillMount(){

  }
  render(){
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={this.state.checked} onChange={(e)=>Session.set('showVisible',!e.target.checked)}/>
          Show Hidden Links
        </label>
      </div>
    )
  }

}
