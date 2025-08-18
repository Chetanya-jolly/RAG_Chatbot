IP_PORT = 'http://127.0.0.1:5000/'
var debug1;

function addDoc() {
    const exists = document.getElementById('floating-div');
    const mainContainer = document.getElementById('main-container')
    if(exists) {   
        mainContainer.removeChild(exists);
        // exists.remove();
        return;
    }
    addDocDialogRendered = true;
    const floatingDiv = document.createElement('div')
    floatingDiv.id = 'floating-div'
    floatingDiv.innerHTML = 'Please upload a document'
    mainContainer.appendChild(floatingDiv); 
}

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
            chatHistory.appendChild(newDiv);
        });
    })
}
function getChatHistory(){
    fetch()

}

function init(){
    getChats()
}

init()