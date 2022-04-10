import React from 'react';
import axios from 'axios';
import './Dashboard.css';
import {withRouter} from 'react-router';
import medicine from './image/medicine.jpg'

class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={imagesrc:'',start:0,end:9,nstart:0,nend:5,data:[],
    notifications:[],notificationscount:0,flag:0} ;
    }
    componentDidMount()
    {
        axios.post('http://localhost:3000/products',{start:this.state.start,end:this.state.end}
        , {
            withCredentials:true
          })
        .then((data)=>{
            if(data.data.status=="success")
            {
                this.setState({data:data.data.data})
            }
            else{
                this.props.history.replace('/login');
                localStorage.removeItem('isloggedin')
            }
        })
        .catch((err)=>{console.log(err)})
        axios.get('http://localhost:3000/notifications/get', {
            withCredentials:true
          })
        .then((data)=>{
            if(data.data.status=="success")
            {
                if(data.data.notifications.notifications)
                {

                this.setState({notifications:data.data.notifications.notifications,notificationscount:data.data.notifications.count})
                }

            }
        })
        .catch((err)=>{console.log(err)})
    }
     shrink=()=>{
       if(this.state.flag==0)
       {
           document.getElementById('smalldashboardsidebar').style.visibility='hidden';
           document.getElementById('largedashboardsidebar').style.visibility='visible';
           this.setState({flag:1});
       }
       else{
        document.getElementById('largedashboardsidebar').style.visibility='hidden';
        document.getElementById('smalldashboardsidebar').style.visibility='visible';
        this.setState({flag:0});
       }
     }  
     logout =()=>
     {
         axios.get('http://localhost:3000/clearcookies', {
            withCredentials:true
          })
         .then((data)=>{
            localStorage.removeItem('isloggedin');
             this.props.history.replace('/login')})
         .catch((err)=>console.log(err))
     }
     getnotifications = ()=>
     {
         
         if(this.state.notificationscount!=0)
         {
             this.setState({notificationscount:0});
         axios.get('http://localhost:3000/notifications/setcount', {
            withCredentials:true
          })
         .then((data)=>{})
            .catch((err)=>{console.log(err)})
         }
         if(!document.getElementById('dashboardnotifications').style.display || document.getElementById('dashboardnotifications').style.display=='none')
         {
            document.getElementById('dashboardnotifications').style.display='block'
         }
         else{
            document.getElementById('dashboardnotifications').style.display='none'
         }

     }
     nextsetofnotifications = ()=>
     {
        if(this.state.notifications.length-this.state.nend >0)
        {
            this.setState({nstart:this.state.nstart+5,nend:this.state.nend+5})
        }
     }
     prevsetofnotifications = ()=>
     {
        if(this.state.nstart >0)
        {
            this.setState({nstart:this.state.nstart-5,nend:this.state.nend-5})
        }
     }
     prevsetofproducts =()=>
     {
        if(this.state.start >0)
        {
            this.setState({start:this.state.start-9,end:this.state.end-9},()=>{
                axios.post('http://localhost:3000/products',{start:this.state.start,end:this.state.end}, {
                    withCredentials:true
                  })
                .then((data)=>{
                    if(data.data.status=="success" && data.data.data!=[])
                    {
                        this.setState({data:data.data.data})
                    }
                    else{
                        this.props.history.replace('/login')
                    }
                })
                .catch((err)=>{console.log(err)})
            })
        }
     }
     nextsetofproducts =()=>
     {
        
            this.setState({start:this.state.start+9,end:this.state.end+9},()=>{
                axios.post('http://localhost:3000/products',{start:this.state.start,end:this.state.end}, {
                    withCredentials:true
                  })
                .then((data)=>{
                    if(data.data.status=="success" && data.data.data.length!=0)
                    {
                        this.setState({data:data.data.data})
                    }
                    else if (data.data.data.length==0)
                    {
                        console.log('not there')
                    }
                    else{
                        this.props.history.replace('/login')
                    }
                })
                .catch((err)=>{console.log(err)})
            })
        
     }
    render()
    {
        return (<>
        <div id='dashboardnavbar'>
            <div onClick={this.logout}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17 17.25V14h-7v-4h7V6.75L22.25 12 17 17.25"></path><path d="M13 2a2 2 0 0 1 2 2v4h-2V4H4v16h9v-4h2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9z"></path></svg>
            </div>
            <div onClick={this.getnotifications}>    
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M11.5 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"></path><path d="M18 16v-5.5c0-3.07-2.13-5.64-5-6.32V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5v.68c-2.87.68-5 3.25-5 6.32V16l-2 2v1h17v-1l-2-2z"></path></svg>
            <span className="position-absolute top-5 right-15  translate-middle badge rounded-pill bg-danger">
            {this.state.notificationscount}
            <span className="visually-hidden">unread messages</span>
        </span>
            </div>
        </div>
        <div id='dashboardnotifications'>
            <p id='dashboardnotificationsheading'>
                Notifications
            </p>
            {(this.state.notifications.length!=0) &&
            <>
               { this.state.notifications.slice(this.state.nstart,this.state.nend).map((notification)=>
                {
                    return <div>
                        {notification}
                        </div>
                })}
                <p id="narrow">
                    <div id='nleft' onClick={this.prevsetofnotifications}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
                    </div>
                    <div id='nright' onClick={this.nextsetofnotifications}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                    </div>
                </p>
                    </>
            }

            {(this.state.notifications.length==0) &&
            <div>
                No notifications are available right now
                </div>
            }
        </div>
        <div id='smalldashboardsidebar'>
            <div id="dashboardsidebaricon" onClick={this.shrink}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path d="M4 14h4v-4H4v4z"></path><path d="M4 19h4v-4H4v4z"></path><path d="M4 9h4V5H4v4z"></path><path d="M9 14h12v-4H9v4z"></path><path d="M9 19h12v-4H9v4z"></path><path d="M9 5v4h12V5H9z"></path></svg>
            </div>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
            </div>
            <div onClick={()=>{this.props.history.replace('/dashboard')}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path d="M3 13h8V3H3v10z"></path><path d="M3 21h8v-6H3v6z"></path><path d="M13 21h8V11h-8v10z"></path><path d="M13 3v6h8V3h-8z"></path></svg>      
            </div>
            <div onClick={this.logout}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path d="M17 17.25V14h-7v-4h7V6.75L22.25 12 17 17.25"></path><path d="M13 2a2 2 0 0 1 2 2v4h-2V4H4v16h9v-4h2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9z"></path></svg>
            </div>
        </div>
        <div id='largedashboardsidebar'>
            <div id="dashboardsidebaricon" onClick={this.shrink}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path d="M4 14h4v-4H4v4z"></path><path d="M4 19h4v-4H4v4z"></path><path d="M4 9h4V5H4v4z"></path><path d="M9 14h12v-4H9v4z"></path><path d="M9 19h12v-4H9v4z"></path><path d="M9 5v4h12V5H9z"></path></svg>
            </div>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
            Home
            </div>
            <div onClick={()=>{this.props.history.replace('/dashboard')}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path d="M3 13h8V3H3v10z"></path><path d="M3 21h8v-6H3v6z"></path><path d="M13 21h8V11h-8v10z"></path><path d="M13 3v6h8V3h-8z"></path></svg>      
            Dashboard
            </div>
            <div onClick={this.logout}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path d="M17 17.25V14h-7v-4h7V6.75L22.25 12 17 17.25"></path><path d="M13 2a2 2 0 0 1 2 2v4h-2V4H4v16h9v-4h2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9z"></path></svg>
            Logout
            </div>
        </div>

        <div id='dashboardcardcontainer'>
            {this.state.data.map((product,idx)=>{  
                
                // axios.post("http://localhost:3000/image",{productname:product.productname})
                // .then((data)=>{this.setState({["imagesrc"+idx]:data.data.imagesrc})})
                // .catch((err)=>{console.log(err)})

                return  (<div className='dashboardcard'>
                            <div className='dashboardcardimagepart' >
                                {/* {console.log(imagesrc)} */}
                                <img className='dashboardcardimage' src={medicine} />
                                {(product.expired==true) && <h1 className='dashboardcardimagecontent'>Expired</h1>}
                            </div> 
                            <div className='dashboardcontent'>
                                <ul>
                                    <li>
                                        <b>Product</b> : {product.productname}
                                    </li>
                                    <li>
                                       <b> Purchasedate </b>: {product.purchasedate}
                                    </li>
                                    <li>
                                        <b>Expirydate</b> : {product.expirydate}
                                    </li>
                                    <li>
                                       <b>Quantity</b>  : {product.quantity}
                                    </li>
                                    <li>
                                        <b>Amount</b> : {product.money}
                                    </li>
                                </ul>
                            </div>
                        </div>) 
               })} 
              
        </div>
        {
            (this.state.data.length>0) &&

        <div id="arrow">
                    <div id='left' onClick={this.prevsetofproducts}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
                    </div>
                    <div id='right' onClick={this.nextsetofproducts}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                    </div>
        </div>
        }
        </>)
    }
}
export default withRouter(Dashboard);
// export default Dashboard;