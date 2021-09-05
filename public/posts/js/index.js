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
            <div class="collapsible-header">
                <i class="material-icons">drafts</i>
                ${obj.title}
                <i class="material-icons" style="postion:absolute;right:2rem;">arrow_drop_down</i>
            </div>
            <div class="collapsible-body" id="post${obj.id}">
                ${obj.body}
                <br><br>
                Autor: ${name}
                <br><br><br>
                <b> Comentários </b><br><br>
            </div>
        </li>
        `;
    } );
}

function fillComments ( query = "" ) {
    fetch( "https://jsonplaceholder.typicode.com/comments"+query )
    .then( comments => {
        comments.forEach( comment => {
            const post = document.getElementById( "post"+comment.postId );
            if ( post ) post.innerHTML += `Por ${comment.email}:<br> ${comment.body}<br><br>`;
        } )
    } )
}

function update ( options ) {
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
        result.forEach( add );
        $('.collapsible').collapsible();
        fillComments(query.replace("id","postId"));
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