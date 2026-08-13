let songs = ["Hold it Down","Young Blood","Sink", "Hallelujah", "Fine",
    "Hurt Somebody", "Catastrophe", "Passenger", "Please", "Come Down", 
    "False Confidence", "Mess", "Busyhead", "Cynic", "Save Me", "Tidal",
    "Carlo's Song", "A Troubled Mind", "Close Behind", "Glue Myself Shut",
    "Anyway", "Maine", "Pride", "Part of Me", "Godlight",
    "Animal", "Someone Like You", "Caves", "Bad Luck", "Fear of Water", "Hollow",
    "Bury Me", "Howling", "Stick Season", "Northern Attitude", "All My Love",
    "She Calls Me Back", "Come Over", "New Perspective", "Everywhere, Everything",
    "Orange Juice", "Strawberry Wine", "Growing Sideways", "Halloween", 
    "Homesick", "Still", "The View Between Villages",
    "Your Needs, My Needs", "Dial Drunk", "Paul Revere", "No Complaints",
    "Call Your Mom", "You're Gonna Go Far", "Forever",
    "The Great Divide", "Porch Light",
    "End of August", "Doors", "American Cars", "Downfall", "Lighthouse", 
    "Paid Time Off", "Staying Still", "Haircut", "Willing and Able", "Dashboard",
    "23", "Deny Deny Deny", "Headed North", "We Go Way Back", "Spoiled",
    "All Them Horses", "A Few of Your Own", "Orbiter", "Dan"
];

let groups = songs.map(song => [song]);


//current group
let A = 0;
let B = 1;
let i = 0;
let j = 0;
let temp = [];
let newgroup = [];
let round = 1;
//connects buttons to script
const buttonA = document.getElementById("optionA");
const buttonB = document.getElementById("optionB");

//click logic - need to fix/more efficient
buttonA.onclick = () => Winner("A");
buttonB.onclick = () => Winner("B");

// presents options to user
function show() {
    buttonA.textContent = groups[A][i];
    buttonB.textContent = groups[B][j];
}

function Winner(winner) {
    // add winner to newgroup
    if (winner === "A"){
        newgroup.push(groups[A][i]);
        i++;
    } else {
        newgroup.push(groups[B][j]);
        j++;
    }
    round++;
    document.getElementById("roundnumber").textContent = ("Round # " + round)
    next();
}

function next() {
    if (i < groups[A].length && j < groups[B].length){
        show();
        return;
    } else if (i >= groups[A].length) {
        while (j < groups[B].length){
            newgroup.push(groups[B][j]);
            j++;
        }
    } else {
        while (i < groups[A].length){
            newgroup.push(groups[A][i]);
            i++;
        }
    }
    endGroup();
}

function endGroup(){
    temp.push(newgroup);
    newgroup = [];
    A += 2;
    B += 2;
    i = 0;
    j = 0;
    if (B < groups.length) {
        show();
    } else {
        endRound();
    }
}
function endRound() {
    if (groups.length % 2 === 1) {
        temp.unshift(groups[A]);
    }
    if (temp.length === 1) {
        showResults(temp[0]);
        return;
    }
    groups = temp;
    temp = [];
    A = 0;
    B = 1;
    i = 0;
    j = 0;
    show();
}


// // iterate until songs is one list w all songs
// while (groups.length > 1) {
//     //iterate Group vs Group
//     //temp takes next rounds data
//     while (groups.length > B) {
//         // groups battling
//         //iterates for every song in group A & B
//         for (let s = 1; s <= (groups[A].length + groups[B].length); s++) {
//             //if out of songs for one group-->
//             //add song from other group to new group
//             //but if not out of songs for either, show battle
//             if (i = groups[A].length) {
//                 newgroup.push(groups[B][j]);
//                 j += 1;
//             } else if (j = groups[B].length) {
//                 newgroups.push(groups[A][i]);
//                 i += 1;
//             } else {
//                 show();
//             }
//         }
//         //once done with groups- add new group to temp
//         // and go to next groups. resetting variables
//         temp.push(newgroup);
//         newgroup = [];
//         A += 2;
//         B += 2;
//         i = 0;
//         j = 0;
//     }
//     //add in odd result
//     if (groups.length.isodd()) {
//         temp.unshift(groups[A]);
//     }
//     //update groups list
//     groups = temp;
// }


//once done, display results
function showResults(rankedSongs) {
    const container = document.getElementById("results-container");
    container.innerHTML = ""; // clear old results

    rankedSongs.forEach((song, index) => {
        const div = document.createElement("div");
        div.className = "result-item";
        div.textContent = `${index + 1}. ${song}`;
        container.appendChild(div);
    });
}

show();