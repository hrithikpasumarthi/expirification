var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors= require('cors');
const nodecron=require('node-cron');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var productRouter = require('./routes/products');
var notificationsRouter = require('./routes/notifications');
const {expirestoday,expiresinfuture} = require('./Controllers/notificationsController')
var app = express();

// view engine setup
const nodecronfunction = async ()=>
{
  var date = new Date();
  console.log(date);
  await expirestoday(date);
  await expiresinfuture(date,"day",2);
  await expiresinfuture(date,"week",8);
  await expiresinfuture(date,"month",31);
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use((req,res,next)=>{
  const allowedOrigins = ['http://localhost:3005', 'http://localhost:3006'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,PATCH,POST,DELETE,OPTIONS,PUT");
  next();
});
app.use(cors({
  origin : ['http://localhost:3005','http://localhost:3006'],
  credentials: true,
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('@$*%^!'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/products', productRouter);
app.use('/notifications', notificationsRouter);
nodecron.schedule("59 59 23 * * *",()=>
{
  setTimeout(()=>{nodecronfunction()},2000);
})
app.use('/clearcookies',(req,res)=>
{
  res.clearCookie('user');
  res.send({status:"success",message:"cookies are cleared"})
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
