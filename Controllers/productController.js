const {up,ns}= require('../modal');

exports.getproducts = async (req,res)=>
{
    try{

        if(req.signedCookies.user==false)
        {
            res.send({status:"failure",message:"try logging again"});
        }
        else{
            let data = await up.find({id:req.signedCookies.user.id},{__v:0,_id:0});
            data=data.slice(req.body.start,req.body.end);
           
           res.send({status:"success",data})
        }
    }
    catch(err)
    {
        res.send({status:"failure",message:err});
    }
}

exports.addproducts = async (req,res)=>
{
    try{

        for(let i=0;i<req.body.products.length;i++)
        {
            req.body.products[i].productid=req.body.products[i].productname+req.body.date+req.body.products[i].money+req.body.products[i].expirydate;
            let data = await up.findOne({id:req.body.id,productid:req.body.products[i].productid});
            if(data)
            {
                data.quantity=data.quantity+req.body.products[i].quantity;
                await up.findOneAndUpdate({id:req.body.id,productid:req.body.products[i].productid},data);
            }
            else{
            req.body.products[i].expired=false;
            await up.create({id:req.body.id,purchasedate:req.body.date,...req.body.products[i]})
            }
        }

        res.send({status:"success",message:"products are added successfully"})
    }

    catch(err)
    {
        res.send({status:"failure",message:err});
    }
}


exports.expirydate1 = async (req,res)=>
{
    try{
        date='2022-03-20';
        let expiredproducts = await up.find({expirydate:date});
        for (let i=0;i<expiredproducts.length;i++)
        {
            expiredproducts[i].expired=true;
            let data = await ns.findOne({id:expiredproducts[i].id});
            // console.log(data);
            if(data)
            {
                data.count+=1;
                data.notifications=[expiredproducts[i].productname+" bought on "+expiredproducts[i].purchasedate+" is expired",...data.notifications];
                await ns.findOneAndUpdate({id:expiredproducts[i].id},data);
            }
            else{
                await ns.create({id:expiredproducts[i].id,count:1,notifications:[expiredproducts[i].productname+" brought on "+expiredproducts[i].purchasedate+" is expired"]});
            }
            await up.findOneAndUpdate({id:expiredproducts[i].id,productid:expiredproducts[i].productid},expiredproducts[i])
        } 
        res.send({status:"success",message:"products are updated"})
    }

    catch(err)
    {
        res.send({status:"failure",message:err});
    }
}

exports.expirydate2 = async (req,res)=>
{
    try{
        let date='2022-03-20';
        let type='month';
        let expiredproducts = await up.find({expirydate:date});
    for (let i=0;i<expiredproducts.length;i++)
    {
        let data = await ns.findOne({id:expiredproducts[i].id});
        if(data)
        {
            data.count+=1;
            data.notifications=[expiredproducts[i].productname+" bought on "+expiredproducts[i].purchasedate+" is going to expire in one "+type+" ("+expiredproducts[i].expirydate+")",...data.notifications];
            await ns.findOneAndUpdate({id:expiredproducts[i].id},data);
        }
        else{
            await ns.create({id:expiredproducts[i].id,count:1,notifications:[expiredproducts[i].productname+" brought on "+expiredproducts[i].purchasedate+" is going to expire in one "+type+" ("+expiredproducts[i].expirydate+")"]});
        }
    }
        res.send({status:"success",message:"products are updated"})
        
    }

    catch(err)
    {
        res.send({status:"failure",message:err});
    }
}