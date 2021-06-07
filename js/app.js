// Variables
const addBtn = document.getElementById('addBtn');
const delBtn = document.getElementById('delBtn');
const addTxt = document.getElementById('addTxt');
const addTitle = document.getElementById('addTitle');
const notes_div = document.getElementById('notes');
const searchBtn = document.getElementById('searchBtn');
const searchTxt = document.getElementById('searchTxt');
const noteCards = document.getElementsByClassName('noteCard');

// Display all the saved notes when the page is loaded
displayNotes();

// function to display all the notes
function displayNotes() {
    // get the saved notes from the local storage
    const saved_notes = localStorage.getItem("notes");

    // if notes are present the in local storage
    if (saved_notes != null) {

        // convert the notes string to array
        notesArray = JSON.parse(saved_notes);

        // clear the previously displayed notes
        notes_div.innerHTML = "";

        // for each note in the notesArray
        notesArray.forEach((note, index) => {

            // add notes to the notes_div
            notes_div.innerHTML += `
            <div class="noteCard card">
                <div class="card-body">
                    <h5 class="card-title">${note[0]}</h5>
                    <p class="card-text">${note[1]}</p>
                    <button onclick="deleteNote(this.id)" id="${index}" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
            `;
        });
    }
    else {
        notes_div.innerHTML = `You have no saved notes! Use "Add a Note" section above to add notes.`;
    }

}

// Function to delete a note given its array index (id)
function deleteNote(index) {

    // Confirm with the user before proceeding
    const deleteNote = confirm(`Do you really want to delete Note ${index + 1}?`);
    if (deleteNote == true) {

        // get the saved notes from the local storage
        const saved_notes = localStorage.getItem("notes");

        // if notes aren't saved in local storage
        if (saved_notes == null) {
            // create an empty Array
            notesArray = [];
        }
        else {
            notesArray = JSON.parse(saved_notes);

            // remove 1 element starting at index
            notesArray.splice(index, 1)

            // if the notesArray is empty
            if (notesArray.length == 0) {
                // clear the local storage
                localStorage.clear();
            }
            else {
                // save the notesArray to the local storage
                localStorage.setItem("notes", JSON.stringify(notesArray));
            }

            // update the display
            displayNotes();
        }
    }
}

// Everytime the Add Note button is pressed
addBtn.addEventListener('click', () => {

    // get the saved notes from the local storage
    const saved_notes = localStorage.getItem("notes");

    // if notes aren't saved in local storage
    if (saved_notes == null) {
        // create an empty Array
        notesArray = [];
    }
    else {
        notesArray = JSON.parse(saved_notes);
    }

    // if the user hasn't typed anything in the textarea
    if(addTxt.value == ''){
        alert('Please type a note to save');
    }
    else{
        // append the new note to the notesArray
        notesArray.push([addTitle.value, addTxt.value]);
    }

    // save the notesArray to the local storage
    localStorage.setItem("notes", JSON.stringify(notesArray));

    // clear the textArea and title
    addTxt.value = "";
    addTitle.value = "";

    // display all the saved notes
    // this will display the new note
    displayNotes();
});

// Everytime the Delete All button is pressed
delBtn.addEventListener('click', () => {

    // Confirm with the user before proceeding
    const deleteNotes = confirm("Do you really want to delete all of your notes?");
    if (deleteNotes == true) {
        localStorage.clear();
        displayNotes();
    }
});

// Everytime user types in the search bar
searchTxt.addEventListener('input', () => {

    // create an array of noteCards and for each noteCard
    Array.from(noteCards).forEach(noteCard => {

        // get the note of the noteCard
        let cardTxt = noteCard.getElementsByTagName('p')[0];

        // if the card's text includes the search term
        if (cardTxt.innerText.toLowerCase().includes(searchTxt.value.toLowerCase())){

            // display the card
            noteCard.style.display = "block";
        } 
        else{
            // hide the card
            noteCard.style.display = "none";
        }
    });
});