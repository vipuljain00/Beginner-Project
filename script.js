let typingText = document.querySelector('.typing-text p')
let input = document.querySelector('.wrapper .inputfield')
let time = document.querySelector('.time span b')
let mistake = document.querySelector('.mistakes span')
let wpm = document.querySelector('.wpm span')
let cpm = document.querySelector('.cpm span')
let button = document.querySelector('.btn')

let timer;
let maxTime= 60;
let timeLeft = maxTime;
let charIndex =0;
let mistakes = 0;
let isTyping =false;

time.innerText = timeLeft;

function loadtext(){
    input.value = '';
    const paragraph = [
        " Avoid daydreaming about the years to come.","You are the most important person in your whole life.","Always be true to who you are, and ignore what other people have to say about you.","Always be true to who you are, and ignore what other people have to say about you.","Only demonstrate your strength when it’s really required.","Subscribe to Drop X Out"
     ]

     typingText.innerHTML = '';
     const index = Math.floor(Math.random() * paragraph.length);
     for(const char of paragraph[index])
     {typingText.innerHTML += `<span>${char}</span>`;}

     typingText.querySelectorAll('span')[0].classList.add('active');
     document.addEventListener("keydown" ,()=>{input.focus()})
     typingText.addEventListener("click",()=>{input.focus()})
}

loadtext();

button.addEventListener("click", ()=>{
    loadtext();
    charIndex=0;
    clearInterval(timer);
    mistakes = 0;
    timeLeft = maxTime;
    time.innerText = timeLeft;
    wpm.innerText = 0;
    isTyping = false;
    cpm.innerText = 0
    mistake.innerText = 0;
    input.value='';
})

function typingMatch(){
    const char = typingText.querySelectorAll('span');
    const typed = input.value.charAt(charIndex);

    if(charIndex < char.length && timeLeft > 0){

        if(!isTyping){
            timer = setInterval(initTime , 1000);
            isTyping = true;
        }

        if(char[charIndex].innerText === typed){
            char[charIndex].classList.add("correct"); 
            // console.log("correct");    
        }
        else{
            mistakes++;
            char[charIndex].classList.add('incorrect');
            // console.log("incorrect");
        }
        charIndex+=1;

        char[charIndex].classList.add('active');

        mistake.innerText = mistakes;
        
        cpm.innerText = charIndex - mistakes;
    }
    else{ 
        clearInterval(timer);
        input.value = '';
        
    }  
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex - mistakes)/5) / (maxTime-timeLeft)*60); 
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

input.addEventListener("input",()=>{
    typingMatch();
});

