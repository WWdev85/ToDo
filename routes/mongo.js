function dataBase (operation , collectionName, task){


    const mongo =require('../node_modules/mongodb');


    let client = new mongo.MongoClient('mongodb://localhost:27017',{useNewUrlParser:true, useUnifiedTopology: true});
let i = 0;


    function load(collection) { 
        return new Promise (resolve =>{
            collection.find({}).toArray((err, data) => {    
                resolve(data);           
            })
            setTimeout(() => {
                client.close();
            }, 1000);
        })
    };

    function add(collection) {
        collection.insertOne(
            {
            id: task.id,
            text: task.text,
            date: task.date,
            important: task.important,
            isDone: task.isDone,
            finished: task.finished,
            inTrash: task.inTrash,
            }) 
            setTimeout(() => {
                client.close();
            }, 1000);    
   
    }

    function update(collection ) {
        collection.updateOne({
            id :  { $eq: task.id, },
        },
        {
            $set: {
            id: task.id,
            text: task.text,
            date: task.date,
            important: task.important,
            isDone: task.isDone,
            finished: task.finished,
            inTrash: task.inTrash,
            }
        }) 
        setTimeout(() => {
            client.close();
        }, 1000);
        
    }

    function deleteItem(collection) {
        collection.deleteOne({
            id :  { $eq: task.id, },
        },) 
        setTimeout(() => {
            client.close();
        }, 1000);
        }
  


    async function asyncCall(collection){
        const result = await load(collection);
        return(result);
    }
    
   
    let result
    client.connect(err => { 
        if (err){
            console.log('Błąd Połączenia!', err);
            } else {
              
                    const db = client.db('ToDoApp');
                    let collection = db.collection(collectionName + "");
                    switch(operation){

                        case 'load':
                            asyncCall(collection);
                            setTimeout(() => {  
                                result = asyncCall(collection);
                               },50);
                            break;

                        case 'update':
                            update(collection);
                             break;  
                             
                         case 'delete':
                             deleteItem(collection);
                             break;   
                             
                         case 'add':
                             add(collection);
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

module.exports = dataBase;