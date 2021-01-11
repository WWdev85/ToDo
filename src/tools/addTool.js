
const addTool = (add) => {
    const btn = document.querySelector('.add__btn');
    const name = document.querySelector('.add__name--value');
    const date = document.querySelector('.add__date--value');
    const important = document.querySelector('.add__important--value');
    const monit = document.querySelector('.add__monit');

        const handleClick = (e) => {
            e.preventDefault();
            if(name.value !== "" && date.value !== ""){
                add(name.value,date.value,important.checked);
                monit.style.opacity = "1";
                setTimeout(()=> {
                    monit.style.opacity = "0";
                }, 1000);

            }
            
            name.value = "";
            date.value = "";
            btn.removeEventListener("click", handleClick);
        }


        btn.addEventListener("click", handleClick);

    }    

export default addTool;