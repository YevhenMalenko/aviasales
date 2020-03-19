const formSearch = document.querySelector('.form-search'),
      inputCitiesFrom = document.querySelector('.input__cities-from'),
      dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
      inputCitiesTo = document.querySelector('.input__cities-to'),
      dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
      inputDateDepart = document.querySelector('.input__date-depart');
//данные 
const citiesApi = 'database/cities.json',
      proxy = 'https://cors-anywhere.herokuapp.com/',
      API_KEY = 'feb8919d59003e547e1da44ab6e59e8f',
      calendar = 'http://min-prices.aviasales.ru/calendar_preload';

let city = [];

const getData = (url, callback) => {
  const request = new XMLHttpRequest();

  request.open('GET', url);

  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) return;

    if (request.status === 200) {
      callback(request.response);
    } else {
      console.error(request.status); 
    }
  });
  
  request.send();
};


const showCity = (input, list) => {
  list.textContent = '';

  if (input.value !== '') {
    const cityFilter = city.filter((item) => {
      const fixItem = item.name.toLowerCase();
      return fixItem.includes(input.value.toLowerCase());
    });
    
    cityFilter.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('dropdown__city');
      li.textContent = item.name;
      list.append(li);
    });

  }
  
};

const selectCity = (event, input, list) => {
  const target = event.target;
  if(target.tagName === 'LI') {
    input.value = target.textContent;
    list.textContent = '';
  }
}
// обработчики событий 

inputCitiesFrom.addEventListener('input', () => {
  showCity(inputCitiesFrom, dropdownCitiesFrom);
});

inputCitiesTo.addEventListener('input', () => {
  showCity(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesFrom.addEventListener('click', (event) => {
  selectCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesTo.addEventListener('click', (event) => {
  selectCity(event, inputCitiesTo, dropdownCitiesTo);
});


//вызовы функций

getData(citiesApi, (data) => {
  city = JSON.parse(data).filter((item) => {
    return item.name;
  });
  
});