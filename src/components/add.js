import React from 'react';
import { Redirect } from 'react-router-dom';
const Add = (props)=> {

    if(!props.logged){
        return <Redirect to="/login"/>
    }else{
    setTimeout(props.add ,50);
}
   
    


    return(
        <div className = 'add'>
             <h2 className="add__title">Dodaj zadanie:</h2>
            
            <form className= "add__form" action= "submit">
                <label className = "add__name" htmlFor= "name">Nazwa zadania:
                <input type = "text" id = "name" name = "taskName"  className = "add__name--value" required></input>
                </label>
                <label htmlFor= "date" className = "add__date">Termin wykonania:
                <input type = "date" id = "date" name = "taskDate" className = "add__date--value" required></input>
                </label>
                <label htmlFor= "important" className = "add__important">Ważne:
                <input type = "checkbox" id = "important" name = "taskImp" className = "add__important--value" required></input>
                </label>
                <button type="submit" className = "add__btn button">Dodaj Zadanie</button>
            </form> 
            <p className ="add__monit">Dodano Zadanie</p>
        </div>

    );
}

export default Add;