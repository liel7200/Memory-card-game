var images = ["images/cards/bear.jpg","images/cards/bunny.jpg","images/cards/cat.jpg","images/cards/dog.jpg","images/cards/panda.jpg","images/cards/penguin.jpg"];
var imagesArr = images.concat(images); 
var congratsMessage = document.createElement("h2");
const table = document.getElementsByTagName('table');
const cells = document.getElementsByTagName("td");
var counterImage = 0;

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

function addOrRemoveEvent(addOrRemove){
  if(addOrRemove)
  {
    for(let i = 0; i < document.getElementsByClassName("flipped").length; i++){
      document.getElementsByClassName("flipped")[i].addEventListener("click",clicked);
    }
  }
  else{
    for(let i = 0; i < document.getElementsByClassName("flipped").length; i++){
      document.getElementsByClassName("flipped")[i].removeEventListener("click",clicked);
    }
  }

  
}

function clicked(){
  this.className = "visible";
  this.removeEventListener("click",clicked);
  this.getElementsByTagName("img")[0].style.visibility = "visible";
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

function checkMatch(){
  if(document.getElementsByClassName("visible")[0].children[0].src === document.getElementsByClassName("visible")[1].children[0].src)
  {
    document.getElementsByClassName("visible")[1].removeEventListener("click",clicked);
    document.getElementsByClassName("visible")[0].removeEventListener("click",clicked);
    document.getElementsByClassName("visible")[1].className = "hidden";
    document.getElementsByClassName("visible")[0].className = "hidden";
  }
  else
  {
    document.getElementsByClassName("visible")[1].addEventListener("click",clicked);
    document.getElementsByClassName("visible")[0].addEventListener("click",clicked);
    document.getElementsByClassName("visible")[1].className = "flipped";
    document.getElementsByClassName("visible")[0].className = "flipped";
  }
  addOrRemoveEvent(true);
  if(document.getElementsByClassName("flipped").length == 0)
  {
    document.body.insertBefore(congratsMessage, document.body.children[1]);
  }
}

 
imagesArr =  shuffle(imagesArr);
congratsMessage.innerHTML = "congrats! you finish the game!";


for (let cell of cells) 
{
  var currentImage = document.createElement("img");
  currentImage.src = imagesArr[counterImage];
  cell.appendChild(currentImage);
  cell.addEventListener('click', clicked);
  counterImage++;
}



