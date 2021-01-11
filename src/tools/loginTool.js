

const loginTool = (load) => {
    const logBtn = document.querySelector('.login__btn');
    const email = document.querySelector('.login__email--value');
    const password = document.querySelector('.login__password--value');
    const monit = document.querySelector('.login__monit');

    const login = (e) => {
        e.preventDefault();

        const data = [email.value, password.value]
        fetch(`/log/${JSON.stringify(data)}`, {
            method: 'POST',
        })
        .then(data => data.json() )
        .then(data => {
           if(data){
            setTimeout (()=>{
                setTimeout (()=>{
                    monit.style.opacity = "1";
                    monit.textContent = "Poprawnie zalogowano";
                setTimeout(()=> {
                    monit.style.opacity = "0";
                    load("true");
                }, 2000);
                
                }, 1000);
                
            }, 300);
            
           }else{
            setTimeout (()=>{
                monit.style.opacity = "1";
                monit.textContent = "Nieprawidłowy Login lub Hasło";
                setTimeout(()=> {
                monit.style.opacity = "0";
                load("true");
            }, 2000);
            
            }, 1000);

           }
           
    
        });
        email.value = "";
        password.value = "";
        
        
    }


    logBtn.addEventListener("click", login);
    

}

export default loginTool;