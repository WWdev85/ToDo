const doneTool = (list , trash)=>{
    const doneBtn = document.querySelectorAll('.done__btn--done');
    const trashBtn = document.querySelectorAll('.done__btn--trash');
    const handleClickList = (e) => {
          list(e.target.dataset.id);
          doneBtn.forEach(btn => btn.removeEventListener('click', handleClickList));
          trashBtn.forEach(btn => btn.removeEventListener('click', handleClickTrash));
    }
    const handleClickTrash = (e) => {
           trash(e.target.dataset.id);
           doneBtn.forEach(btn => btn.removeEventListener('click', handleClickList));
          trashBtn.forEach(btn => btn.removeEventListener('click', handleClickTrash))
           
}

    doneBtn.forEach(btn => btn.addEventListener('click', handleClickList));
    trashBtn.forEach(btn => btn.addEventListener('click', handleClickTrash));
    

}

export default doneTool;