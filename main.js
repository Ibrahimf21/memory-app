
// Get the input field
//  document.querySelector(".control-buttons span").focus();
let cp = document.querySelector(".control-buttons span");



window.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        // event.preventDefault();
        
        // Trigger the button element with a click
        cp.click();
    }
  });
cp.onclick = function () {
    let yourName = prompt("Whats Your Name ?");

    if (yourName == null || yourName == "") {

        document.querySelector(".name span").innerHTML = 'Unknown';
        
    }else {
        
        document.querySelector(".name span").innerHTML = yourName;
    
    }
    document.querySelector(".control-buttons").remove()
};
//effect duration
let duration = 1000;
//select blocks container
let blocksContainer = document.querySelector(".memory-game-blocks");

//creat array from game blocks
let blocks = Array.from(blocksContainer.children);

//creat ranfe of keys
let orderRange = [...Array(blocks.length).keys()];
// let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

//add order css property to game blocks
blocks.forEach((block, index) => {

    //add css property
    block.style.order = orderRange[index]; 

    //add click event
    block.addEventListener('click', function () {

        //triger the flip block function
        flipBlock(block);
    });

        //select again button
     let again = document.querySelector(".again button");

     // add event reload page when click button
    again.addEventListener('click', function () {

        window.location.reload(true);
        
    });

    document.addEventListener("keydown", function(event) {

        // If the user presses the "esc" key on the keyboard
        if (event.key === "Escape") {
            // Cancel the default action, if needed
            event.preventDefault();
            
            // reload page
            window.location.reload(true);
        }
        
    
      });

});

//flip block function

function flipBlock(selectedBlock) {

    //add class is flipped
    selectedBlock.classList.add('is-flipped');

    //collect all fliped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    //if there two selected block
    if (allFlippedBlocks.length === 2) {

        //stop clicking functin
        stopClicking();
        //check matched block function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }

}

//stop clicking function
function stopClicking() {

    //add class no clicking on main container
    blocksContainer.classList.add('no-clicking');
    
    setTimeout(() => {
        
    //remove class no clicking after duration 
    blocksContainer.classList.remove('no-clicking');


    },duration);
}
// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');
  
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
  
      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');
  
      firstBlock.classList.add('has-match');
      secondBlock.classList.add('has-match');
  
      document.getElementById('success').play();
  
    } else {
  
      triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
  
      setTimeout(() => {
  
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
  
      }, duration);
  
      document.getElementById('fail').play();
  
    }
}
    
function shuffle(array) {

    //settings vars
    let current = array.length,
    temp,
    random;

    while (current > 0) {
        //get random number
        random = Math.floor(Math.random() * current);

        //decrease length by one
        current--;

        //[1]save current element in stash
        temp = array[current];

        //[2]current element = random element
        array[current] = array[random]
        //[3]random element = get elemnt from stash
        array[random] = temp;

    }

    return array;

}


