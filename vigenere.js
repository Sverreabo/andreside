function http_get(URL) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", URL, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function encrypt() {
    var msg = document.getElementById("encrypt_msg").value;
    var key = document.getElementById("encrypt_key").value;
    var server_ip = document.getElementById("server_ip").value;
    var response = http_get(ip + "/encrypt_api?msg=" + encodeURIComponent(msg) + "&key=" + encodeURIComponent(key));
    document.getElementById("encrypt_output").innerHTML = response
}

function decrypt() {
    var secret = document.getElementById("decrypt_secret").value;
    var key = document.getElementById("decrypt_key").value;
    var server_ip = document.getElementById("server_ip").value;
    var response = http_get(ip + "/decrypt_api?secret=" + encodeURIComponent(secret) + "&key=" + encodeURIComponent(key));
    document.getElementById("decrypt_output").innerHTML = response
}

function brute_force() {
    var secret = document.getElementById("decrypt_secret").value;
    var key = document.getElementById("decrypt_key").value;
    var server_ip = document.getElementById("server_ip").value;
    var response = http_get(ip + "/encrypt_api?msg=" + encodeURIComponent(secret) + "&key=" + encodeURIComponent(key));
    var response = JSON.parse(response)
    response.forEach(function (item, i) {
        console.log(item, index);
    });
}