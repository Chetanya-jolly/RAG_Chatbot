IP_PORT = 'http://127.0.0.1:5000/'
var debug1;
var addDocDialogBox = null;
var newChatDialogBox = null;

const socket = io(IP_PORT);

function createAddDocDialogBox() {
    
    // Hiding the new chat dialog box is active close it
    if(newChatDialogBox != null)
        newChatDialogBox.style.display = "none";

    // Toggling the display so that if the dialog box is already rendered we can close it
    if(addDocDialogBox != null){
        addDocDialogBox.style.display = (addDocDialogBox.style.display == "none") ? "block" : "none";
        return;
    }

    const mainContainer = document.getElementById('main-container')
    addDocDialogBox = document.createElement('div')
    addDocDialogBox.id = 'add-doc-dialog-box'
    addDocDialogBox.innerHTML = `
        Please upload a document </br>
        <form id="new-doc-form">
            <input type="file" id="add-doc-input" accept=".pdf, .doc, .txt" multiple required>
            <button type="submit">Submit</button>
        </form>
    `; 
    mainContainer.appendChild(addDocDialogBox); 
}

function createNewChatDialogBox(){

    // If the add doc dialog box is active hide that
    if(addDocDialogBox != null)
        addDocDialogBox.style.display = "none";

    // Toggling the display so that if the dialog box is already rendered we can close it
    if(newChatDialogBox != null){
        newChatDialogBox.style.display = (newChatDialogBox.style.display == 'none') ? 'block' : 'none';
        return;
    }

    newChatDialogBox = document.createElement("div");
    newChatDialogBox.id = 'new-chat-dialog-box'
    newChatDialogBox.innerHTML = `
        Enter the name of the new chat </br>
        <form id="new-chat-form">
            <input type="text" name="chatName" id="new-chat-name-input">
            <button type="submit">Submit</button>
        </form>
    `;
    document.body.appendChild(newChatDialogBox);
    document.getElementById('new-chat-name-input').focus();
    newChat();
}

function newChat() {
    document.getElementById('new-chat-form').addEventListener('submit', (event) => {
        event.preventDefault();
        
        const form = document.getElementById('new-chat-form')
        const formData = new FormData(form);
        fetch(`${IP_PORT}/newChat`, {
            method: "PUT",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            debug1 = data;
            if(data.status === "ok") 
                return data;
            throw new Error("New chat could not be created");
        })
        .then(data => {
            console.log(data);
            event.target.reset();
            newChatDialogBox.style.display = "none";
            createChatNameDiv(data['name'], data['id'])
        })
        .catch(error => {
            console.error("There was an error:", error);
        });
    });
}

function getChats() { 
    fetch(`${IP_PORT}/getChatNames`, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        data.forEach(chat => {
            createChatNameDiv(chat['name'], chat['id']);
        });
    })
}

function createChatNameDiv(name, id) {
    const chatHistory = document.getElementById('sb-chat-history')
    const newDiv = document.createElement("div");
    newDiv.classList.add('chats');
    newDiv.id = id;
    newDiv.textContent = name;
    newDiv.onclick = () => getConversation(id);
    chatHistory.appendChild(newDiv);
}

function getConversation(chatId){
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML = "";
    fetch(`${IP_PORT}/getConversation/${chatId}`)
    .then(response => response.json())
    .then(data => {
        if(data.status === 'ok') 
            return data;
        else
            throw new Error("No such conversation exists");
    })
    .then(data => {
        debug1 = data;
        if(data.conversation.length === 0){
            const newDiv = (document.getElementById('new-chat-default') == null) ? document.createElement('div') : document.getElementById('new-chat-default');
            newDiv.id = 'new-chat-default';
            newDiv.textContent = 'Ask Away'
            chatWindow.append(newDiv);
            return;
        } 
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

function testSocket(data="hello") {
    socket.emit('test', data);
    console.log(socket.id);
    return;
}

socket.on('test', (data) => {
    console.log(data);
})

init()