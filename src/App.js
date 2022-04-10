import React from 'react';
import Login from './Login';
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom'
import Signup from './Signup';
import Dashboard from './Dashboard';
class App extends React.Component
{
    render()
    {
      // console.log("app")
      return(
      
        <Router>
         <Switch>
        <Route  exact path='/' >
          <Redirect to='/login'/>
          </Route>
        <Route  path='/login' component={Login}/>
        <Route  path='/signup' component={Signup}/>
        <Route path='/dashboard' render={(props)=>{
          if(localStorage.getItem('isloggedin'))
          {
            return  <Dashboard/>
          }
          else{
            return <Redirect to='/login' />
          }
        }}/>
        {/* <Route path='/dashboard' component={Dashboard} /> */}

         </Switch>
        </Router>
      )
    }
}
export default App;