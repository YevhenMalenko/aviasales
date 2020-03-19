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
};

const renderCheapDay = (cheapTicket) => {
  console.log(cheapTicket);
  
};

const renderCheapYear = (cheapTickets) => {
  cheapTickets.sort(function (a, b) {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });
  console.log(cheapTickets);
};

const renderCheap = (data, date) => {
  const cheapTicketYear = JSON.parse(data).best_prices;
  
  const cheapTicketDay = cheapTicketYear.filter((item) => {
    return item.depart_date === date;
  });

  renderCheapDay(cheapTicketDay);
  renderCheapYear(cheapTicketYear);

};

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

formSearch.addEventListener('submit', (event) => {
  event.preventDefault();

  const cityFrom = city.find((item) => inputCitiesFrom.value === item.name),
        cityTo = city.find((item) => inputCitiesTo.value === item.name);

  const formData = {
    from: cityFrom.code,
    to: cityTo.code,
    when: inputDateDepart.value,

  };

  const requestData = `?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&one_way=true&token=${API_KEY}`;

  const requestData2 = '?depart_date=' + formData.when +
        '&origin=' + formData.from + 
        '&destination=' + formData.to +
        '&one_way=true&token=' + API_KEY;

  getData(calendar + requestData, (response) => {
    renderCheap(response, formData.when);
  });
        
});

//вызовы функций

getData(citiesApi, (data) => {
  city = JSON.parse(data).filter((item) => {
    return item.name;
  });
  
});