window.addEventListener('load', _=>{
    
    class Memory{
        constructor(){
            //data
            this.gamebox = document.getElementById('memory-game');
            this.label;
            this.images = ['blik.png','cat.png','eenhoorn.png','kikker.png','robot.png','slang.png','uil.png','worm.png','blik.png','cat.png','eenhoorn.png','kikker.png','robot.png','slang.png','uil.png','worm.png'];
            this.currentCard = '';
            this.prevGuess = '';
            this.currentGuess = '';
            this.prevCardId = '';
            this.clicks = 0;
            this.guessed = 0;
            this.checked = '';
        }
        //methods
        //genereert de kaarten in het spelbox
    loadCardsToBox()  {
        for (let i = 0; i < 16; i++){
            this.gamebox.innerHTML += `<img src="img/eyes.png" class="card"  id="card${i}" value="${i}">`;
        }
    }
    //wijs de img toe aan kaarten
    shuffleImages(){
        this.images.sort(function () {
                return Math.random() - 0.5;
            });
    }
    //print het winscherm
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
            item.src = 'img/eyes.png';
            this.removeCheckedClass();
            console.log(item);
        });
    }
    removeCheckedClass(){
        this.checked.forEach(item =>{
            item.classList.remove('checked');
        })
    }
    flipCard(){
        this.gamebox.addEventListener('click', (e)=>{
            if(e.target.classList.contains('card')){
                this.currentCard = e.target.getAttribute('value');
                this.currentGuessId =  e.target.id;
                e.target.classList.add('checked');
                this.setCardImgSrc();
                e.target.src = `${this.label}`;
                this.clicks++;
                if(this.clicks == 2){
                    if(e.target.src == this.prevGuess){
                        e.target.style.pointerEvents = 'none';
                        document.getElementById(this.prevCardId).style.pointerEvents = 'none';
                        this.removeCheckedClass();
                        this.guessed++;
                    }
                    else{
                        setTimeout(() => {
                            this.flipCardsBack();
                        }, 2000);
                    }
                    this.clicks = 0;
                }
                this.prevGuess = e.target.src;
                this.prevCardId = e.target.id;
            }
            else if(e.target.classList.contains('new-game')){
                alert('skeet');
                this.guessed = 0;
                this.clearGameBox();
                this.memoryGame();
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

//werkt grotendeels, alleen bij het terugdraaien zit er een bug in. 