let waitingList = [];

function writeToWaitingList() {
    let nameInput = document.querySelector('#nameInput').value;
    let emailInput = document.querySelector('#emailInput').value;

    let newStudent = {
        name: nameInput,
        emailInput: emailInput
    }

    console.log(`Wrote ${nameInput} to the waitList`);

    waitingList.push(newStudent);
}

function printWaitingList() {

    let concatenation;

    waitingList.forEach(e => {
        concatenation += e.name;
        console.log(e.name);
    });

    console.log(concatenation);

    let waitingListPrint = document.querySelector(`#waitingList`);
    

}