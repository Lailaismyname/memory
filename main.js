window.addEventListener('load', _=>{ 
    class Memory{
        constructor(){
            //data
            this.gamebox = document.getElementById('memory-game');
            this.label;
            this.images = ['blik.png','cat.png','eenhoorn.png','kikker.png','robot.png','slang.png','uil.png','worm.png','blik.png','cat.png','eenhoorn.png','kikker.png','robot.png','slang.png','uil.png','worm.png'];
            this.currentCard = '';
            this.prevGuess = '';
            this.prevCardId = '';
            this.clicks = 0;
            this.guessed = 0;
            this.checked = '';
        }
        //methods
    loadCardsToBox()  {
        for (let i = 0; i < 16; i++){
            this.gamebox.innerHTML += `<img src="img/eyes.png" class="card"  id="card${i}" value="${i}">`;
        }
    }
    newGame(){
         //reset all counters
         this.guessed = 0;
         this.clicks = 0;
         //empty the gamebox
         this.clearGameBox();
         //shuffle cards
         this.shuffleImages();
         //create a new game
         this.loadCardsToBox();
    }
    shuffleImages(){
        this.images.sort(function () {
                return Math.random() - 0.5;
            });
    }
    printWinScreen() {
        this.gamebox.innerHTML = `<div class="end-game">
        <p>you win</p>
        <button class="new-game">play again</button>
       </div>`;
    }
    setCardImgSrc(){
        this.label = `img/${this.images[this.currentCard]}`;
    }
    clearGameBox(){
        this.gamebox.innerHTML = '';
    }
    compareCards(e){
        //save value of card
        this.currentCard = e.target.getAttribute('value');
        //save card id
        this.currentGuessId =  e.target.id;
        //add checked class, checked is to keep track of which card has been clicked on. 
        e.target.classList.add('checked');
        //Asign img to cards. 
        this.setCardImgSrc();
        e.target.src = `${this.label}`;
        //update clickcounter
        this.clicks++;
        //if 2 cards have been clicked check if they are equal
        if(this.clicks == 2){
            //if cards are equal:
            if(e.target.src == this.prevGuess){
                //make card unclickable
                e.target.style.pointerEvents = 'none';
                //add guessed class to mark card ass guessed.
                e.target.classList.add('guessed');
                //make previous card unclickable, and mark previous card as guessed
                document.getElementById(this.prevCardId).style.pointerEvents = 'none';
                document.getElementById(this.prevCardId).classList.add('guessed');
                //update guessed card counter. 
                this.guessed++;
            }
            //if cards are not equal
            else{
                //flip cards back after a second
                setTimeout(() => {
                    this.flipCardsBack();
                }, 1000);
            }
            //reset clickcounter
            this.clicks = 0;
        }
        //save clicked cards for future comparison
        this.prevGuess = e.target.src;
        this.prevCardId = e.target.id;
    }
    flipCardsBack(){
        this.checked = document.querySelectorAll('.checked');
        this.checked.forEach(item => {
            this.checked.forEach(item =>{
                if(!item.classList.contains('guessed')){
                    item.classList.remove('checked');
                    item.src = 'img/eyes.png';
                }
            })
        });
    }
    flipCard(){
        this.gamebox.addEventListener('click', (e)=>{
            if(e.target.classList.contains('card')){
                this.compareCards(e);
            }
            //if all pairs have been found, a button with new game appears, if that is clicked:
            else if(e.target.classList.contains('new-game')){
               this.newGame();
            }
            //if all pairs have been found, print the winscreen
            if(this.guessed == 8){
                this.printWinScreen();
                }
        })
    }
    memoryGame() {
        this.shuffleImages();
        this.loadCardsToBox();
        this.flipCard();
    }
    }
    
    
    
    let memory = new Memory();
    memory.memoryGame();
})

//enige probleem is door die settimeout kan het zo zijn dat er te snel op een nieuwe knop word gedrukt en dan loopt het allemaal scheef.
//callback --> promises --> async 