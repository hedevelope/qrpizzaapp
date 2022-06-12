const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://batu3854:nahutab0@cluster0.z61vs.mongodb.net/qr-pizza'

mongoose.connect(mongoURL , {useUnifiedTopology:true , useNewUrlParser:true})

var db = mongoose.connection

db.on('connected' , ()=>{
    console.log('Veritabanına başarıyla bağlandı');
})

db.on('error' , ()=>{
    console.log(`Veritabanı bağlantısı yapılamadı`);
})

module.exports =mongoose