// modals profile
let isButtonClick = 0;
const clickArea = (button,card)=> {
  document.addEventListener('click',(event)=> {
    isButtonClick++
    if(event.target === button){
      isButtonClick = 1;
    }
    if(isButtonClick > 1){
      card.classList.add('hidden')
      isButtonClick = 0
    }
  })
}
const getModal  = document.querySelector('.modals')
const getButtonUser = document.querySelector('#user')
getButtonUser.addEventListener('click', () =>{
  getModal.classList.remove('hidden');
});
clickArea(getButtonUser,getModal)



const logout = (e) =>{
    e.preventDefault();
    if(confirm('Yakin keluar?')){
        window.location.href="/logout"
    }else {
        console.log('tidak')
    }
}
const Delete = (e,name,route) => {
  e.preventDefault;
  if(confirm(`Hapus data ${name}?`)){
    window.location.href=`${route}`;
    console.log(route)
  }
}
