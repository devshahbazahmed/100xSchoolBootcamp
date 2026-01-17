function counter() {
    let counter = 1;
    setInterval(() => {
        console.log(counter);
        counter++;
    }, 1000);
}

counter();
