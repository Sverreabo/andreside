async function get_url(url = '') {
    try {
        document.body.style.cursor = "progress";
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        return response.json();

    } catch (err) {
        alert("Kunne ikke koble til serveren. Sjekk IP-adressen.");
    } finally {
        document.body.style.cursor = "unset";
    }
}

function encrypt() {
    const msg = encrypt_msg_field.value;
    const key = encrypt_key_field.value;
    const server_ip = server_ip_field.value;
    const url = "http://" + server_ip + "/encrypt_api?msg=" + encodeURIComponent(msg) + "&key=" + encodeURIComponent(key);
    get_url(url)
        .then(data => {
            encrypt_output.innerHTML = data[0]
        });
}

function decrypt() {
    const secret = decrypt_secret_field.value;
    const key = decrypt_key_field.value;
    const server_ip = server_ip_field.value;
    const url = "http://" + server_ip + "/decrypt_api?secret=" + encodeURIComponent(secret) + "&key=" + encodeURIComponent(key);
    get_url(url)
        .then(data => {
            decrypt_output.innerHTML = data[0]
        });
}

function brute_force() {
    const secret = brute_secret_field.value;
    const server_ip = server_ip_field.value;
    const url = "http://" + server_ip + "/brute_api?secret=" + encodeURIComponent(secret);
    const t0 = performance.now()
    get_url(url)
        .then(data => {
            let total = Math.round((performance.now() - t0)) / 1000;
            if (data[0] == "ERROR") {
                window.alert("Noe gikk feil! Har du brukt bokstaver som ikke finnes i alfabetet du finner nedenfor?");
            } else {
                reset_table();
                data.forEach(function (item, i) {
                    let row = table.insertRow(-1);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    cell1.innerHTML = item[0];
                    cell2.innerHTML = item[2];
                    cell3.innerHTML = item[1];
                });
            }

            brute_time_field.innerHTML = String(total) + " sekunder"
            document.body.style.cursor = "unset";
        });
}

function reset_table() {
    table.innerHTML = "<thead><tr><th>Dekryptert tekst</th><th>Kodeord</th><th>Antall engelske ord</th></tr></thead>"
}

function paste_kryptonott() {
    document.getElementById("brute_secret").value = 't-JO:BK0aM,:CQ+ÆAGW?FJGB0KVCGMQ6SQN"GAIDL-PÅ7954E:7Jr,IÆoCF0M"CQdØVlHD53CÅ;IA2DMG5ØHDØVåL:JQØ439LRBBVEMTBÆ6CF0M"CQNAG8G1V6LÅ8FF4Z';
}

const server_ip_field = document.getElementById("server_ip");

const encrypt_msg_field = document.getElementById("encrypt_msg");
const encrypt_key_field = document.getElementById("encrypt_key");
const encrypt_output = document.getElementById("encrypt_output");

const decrypt_secret_field = document.getElementById("decrypt_secret");
const decrypt_key_field = document.getElementById("decrypt_key");
const decrypt_output = document.getElementById("decrypt_output");

const brute_secret_field = document.getElementById("brute_secret");
const brute_time_field = document.getElementById("brute_force_time")
const table = document.getElementById("brute_force_output");
reset_table();
