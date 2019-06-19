const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();

    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=fe4bf1ca4fa9821ac4fd8b2a6d04c2fd&language=ru&query=' + searchText;

    movie.innerHTML = 'Загрузка...';
    
    fetch(server)
        .then(function (value) {
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function (output) {
            let inner = '';
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                let posterItem;

                if (item.poster_path !== null) {
                    posterItem = urlPoster + item.poster_path;
                } else {
                    posterItem = './src/img/no_image.png'
                }
                
                inner += `
                    <div class="col-3 col-md-4 col-xl-3 item">
                        <img src="${posterItem}" alt="${nameItem}">
                        <h5>${nameItem}</h5>
                    </div>
                `;
            });
            movie.innerHTML = inner;
        })
        .catch(function (reason) {
            movie.innerHTML = 'Упс! Что-то пошло не так...';
            console.error('error: ' + reason);
        });
}

searchForm.addEventListener('submit', apiSearch);
