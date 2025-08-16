 const mongoose=require('mongoose')
 const mongosepagiate=require('mongoose-paginate-v2')
const contactSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    }
})
contactSchema.plugin(mongosepagiate)

const contact=mongoose.model("Contact",contactSchema);//(name,which shema )
module.exports=contact; 
