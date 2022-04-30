//API to get Ramdom Text
const randomTextAPI = "http://api.quotable.io/random";

//selectors for DOM Manipulation
const text = document.querySelector(".text")
const textInput = document.querySelector(".textinput");
const timer = document.querySelector(".timer");

let timeLeft = 60;

const check = true   // flag to check if text displayed and text input is same

textInput.addEventListener('input',()=>{
    // array of characters of displayed Text
    const textArray = text.querySelectorAll("span");  
    
    //array of character of typed text
    const textInputArray = textInput.value.split('');


    // checking the characters
    textArray.forEach((characterSpan,index)=>{
        if(textInputArray[index]==null){   // if text input field is empty
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('correct');
            check = false;
        }else if(textInputArray[index]===characterSpan.innerText){   
            // if character match
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        }else{
            // if character dont match
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            check = false;
        }
    })

    if(check==true){   // check if both text matches
        getRandomText();   // get new text
        timeLeft = 60;   //reset Timer
    }       
})

setInterval(()=>{  // give 60s time

    //if timeout
    if(timeLeft==0){
        timeLeft = 60;   // reset clock
        getRandomText();    // after 60s get new text
    }else if(timeLeft>0){
        timeLeft--;   // decrease time by 1s
        timer.innerHTML = timeLeft;   // add to dom
    }
},1000)


// fender text in DOM
const renderText = (quote) => {
    text.innerHTML = ""  // clear the display field
    textInput.value = null   // clear input field

    // create span for each character and append it to DOM
    quote.split('').forEach(char => {   
        const charSpan = document.createElement('span');
        charSpan.innerHTML = char;
        text.appendChild(charSpan);
    });

}

// get random text from api
const getRandomText = async () => {
    const data = await fetch(randomTextAPI)
    .then(response => response.json())
    .then(quote => {
        renderText(quote.content);   // render in DOM
    })
}

getRandomText()
 
