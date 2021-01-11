import React from 'react';
import { Redirect } from 'react-router-dom';

const ToDoTask = (props)=>{          
   const  {id,text, date,important,} = props.task;
   const isImportant = important ? "list__task important" : "list__task";
   
    return(
    <div className={isImportant} ><p className="list__text">{text}</p><p className="list__text">{date}</p><button data-id={id} className="list__btn list__btn--done button" >Zrobione</button><button data-id={id} className="list__btn list__btn--trash button">Do Kosza</button > </div>  
      );
}

const List = (props)=> {
        if(!props.logged){
                return <Redirect to="/login"/>
        }
        setTimeout(props.list ,10);
        const tasks = props.tasks.filter((task) => ((task.isDone === false) && (task.inTrash === false))).sort((task1 ,task2) => task1.date.localeCompare(task2.date)).map(task => <ToDoTask key={task.id} task ={task} />)  
        
        return(
        <div className="list">
            <h2 className="list__title">Lista rzeczy do zrobienia:</h2>
            {tasks}
         </div>
        );
}

export default List;






