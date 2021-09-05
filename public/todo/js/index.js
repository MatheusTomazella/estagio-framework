function getAuthor ( id ) {
    return new Promise ( (resolve, reject) => {
        fetch( `https://jsonplaceholder.typicode.com/users/${id}` )
        .then( user => { resolve( user.name ) } )
        .catch( err => { console.error(err); resolve("Falha ao buscar nome"); } )
    } )
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
            <div class="collapsible-header" style="display:flex;flex-direction:row;justify-content:space-between;">
                <div>
                    <i class="material-icons" style="color:${obj.completed?"lime":"red"}">${(obj.completed)?"check":"close"}</i>
                    ${obj.title}
                </div>
                Por: ${name}
            </div>
        </li>
        `;
    } );
}

function update ( options ) {
    let url = "https://jsonplaceholder.typicode.com/todos";

    let queryElements = [];
    const keys = Object.keys(options);
    keys.forEach( key => {
        queryElements.push( `${key}=${options[key]}` );
    } )
    url += "?"+queryElements.join("&");

    fetch( url )
    .then( result => {
        clearList();
        result.forEach( add );
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