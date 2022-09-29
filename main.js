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

const musicList = [
    {
        name: 'Chờ đợi có đáng sợ',
        singer: 'ANDIEZ',
        linkAu: 'ChoDoiCoDangSo.mp3',
        img: './assests/img/ChoDoiCoDangSoImg.jpg'
    },
    {
        name: 'Hẹn em kiếp sau',
        singer: 'Lã. x Duy Phúc x TiB',
        linkAu: 'HenEmKiepSau.mp3',
        img: './assests/img/HenEmKiepSau.jpg'
    },
    {
        name: 'Lạc vào trong mơ',
        singer: 'Simon C ft. Wuy',
        linkAu: 'LacVaoTrongMo.mp3',
        img: './assests/img/LacVaoTrongMo.jpg'
    },
    {
        name: 'Ừ có anh đây',
        singer: 'Tino',
        linkAu: 'UCoAnhDay.mp3',
        img: './assests/img/UCoAnhDay.jpg'
    },
    {
        name: 'Có anh đây rồi',
        singer: 'Anh Quân Idol',
        linkAu: 'CoAnhDayRoi.mp3',
        img: './assests/img/CoAnhDayRoi.jpg'
    },
    {
        name: 'Anh thề đấy',
        singer: 'Thanh Hưng',
        linkAu: 'AnhTheDay.mp3',
        img: './assests/img/AnhTheDay.jpg'
    },
];

displayTimer();
let timer;

let isPlaying = true;
let indexSong = 0;

//----------Làm chức năng đổi bài khi hết 1 bài----------
song.addEventListener("ended", thayDoiBaiKetThuc);
function thayDoiBaiKetThuc() {
    changeSong(1);
}
//----------Làm chức năng đổi bài----------
nextBtn.addEventListener("click", function() {
    changeSong(1);
})
backBtn.addEventListener("click", function() {
    changeSong(-1);
})
function changeSong(x) {
    if (x === 1) {
        //Next song
        indexSong++;
        if (indexSong >= musicList.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (x === -1) {
        //Back song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musicList.length-1;
        }
        isPlaying = true;
    }
    init(indexSong);
    playPause();
}
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
        timer = setInterval(displayTimer, 600);
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
    return `${minutes < 10 ? '0' + minutes : minutes}:${second < 10 ? '0' + second : second}`;
}
//----------Render list----------
function renderList() {
    const htmls = musicList.map(nhac => {
        return `
                <div class="cacBH">
                    <img src="${nhac.img}" alt="">
                    <div class="moTa">
                        <p>${nhac.name}</p>
                        <span>${nhac.singer}</span>
                    </div>
                </div>
                `
    });
    document.querySelector(".cacBHs").innerHTML = htmls.join(" ");
}
//----------Render----------
function init(indexSong) {
    displayTimer();
    song.setAttribute("src", `./assests/musics/${musicList[indexSong].linkAu}`);
    musicImg.setAttribute("src", musicList[indexSong].img);
    musicName.textContent = musicList[indexSong].name;

    renderList();
}
init(indexSong);