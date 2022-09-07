
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const joinBtn = get("#join")
const username = get(".username")
const room = get(".joinroom")
const exitroom = get(".exitroom")
const exitBtn = get("#exit")

var socket = io.connect('https://home.madhavproject21.tk', { transports: ["websocket", "polling"] });

let PERSON_NAME = '';



joinBtn.addEventListener("click", event => {
    event.preventDefault();
    PERSON_NAME = username.value
    socket.emit("newuser", PERSON_NAME)
    room.classList.remove('active')
    room.classList.add('disable')
})
exitBtn.addEventListener("click", event => {
    event.preventDefault();
    socket.emit("exituser", PERSON_NAME)
    exitroom.classList.remove('active')
    exitroom.classList.add('disable')
})
msgerForm.addEventListener("submit", event => {
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;

    appendMessage(PERSON_NAME, "right", msgText);

    socket.emit("chat", {
        username: PERSON_NAME,
        text: msgText
    })
    msgerInput.value = "";
});

socket.on("chat", function (update) {
    appendMessage(update.username, "left", update.text)
})

socket.on("update", function (update) {
    appendMessage(update.username, "left", update.text);
})

function appendMessage(name, side, text) {
    const msgHTML = `
    <div class="msg ${side}-msg">

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}



socket.on()
// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
