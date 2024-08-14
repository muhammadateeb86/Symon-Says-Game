let level = 0;
let start = false;
let Col = ["red", "blue", "pink", "yellow"];
let btnSeq = [];
let userSeq = [];
let h2 = document.querySelector('h2');

document.addEventListener('keypress', function() {
    if (!start) {
        levelUp();
        start = true;
    }
});

function flashCol(btn) {
    btn.style.backgroundColor = "white";
    setTimeout(function() {
        btn.style.backgroundColor = `${btn.getAttribute('id')}`;
    }, 250);
}

function flashColUser(btn) {
    btn.style.backgroundColor = "green";
    setTimeout(function() {
        btn.style.backgroundColor = `${btn.getAttribute('id')}`;
    }, 250);
}

function levelUp() {
    userSeq = []; // Reset user sequence for the new level
    level++;
    h2.innerText = `Level ${level}`;
    let rand = Math.floor(Math.random() * 4); // Fixed to ensure correct range
    let selected = Col[rand];
    btnSeq.push(selected);
    let btn = document.querySelector(`#${selected}`);
    console.log("Sequence:", btnSeq);
    flashCol(btn); // Flash the new button
}

function endingTheme(){
    document.body.style.backgroundColor = "red";
    setTimeout(function() {
        document.body.style.backgroundColor = "white";
    }, 250);
}

function chkAnswer(){
    if (userSeq.length === btnSeq.length) { 
        if (JSON.stringify(userSeq) === JSON.stringify(btnSeq)) {
            setTimeout(levelUp, 500); // Wait and move to next level
        } else {
            endingTheme();
            h2.innerHTML = `Game Over!<br> Your score is ${level}`;
            reset();
        }
    }
}

function UserSel() {
    let btnUser = document.querySelectorAll(".btn");
    btnUser.forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            flashColUser(event.target);
            userSeq.push(event.target.getAttribute('id'));
            chkAnswer();
        });
    });
}

function reset() {
    level = 0;
    start = false;
    btnSeq = [];
    userSeq = [];
    setTimeout(function(){
     h2.innerText = "Press Any Key to Start";
    }, 2000); 
    
}

// Initialize the user selection handlers once
UserSel();
