const app =() =>{

const song=document.querySelector(".song");
const play=document.querySelector(".play");
const outline=document.querySelector(".movingOutline circle");
const video=document.querySelector(".vidContainer video");

//sounds

const sounds= document.querySelectorAll(".soundPicker button");

//time display

const timeDisplay=document.querySelector(".timeDisplay");
const timeSelect=document.querySelectorAll(".timeSelect button");
 
// get the length of outline of the circle

const outlineLength=outline.getTotalLength();

//Duriation

let fakeDuration=600;

outline.style.strokeDasharray=outlineLength;
outline.style.strokeDashoffset=outlineLength;

//playing diffrent sounds

sounds.forEach(sound=>{
  sound.addEventListener('click', function(){
    song.src=this.getAttribute('data-sound');
    video.src=this.getAttribute('data-video');
    checkPlaying(song);

  });
});


play.addEventListener('click', ()=>{
    checkPlaying(song);
});

//play sound
timeSelect.forEach(option=>{
  option.addEventListener('click',function(){
    fakeDuration=this.getAttribute('data-time');
    timeDisplay.textContent=`${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
  })
});




//function to stop and play the sound

  const checkPlaying= song =>{
    if(song.paused){
      song.play();
      video.play();
      play.src= "./svg/pause.svg";
    }else{
      song.pause();
      video.pause();
      play.src= "./svg/play.svg";
    }

  };

  //Duration of the sounds palayed



  //animate the circle

  song.ontimeupdate= ()=>{
    let currentTime=song.currentTime;
    let elaspse=fakeDuration-currentTime;
    let seconds=Math.floor(elaspse % 60);
    let minutes=Math.floor(elaspse / 60);

    //animate circle

    let progress=outlineLength-(currentTime/ fakeDuration)* outlineLength;
    outline.style.strokeDashoffset=progress;

    //animate thr text

    timeDisplay.textContent=`${minutes}:${seconds}`;

    if(currentTime>=fakeDuration){
      song.pause();
      song.currentTime=0;
      play.src='./svg/play.svg'
      video.pause();
    }



  };




}
app()