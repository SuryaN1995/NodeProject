var {mongoose} = require('../db/mongoose')

var Todo = mongoose.model('Todos',{
    text:{
        type:String,
        required : true,
        minlength:1,
        trim:true
    },completed:{
        type:Boolean,
        default:false
    },_creator :{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
})

module.exports = {Todo}