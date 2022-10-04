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
const changeVideos = document.querySelector("#changeVideo")
const videoApps = document.querySelector(".videoapp");

const musicList = [
    {
        id: 1,
        name: 'Chờ đợi có đáng sợ',
        singer: 'ANDIEZ',
        linkAu: 'ChoDoiCoDangSo.mp3',
        img: './assests/img/ChoDoiCoDangSoImg.jpg'
    },
    {
        id: 2,
        name: 'Hẹn em kiếp sau',
        singer: 'Lã. x Duy Phúc x TiB',
        linkAu: 'HenEmKiepSau.mp3',
        img: './assests/img/HenEmKiepSau.jpg'
    },
    {
        id: 3,
        name: 'Lạc vào trong mơ',
        singer: 'Simon C ft. Wuy',
        linkAu: 'LacVaoTrongMo.mp3',
        img: './assests/img/LacVaoTrongMo.jpg'
    },
    {
        id: 4,
        name: 'Ừ có anh đây',
        singer: 'Tino',
        linkAu: 'UCoAnhDay.mp3',
        img: './assests/img/UCoAnhDay.jpg'
    },
    {
        id: 5,
        name: 'Có anh đây rồi',
        singer: 'Anh Quân Idol',
        linkAu: 'CoAnhDayRoi.mp3',
        img: './assests/img/CoAnhDayRoi.jpg'
    },
    {
        id: 6,
        name: 'Anh thề đấy',
        singer: 'Thanh Hưng',
        linkAu: 'AnhTheDay.mp3',
        img: './assests/img/AnhTheDay.jpg'
    },
    {
        id: 7,
        name: '100 year love',
        singer: 'NamDuc',
        linkAu: '100YearLove.mp3',
        img: './assests/img/100YearLove.jpg'
    },
    {
        id: 8,
        name: 'Nơi này có anh',
        singer: 'Sơn Tùng M-TP',
        linkAu: 'NoiNayCoAnh.mp3',
        img: './assests/img/NoiNayCoAnh.jpg'
    },
    {
        id: 9,
        name: 'Làm người luôn yêu em',
        singer: 'Sơn Tùng M-TP',
        linkAu: 'LamNguoiLuonYeuEm.mp3',
        img: './assests/img/LamNguoiLuonYeuEm.jpg'
    },
    {
        id: 10,
        name: 'Đếm Ngày Xa Em',
        singer: 'Only C ft. Lou Hoàng',
        linkAu: 'DemNgayXaEm.mp3',
        img: './assests/img/DemNgayXaEm.jpg'
    },
    {
        id: 11,
        name: 'Không phải dạng vừa đâu',
        singer: 'Sơn Tùng M-TP',
        linkAu: 'KhongPhaiDangVuaDau.mp3',
        img: './assests/img/KhongPhaiDangVuaDau.jpg'
    },
    {
        id: 12,
        name: 'Thê lương',
        singer: 'PHÚC CHINH',
        linkAu: 'TheLuong.mp3',
        img: './assests/img/TheLuong.jpg'
    },
];

displayTimer();
let timer;

let isPlaying = true;
let isRandom = false;
let isRepeat = false;
let indexSong = 0;

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
nextBtn.addEventListener("click", function() {
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
})
backBtn.addEventListener("click", function() {
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
})
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
            indexSong = musicList.length-1;
        }
    }
}
//----------Làm chức năng thay đổi background theo thời gian----------
function timeavc() {
    let d = new Date();
    let gio = d.getHours();
    let phut = d.getMinutes();

    if (gio >= 6 && gio < 16) {
        changeVideos.src = "./assests/videos/videoSang.mp4";
        videoApps.style.bottom = -156 + "px";
    } else if (gio >= 16 && gio < 19) {
        changeVideos.src = "./assests/videos/videoChieu.mp4";
    } else {
        changeVideos.src = "./assests/videos/videoToi.mp4"
        videoApps.style.bottom = -66 + "px";
    }
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
    return `${minutes < 10 ? '0' + minutes : minutes}:${second < 10 ? '0' + second : second}`;
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
    do {
        newIndex = Math.floor(Math.random() * musicList.length);
    } while(newIndex === indexSong);
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
                block: "end"
            })
        }, 100);
    } else if (indexSong == musicList.length-1) {
        setTimeout(() => {
            document.querySelector(".cacBH.active-list").scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }, 100);
    } else {
        setTimeout(() => {
            document.querySelector(".cacBH.active-list").scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            })
        }, 100);
    }
}
//----------Làm chức năng click bài hát active----------
playList.addEventListener("click", clickAT);
function clickAT(playList) {
    const playList1 = playList.target.closest('.cacBH:not(.active-list)');
    if (playList1) {
        indexSong = Number(playList1.dataset.index - 1);
        isPlaying = true;
        init(indexSong);
        playPause();
        renderList();
    }
}
//----------Render list----------
function renderList() {
    const htmls = musicList.map((nhac, index) => {
        return `
                <div class="cacBH ${index === indexSong ? "active-list" : ''}" data-index="${nhac.id}">
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
    spanCaSi.textContent = musicList[indexSong].singer;

    timeavc();
    renderList();
}
init(indexSong);