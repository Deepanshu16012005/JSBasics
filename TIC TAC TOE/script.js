const boxes = document.querySelectorAll(".box");
const player = document.querySelector("[data-player]");
const newGameButton = document.querySelector(".button");

let currentPlayer;
let gameGrid;
let winningPosition = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];
initGame();
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        if(boxes[index].classList.contains("win")){
            boxes[index].classList.remove("win");
        }
    })
    newGameButton.classList.remove("active");
    player.innerText = `Current Player - ${currentPlayer}`;
}

boxes.forEach((box,index)=>{
    box.addEventListener('click' , ()=>{
        handleClick(index);
    });
});
function handleClick(index){
    if(gameGrid[index] === ""){
        //ui
        boxes[index].innerHTML = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //inner logic
        gameGrid[index] = currentPlayer;
        if(currentPlayer === "X"){
            currentPlayer = "O";
        }else{
            currentPlayer = "X";
        }
        player.innerText = `Current Player - ${currentPlayer}`;
        wincheck();
    }
}
newGameButton.addEventListener("click" , ()=>{
    initGame();
});
function wincheck(){
    let ans = "";
    winningPosition.forEach((position)=>{
        if(gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "" 
            && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]
        ){
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            position.forEach((index)=>{
                boxes[index].classList.add("win");
            })
            ans = gameGrid[position[0]];
            player.innerText = `Winning Player - ${ans}`;
            newGameButton.classList.add("active");
            
        }
    })
    if(tie()){
        player.innerText = "Game Tied!";
        newGameButton.classList.add("active");
    }
}
function tie(){
    return !gameGrid.includes("");
}