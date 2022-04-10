const {cs} = require('../modal');

exports.logincontroller = async(req,res)=>
{
    try{
        const data = await cs.findOne({id:req.body.id,password:req.body.password});
        if(data)
        {
            res.cookie('user',{id:req.body.id},{signed:true});
            res.send({status:"success",message:"logged in successfully"});
        }
        else{
            res.send({status:"failure",message:"enter valid credentials"});
        }
    }
    catch(err)
    {
        res.send({status:"failure",message:err});
    }
}