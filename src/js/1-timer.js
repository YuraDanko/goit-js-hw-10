// flatpikr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// izitoast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// змінні для збереження стану
let userSelectedDate = null;
let timerInterval = null;

// елементи
const input = document.querySelector('#datetime-picker')
const startButton = document.querySelector('button[data-start]')
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

// налашт flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if(userSelectedDate < new Date()) {
          iziToast.error({
            title: `Error`,
            message: `Please choose a date in the future`,
        })    
    } else {
        startButton.disabled = false
    }  
  },
};

// ініціфлізуємо flatpickr
flatpickr(input, options);


// функція для запуску таймера
startButton.addEventListener(`click`, () => {
    startButton.disabled = true;
    input.disabled = true;
    startCountdown();
})

const startCountdown = () => {
    timerInterval = setInterval(() => {
        const now = new Date();
        const timeRemaining = userSelectedDate - now;
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            iziToast.info({
                title: 'Time is up!',
                message: 'Countdown finished',
            });
            input.disabled = false;
            return;
        }

        const timeObject = convertMs(timeRemaining);
        updateDisplay(timeObject)
    })

}

function updateDisplay({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// функція для конвертації мс
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}





















