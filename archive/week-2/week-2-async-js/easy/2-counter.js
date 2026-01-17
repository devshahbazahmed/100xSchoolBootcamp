let counter = 0;

function increasPrint() {
    console.log(counter);
    counter++;
    setTimeout(increasPrint, 1000);
}

setTimeout(increasPrint, 1000);
