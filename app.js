window.onload = function(){

    const fetch = function(URL){
    const http = new XMLHttpRequest();

    http.onreadystatechange = function(){

        if(http.readyState == 4 && http.status == 200){
            
            let content = JSON.parse(http.responseText);
            console.log(content);

            //fetching data for search
            const restroList = document.createElement('ul');
            restroList.classList.add('restro-list');

            content.data.forEach( info =>{
                const restroInfo = document.createElement('li');
                restroInfo.classList.add('restro-info');

                const restroName = document.createElement('span');
                restroName.textContent = info.name;
                restroName.style.fontSize = "1.2em";

                const restroAdd = document.createElement('span');
                restroAdd.textContent = info.address;
                restroAdd.style.color = '#595959';

                const restroRating = document.createElement('span');
                restroRating.textContent = info.rating;
                restroRating.style.color = '#ff0000';


                const lineBreak = document.createElement('br');
                const secondBreak = document.createElement('br');

                restroInfo.appendChild(restroName);
                restroInfo.appendChild(lineBreak);
                restroInfo.appendChild(restroAdd);
                restroInfo.appendChild(secondBreak);
                restroInfo.appendChild(restroRating);

                restroList.appendChild(restroInfo);
                
            })
            document.querySelector('#banner').appendChild(restroList);
            

            //search functionality
            const searchBar = document.forms['search-restro'].querySelector('input');
            
            searchBar.addEventListener('keyup', (e)=>{
                restroList.style.display = 'block';
                const searchQuery = e.target.value.toLowerCase();
                const names = restroList.getElementsByTagName('li');

                Array.from(names).forEach(name =>{
                    const title = name.firstElementChild.textContent;
                    if(title.toLowerCase().indexOf(searchQuery) != -1){
                        name.style.display = 'block';
                    }else{
                        name.style.display = 'none';
                    }
                })
            })

            //showcasing few restaurants
            for(let i=7; i<11; i++){

                //creating card
                const restro = document.createElement('div');
                restro.classList.add('card');
                
                const image = document.createElement('img');
                image.classList.add('image', 'rounded', 'mx-auto', 'd-block');
                const imgReference = content.data[i].photo.images.original.url;
                image.setAttribute("src", imgReference);

                const name = document.createElement('span');
                name.classList.add('name');
                name.textContent = content.data[i].name;

                const rating = document.createElement('span');
                rating.classList.add('name');
                rating.textContent = "Ratings: " + content.data[i].rating;

                restro.appendChild(image);
                restro.appendChild(name);
                restro.appendChild(rating);
                document.querySelector('#list').appendChild(restro);
            } 

            //cuisine showcase

               
        }
    }

	http.open('GET', URL);
	http.setRequestHeader("x-rapidapi-host", "tripadvisor1.p.rapidapi.com");
    http.setRequestHeader("x-rapidapi-key", "43f633262amsh9247ee5c4767fefp126ce3jsnfcc438d97959");
    http.send();

    }
    
    fetch("https://tripadvisor1.p.rapidapi.com/restaurants/list?restaurant_tagcategory_standalone=10591&lunit=km&restaurant_tagcategory=10591&limit=30&currency=USD&lang=en_US&location_id=293919");
}

