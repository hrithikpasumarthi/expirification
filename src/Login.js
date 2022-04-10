import React from 'react';
import wallpaper from './image/wallpaper.PNG';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'
class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={id:'',password:'',idmessage:'',passwordmessage:'',submitmessage:''};
    }
     handlechange=(e)=>
    {
        this.setState({[e.target.name]:e.target.value,[e.target.name+"message"]:''},()=>{
            if(e.target.name=="id")
            {
                let a=/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
                 if(!a.test(this.state[e.target.name]))
                 {
                    this.setState({[e.target.name+"message"]:'*Enter valid email'})
                 } 
            }
        });
        
    }
    handleblur=(e)=>
    {
       
        if(this.state[e.target.name]=='' || this.state[e.target.name].trim()=='')
        {
            this.setState({[e.target.name+"message"]:'*field is required'})
        }
    }
    handlesubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3000/login',{id:this.state.id.trim(),password:this.state.password.trim()}
        , {
            withCredentials:true
          }
            )
        .then((data)=>{
            if(data.data.status=='success')
            {
                localStorage.setItem('isloggedin','true');
                this.setState({submitmessage:''});
                this.props.history.replace('/dashboard');
            }
            else{
                if(data.data.message)
                {
                    this.setState({submitmessage:data.data.message});
                   
                }
                this.props.history.replace('/login');
            }
        })
        .catch((err)=>console.log(err));
    }
    render()
    {
        return (<div id='layout'>
        <div id="navbar">
            <div onClick={()=>{this.props.history.replace('/signup')}}>
                Signup
            </div>
            <div onClick={()=>{this.props.history.replace('/login')}}>
                Login
            </div>
        </div>
        <div id='main'>

        <div id='totallayout'>
            <div id='leftpart'>
            <img src={wallpaper} />
            </div>

            <div id='righthalf'>
                <div>
                <h4>
                    Login
                </h4>
                </div>
                <div id='rightpart' >
                    <input type='text' className='form-control' placeholder='Email id' name='id' onChange={this.handlechange} onBlur={this.handleblur} value={this.state.id}/>   
                   
                    {this.state.idmessage && <p className='warning'>{this.state.idmessage}</p>}
                    <input type='password' className='form-control' placeholder='Password' name='password' onChange={this.handlechange} onBlur={this.handleblur} value={this.state.password}/>
                    
                    {this.state.passwordmessage && <p className='warning'>{this.state.passwordmessage}</p>}

                     <button disabled={this.state.idmessage || this.state.passwordmessage ||!this.state.id || !this.state.password } onClick={this.handlesubmit} className='btn btn-primary'>
                        Submit
                     </button>
                     <br/>
                     {(this.state.submitmessage!='') && <p className='warning'>*{this.state.submitmessage}</p>}
                </div>
            </div>
        </div>
        </div>
       
        </div>)
    
    }
}
export default Login;