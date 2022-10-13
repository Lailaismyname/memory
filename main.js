window.addEventListener('load', _=>{
    
    class Memory{
        constructor(){
            //data
            this.gamebox = document.getElementById('memory-game');
        }
        //methods
    loadCardsToPage()  {
        for (let i = 0; i < 16; i++){
            this.gamebox.innerHTML += '<img src="img/eyes.png" class="card">';
        }
    }
    flipCard() {
        console.log('card flipped');
    }
    }
    
    
    
    let memory = new Memory();
    memory.loadCardsToPage();

})