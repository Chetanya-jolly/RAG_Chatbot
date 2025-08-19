IP_PORT = 'http://127.0.0.1:5000/'
var debug1;

function addDoc() {
    const exists = document.getElementById('floating-div');
    const mainContainer = document.getElementById('main-container')
    if(exists) {   
        mainContainer.removeChild(exists);
        return;
    }
    addDocDialogRendered = true;
    const floatingDiv = document.createElement('div')
    floatingDiv.id = 'floating-div'
    floatingDiv.innerHTML = 'Please upload a document'
    mainContainer.appendChild(floatingDiv); 
}

// function createNewChatDialogBox(){
//     // const
//     const
// }

// function newChat(name) {
//     const newChat = document.createElement("div");
//     newChat
// }

function getChats() { 
    const chatHistory = document.getElementById('sb-chat-history')
    fetch(`${IP_PORT}/getChatNames`, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        data.forEach(chat => {
            const newDiv = document.createElement("div");
            newDiv.classList.add('chats');
            newDiv.id = chat['id'];
            newDiv.textContent = chat['name'];
            newDiv.onclick = () => getChatHistory(chat['id']);
            chatHistory.appendChild(newDiv);
        });
    })
}
function getChatHistory(chatId){
    const chatWindow = document.getElementById('chat-window');
    fetch(`${IP_PORT}/getConversation?chatId=${chatId}`)
    .then(response => response.json())
    .then(data => {
        if(data.status === 'ok') return data;
        else throw new Error("No such conversation exists");
    })
    .then(data => {
        debug1 = data;
        data.conversation.forEach( convo => {
            // console.log(convo);
            const question = document.createElement("div")
            question.classList.add("question")
            question.textContent = convo['question']
            question.id = `Q${convo['id']}`
            const answer = document.createElement("div")
            answer.classList.add("answer")
            answer.textContent = convo['answer']
            answer.id = `A${convo['id']}`
            chatWindow.appendChild(question);
            chatWindow.appendChild(answer);
        });
    })
    .catch(error => {
        console.error("There was an error:", error);
    })

}

function init(){
    getChats()
}

init()