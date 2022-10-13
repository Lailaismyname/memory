window.addEventListener('load', _=>{
    
    class Memory{
        constructor(){
            //data
            this.gamebox = document.getElementById('memory-game');
            this.label = 'img/blik.png';
        }
        //methods
    loadCardsToPage()  {
        for (let i = 0; i < 16; i++){
            this.gamebox.innerHTML += `<img src="img/eyes.png" class="card" value="${i}">`;
        }
    }
    flipCard(){
        this.gamebox.addEventListener('click', (e)=>{
            //checked of er op een image is gedrukt
            if(e.target.classList.contains('card')){
                e.target.src = `${this.label}`
            }
        })
    }
    overrideLabel (){
        this.label = 'img/cat.png';
    }
    //de game kan ik hier programmeren!
    memoryGame() {
        this.loadCardsToPage();
        this.flipCard();
    }
    }
    
    
    
    let memory = new Memory();
    memory.memoryGame();
    //memory.overrideLabel();
})