import React from 'react';
import { Redirect, Link } from 'react-router-dom';
const Login = (props) => {
    if(props.logged){
        return <Redirect to="/"/>
}
        setTimeout(props.login ,10);
   
        return(
            <div className='login'>
                <h2 className="login__title">Logowanie</h2>
                <form className='login__form'>
                    <label className = "login__email" htmlFor= "email">e-mail:
                    <input type = "email" id = "email"  className = "login__email--value" required></input>
                    </label>
                    <label htmlFor= "password" className = "login__password">hasło:
                    <input type = "password" id = "password"  className = "login__password--value" required></input>
                    </label>
                    <button type="submit" className = "login__btn button">Zaloguj</button>
                </form>
                <Link className="login__register" to="/register">Rejestracja</Link>
                <p className ="login__monit"></p>
             </div> 
        );
    

}

export default Login;