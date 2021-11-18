function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const btnStartEl = document.querySelector('button[data-start]');

const btnStopEl = document.querySelector('button[data-stop]');


btnStopEl.disabled = true;

let timerId;

const setIntervalCallback = function () {
  
  document.body.style.backgroundColor = getRandomHexColor();

};



const onBtnClick = (event) => {
  
  if (event.target.hasAttribute('data-start')) {

    btnStopEl.disabled = false;

    btnStartEl.disabled = true;
    
    timerId = setInterval(setIntervalCallback, 1000);

  };

  if (event.target.hasAttribute('data-stop') && !btnStopEl.disabled) {

    btnStartEl.disabled = false;
    
    clearInterval(timerId);

    btnStopEl.disabled = true;

  };

};

document.addEventListener('click', onBtnClick);
