import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Link} from 'react-router-dom';

export default class Login extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      error: ""
    }
  }

  onSubmit(e){
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email},password,(err)=>{
      err? this.setState({error: err.reason}):this.setState({error: ""})
    })

    // this.setState({
    //   error: "Something went wrong"
    // })
  }

  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login to Short Lnk</h1>
          {this.state.error? <p>{this.state.error}</p>:undefined}
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <input type="submit" name="submit" value="Submit" className="button"/>
          </form>
          <Link to="/signup">Don't have an account?</Link>
        </div>
      </div>
    )
  }
}
