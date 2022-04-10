import React  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={productname:'',id:'',date:'',products:[],quantity:'',money:'',expirydate:'',imagename:'',imagesrc:'',errormsg:'',errormsg1:''};
    }

    productsadd = ()=>
    {
      
      if(this.state.expirydate!='' && this.state.productname!='' && this.state.quantity>0 && this.state.money>0)
      {

        this.setState({products:[...this.state.products,{
          productname:this.state.productname,
        quantity:parseInt(this.state.quantity),
      money:parseFloat(this.state.money),
        expirydate:this.state.expirydate}]},()=>{console.log(this.state);this.setState({productname:'',quantity:'',money:'',expirydate:''})});
      }
    
    
   
    }
    
    imagesubmission=()=>
    {
     

     if(this.state.imagesrc!='' && this.state.imagename!='')
     {

       var file = document.getElementById('imagesrc').files[0];
       var reader = new FileReader();
       reader.readAsDataURL(file);
       reader.addEventListener("load",()=> {
        //  console.log(reader.result)
         axios.post('http://localhost:3000/image/add',{productname:this.state.imagename,imagesrc:reader.result})
         .then((data)=>{console.log(data.data);this.setState({imagesrc:'',imagename:''})})
         .catch((err)=>{console.log(err)})
       
      
     })
    } 
    }

    productssubmission=()=>
    {
      
      if(this.state.products.length>0 && this.state.id!='' )
      {
        let date = new Date();
        date=JSON.stringify(date);
        date=date.slice(1,date.indexOf('T'));
        this.setState({date:date},()=>{
          console.log(this.state.date,this.state.products,this.state.id)
          axios.post('http://localhost:3000/products/add',{id:this.state.id,date:this.state.date,products:this.state.products})
          .then((data)=>{console.log(data)})
          .catch((err)=>{console.log(err)})
        });

      }
    }

    handlechange=(e)=>
    {
      this.setState({[e.target.name]:e.target.value,errormsg:'',errormsg1:''},()=>{
        let a=/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
       if(e.target.name=='quantity' )
      {
        if( this.state.quantity<=0)
        {
          this.setState({errormsg:'*Quantity should be greater than zero'});
        }
        else 
        {
          console.log(this.state.quantity);
          this.setState({quantity:parseInt(this.state.quantity)});
        }
      }
      else if(e.target.name=='money' &&this.state.money<=0)
      {
        this.setState({errormsg:'*Amount should be greater than zero'});
      }
      else if(e.target.name=='id' && !a.test(this.state.id))
      {
           this.setState({errormsg:'*Enter valid email'});
      }
      else if(e.target.name=='productname')
      {
        if(this.state.productname.trim()=='')
        {
          this.setState({productname:''});
        }
        else{
          this.setState({productname:this.state.productname.trim()});
        }
      }

      else if(e.target.name=='imagename')
      {
        if(this.state.imagename.trim()=='')
        {
          this.setState({imagename:''});
        }
        else{
          this.setState({imagename:this.state.imagename.trim()});
        }
          
      }
      })
      
      
    }
   
    handleblur =(e)=>
    {
      if(e.target.name=='imagename' && this.state.imagename=='')
      {
        this.setState({errormsg1:'*Productname is required'});
      }
      else if(e.target.name=='imagesrc' && this.state.imagesrc=='')
      {
        this.setState({errormsg1:'*Image is required'});
      }
      else if(e.target.name=='expirydate' && this.state.expirydate=='')
      {
        this.setState({errormsg:'*Expirydate is required'});
      }
     else if(e.target.name=='productname' && this.state.productname=='')
      {
        this.setState({errormsg:'*Productname is required'});
      }
      else if(e.target.name=='quantity' && this.state.quantity<=0)
      {
        this.setState({errormsg:'*Quantity is required'});
      }
      else if(e.target.name=='money' &&this.state.money<=0)
      {
        this.setState({errormsg:'*Amount is required'});
      }
      else if(e.target.name=='id' && this.state.id=='')
      {
           this.setState({errormsg:'*Enter valid email'});
      }
      else{
        this.setState({errormsg:''});
      }
    }
    
    hideproductform=()=>
    {  
        document.getElementById('frontpageoption2').style.display="none";
        document.getElementById('frontpageoption1').style.display="block";
    }

    hideimageform=()=>
    {
        document.getElementById('frontpageoption1').style.display="none";
        document.getElementById('frontpageoption2').style.display="block";  
    }
    render()
    {
        return <>
        {/* <div id='layout'> */}
       
                <div id="frontpagelayout">
                    <div id='frontpageoptions'>
                    <button className="btn btn-outline-secondary" onClick={this.hideproductform}>
                        Add Image
                    </button >

                    <button className="btn btn-outline-secondary" onClick={this.hideimageform}>
                        Add Product
                    </button>
                    </div>
                    <div id='frontpageoption1'>
                      <div className="row g-3">
                        <div className="col-md-12">
                          <input type="text" value={this.state.imagename} onBlur={this.handleblur} onChange={this.handlechange} className="form-control" id="imagename" placeholder="imagename" name='imagename'/>
                        </div>
                        <div className="col-md-12">
                          <input type="file" value={this.state.imagesrc} onBlur={this.handleblur} onChange={this.handlechange} className="form-control" id="imagesrc" placeholder="imagesrc" name='imagesrc'/>
                        </div>
                        <div className="col-12">
                        <button onClick={this.imagesubmission} disabled={this.state.errormsg || !this.state.imagename || !this.state.imagesrc} className="btn btn-primary">Submit</button>
          
                        </div>
                    {this.state.errormsg1 && <p class='validationwarning'>{this.state.errormsg1}</p>}

                      </div>

                    </div>
                    <div id='frontpageoption2'>
                    <div className="row g-3">
                      <div className="col-md-7">
                        <input type="text" value={this.state.id} onBlur={this.handleblur} onChange={this.handlechange} className="form-control" id="id" placeholder="id" name='id'/>
                      </div>
                     
                      
                      <div className="col-md-6">
                        
                    <input type="text" value={this.state.productname} onBlur={this.handleblur} onChange={this.handlechange} className="form-control" id="productname" placeholder="ProductName" name='productname'/>
                      </div>
                      <div className="col-md-3">
                       
                        <input type='number' value={this.state.money} onBlur={this.handleblur} onChange={this.handlechange}  className="form-control" id="money"placeholder="Amount" name='money'/>
                        
                      </div>
                      <div className="col-md-3">
                        
                        <input type="number" value={this.state.quantity} onBlur={this.handleblur} onChange={this.handlechange} className="form-control" id="quantity" placeholder="Qty" name='quantity'/>
                      </div>
                      
                      <div className="col-md-5">
                       
                        <input type="date" className="form-control"onBlur={this.handleblur}  onChange={this.handlechange} value={this.state.expirydate} id="expirydate" placeholder="Expirydate" name='expirydate'/>
                       
                      </div>
                      <div className="col-12" id='buttonclass'>
                      <button disabled={this.state.errormsg || !this.state.productname || !this.state.expirydate || !this.state.money || !this.state.quantity} className="btn btn-primary" onClick={this.productsadd}>add</button>
                        <button  disabled={this.state.errormsg || !this.state.products.length || !this.state.id.trim()} className="btn btn-primary" onClick={this.productssubmission}>Proceed</button>
                      </div>
                    {this.state.errormsg && <p class='validationwarning'>{this.state.errormsg}</p>}

                  </div>

                    </div>
                </div>
                {/* </div>  */}
               </>
               
    }
}
export default App;