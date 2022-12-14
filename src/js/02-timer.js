import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
}

inputRef = document.querySelector('#datetime-picker');
btnStartRef = document.querySelector('[data-start]');
daysRef = document.querySelector('[data-days]');
hoursRef = document.querySelector('[data-hours]');
minutesRef = document.querySelector('[data-minutes]');
secondsRef = document.querySelector('[data-seconds]');

let futureTime = null;

// window.alert("Please choose a date in the future");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > options.defaultDate) {
           btnStartRef.disabled = false;
           futureTime = selectedDates[0];
        } else {
            Notiflix.Notify.failure('Please choose a date in the future');
            btnStartRef.disabled = true;
        }
    },
};

flatpickr(inputRef, options);

const timer = {
    isActive: false,
    start() {
        if(this.isActive) {
            return;
        }
        this.isActive = true;
        setInterval(() => {
            const curentTime = Date.now();
            const deltaTime = futureTime - curentTime;
            const timeComponents = convertMs(deltaTime);
            updateClockFace(timeComponents);
        }, 1000);
    },
}



function updateClockFace({ days, hours, minutes, seconds }) {
    daysRef.textContent = `${days}`;
    hoursRef.textContent = `${hours}`;
    minutesRef.textContent = `${minutes}`;
    secondsRef.textContent = `${seconds}`;
}

btnStartRef.addEventListener('click', timer.start);