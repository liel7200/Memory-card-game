//variables

//array of images
var images = ["images/cards/bear.jpg","images/cards/bunny.jpg","images/cards/cat.jpg","images/cards/dog.jpg","images/cards/panda.jpg","images/cards/penguin.jpg"];
var imagesArr = images.concat(images); 

// message after winning
var congratsMessage = document.createElement("h2");
congratsMessage.innerHTML = "congrats! you finish the game!";

// message after winning
var newGameBtn = document.createElement("button");
newGameBtn.innerHTML = "new game";
newGameBtn.addEventListener("click",newGame);

//table elements
const table = document.getElementsByTagName('table');
const cells = document.getElementsByTagName("td");
var counterImage;

//shuffle array of images
// imagesArr =  shuffle(imagesArr);

newGame()
//start new game
function newGame(){
  
  //shuffle array of images
  imagesArr =  shuffle(imagesArr);
  counterImage=0;

  //if this is not the first game, remove message and button
  if(cells[0].children.length == 1){
    document.body.removeChild(congratsMessage);
    document.body.removeChild(newGameBtn);
  }
  //run all cells of table
  for (let cell of cells) 
  {
    //if this is not the first game, remove old pic
    if(cell.children.length == 1){
      cell.removeChild(cell.getElementsByTagName("img")[0]);
      cells[counterImage].className = "flipped";
    }  
    //create image and add to cell, add eventListener
    var currentImage = document.createElement("img");
    currentImage.src = imagesArr[counterImage];
    currentImage.style.visibility = "visible";
    cell.appendChild(currentImage);
    cell.addEventListener('click', clickedCard);
    counterImage++;
  }
 
 }

//shuffle array of images
function shuffle(array) 
{
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

// Change not selected card events
function addOrRemoveEvent(addOrRemove){
  //if true then add back eventListener to all other cards
  //if false then remove eventListener from all other cards
  if(addOrRemove)
  {
    for(let i = 0; i < document.getElementsByClassName("flipped").length; i++){
      document.getElementsByClassName("flipped")[i].addEventListener("click",clickedCard);
    }
  }
  else{
    for(let i = 0; i < document.getElementsByClassName("flipped").length; i++){
      document.getElementsByClassName("flipped")[i].removeEventListener("click",clickedCard);
    }
  } 
}


//if card is chosed
function clickedCard(){
  //change class of selected card, show card and remove eventListener
  this.className = "visible";
  this.removeEventListener("click",clickedCard);
  this.getElementsByTagName("img")[0].style.visibility = "visible";
  //check if there are 2 cards that have been chosen check match
  if(document.getElementsByClassName("visible").length == 2)
  {
    addOrRemoveEvent(false);
    const myTimeout = setTimeout(check, 1000);
    function check() 
    {
      checkMatch();
    } 
  }
}

//check if the selected cards are identical
function checkMatch(){
  // if the src of the 2 card is identical
  if(document.getElementsByClassName("visible")[0].children[0].src === document.getElementsByClassName("visible")[1].children[0].src)
  {
    //identical - remove eventListener and change class to hidden
    document.getElementsByClassName("visible")[1].removeEventListener("click",clickedCard);
    document.getElementsByClassName("visible")[0].removeEventListener("click",clickedCard);
    document.getElementsByClassName("visible")[1].className = "hidden";
    document.getElementsByClassName("visible")[0].className = "hidden";
  }
  else
  {
    //not identical - add back eventListener and change back class to flipped
    document.getElementsByClassName("visible")[1].addEventListener("click",clickedCard);
    document.getElementsByClassName("visible")[0].addEventListener("click",clickedCard);
    document.getElementsByClassName("visible")[1].className = "flipped";
    document.getElementsByClassName("visible")[0].className = "flipped";
  }
  // add back to all cards eventListener
  addOrRemoveEvent(true);
  //if game is finished
  if(document.getElementsByClassName("flipped").length == 0)
  {
    document.body.insertBefore(congratsMessage, document.body.children[1]);
    document.body.insertBefore(newGameBtn, document.body.children[2]);
  }
}