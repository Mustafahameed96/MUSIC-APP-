// Album Class


class Album{


    constructor(title,band,year){


        this.title = title;
        this.band = band;
        this.year = year;
    }
}

// UI Class:  handle UI tasks

class UI {


    static displayAlbums(){

        const storedAlbums = Store.getAlbums();

        const albums =  storedAlbums;

        albums.forEach(
            
            (album) => UI.addAlbumToTable(album));


    }

    static addAlbumToTable(album){

        const list = document.querySelector('#album-list');

        const row = document.createElement('tr');
        row.innerHTML = 
        `
        <td>${album.title}</td>
        <td>${album.band}</td>
        <td>${album.year}</td>
        <td><button   class = "btn  btn-danger btn-sm delete">X </button></td>
        `;


        list.appendChild(row);





    }

    static deleteAlbum(el){

        
        el.parentElement.parentElement.remove();

        

    }
    
    static showAlert(message , classNames){

        const alert_div = document.createElement('div');
        alert_div.className = `alert alert-${classNames}`;
        alert_div.appendChild(document.createTextNode(message));

        const container  = document.querySelector('.container');
        const form = document.querySelector('.album-form');
        container.insertBefore(alert_div, form);

        //vanish in 3 seconds

        setTimeout(()=> {

            document.querySelector(".alert").remove(),3000

        },3000)


    }

    static clearFields(){

        document.querySelector('#title').value = '';
        document.querySelector('#band').value = '';
        document.querySelector('#year').value = '';


    }
}


//Store class, takes care of local storage


class Store{

    static getAlbums(){

        let albums;

        if(localStorage.getItem('albums') === null){

            albums = [];
        }

        else{

            albums = JSON.parse(localStorage.getItem('albums'));

        }

        return albums;

    }
    static addAlbums(album){

        const albums = Store.getAlbums();
        albums.push(album);
        localStorage.setItem('albums',JSON.stringify(albums));

    }

    static removeAlbums(year)
    {
        const albums = Store.getAlbums();
        albums.forEach((album,index) =>{

            if(album.year === year){

                albums.splice(index,1);
            }

        });
        localStorage.setItem('albums' , JSON.stringify(albums));
    }

}


//Events: display albums
document.addEventListener('DOMContentLoaded',UI.displayAlbums);

//events: remove album



var form =  document.querySelector('.album-form');

form.addEventListener('submit',(e) =>{

e.preventDefault();

const title = document.querySelector('#title').value;
const band = document.querySelector('#band').value;
const year = document.querySelector('#year').value;

if(title == '' || band == '' || year == ''){


    UI.showAlert("please fill the fields", "danger")
}

else{
    UI.clearFields();
    //instantiate album 
    
    const album = new Album(title,band,year) ;
    
    UI.addAlbumToTable(album);
    Store.addAlbums(album);
    UI.showAlert("Album Added" , "success")
    
}



});


// event: add an album



//Remove a book

document.querySelector('#album-list').addEventListener('click',


(e) => {



    if(e.target.classList.contains('delete') ){

            UI.deleteAlbum(e.target);
            Store.removeAlbums(e.target.parentElement.previousElementSibling.textContent);
            UI.showAlert("Album Deleted" , "warning")
    }



} )