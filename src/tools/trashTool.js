const trashTool = (back , remove)=>{
    const backBtn = document.querySelectorAll('.trash__btn--back');
    const removeBtn = document.querySelectorAll('.trash__btn--remove');
    const handleClickBack = (e) => {
          back(e.target.dataset.id);
          backBtn.forEach(btn => btn.removeEventListener('click', handleClickBack));
          removeBtn.forEach(btn => btn.removeEventListener('click', handleClickRemove))
    }
    const handleClickRemove = (e) => {
           remove(e.target.dataset.id);
           backBtn.forEach(btn => btn.removeEventListener('click', handleClickBack));
          removeBtn.forEach(btn => btn.removeEventListener('click', handleClickRemove))
}

    backBtn.forEach(btn => btn.addEventListener('click', handleClickBack));
    removeBtn.forEach(btn => btn.addEventListener('click', handleClickRemove))
    

}

export default trashTool;