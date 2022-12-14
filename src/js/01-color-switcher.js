function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStartRef = document.querySelector('[data-start]');
btnStopRef = document.querySelector('[data-stop]');
bodyBgcRef = document.querySelector('body');

let timerId = null;
btnStartRef.addEventListener('click', onStart);
btnStopRef.addEventListener('click', onStop);

function onStart() {
    // timerId = setInterval(() => {
    //     bodyBgcRef.style.backgroundColor = getRandomHexColor();
    // }, 1000);

    timerId = setInterval(changeBodyBgc, 1000);

    btnStartRef.disabled = true;
    btnStopRef.disabled = false;
}

function onStop() {
    clearInterval(timerId);
    btnStartRef.disabled = false;
    btnStopRef.disabled = true;
}

function changeBodyBgc() {
    bodyBgcRef.style.backgroundColor = getRandomHexColor();
}