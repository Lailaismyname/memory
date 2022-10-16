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
                //sla waarde van kaart op in var
                this.currentCard = e.target.getAttribute('value');
                //sla id op in var
                this.currentGuessId =  e.target.id;
                //voeg checked class toe. checked is om bij te houden op welke er geklikt is. 
                e.target.classList.add('checked');
                //wijs de afbeelding toe aan kaarten
                this.setCardImgSrc();
                e.target.src = `${this.label}`;
                this.clicks++;
                if(this.clicks == 2){
                    if(e.target.src == this.prevGuess){
                        e.target.style.pointerEvents = 'none';
                        //guessed class is om het totaal aantal geraden kaarten aan te duiden.
                        e.target.classList.add('guessed');
                        document.getElementById(this.prevCardId).style.pointerEvents = 'none';
                        document.getElementById(this.prevCardId).classList.add('guessed');
                        this.guessed++;
                    }
                    else{
                        setTimeout(() => {
                            this.flipCardsBack();
                        }, 1000);
                    }
                    this.clicks = 0;
                }
                this.prevGuess = e.target.src;
                this.prevCardId = e.target.id;
            }
            else if(e.target.classList.contains('new-game')){
                this.guessed = 0;
                this.clicks = 0;
                this.clearGameBox();
                this.loadCardsToBox();
            }
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
//misschien kan ik een manier vinden om events pas te laten afspele nadat die settimeout met flipcardsback is voltooid?