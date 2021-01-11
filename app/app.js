const cookieSession = require('cookie-session');
const express = require('express');
const path = require('path');

const app = express();

const dataBase = require('../routes/mongo');
const log = require('../routes/log');

let collectionName;

app.listen(3000  , ()=>{
    console.log('Server is listening at http://localhost:3000',path.join(__dirname, '../', 'build'));
} );

app.use(express.static(
    path.join(__dirname, '../', 'build'),
));

app.use(cookieSession({
    name: 'session',
    keys: ['Putas'],
    maxAge: 60*1000
}))



app.post('/register/:index', (req, res) => {
    const {index} = req.params;
    let task = JSON.parse(index);
        const result =  log(app,'register',task);
        let reg
        result.then((value) => {
             reg = value
        })

        setTimeout(() => { 
            res.json(reg);
            res.end();

        },200);
    });

 app.post('/log/:index', (req, res) => {
    const {index} = req.params;
    let task = JSON.parse(index);
        const result =  log(app, 'login',task);
        let login
        result.then((value) => {
             login = value
        })
        
        setTimeout(() => {
            if(login !== '0'){
                req.session.user = 1;
               collectionName = login;
               res.json(true);
                    
                  
                 res.end();
            }else{
                res.json(false);
                res.end();
            }
            
        },200);
    });
    
    app.get('/data', (req, res) => {
       const result = dataBase('load' ,collectionName); 
       let task
        result.then((value) => {
             task = value
        })

        setTimeout(() => {
               res.json({task}); 
               res.end();
        },200);

   
    });

    app.get('/isLogged', (req, res) => {
        if(req.session.user === 1){
            res.json(req.session.user);
            res.end();
        }else{
            res.json(0);
            res.end()
        }
    })

    app.post('/logout', (req, res) => {
        req.session.user = 0;
        res.json(req.session.user);
        res.end();
        
    })
 
    app.post('/update/:index', (req, res) => {
        const {index} = req.params;
        let task = JSON.parse(index);
        dataBase('update' ,collectionName, task); 
        
        res.end();                  
        });
 
    app.post('/delete/:index', (req, res) => {
        const {index} = req.params;
        let task = JSON.parse(index);
        dataBase('delete', collectionName,task);
        res.end();                  
        });  
        
     app.post('/save/:index', (req, res) => {
        const {index} = req.params;
        let task = JSON.parse(index);
        dataBase('add', collectionName,task);
                 
        });    
  