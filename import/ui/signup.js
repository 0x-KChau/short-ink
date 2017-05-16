import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component{
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

    if(password.length<8) return this.setState({error:"Password must be at least 8 characters"})

    Accounts.createUser({email, password}, (err)=>{
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
          <h1>Signup to Short Lnk</h1>
          {this.state.error? <p>{this.state.error}</p>:undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <input type="submit" name="submit" value="Submit" className="button"/>
          </form>
          <Link to="/Login">Already have an account?</Link>
        </div>
      </div>
    )
  }
}
