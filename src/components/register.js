import React from 'react';
import { Redirect } from 'react-router-dom';

const Register = (props)=>{
     
    if(props.registered){
        return <Redirect to="/login"/>
    }else{
        setTimeout(props.register ,10);
}
    

        return(
            <div className='register'>
                <h2 className="register__title">Rejestracja</h2>
                <form className='register__form' action='none'>
                    <label className = "register__email" htmlFor= "email">e-mail:
                    <input type = "email" id = "email"  className = "register__email--value" required></input>
                    </label>
                    <label htmlFor= "password" className = "register__password">hasło:
                    <input type = "password" id = "password"  className = "register__password--value" required></input>
                    </label>
                    <label htmlFor= "confirmation" className = "register__passwordConf">potwierdź hasło:
                    <input type = "password" id = "confirmation"  className = "register__passwordConf--value" required></input>
                    </label>
                    <button type="submit" className = "register__btn button">Zarejestruj</button>
                </form>
                <form className='register__formVal'>
                    <label htmlFor= "validation" className = "register__validation">Pin:
                    <input type = "password" id = "validation"  className = "register__validation--value" ></input>
                    </label>    
                    <button type= 'submit' className = "register__valBtn button">Weryfikacja</button>
                </form>
                <p className ="register__monit"></p>
               
             </div> 
        );

}

export default Register;