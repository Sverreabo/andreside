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
            document.getElementById("decrypt_output").innerHTML = data[0]
        });
}

function brute_force() {
    var secret = document.getElementById("brute_secret").value;
    var server_ip = document.getElementById("server_ip").value;
    var url = "http://" + server_ip + "/brute_api?secret=" + encodeURIComponent(secret);
    var t0 = performance.now()
    get_url(url)
        .then(data => {
            var total = Math.round((performance.now() - t0)) / 1000;
            if (data[0] == "ERROR") {
                window.alert("Noe gikk feil! Har du brukt bokstaver som ikke finnes i alfabetet du finner nedenfor?");
            } else {
                reset_table();
                data.forEach(function (item, i) {
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    cell1.innerHTML = item[0];
                    cell2.innerHTML = item[2];
                    cell3.innerHTML = item[1];
                });
            }

            document.getElementById("brute_force_time").innerHTML = String(total) + " sekunder"
        });
}

function reset_table() {
    table.innerHTML = "<thead><tr><th>Dekryptert tekst</th><th>Kodeord</th><th>Antall engelske ord</th></tr></thead>"
}

function paste_kryptonott() {
    document.getElementById("brute_secret").value = 't-JO:BK0aM,:CQ+ÆAGW?FJGB0KVCGMQ6SQN"GAIDL-PÅ7954E:7Jr,IÆoCF0M"CQdØVlHD53CÅ;IA2DMG5ØHDØVåL:JQØ439LRBBVEMTBÆ6CF0M"CQNAG8G1V6LÅ8FF4Z';
}

var table = document.getElementById("brute_force_output");
reset_table()
console.log("Loaded vigenere.js")