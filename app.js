var chatbox = document.getElementById("chatbox");
var addButton = document.getElementById("addButton");
var main = document.getElementsByTagName("main")[0];
var sendButton = document.getElementById("sendButton");
var replying = document.getElementsByClassName('replying')[0];
var notice = document.getElementById("notice");
var imageDisplay = document.getElementById("image-display");
// main.children[4].children[1].children[1].style.width="100px"

chatbox.onfocus = function(){
    chatbox.style.width="66%"
    addButton.style.width = "0px"
    addButton.firstChild.style.width = "0px"
};

chatbox.onblur = function(){
    chatbox.style.width="50%"
    addButton.style.width = "40px"
    addButton.firstChild.style.width = "20px"
}

function latestIsRight(){
    return main.children[1].classList.contains("right");
}

function latestIsLeft(){
    return main.children[1].classList.contains("left");
}

function addHoriBar(length){
    let bar = getMessage("left","<div class='horiBar'></div>");
    bar.classList.add("bar");
    main.insertBefore(bar,main.children[1]);
    setTimeout(function(){
        bar.children[1].children[1].style.width = `${length}px`;
    },100);
}

function getMessage(direction, message){
    let messageElement = document.createElement('div');
    messageElement.classList.add("message");
    if(latestIsRight() && direction == "right"){
        messageElement.classList.add("closeToTop");
    }else if(latestIsLeft() && direction == "left"){
        messageElement.classList.add("closeToTop");
    }
    messageElement.classList.add(direction);
    messageElement.innerHTML = `
        <img src="./img/jeman.jpg" alt="" class="profile" >
        <div class="chat">
            <p>${message}</p>
        </div>`
    return messageElement;
}

function addMessage(value, direction){
    main.insertBefore(getMessage(direction,value),main.children[1])
}

sendButton.addEventListener('click',(e)=>{
    const text = chatbox.value;
    addMessage(text,"right");
    chatbox.value = "";
})

chatbox.addEventListener('keypress',(e)=>{
    if(e.key == 'Enter'){
        const text = chatbox.value;
        chatbox.value = "";
        addMessage(text,"right");       
        reply(text);
    }
})

function showReplying(){
    replying.classList.remove("hide");
}

function hideReplying(){
    replying.classList.add("hide");
}

function showReplyingTime(sec){
    setTimeout(showReplying, 100);
    setTimeout(hideReplying, sec*1000);
}

function fixedReply(text, sec){
    setTimeout(addMessage,sec*1000,text,"left");
}

function reply(text){
    if(text.toLowerCase().includes("contact")){
        messageWithFixedDelay(contacts,2);
    }else if(text.toLowerCase().includes("project")){
        messageWithFixedDelay(projects, 2);
    }else if(text.toLowerCase().includes("education")){
        messageWithFixedDelay(educationChat,2);
    }else if(text.toLowerCase().includes("experience")){
        messageWithFixedDelay(experience,2)
    }else if(text.toLowerCase().includes("skills")){
        skills();
    }else if(text.toLowerCase().includes("portfolio")){
        addMessage("Specifically what about my portfolio?","left");
    }else if(text.toLowerCase().includes("job")){
        addMessage("GIVE ME MONEY!","left");
    }else if(text.toLowerCase().includes("money")){
        addMessage("I want 50% of your company","left");
    }else{
        randomReply();
    }
}

function skills(){
    delay = 2;
    messageWithFixedDelay(skillsList,delay);
    setTimeout(addHoriBar,(delay+=2)*1000,80);//java
    setTimeout(addHoriBar,(delay+=2)*1000,90);//js
    setTimeout(addHoriBar,(delay+=2)*1000,40);//py
    setTimeout(addHoriBar,(delay+=2)*1000,80);//html
    setTimeout(addHoriBar,(delay+=2)*1000,90);//css
    setTimeout(addHoriBar,(delay+=2)*1000,30);//spring
    setTimeout(addHoriBar,(delay+=2)*1000,30);//ang
    setTimeout(addHoriBar,(delay+=2)*1000,30);//smar
    setTimeout(addHoriBar,(delay+=2)*1000,30);//web3

}

function add(){
    messageWithFixedDelay(["I have not coded that button","don't touch it"],2)
}

function randomReply(){
    index = Math.floor(Math.random() * randomReplies.length);
    messageWithFixedDelay([randomReplies[index]], 2);
}

function messageWithFixedDelay(listOfMessages, sec){
    const totalDelay = sec * listOfMessages.length;
    showReplyingTime(totalDelay);
    let delay = 0;
    for(let i = 0; i <listOfMessages.length; i++){
        fixedReply(listOfMessages[i], delay+=sec);
    }
}

function hideImage(url){
    setImageDisplayOpacity("0");
    setTimeout(setImageDisplayDisplay,200,"none");
}

function showImage(url){
    imageDisplay.children[0].src=url;
    setImageDisplayDisplay("block");
    setTimeout(setImageDisplayOpacity,10,"1");
}

function setImageDisplayDisplay(display){
    imageDisplay.style.display = display;
}

function setImageDisplayOpacity(opacity){
    imageDisplay.style.opacity=opacity;
}

function showNotice(){
    notice.classList.add("animateShow");
}

function hideNotice(){
    notice.classList.remove("animateShow");
}


function copy(msg){
    navigator.clipboard.writeText(msg);
    showNotice();
    setTimeout(hideNotice,3000);
}

function doSomething(){

}

skillsList = ["These are my skills",
    "<strong>Java<strong>",
    "<strong>Javascript<strong>",
    "<strong>Python</strong>",
    "<strong>HTML</strong>",
    "<strong>CSS</strong>",
    "<strong>Spring</strong>",
    "<strong>Angular</strong>",
    "<strong>Smart Contracts</strong>",
    "Web3.js"
]

startChat = [
    "Hello",
    "I'm Jeman",
    "What do you want to know about me?"
]

randomReplies = [
    "asdjasjchjgsadjasd",
    "Wachuwant?",
    "wazzap?",
    "Wat do u mean?"
]

projects = [
    "This chatting portfolio site",
    "isn't it beautiful",
    "Im very proud of it",
    "I can even do <a href='javascript:doSomething();'>this</a?", 
    "click it"
]

contacts = [
    "You can email me at <a href='javascript:copy(\"jeman.mama0202@g.msuiit.edu.ph\");'>jeman.mama0202@g.msuiit.edu.ph</a>",
    "or you can send me a message on LinkedIn",
    "this is my profile <a href='https://www.linkedin.com/in/jemanmama/' target='_blank'>https://www.linkedin.com/in/jemanmama/",
    "orr github : "
]

educationChat = [
    "I am a 4th year Bachelor of Science in Information Technology Student",
    "from Mindanao State University - Iligan Institute of Technology",
    "My current CGPA is 1.24",
    "which is if maintained, will give make me a Magna Cum Laude Graduate"
]

experience = [
    "Currently, I am a Full Stack Developer Intern at PearlPay since October 2021",
    "That is all"
]



messageWithFixedDelay(startChat,2)
