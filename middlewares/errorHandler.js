const errorHandle = (err,req,res,next,easd)=>{
    const statusCode= res.statusCode === 200 ? 500 : statusCode;
    res.status(statusCode).json({message: err.messag})
}
const errorURL = (req,res,next)=>{

    const error = new Error(`not found - ${req.originalUrl}`);
    res.status(404);
    next(error)
}

module.exports = {errorHandle, errorURL};
