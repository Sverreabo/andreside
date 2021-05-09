function main() {
    var d = new Date();
    current_time.innerHTML = d.toUTCString();

    setTimeout("main()", 500);

}

const current_time = document.getElementById("current_time");
main();