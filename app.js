let gameSequence = [];
let userSequence = [];
let btns = ["red", "blue", "yellow", "purpple"];
let level = 0;
let started = false;
document.addEventListener("keypress", function(){
    if(started==false){
        console.log("Game Start");
        started = true;
        levelup();
    }
    
    
})
function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(() => {
        btn.classList.remove("gameflash");
        },550);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
        },550);
}




    
function levelup(){
    userSequence=[];
    level++;
    let par = document.querySelector("h3");
    par.innerText =`level ${level}`;
    let random = Math.floor(Math.random()*3) 
    let btnidx = btns[random];
    let randombtn = document.querySelector(`.${btnidx}`);
    // console.log(random);
    // console.log(btnidx);
    // console.log(randombtn);
    gameSequence.push(btnidx);
    
    console.log(gameSequence);
    gameFlash(randombtn);
    
}

function checkAns(idx){
    //let idx = level-1;
    if(userSequence[idx] == gameSequence[idx]){
        if(userSequence.length == gameSequence.length){
            setTimeout(levelup,1000);
        }
    }else{
        let par = document.querySelector("h3");
        par.innerHTML = `Game Over! Your score was <b>${level}<b> <br> press any key to Start`;

            document.querySelector("body").style.backgroundColor ="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor ="white";
        },150);
        reset();
    }
}

function btnpress(){
    let btn = this;
    userFlash(btn);
    let usercolor = btn.getAttribute("id");
    //console.log(usercolor);
    userSequence.push(usercolor);
    //console.log(userSequence);
    checkAns(userSequence.length-1);
}

let allBtns = document.querySelectorAll(".box");

for(btnss of allBtns){
    btnss.addEventListener("click",btnpress);
}
function reset(){
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}