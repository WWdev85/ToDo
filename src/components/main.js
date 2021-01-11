import React from'react';
import { BrowserRouter , Route, Link, Redirect } from 'react-router-dom';
import Login from './login';
import List from './list';
import Done from './done';
import Add from './add';
import Register from './register';

import Trash from './trash';
import listTool from '../tools/listTool';
import doneTool from '../tools/doneTool';
import trashTool from '../tools/trashTool';
import addTool from '../tools/addTool';
import loginTool from '../tools/loginTool';
import registerTool from '../tools/registerTool';


class App extends React.Component {
    state = {
        registered: false,
        logged: false,
        tasks: [
            // {
            //     id: "1",
            //     text: 'Zrobić pranie',
            //     date: '2020-02-12',
            //     important: false,
            //     isDone:false,
            //     finished:null,
            //     inTrash:false,
            // },
            // {
            //     id: "2",
            //     text: 'Iśc spać',
            //     date: '2021-02-12',
            //     important: true,
            //     isDone:true,
            //     finished: '2020-02-12',
            //     inTrash:false,
            // },
            // {
            //     id: "3",
            //     text: 'Wybudować dom',
            //     date: '2030-04-16',
            //     important: true,
            //     isDone:false,
            //     finished:null,
            //     inTrash:false,
            // },
            // {
            //     id: "4",
            //     text: 'Przytyć',
            //     date: '2020-02-19',
            //     important: true,
            //     isDone:false,
            //     finished:null,
            //     inTrash:false,
            // },
            // {
            //     id: "5",
            //     text: 'Zrobić porządek',
            //     date: '2020-12-12',
            //     important: false,
            //     isDone:false,
            //     finished:null,
            //     inTrash:true,
            // },
        ]

    }
    fromListToDone(id){
        let tempTasks = this.state.tasks.map(task => task);
        let index = tempTasks.findIndex((task) => task.id === id);
        tempTasks[index].isDone= true;
        let date = new Date;
        date = date.toISOString().substring(0 ,10);
        tempTasks[index].finished= date;
        this.update(tempTasks[index]);
        this.setState({
            tasks: tempTasks
        })
    }

    toTrash(id){
        let tempTasks = this.state.tasks.map(task => task);
        let index = tempTasks.findIndex((task) => task.id === id);
        tempTasks[index].inTrash= true;
        this.update(tempTasks[index]);
        this.setState({
            tasks: tempTasks
        })
    }

    listOperations(){
        listTool(this.fromListToDone.bind(this) , this.toTrash.bind(this) );  
    }
    fromDoneToList(id){
        
        let tempTasks = this.state.tasks.map(task => task);
        let index = tempTasks.findIndex((task) => task.id === id);
        tempTasks[index].isDone= false;
        tempTasks[index].finished= null;
        this.update(tempTasks[index]);
        this.setState({
            tasks: tempTasks
        })
    }
    doneOperations(){
        doneTool(this.fromDoneToList.bind(this) , this.toTrash.bind(this) );  
    }
    backFromTrash(id){
        let tempTasks = this.state.tasks.map(task => task);
        let index = tempTasks.findIndex((task) => task.id === id);
        if(index >= 0){
            tempTasks[index].inTrash= false;
            this.update(tempTasks[index]);
         }
        
        this.setState({
            tasks: tempTasks
        })
       
    }
    remove(id){
        let tempTasks = this.state.tasks.map(task => task);
        let index = tempTasks.findIndex((task) => task.id === id);
        if(index >= 0){
            this.delete(tempTasks[index]);
            tempTasks.splice(index,1);
            
         }
        this.setState({
            tasks: tempTasks
        })
        
    }

    trashOperations(){
        trashTool(this.backFromTrash.bind(this), this.remove.bind(this) );  
    }

    addOperations(){
        addTool(this.addTask.bind(this))
    }

    loginOperations(){
            loginTool(this.load.bind(this));    

    }

    registerOperations(){
        registerTool(this.register.bind(this));    

}



    addTask(name, date, important){
        let tempTasks = this.state.tasks.map(task => task);
        let len = tempTasks.length + "";
        console.log(len);
        if(len != 0){
           len = parseInt(tempTasks[tempTasks.length -1].id) + 1 + ""
        }
        let tempTask = {
            id: len ,
            text: name,
            date: date,
            important: important,
            isDone:false,
            finished:null,
            inTrash:false,
        };
        tempTasks.push(tempTask);
        this.setState({
            tasks: tempTasks
        })
        this.save(tempTask);
        
      
    }
    componentDidMount(){
        setInterval(()=> {
            this.isLogged();
        }, 500)
     
    }
    

