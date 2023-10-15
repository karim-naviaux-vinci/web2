const dateTimeNow = new Date();
const messageField = document.querySelector("#messageField");
const dateField = document.querySelector("#dateField");

function addDateTime(message) {
    let date = dateTimeNow.toLocaleDateString(); 
    let time = dateTimeNow.toLocaleTimeString();

    console.log(dateTimeNow.toLocaleDateString()); 
    console.log(dateTimeNow.toLocaleTimeString()); 

    alert(date + " " + time + " : " + message);
}

addDateTime("This is the best moment to have a look at this website !");

