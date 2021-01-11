import React from 'react';
import { Redirect } from 'react-router-dom';

const TrashTask = (props)=>{
        const  {id,text, date,important,finished} = props.task;
        let isImportant = important ? "trash__task important" : "trash__task";
        const doneDate = finished !== null ? `Zrobione: ${finished}` : "Nie zrobione!";
        isImportant = finished === null ? isImportant + " red" : isImportant ;
         return(
<div className={isImportant}><p className="trash__text">{text}</p><p className="trash__text">{date}</p><p className="trash__text">{doneDate}</p><button data-id={id} className="trash__btn trash__btn--back button" >Przywróć</button><button data-id={id} className="trash__btn trash__btn--remove button">Trwale usuń</button > </div>  
           );
}

const Trash = (props)=> {
        if(!props.logged){
                return <Redirect to="/login"/>
        }
        setTimeout(props.trash ,50);
        const tasks = props.tasks.filter((task) => task.inTrash === true).sort((task1 ,task2) => task1.date.localeCompare(task2.date)).map(task => <TrashTask key={task.id} task ={task} />)  
        
        return(
        <div className="trash">
            <h2 className="trash__title">Kosz:</h2>
            {tasks}
         </div>
        );
}

export default Trash;
