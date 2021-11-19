import flatpickr from "flatpickr";

import Notiflix from 'notiflix';



const inputEl = document.querySelector('input[id="datetime-picker"]');

const btnStartEl = document.querySelector('button');

const spanDays = document.querySelector('span[data-days]');

const spanHours = document.querySelector('span[data-hours]');

const spanMinutes = document.querySelector('span[data-minutes]');

const spanSeconds = document.querySelector('span[data-seconds]');


let curDate;

let flag = false;


const setParam = {
    dateFormat: "d.m.Y H:i",
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    defaultHour: 0,
    defaultMinute: 0,
    onClose(selectedDates) {

        curDate = new Date();
        
        if (!flag) {

        if (selectedDates[0] < curDate) {
            
            Notiflix.Notify.failure('Please choose a date in the future', {fontSize: '30px', width: 'auto'}); 

            return
        };
        
        btnStartEl.disabled = false;            

        };   
    },
};

const calendar = flatpickr(inputEl, setParam);

let timerId;



const onBtnStartClick = event => {
    
    if (event.target.nodeName === 'BUTTON') {

        btnStartEl.disabled = true;
        
        flag = true;

       timerId = setInterval(setIntervalCallback, 1000, calendar.selectedDates[0],addLeadingZero);

    };
};

btnStartEl.addEventListener('click', onBtnStartClick);



function setIntervalCallback(startDate, addLeadingZero) {

   const diff = startDate - new Date();

    if (diff > 0) {
        const second = 1000;

        const minute = second * 60;

        const hour = minute * 60;

        const day = hour * 24;

        const days = Math.floor(diff / day);
  
        const hours = Math.floor((diff % day) / hour);
  
        const minutes = Math.floor(((diff % day) % hour) / minute);
  
        const seconds = Math.floor((((diff % day) % hour) % minute) / second);

        spanDays.textContent = addLeadingZero(days);

        spanHours.textContent = addLeadingZero(hours);

        spanMinutes.textContent = addLeadingZero(minutes);
        
        spanSeconds.textContent = addLeadingZero(seconds);

    } else {

        flag = false;

        clearInterval(timerId);

    };
};


function addLeadingZero(value) {
      
    return String(value).padStart(2, '0');
};

