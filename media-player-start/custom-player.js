const media = document.querySelector('video');
const container = document.querySelector('.player');
const controls = document.querySelector('.controls');

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');

media.removeAttribute('controls');
controls.style.visibility = 'visible';

	
		// let indexNumber = 1;
		// let countNumber = 10;
	  	let url ='https://cors-anywhere.herokuapp.com/https://ign-apis.herokuapp.com/videos?startIndex=30\u0026count=5';
		  let html = '';
		fetch(url)
		.then(response => response.json())
		.then(response => {
			console.log(response);
		
		var data = response.data;
			var num = 0;
			data.forEach(function(element) {
			  num++;
			  var title = element.metadata.name;
			  var description = element.metadata.description;
			  var seconds = element.metadata.duration % 60;
			  if(seconds === 0) {
				seconds = "00";
			  }
			  if(seconds.toString().length === 1) {
				seconds = 0 + "" + seconds;
			  }
			  var minutes = element.metadata.duration / 60;
			  minutes = minutes.toString().slice(0, 1);
			  var length = minutes + ":" + seconds;
			  var displayImage = element.thumbnails[2].url;
			  var url = element.metadata.url;
			  let htmlSegment =  "<div class='section " + num + "'><span class='number'>" + num + "</span><span class='time'>" + length + "</span><br/><h3 class='title'>" + title + "</h3><br/><p class='description'>" + description + "</p><br/><video controls><a href='" + url + "' target='_blank'><img class='Image " + num + "' style='width:100%;max-width:300px;display:none;' src='" + displayImage + "' /></a></div>";

        html += htmlSegment;
			 
			});// End forEach
			let container = document.querySelector('.videos');
    		container.innerHTML = html;
			
		});
		
		// const options = {
		// 	method: 'GET',
		// 	mode: 'no-cors',
		// 	headers: {
		// 		"Accept": "text/plain",
		// 	'Content-Type': 'application/json',
		// 	}
		// };

// 

// mode: 'no-cors'

play.addEventListener('click', playPauseMedia);

function playPauseMedia() {
	rwd.classList.remove('active');
	fwd.classList.remove('active');
	clearInterval(intervalRwd);
	clearInterval(intervalFwd);

    if(media.paused) {
      play.setAttribute('data-icon','u');
      media.play();
    } else {
      play.setAttribute('data-icon','P');
      media.pause();
    }
}

stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);

function stopMedia() {
	media.pause();
	media.currentTime = 0;
	play.setAttribute('data-icon','P');
	rwd.classList.remove('active');
	fwd.classList.remove('active');
	clearInterval(intervalRwd);
	clearInterval(intervalFwd);
}

rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);

let intervalFwd;
let intervalRwd;

function mediaBackward() {

  if(rwd.classList.contains('active')) {
    rwd.classList.remove('active');
    clearInterval(intervalRwd);
    media.play();
  } else {
    rwd.classList.add('active');
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function mediaForward() {

  if(fwd.classList.contains('active')) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add('active');
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

function windBackward() {
  if(media.currentTime <= 3) {
    rwd.classList.remove('active');
    clearInterval(intervalRwd);
    stopMedia();
  } else {
    media.currentTime -= 3;
  }
}
  
function windForward() {
  if(media.currentTime >= media.duration - 3) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    stopMedia();
  } else {
    media.currentTime += 3;
  }
}
  
media.addEventListener('timeupdate', setTime);

function setTime() {
  const minutes = Math.floor(media.currentTime / 60);
  const seconds = Math.floor(media.currentTime - minutes * 60);
  
  const minuteValue = minutes.toString().padStart(2, '0');
  const secondValue = seconds.toString().padStart(2, '0');
  
  const mediaTime = `${minuteValue}:${secondValue}`;
  timer.textContent = mediaTime;
  
  const barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
  timerBar.style.width = `${barLength}px`;
}
  
  