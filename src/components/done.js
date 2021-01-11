import React from 'react';
import { Redirect } from 'react-router-dom';

const DoneTask = (props)=>{
        const  {id,text, date,important,finished} = props.task;
        const isImportant = important ? "done__task important" : "done__task";
        
         return(
         <div className={isImportant} ><p className="done__text">{text}</p><p className="done__text">{date}</p><p className="done__text">Zrobiono: {finished}</p><button data-id={id} className="done__btn done__btn--done button" >Nie Zrobione</button><button data-id={id} className="done__btn done__btn--trash button">Do Kosza</button > </div>  
           );
}

const Done = (props)=> {
        if(!props.logged){
                return <Redirect to="/login"/>
        }
        setTimeout(props.done ,50);
        const tasks = props.tasks.filter((task) => ((task.isDone === true)&&(task.inTrash === false))).sort((task1 ,task2) => task1.finished.localeCompare(task2.finished)).map(task => <DoneTask key={task.id} task ={task} />)  
        
        return(
        <div className="done">
            <h2 className="done__title">Zrobione:</h2>
            {tasks}
         </div>
        );
}

export default Done;
