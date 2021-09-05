function getAuthor ( id ) {
    return new Promise ( (resolve, reject) => {
        fetch( `https://jsonplaceholder.typicode.com/users/${id}` )
        .then( user => { resolve( user.name ) } )
        .catch( err => { console.error(err); resolve("Falha ao buscar nome"); } )
    } )
}

function setLoading ( state ) {
    const loading = document.getElementById( "loading" );
    if ( state ) {
        document.getElementById("list").style.display = "none";
        loading.style.display = "block";
    } else {
        document.getElementById("list").style.display = "block";
        loading.style.display = "none";
    }
}

function clearList ( ) {
    document.getElementById("list").innerHTML = "";
}

function add ( obj ) {
    getAuthor( obj.userId )
    .then( name => {
        document.getElementById("list").innerHTML += 
        `
        <li>
            <div class="collapsible-header">
                <i class="material-icons">photos</i>
                ${obj.title}
                <i class="material-icons" style="postion:absolute;right:2rem;">arrow_drop_down</i>
            </div>
            <div class="collapsible-body" style="margin:auto" id="images${obj.id}">
                Autor: ${name}<br>
                
            </div>
        </li>
        `;
    } );
}

function fillAlbums ( query = "" ) {
    fetch( "https://jsonplaceholder.typicode.com/photos"+query )
    .then( pics => {
        pics.forEach( pic => {
            const album = document.getElementById( "images"+pic.albumId );
            if ( album ) album.innerHTML += `<img src="${pic.url}">`;
        } )
        setLoading(false);
    } )
}

function update ( options ) {
    setLoading(true);
    let url = "https://jsonplaceholder.typicode.com/posts";

    let queryElements = [];
    const keys = Object.keys(options);
    keys.forEach( key => {
        queryElements.push( `${key}=${options[key]}` );
    } )
    const query = "?"+queryElements.join("&");
    url += query;

    fetch( url )
    .then( result => {
        clearList();
        if ( result.length == 0 ) setLoading(false);
        result.forEach( add );
        $('.collapsible').collapsible();
        fillAlbums(query.replace("id","albumId"));
    } )
    .catch( console.error );
}

function searchWithFilters ( ) {
    const query = {};
    const postId = document.getElementById("postId").value;
    const userId = document.getElementById("userId").value;
    if ( postId != "" ) query["id"] = postId;
    if ( userId != "" ) query["userId"] = userId;
    update(query);
}

update({});