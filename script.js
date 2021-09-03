const API_KEY='api_key=f66214d11064f1cc8757f9eacf05925a';
const BASE_URL='https://api.themoviedb.org/3';
const API_URL= BASE_URL+ '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL+ '/search/movie?'+API_KEY;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res=> res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = ' ';

    data.forEach(movie => {
        const{title,poster_path} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src ="${IMG_URL+poster_path}" height=400px width=300px  alt ="${title}">  
 
        <div class="desc"><h3>${title}</h3></div>

        
        `
        
       main.appendChild(movieEl);
    })
}

form.addEventListener('submit',(e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm){
        getMovies(searchURL + '&query='+ searchTerm)
    }
    else{
        getMovies(API_URL);
    }
})