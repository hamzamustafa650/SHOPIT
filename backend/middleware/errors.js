const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal Server Error";
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      error: err.stack,
    });
  }
  if (process.env.NODE_ENV==='PRODUCTION')
  {
      let error = {...err}
      if(err.name== 'CastError'){
          const message =`Resouces not found . invalid :${err.path}`
          error = new ErrorHandler(message, 400)
      }

      if(err.name == 'ValidationError'){
          const message = object.values(err.errors).map(value => value.message);
          error = new ErrorHandler(message,400)
      }
      error.message = err.message
      res.status(error.statusCode).json({
          success:false,
          error:err.message || 'internal Server error'
      })
   
  }
}


