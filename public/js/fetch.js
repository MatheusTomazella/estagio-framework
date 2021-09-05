function fetch ( url ) {
    return new Promise ( ( resolve, reject ) => {
        $.ajax({
            type: "GET",
            url: url,
            success: resolve,
            error: reject
        });
    } )
}