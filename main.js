
const API_URL_RANDOM= 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_UY8osHOdK0PVxP3zjagUB01e7NOhmZ3OorKCUjr1AXUVmjFpRbtnBlNuaUGuxr4c';

const API_URL_FAVORITES= 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_UY8osHOdK0PVxP3zjagUB01e7NOhmZ3OorKCUjr1AXUVmjFpRbtnBlNuaUGuxr4c';

const spanError = document.getElementById('error');

async function loadRandom(){
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    
    console.log("Load");
    console.log(data);

   if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error" + res.status;
   } else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        img1.src = data[0].url;
        img2.src = data[1].url;
   }
}

async function loadFavorites(){
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();

    console.log("Favoritos");
    console.log(data);

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error" + res.status + data.message;
    }
}

loadRandom();
loadFavorites();