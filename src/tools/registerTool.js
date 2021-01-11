

const registerTool = (reg) => {
    const registerBtn = document.querySelector('.register__btn');
    const email = document.querySelector('.register__email--value');
    const password = document.querySelector('.register__password--value');
    const passwordConf = document.querySelector('.register__passwordConf--value');
    const pin = document.querySelector('.register__validation--value');
    const validateBtn = document.querySelector('.register__valBtn');
    const form = document.querySelector('.register__form');
    const formVal = document.querySelector('.register__formVal');
    const monit = document.querySelector('.register__monit');
    
    
    const register = (e) => {
        e.preventDefault();
        const data = [email.value, password.value, passwordConf.value]

        if(password.value === passwordConf.value){
            fetch(`/register/${JSON.stringify(data)}`, {
                method: 'POST',
            })
            .then(data => data.json() )
            .then(data => {
    
                setTimeout (()=>{
                    if(data == "1"){
                       form.style.display = "none";
                       formVal.style.display = "flex";
    
                    }
                }, 1000);
    
                setTimeout(()=> {
                    monit.style.opacity = "1";
                    monit.textContent = "Wysłano Email z kodem pin";
                    setTimeout(()=> {
                        monit.style.opacity = "0";
                }, 2000);
                },1500);    
        
            });  
        }else{
            setTimeout(()=> {
                monit.style.opacity = "1";
                monit.textContent = "Podane hasła są różne";
                setTimeout(()=> {
                    monit.style.opacity = "0";
            }, 2000);
            },1500);  

        }
     
        email.value = "";
        password.value = "";
        passwordConf.value = "";
        
        
    }
    const validate = (e) => {
         e.preventDefault();
         const data = pin.value;
         pin.value = "";
         fetch(`/validation/${JSON.stringify(data)}`, {
            method: 'POST',
        })
        .then(data => data.json() )
        .then(data => {
            if(data){
            setTimeout (()=>{
                monit.style.opacity = "1";
                monit.textContent = "Rejestracja przebiegła pomyślnie";
             setTimeout(()=> {
                 monit.style.opacity = "0";
                 reg(true);
             }, 2000);
             
            }, 1000);
            
            }else{
                setTimeout (()=>{
                    monit.style.opacity = "1";
                    monit.textContent = "Nieprawidłowy Pin";
                setTimeout(()=> {
                    monit.style.opacity = "0";
                }, 2000);
                
                }, 1000);

        }  
           
    
        })
    }


    registerBtn.addEventListener("click", register);
    validateBtn.addEventListener("click", validate);
    

}

export default registerTool;