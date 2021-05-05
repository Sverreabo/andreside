function main() {
    var d = new Date();
    document.getElementById("currenttime").innerHTML = d.toUTCString();

    setTimeout("main()", 500);

}

main();