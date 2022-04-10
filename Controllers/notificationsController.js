const {ns, up} =require('../modal');
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
exports.getnotifications = async (req,res)=>
{
    try{
        if(req.signedCookies.user==false)
        {
            res.send({status:"failure",message:"try logging again"});
        }
        else{
            let notifications = await ns.findOne({id:req.signedCookies.user.id},{_id:0,__v:0});
           res.send({status:"success",notifications})
        }
    }
    catch(err)
    {
        res.send({status:"failure",message:err});
    }
}

exports.setnotificationscount = async(req,res)=>
{
    try{
        if(req.signedCookies.user==false)
        {
            res.send({status:"failure",message:"try logging again"});
        }
        else{
            let notifications = await ns.findOne({id:req.signedCookies.user.id});
            notifications.count=0;
            await ns.findOneAndUpdate({id:req.signedCookies.user.id},notifications);
            res.send({status:"sucess",message:"count set to zero"})
        }
    }
    catch(err)
    {
        res.send({status:"failure",message:err});
    }
}

exports.expirestoday = async (date)=>
{
    date= date.addDays(1);
    date=JSON.stringify(date);
  console.log(date);
    date=date.slice(1,date.indexOf("T"));
    let expiredproducts = await up.find({expirydate:date});
    for (let i=0;i<expiredproducts.length;i++)
    {
        expiredproducts[i].expired=true;
        let data = await ns.findOne({id:expiredproducts[i].id});
        if(data)
        {
            data.count+=1;
            data.notifications=[expiredproducts[i].productname+" bought on "+expiredproducts[i].purchasedate+" is expired",...data.notifications];
            await ns.findOneAndUpdate({id:expiredproducts[i].id},data);
        }
        else{
            await ns.create({id:expiredproducts[i].id,count:1,notifications:[expiredproducts[i].productname+" bought on "+expiredproducts[i].purchasedate+" is expired"]});
        }
        await up.findOneAndUpdate({id:expiredproducts[i].id,productid:expiredproducts[i].productid},expiredproducts[i])
    }
}

exports.expiresinfuture = async (date,type,count)=>
{
    date= date.addDays(count);
    date=JSON.stringify(date);
  console.log(date);

    date=date.slice(1,date.indexOf("T"));
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
            await ns.create({id:expiredproducts[i].id,count:1,notifications:[expiredproducts[i].productname+" bought on "+expiredproducts[i].purchasedate+" is going to expire in one "+type+" ("+expiredproducts[i].expirydate+")"]});
        }
    }
}