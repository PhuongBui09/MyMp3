import { musicList } from "./musicData.js";

const song = document.getElementById("song");
const playBtn = document.querySelector(".play-inner");
const backBtn = document.querySelector(".play-back");
const nextBtn = document.querySelector(".play-next");
const thoiGian = document.querySelector(".thoiGian");
const thoiGianChay = document.querySelector(".thoiGianChay");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicImg = document.querySelector(".music-img img");
const musicImgSP = document.querySelector(".music-img");
const randomIcon = document.querySelector(".random-icon");
const repeatIcon = document.querySelector(".repeat-icon");
const playList = document.querySelector(".cacBHs");
const spanCaSi = document.querySelector(".spanCaSi");
const changeVideos = document.querySelector("#changeVideo");
const videoApps = document.querySelector(".videoapp");
const control = document.querySelector(".controls");

displayTimer();
let timer;

let isPlaying = true;
let isRandom = false;
let isRepeat = false;
let indexSong = 0;
let timeoutId;
let randomIndexes = [];

//----------Random danh sách bài hát----------
let musicRandom = musicList.sort(() => Math.random() - 0.5);
//----------Làm chức năng đổi bài khi hết 1 bài----------
song.addEventListener("ended", thayDoiBaiKetThuc);
function thayDoiBaiKetThuc() {
  if (isRandom) {
    ranDom();
    isPlaying = true;
    scrollActiveList();
  } else if (isRepeat) {
    song.play();
    isPlaying = true;
  } else {
    changeSong(1);
    isPlaying = true;
  }
  init(indexSong);
  playPause();
  scrollActiveList();
}
//----------Làm chức năng đổi bài----------
nextBtn.addEventListener("click", function () {
  if (isRandom) {
    ranDom();
    isPlaying = true;
  } else {
    changeSong(1);
    isPlaying = true;
  }
  init(indexSong);
  playPause();
  scrollActiveList();
});
backBtn.addEventListener("click", function () {
  if (isRandom) {
    ranDom();
    isPlaying = true;
  } else {
    changeSong(-1);
    isPlaying = true;
  }
  init(indexSong);
  playPause();
  scrollActiveList();
});
function changeSong(x) {
  if (x === 1) {
    //Next song
    indexSong++;
    if (indexSong >= musicList.length) {
      indexSong = 0;
    }
  } else if (x === -1) {
    //Back song
    indexSong--;
    if (indexSong < 0) {
      indexSong = musicList.length - 1;
    }
  }
}
//----------Làm chức năng thay đổi background theo thời gian----------
function timeavc() {
  let d = new Date();
  let gio = d.getHours();
  let phut = d.getMinutes();

  if (gio >= 6 && gio < 13) {
    changeVideos.src = "./assests/videos/videoSang.mp4";
    videoApps.style.bottom = -156 + "px";
    control.style.color = "#ff0000c9";
  } else if (gio >= 13 && gio < 17) {
    changeVideos.src = "./assests/videos/videoChieu.mp4";
  } else {
    changeVideos.src = "./assests/videos/videoToi.mp4";
    videoApps.style.bottom = -79 + "px";
    control.style.color = "#ff3f3fbd";
  }
}
timeavc();
//----------Làm chức năng kéo thời gian----------
rangeBar.addEventListener("change", thayDoi);
function thayDoi() {
  song.currentTime = rangeBar.value;
}
//----------Làm chức năng play----------
playBtn.addEventListener("click", playPause);
function playPause() {
  if (isPlaying) {
    song.play();
    playBtn.innerHTML = "<i class='fa-solid fa-pause'></i>";
    timer = setInterval(displayTimer, 1000);
    musicImgSP.classList.add("music-img-an");
    isPlaying = false;
  } else {
    song.pause();
    playBtn.innerHTML = "<i class='fa-solid fa-play'></i>";
    clearInterval(timer);
    musicImgSP.classList.remove("music-img-an");
    isPlaying = true;
  }
}
//----------Làm chức năng chạy thời gian----------
function displayTimer() {
  const { duration, currentTime } = song;
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  thoiGianChay.textContent = formatTime(currentTime);
  if (!duration) {
    thoiGian.textContent = "00:00";
  } else {
    thoiGian.textContent = formatTime(duration);
  }
}
function formatTime(number) {
  const minutes = Math.floor(number / 60);
  const second = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    second < 10 ? "0" + second : second
  }`;
}
//----------Làm chức năng random bài hát----------
randomIcon.addEventListener("click", activeIconRD);
function activeIconRD() {
  if (isRepeat) {
    repeatIcon.classList.remove("active-btn");
    isRepeat = false;
  }
  if (isRandom) {
    randomIcon.classList.remove("active-btn");
    isRandom = false;
  } else {
    randomIcon.classList.add("active-btn");
    isRandom = true;
  }
}
function ranDom() {
  let newIndex;

  if (randomIndexes.length == musicList.length) {
    randomIndexes.splice(0, randomIndexes.length);
  }

  do {
    newIndex = Math.floor(Math.random() * musicList.length);
  } while (randomIndexes.includes(newIndex));

  randomIndexes.push(newIndex);
  indexSong = newIndex;

  init(indexSong);
  playPause();
}
//----------Làm chức năng repeat bài hát----------
repeatIcon.addEventListener("click", activeIconRP);
function activeIconRP() {
  if (isRandom) {
    randomIcon.classList.remove("active-btn");
    isRandom = false;
  }
  if (isRepeat) {
    repeatIcon.classList.remove("active-btn");
    isRepeat = false;
  } else {
    repeatIcon.classList.add("active-btn");
    isRepeat = true;
  }
}
//----------Làm chức năng active bài hát----------
function scrollActiveList() {
  if (indexSong == 0) {
    setTimeout(() => {
      document.querySelector(".cacBH.active-list").scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);
  } else if (indexSong == musicList.length - 1) {
    setTimeout(() => {
      document.querySelector(".cacBH.active-list").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  } else {
    setTimeout(() => {
      document.querySelector(".cacBH.active-list").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
  }
}
//----------Làm chức năng click bài hát active----------
playList.addEventListener("click", clickAT);
function clickAT(playList) {
  const playList1 = playList.target.closest(".cacBH:not(.active-list)");
  if (playList1) {
    indexSong = Number(playList1.dataset.index);
    console.log(indexSong);
    isPlaying = true;
    init(indexSong);
    playPause();
    renderList();
  }
}
//----------Làm chức năng hẹn giờ ngủ----------
function stopMusicAfter(duration) {
  const audio = document.getElementById("song"); // Lấy thẻ audio
  if (timeoutId) {
    clearTimeout(timeoutId); // Hủy bỏ đồng hồ đếm ngược trước đó nếu có
  }
  if (duration !== 0) {
    const timeInMs = duration * 60 * 1000; // Đổi thời gian từ phút sang mili giây
    timeoutId = setTimeout(function () {
      isPlaying = false;
      playPause();
      audio.currentTime = 0; // Trở về thời gian 0, tương đương với việc tắt nhạc
      init(indexSong);
    }, timeInMs);
  }
}

const selectElement = document.querySelector("select");
selectElement.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  if (selectedOption == "0") {
    stopMusicAfter(0);
  } else if (selectedOption == "15") {
    stopMusicAfter(15);
  } else if (selectedOption == "30") {
    stopMusicAfter(30);
  } else if (selectedOption == "60") {
    stopMusicAfter(60);
  }
});
//----------Render list----------
function renderList() {
  const htmls = musicRandom.map((nhac, index) => {
    return `
                <div class="cacBH ${
                  index === indexSong ? "active-list" : ""
                }" data-index="${index}">
                    <img src="${nhac.img}" alt="">
                    <div class="moTa">
                        <p>${nhac.name}</p>
                        <span>${nhac.singer}</span>
                    </div>
                </div>
                `;
  });
  document.querySelector(".cacBHs").innerHTML = htmls.join(" ");
}
//----------Render----------
function init(indexSong) {
  displayTimer();
  song.setAttribute("src", `./assests/musics/${musicList[indexSong].linkAu}`);
  musicImg.setAttribute("src", musicList[indexSong].img);
  musicName.textContent = musicList[indexSong].name;
  spanCaSi.textContent = musicList[indexSong].singer;

  renderList();
}
init(indexSong);
//----------Load----------
let load = document.getElementById("load");
let countDot = 20;
for (let i = 0; i < countDot; i++) {
  let newElement = document.createElement("div");
  newElement.classList.add("item");
  newElement.style.setProperty("--i", 0.2 * i + "s");
  load.appendChild(newElement);
}
window.onload = function () {
  load.style.display = "none";
};
