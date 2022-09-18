
const API_URL_RANDOM= 'https://api.thecatapi.com/v1/images/search?limit=2';

const API_URL_FAVORITES= 'https://api.thecatapi.com/v1/favourites/';

const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_UY8osHOdK0PVxP3zjagUB01e7NOhmZ3OorKCUjr1AXUVmjFpRbtnBlNuaUGuxr4c`;

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
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        
        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavourite(data[0].id);
        btn2.onclick = () => saveFavourite(data[1].id);
   }
}

async function loadFavorites(){
    const res = await fetch(API_URL_FAVORITES, {
        method: "GET",
        headers: {
            'X-API-KEY': 'live_UY8osHOdK0PVxP3zjagUB01e7NOhmZ3OorKCUjr1AXUVmjFpRbtnBlNuaUGuxr4c',
        }
    });
    const data = await res.json();

    console.log("Favoritos");
    console.log(data);

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error" + res.status + data.message;
    }else{
        const section = document.getElementById('favoriteMichis');
        section.innerHTML ="";
        const h2 = document.createElement('h2');
        const h2text = document.createTextNode('Gatos favoritos');
        h2.appendChild(h2text);
        section.appendChild(h2);

        data.forEach(item =>{  
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar el michi de favoritos');

            img.src = item.image.url;
            img.width = 150;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavourite(item.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function saveFavourite(id){
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json', 
            'X-API-KEY': 'live_UY8osHOdK0PVxP3zjagUB01e7NOhmZ3OorKCUjr1AXUVmjFpRbtnBlNuaUGuxr4c',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });

    const data = await res.json();

    console.log('Save');
    console.log(res);

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error" + res.status + data.message;
    }else{
        console.log('Guardado con exito en favoritos!');
        loadFavorites();
    }
}

async function deleteFavourite(id){
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE'
    });
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error" + res.status + data.message;
    }else{
        console.log('Eliminado con exito de favoritos');
        loadFavorites();
    }
}

loadRandom();
loadFavorites();


