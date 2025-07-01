const socket = io("http://127.0.0.1:8000");
const audio = new Audio('sounds/ting.mp3');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message', position);
    messageContainer.append(messageElement);
    console.log("Appended:", message, "at", position);
};

const name = prompt("Enter Your Name to Join :)");
console.log("Joining as:", name);
socket.emit('new-user-joined', name);

// Event Listeners
socket.on('connect', () => console.log("Connected to server"));
socket.on('user-joined', name => {
    console.log("User joined:", name);
    append(`${name} joined the chat`, 'center');
});

socket.on('receive', data => {
    console.log("Received message:", data);
    append(`${data.name}: ${data.message}`, 'left');
    audio.play();
});

socket.on('user-left', name => {
    console.log("User left:", name);
    append(`${name} left the chat`, 'center');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});
