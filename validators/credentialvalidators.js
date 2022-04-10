const {cs}= require('../modal')
exports.signupvalidator = async (id,password)=>
{   
    let data= await cs.findOne({id:id});
    if(data)
    {
    return {status:"failure",message:"account  exists for the given id"};
    }
    let a=/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if(id!='' && a.test(id) && password!='')
    {
        return {status:"success"}
    }
    else {
        return {status:"failure",message:"enter valid Credentials"};
    }
    
}

