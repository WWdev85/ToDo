function log(app, operation ,task){
    const mongo =require('../node_modules/mongodb');
    const mailer = require('express-mailer');


    const client = new mongo.MongoClient('mongodb://localhost:27017',{useNewUrlParser:true, useUnifiedTopology: true});
    
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

  



     function login(db ,task) {
             return new Promise (resolve =>{
                db.collection('Users').find({ email :  { $eq: task[0], },}).toArray((err, data) => {
                    if(data.length === 1){
                  
                        if (data[0].password === task[1]){
                        resolve(data[0].email);
                        client.close();
                        
                        }else{
                        resolve("0");
                        client.close();
                        }
                     }
                     else{
                        resolve("0");
                        client.close();
                     }
 
                 }) 

             })

    }

    function validate(code, db ,data) {
        app.post('/validation/:index', (req, res) => {
            const {index} = req.params;
            let task = JSON.parse(index);
               validation = task ;
               if(validation == code){
                   res.json(true);
                   res.end();

                   db.createCollection(data[0]);
                   collection.insertOne(
                    {
                    email: data[0],
                    password: data[1],
                    }) 
                    setTimeout(() => {
                        client.close();
                    }, 1000);  
               }
               else{
                   res.json(false);
                   res.end();
               }
               
            });

    }

    function register(db ,task) {
        return new Promise (resolve =>{
            collection = db.collection('Users');
           db.collection('Users').find({ email :  { $eq: task[0], },}).toArray((err, data) => {
               if(data.length !== 1){
                    
                   if (task[2] === task[1]){
                    let code = Math.floor((9999 - 1000) * Math.random());
                    mailer.extend(app, {
                        from: 'no-reply@example.com',
                        host: 'smtp.gmail.com', // hostname
                        secureConnection: true, // use SSL
                        port: 465, // port for secure SMTP
                        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
                        auth: {
                        user: 'wasekw@gmail.com',
                        pass: ''
                    }
                  });
                    app.mailer.send('email', {
                        to: task[0] , 
                        subject: 'Rejestracja w aplikacji ToDOApp kod', 
                        code: code 
                    }, function (err) {
                        if (err) {   
                        console.log(err);
                        return;
                        }
                    });

                 
                    
                    validate(code , db,task);
                    resolve("1");
                       
                    
                   }else{
                   resolve("2");
                   client.close();
                   }
                }
                else{
                   resolve("0");
                   client.close();
                }

            }) 

        })

}

    async function asyncCall(db, task){
        const result = await login(db,task);
        return(result);
    }

    async function asyncReg(db, task){
        const result = await register(db,task);
        return(result);
    }
    let result;
    client.connect(err => { 
        if (err){
            console.log('Błąd Połączenia!', err);
            } else {
                console.log('połączenie Udane!');
                    const db = client.db('ToDoApp');

                    switch(operation){

                        case 'login':
                            setTimeout(() => {  
                                result = asyncCall(db, task);
                               },50);
                            break;

                        case 'register':
                            setTimeout(() => {  
                                result = asyncReg(db, task);
                               },50);
                             break;  
                    
                    }
                   
                    
            }
            
    });
    
 
       return new Promise (resolve =>{
        setTimeout(() => {  
            resolve(result);    
           },100);
           
       })

}

module.exports = log;