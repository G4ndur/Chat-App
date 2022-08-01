export function getItem(){

    return fetch(`/loggedin.php`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })


}
