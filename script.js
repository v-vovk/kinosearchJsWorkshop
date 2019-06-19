const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    //отмена собития по умолчанию
    event.preventDefault();

    // берем значение инпута
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=fe4bf1ca4fa9821ac4fd8b2a6d04c2fd&language=ru&query=' + searchText;
    requestApi('GET', server);
}

//по сабмиту визиваэ функцыю
searchForm.addEventListener('submit', apiSearch);

//server API
function requestApi(method, url) {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', function () {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status !== 200) {
            console.log('error: ' + request.status);
            return;
        }

        const output = JSON.parse(request.responseText);

        let inner = '';

        output.results.forEach(function (item) {
            let nameItem = item.name || item.title;
            inner += '<div class="col-12">' + nameItem + '</div>';
        });

        movie.innerHTML = inner;
    });
}