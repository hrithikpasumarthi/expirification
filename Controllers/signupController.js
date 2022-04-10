const {cs} = require('../modal')
const {signupvalidator} = require('../validators/credentialvalidators')
exports.signupcontroller = async (req,res)=>
{
    try{
        let validatordata= await signupvalidator(req.body.id,req.body.password);
        if(validatordata.status=="success")
        {
            await cs.create({id:req.body.id,password:req.body.password});
            res.cookie('user',{id:req.body.id},{signed:true});
            res.send({status:"success",message:"signed up  successfully"});

        }

        else{
            res.send(validatordata);
        }
    }
    catch(err)
    {
        res.send({status:"failure",message:err});

    }
}