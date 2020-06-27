window.onload = function(){

    const fetch = function(URL){
    const http = new XMLHttpRequest();

    http.onreadystatechange = function(){

        if(http.readyState == 4 && http.status == 200){
        
            let content = JSON.parse(http.responseText);

            //getting reviews
            for(let i=7; i<11; i++){
                const reviews = document.createElement('div');
                reviews.classList.add('review-card');
                
                const title = document.createElement('h3');
                title.textContent = content.data[i].title;

                const text = document.createElement('p');
                text.classList.add('text');
                text.textContent= content.data[i].text;

                const name = document.createElement('span');
                name.classList.add('author');
                name.textContent = "- " + content.data[i].user.username;

                const year = document.createElement('span');
                year.classList.add('author');
                year.textContent =  content.data[i].travel_date;

                const lineBreak = document.createElement('br');

                reviews.appendChild(title);
                reviews.appendChild(text);
                reviews.appendChild(name);
                reviews.appendChild(lineBreak);
                reviews.appendChild(year);
                document.querySelector('#reviews').appendChild(reviews);
            } 
               
        }
    }

	http.open('GET', URL);
	http.setRequestHeader("x-rapidapi-host", "tripadvisor1.p.rapidapi.com");
    http.setRequestHeader("x-rapidapi-key", "43f633262amsh9247ee5c4767fefp126ce3jsnfcc438d97959");
    http.send();

    }
    
    fetch("https://tripadvisor1.p.rapidapi.com/reviews/list?limit=20&currency=USD&lang=en_US&location_id=8014024");
}