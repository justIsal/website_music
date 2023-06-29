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



// control lagu
const audioPlayer = document.querySelector('#player');
const playButton = document.getElementById('playButton');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
function playy() {
    if(audioPlayer.paused){
        audioPlayer.play();
        playButton.innerHTML = '<i class="fi fi-ss-pause text-lg pt-1"></i>'
    }else{
        audioPlayer.pause()
        playButton.innerHTML = '<i class="fi fi-ss-play text-lg pt-1 pl-a"></i>'
    }
};
audioPlayer.addEventListener('loadedmetadata', function () {
    const progressBar = document.getElementById('progressBar');
    const progressIndicator = document.getElementById('progressIndicator');
    const progressBarWidth = progressBar.offsetWidth;
    const duration = audioPlayer.duration;
    const progressPercentage = (audioPlayer.currentTime / duration) * 100;
    progressIndicator.style.width = progressPercentage + '%';
});

// const playlist = [
//   'Oasis-whatever.mp3',
//   'Oasis-StandByMe.mp3',
//   'Oasis-Champagne_supernova.mp3'
// ];

// let currentSongIndex = 0;

// function playSong() {
//   audioPlayer.src = playlist[currentSongIndex];
//   audioPlayer.play();
// }

// nextButton.addEventListener('click', function() {
//   currentSongIndex++;
//   if (currentSongIndex >= playlist.length) {
//     currentSongIndex = 0;
//   }
//   playSong();
// });

// prevButton.addEventListener('click', function() {
//   currentSongIndex--;
//   if (currentSongIndex < 0) {
//     currentSongIndex = playlist.length - 1;
//   }
//   playSong();
// });


function changePlaybackPosition(event) {
    const progressBar = document.getElementById('progressBar');
    const progressIndicator = document.getElementById('progressIndicator');

    const progressBarWidth = progressBar.offsetWidth;
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const progressPercentage = (clickPosition / progressBarWidth) * 100;

    const audioPlayer = document.getElementById('player');
    const duration = audioPlayer.duration;
    const newPosition = (duration * progressPercentage) / 100;

    audioPlayer.currentTime = newPosition;
    progressIndicator.style.width = progressPercentage + '%';
}
audioPlayer.addEventListener('timeupdate', ()=> {
  const progressBar = document.getElementById('progressBar');
  const progressIndicator = document.getElementById('progressIndicator');
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  const progressPercentage = (currentTime / duration) * 100;
  progressIndicator.style.width = `${progressPercentage}%`;
});
function playing(judulLagu,path,judulAlbum) {
        const getTittle = document.getElementById('judul-lagu');
        getTittle.innerHTML = judulLagu;
        const getAlbum = document.getElementById('album-lagu');
        getAlbum.innerHTML = judulAlbum;
        const getAudio = document.getElementById('source-audio');
        getAudio.setAttribute('src','/lagu/'+path)
        audioPlayer.load()
        if(audioPlayer.paused){
            audioPlayer.play();
            playButton.innerHTML = '<i class="fi fi-ss-pause text-lg pt-1"></i>'
        }
};


// tambah playlist
const addClass = ()=> {
  document.getElementById('card-update').classList.remove('hidden')
  document.getElementById('card-update').classList.add('flex')
}
const removeClass = ()=> {
  document.getElementById('card-update').classList.remove('flex')
  document.getElementById('card-update').classList.add('hidden')
}
const cardAdd = document.getElementById('card-add')
document.getElementById('add-playlist').addEventListener('click',()=> {
  cardAdd.classList.remove('hidden')
  cardAdd.classList.add('flex')
});
document.getElementById('card-add-close').addEventListener('click',()=> {
  cardAdd.classList.remove('flex')
  cardAdd.classList.add('hidden')
});

// option playlist
const optionPlaylist = document.getElementById('option-playlist')
const addOptionPlaylist = document.getElementById('card-option')
const removeOptionPlaylist = document.getElementById('remove-option')

const addCard = ()=> {
    addOptionPlaylist.classList.remove('hidden')
    addOptionPlaylist.classList.add('block')
}
const removeCard = ()=> {
    addOptionPlaylist.classList.remove('block')
    addOptionPlaylist.classList.add('hidden')
}
const closeOptionLagu = document.querySelectorAll('#close-option-lagu');
const listPlaylist = document.querySelectorAll('#list-playlist');
closeOptionLagu.forEach((element,index)=> {
    element.addEventListener('click',()=> {
        listPlaylist[index].classList.remove('hidden')
        listPlaylist[index].classList.add('block')
        
        listPlaylist.forEach((i)=> {
            if (i !== listPlaylist[index]) {
                i.classList.remove('block')
                i.classList.add('hidden')
              }
        })
        
    })
})

document.addEventListener('click',(event)=> {
    let isButtonClicked = false
    closeOptionLagu.forEach((element) => {
        if (event.target === element) {
          isButtonClicked = true;
        }
      });

      if (!isButtonClicked) {
        listPlaylist.forEach((element) => {
          element.classList.remove('block');
          element.classList.add('hidden');
        });
      }
});


// kirim id lagu dan playlist
function request(idPlaylist, idLagu) {
  alert('berhasil ditambahkan')
  let data = {
    idPlaylist: idPlaylist,
    idLagu: idLagu
  };
  fetch('/tambahLagu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      console.log('Response from server:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
// hapus playlist
const dropPlaylist = (e,location,name) => {
  e.preventDefault();
  if(confirm(`Hapus Playlist ${name}`)){
      window.location.href=location
  }else {
      console.log('tidak')
  }
}
// hapus lagu di playlist
const dropLaguPlaylist = (e,idLagu,idPlaylist,judulLagu) => {
  e.preventDefault();
  if(confirm(`Hapus Lagu ${judulLagu}`)){
    window.location.href= `/hapusLagu/${idLagu}/${idPlaylist}`;
    console.log('hapus')
  }else {
    console.log('batal')
  }
}