    load(isLogged){
        fetch('/data', {
            method: 'GET',
        })
        .then(data => data.json() )
        .then(data => {
            if(data.task === undefined){
                this.logout();
            }
           this.setState({
               tasks: data.task
           })
    
        });
        if(isLogged){
            this.setState({
                logged: true
            })
        }
       
    }

    register(valid){
        this.setState({
            registered: valid,
        });
        setTimeout(()=>{
            this.setState({
                registered: false,
            });
        },10000)
          
    }

    save(tempTasks) {
        fetch(`/save/${JSON.stringify(tempTasks)}`, {
            method: 'POST',
        })
     
    }
  
    update(tempTasks) {
        fetch(`/update/${JSON.stringify(tempTasks)}`, {
            method: 'POST',
        })
    }

    delete(tempTasks) {
        fetch(`/delete/${JSON.stringify(tempTasks)}`, {
            method: 'POST',
        })
    }

    logout() {
        fetch(`/logout`, {
            method: 'POST',
        });

        this.setState({
            logged: false,
            tasks: [],
        });  
    }

    isLogged(){
        fetch(`/isLogged`, {
            method: 'GET',
        })
        .then(data => data.json() )
        .then(data => {
            if(data !== 1 && this.state.logged ){
               this.logout();
            }
            if(data === 1 && !this.state.logged ){
                this.load(true);
             }

                
    
        });
    }
  
    render(){
   


        if(this.state.logged){
            setTimeout(() => {
            const logoutBtn = document.querySelector('.nav__link--log');
            logoutBtn.textContent = "wyloguj";
            logoutBtn.addEventListener("click", this.logout.bind(this));
            }, 20)
        }else{
            setTimeout(() => {
                const logoutBtn = document.querySelector('.nav__link--log');
                logoutBtn.textContent = "logowanie";
                logoutBtn.removeEventListener("click", this.logout.bind(this));
                }, 20)
        }
        
        return(
            <BrowserRouter>
                <div className="wrapper">
                    <header className="header">
                        <h1 className="header__title header__title--big">Co masz zrobić dziś, zrób pojutrze,</h1>
                        <h2 className="header__title header__title--small">Będziesz miał dwa dni wolnego!</h2>
                            
                    </header>
                    <nav className="nav">
                         <ul className="nav__list">
                             <li className="nav__listItem"><Link className="nav__link" to="/">Do Zrobienia</Link></li>      
                             <li className="nav__listItem"><Link className="nav__link" to="/done">Zrobione</Link></li>
                             <li className="nav__listItem"><Link className="nav__link" to="/add">Dodaj zadanie</Link></li>
                             <li className="nav__listItem"><Link className="nav__link" to="/trash">Kosz</Link></li>
                             <li className="nav__listItem"><Link className="nav__link nav__link--log" to="/login">Logowanie</Link></li> 
                         </ul>
                    </nav>
                    <section className="router">

                        <Route path="/" exact render={() =><List tasks = {this.state.tasks} logged = {this.state.logged} isLogged = {this.isLogged.bind(this)} list = {this.listOperations.bind(this)} />  } /> 
                        <Route path="/done" render={() => <Done tasks = {this.state.tasks} logged = {this.state.logged} done = {this.doneOperations.bind(this)}/>} />
                        <Route path="/add" render={() => <Add tasks = {this.state.tasks} logged = {this.state.logged} isLogged = {this.isLogged.bind(this)} add = {this.addOperations.bind(this)}/>} />
                        <Route path="/trash" render={() => <Trash tasks = {this.state.tasks} logged = {this.state.logged} trash = {this.trashOperations.bind(this)}/>} />
                        <Route path="/login" render={() => <Login  login = {this.loginOperations.bind(this)} logged = {this.state.logged}/>} />
                        <Route path="/register" render={() => <Register  register = {this.registerOperations.bind(this)} registered = {this.state.registered} />} />
                    </section>   
               </div>     
               
            </BrowserRouter>
        ) ;  
    }
}

export default App;