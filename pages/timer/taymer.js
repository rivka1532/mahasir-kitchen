const start = document.getElementById('start');
const stopT = document.getElementById('stop');
const ups = document.querySelectorAll('.up');
const downs = document.querySelectorAll('.down');

ups.forEach((up) => {
    up.onclick = () => {
        if (!isWorker && up.nextElementSibling.innerHTML < 59) {
            up.nextElementSibling.innerHTML++;
            if (up.nextElementSibling.innerHTML < 10)
                up.nextElementSibling.innerHTML = `0${up.nextElementSibling.innerHTML}`;
        }
    }
})
downs.forEach((down) => {
    down.onclick = () => {
        if (!isWorker && down.previousElementSibling.innerHTML > 0) {
            down.previousElementSibling.innerHTML--;
            if (down.previousElementSibling.innerHTML < 10)
                down.previousElementSibling.innerHTML = `0${down.previousElementSibling.innerHTML}`;
        }
    }
})

const seconds = document.querySelector("#seconds>p");
const minutes = document.querySelector("#minutes>p");
const houers = document.querySelector("#houers>p");
let isWorker = false;
const finish = new Audio(src="/images/styleImages/נוקיה פיצוץ.mp3");

start.onclick = () => {
    if (!isWorker && (seconds.innerHTML > 0 || minutes.innerHTML > 0 || houers.innerHTML > 0)) {
        startTaymer();
    }
    else if (isWorker) {
        stopTaymer();
    }
}
let taymer;
const startTaymer = () => {
    start.src = "/images/styleImages/המשך.png";
    isWorker = true;
    taymer = setInterval(() => {
        if (seconds.innerHTML > 0) {
            seconds.innerHTML--;
            if (seconds.innerHTML < 10)
                seconds.innerHTML = `0${seconds.innerHTML}`;
        }
        else if (minutes.innerHTML > 0) {
            minutes.innerHTML--;
            seconds.innerHTML = 59;
            if (minutes.innerHTML < 10)
                minutes.innerHTML = `0${minutes.innerHTML}`;
        }
        else if (houers.innerHTML > 0) {
            houers.innerHTML--;
            seconds.innerHTML = 59;
            minutes.innerHTML = 59;
            if (houers.innerHTML < 10)
                houers.innerHTML = `0${houers.innerHTML}`;
        }
        else {
            stopTaymer();
            finish.play();
        }
    }, 1000);
    ups.forEach((up) => {
        up.style.opacity = 0.5;
    })
    downs.forEach((down) => {
        down.style.opacity = 0.5;
    })
}
const stopTaymer = () => {
    isWorker = false;
    clearInterval(taymer);
    start.src = "/images/styleImages/הפעל.png";
    ups.forEach((up) => {
        up.style.opacity = 1;
    })
    downs.forEach((down) => {
        down.style.opacity = 1;
    })
}

stopT.onclick = () => {
    seconds.innerHTML = "00";
    minutes.innerHTML = "00";
    houers.innerHTML = "00";
    stopTaymer();
}