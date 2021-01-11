const listTool = (done , trash)=>{
    let doneBtn = document.querySelectorAll('.list__btn--done');
    const trashBtn = document.querySelectorAll('.list__btn--trash');
    const handleClickDone = (e) => {
        e.preventDefault();
          done(e.target.dataset.id);
          doneBtn.forEach(btn => btn.removeEventListener('click', handleClickDone));
          trashBtn.forEach(btn => btn.removeEventListener('click', handleClickTrash))
    }
    const handleClickTrash = (e) => {
        e.preventDefault();
           trash(e.target.dataset.id);
           doneBtn.forEach(btn => btn.removeEventListener('click', handleClickDone));
           trashBtn.forEach(btn => btn.removeEventListener('click', handleClickTrash))  
}

    doneBtn.forEach(btn => btn.addEventListener('click', handleClickDone));
    trashBtn.forEach(btn => btn.addEventListener('click', handleClickTrash))
    
return;
}

export default listTool;