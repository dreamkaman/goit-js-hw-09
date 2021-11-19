import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
   return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve({position, delay})}, delay);
              });
  } else {
    return new Promise((resolve, reject) => {
                setTimeout(() => {
                  reject({position, delay})}, delay);
              });
  }
};

const formEl = document.querySelector('.form');

const onFormSubmit = event => {

  event.preventDefault();

  const { delay, step, amount } = formEl.elements;
    
  const myDelay = Number(delay.value);

  const myStep = Number(step.value);

  const myAmount = Number(amount.value);
  
  for (let i = 0; i < myAmount; i += 1) {

    let currentPosition = i + 1;

    let currentDelay = myDelay + i * myStep;

    createPromise(currentPosition, currentDelay)
      .then(({ position, delay }) => {
   // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {fontSize: '30px', width: '500px'}); 
  })
      .catch(({ position, delay }) => {

        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {fontSize: '30px', width: '500px'});
    //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  };
};

  formEl.addEventListener('submit', onFormSubmit);