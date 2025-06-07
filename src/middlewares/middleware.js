const flash = require('connect-flash')

exports.Global = (req,res,next) => {
    res.locals.errors = req.flash('errors')
    next()
}