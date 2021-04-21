async function get_url(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function encrypt() {
    var msg = document.getElementById("encrypt_msg").value;
    var key = document.getElementById("encrypt_key").value;
    var server_ip = document.getElementById("server_ip").value;
    var url = "http://" + server_ip + "/encrypt_api?msg=" + encodeURIComponent(msg) + "&key=" + encodeURIComponent(key);
    get_url(url)
        .then(data => {
            document.getElementById("encrypt_output").innerHTML = data[0]
        });
}

function decrypt() {
    var secret = document.getElementById("decrypt_secret").value;
    var key = document.getElementById("decrypt_key").value;
    var server_ip = document.getElementById("server_ip").value;
    var url = "http://" + server_ip + "/decrypt_api?secret=" + encodeURIComponent(secret) + "&key=" + encodeURIComponent(key);
    get_url(url)
        .then(data => {
            console.log(data)
            document.getElementById("decrypt_output").innerHTML = data[0]
        });
}

function brute_force() {
    var secret = document.getElementById("brute_secret").value;
    var server_ip = document.getElementById("server_ip").value;
    var url = "http://" + server_ip + "/brute_api?secret=" + encodeURIComponent(secret);
    get_url(url)
        .then(data => {
            table.innerHTML = ""
            data.forEach(function (item, i) {
                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = item[0];
                cell2.innerHTML = item[2];
                cell3.innerHTML = item[1];
            });
        });
}

var table = document.getElementById("brute_force_output");
console.log("Loaded vigenere.js")