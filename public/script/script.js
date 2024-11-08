/* 
SCRIPT 

Author: Washington Valencia
Instructor: Washington Valencia

ENTER STUDENT INFORMATION HERE 
==========================================
CCTB project DevOps course
STUDENT NAME:  Daniel Andres
STUDENT ID:
SQAC114
==========================================

*/

//define constants
const DAILYRATE = 50;
//Group 1
const MINSIZEGRP1 = 5;
const MAXSIZEGRP1 = 10;
const DISCGRP1 = 0.10;
//Group 2
const MAXSIZEGRP2 = 24;
const DISCGRP2 = 0.20;
//Group 3
const DISCGRP3 = 0.25;

// Define initial positions based on the bee's current position
let bee = document.getElementById("bee");
let advice = document.getElementById("advice");

let wPos = parseInt(bee.style.left) || 0;
let hPos = parseInt(bee.style.top) || 0;

// Screen size
let wSize = window.innerWidth;
let hSize = window.innerHeight;

// Global variable for interval ID
let intID;

// Define variables for input
let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let groupSize = document.getElementById("GroupSize");
let discRate = document.getElementById("discRate");
let membersLst = document.getElementById("members");

// Define variables for buttons
let addMemberBtn = document.getElementById("addMemberBtn");
let deleteMemberBtn = document.getElementById("deleteMemberBtn");
let sortMemberListBtn = document.getElementById("sortMemberListBtn");

let ratePerson;

/*
* Function to check that a user has entered a group member’s first and last name.
*/
function CheckForGroupMemberInput() {
    if (!firstname.value || !lastname.value) {
        alert("Please enter a group member's full name.");
        return;
    }
    CheckForGroupSizeInput();
}

/*
* Function to check that a user has entered a value for how many people are in the group and that the entry is numeric.
*/
function CheckForGroupSizeInput() {
    if (!groupSize.value) {
        alert("Please enter the size of your group travelers.");
        groupSize.focus();
        return;
    }
    if (isNaN(groupSize.value) || groupSize.value <= 0) {
        alert("Size must be a positive number.");
        groupSize.focus();
        return;
    }
    CalcGroupDiscount(parseInt(groupSize.value));
}

/*
* Function to calculate the applicable discount per group member based on group size. 
*/
function CalcGroupDiscount(groupSize) {
    if (groupSize < MINSIZEGRP1) {
        ratePerson = DAILYRATE;
    } else if (groupSize >= MINSIZEGRP1 && groupSize <= MAXSIZEGRP1) {
        ratePerson = DAILYRATE - (DAILYRATE * DISCGRP1);
    } else if (groupSize > MAXSIZEGRP1 && groupSize <= MAXSIZEGRP2) {
        ratePerson = DAILYRATE - (DAILYRATE * DISCGRP2);
    } else if (groupSize > MAXSIZEGRP2) {
        ratePerson = DAILYRATE - (DAILYRATE * DISCGRP3);
    }

    discRate.value = ratePerson.toFixed(2);
    AddGroupMember(lastname.value, firstname.value);
}

/*
* Function to add a group member to the selection list.
*/
function AddGroupMember(lastName, firstName) {
    if (!firstName || !lastName) {
        alert("Please enter a full name.");
        return;
    }

    let option = document.createElement("option");
    option.text = lastName + ", " + firstName;
    membersLst.add(option);

    lastname.value = "";
    firstname.value = "";
    lastname.focus();
}

/*
* Function to remove (delete) a selected group member from the selection list.
*/
function RemoveGroupMember() {
    if (membersLst.selectedIndex >= 0) {
        membersLst.remove(membersLst.selectedIndex);
    } else {
        alert("Please select a member to delete.");
    }
}

/*
* Function to sort the list of group members in ascending order by last name.
*/
function SortGroupMembers() {
    if (membersLst.options.length > 0) {
        let tmpArray = [];

        for (let i = 0; i < membersLst.options.length; i++) {
            tmpArray[i] = [membersLst.options[i].text, membersLst.options[i].value];
        }
        tmpArray.sort();

        for (let i = 0; i < tmpArray.length; i++) {
            let op = new Option(tmpArray[i][0], tmpArray[i][1]);
            membersLst.options[i] = op;
        }
    } else {
        alert("There are no group members to sort!");
    }
}

/*
* Function to animate the bee element across the screen.
*/
function FlyingBee() {
    wPos += 50;
    hPos += 10;

    if (wPos <= wSize * 0.65 || hPos <= hSize * 0.20) {
        bee.style.left = wPos + "px";
        bee.style.top = hPos + "px";
    } else {
        clearInterval(intID);
        advice.style.display = "block";
    }
}

// Event listeners for buttons
addMemberBtn.addEventListener("click", function () {
    try {
        CheckForGroupMemberInput();
    } catch (e) {
        alert(e);
    }
});

deleteMemberBtn.addEventListener("click", function () {
    try {
        RemoveGroupMember();
    } catch (e) {
        alert(e);
    }
});

sortMemberListBtn.addEventListener("click", function () {
    try {
        SortGroupMembers();
    } catch (e) {
        alert(e);
    }
});

// Start the bee animation
bee.addEventListener("load", function () {
    bee.style.visibility = "visible";
    intID = setInterval(FlyingBee, 300);
});
