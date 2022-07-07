import Message from "./message.js";
import {inactiveContact} from "./template.js";

class User {
    /**
     * @type {number}
     */
    id;

    /**
     * @type {string}
     */
    name;

    /**
     * @param {string} name
     */
    constructor(name) {
        this.name = name;

        this.id = ++User.squence;
    }
}

User.squence = 0;


//Aktiver Kontakt
/**
 *
 * @param {User} user
 * @constructor
 */
const activeContact = user => {
    return `
<li class="clearfix active">
    <div class="about">
        <div class="name">${user.name}</div>
    </div>
`
};
//Eigene gesendete Nachricht
/**
 *
 * @param {Message} message
 * @constructor
 */
const messageSent = message => {
    return `
    <div style="text-align:right" class="message-data text-align">
        <span class="message-data-time">${message.sentAt}</span>
    </div>
    <div class="message my-message float-right">${message.content}</div>
`
};
//Erhaltene Nachricht
/**
 *
 * @param {Message} message
 * @constructor
 */
const messageReceived = message => {
    return`
<li class="clearfix">
    <div class="message-data">
        <span class="message-data-time">${message.sentAt}</span>
    </div>
    <div class="message other-message">${message.content}</div>
</li>
`
}
// Alles nicht-dynamische
const body = `
 <div  class=" container">
     <div class="row clearfix">
         <div class=" col-lg-12">
             <div style="height: 40rem" class="card chat-app">

                 <!-- Anfang der Kontaktliste -->

                 <div id="plist" class="people-list">
                 <div><button class="btn new">New User</button><button class="btn change">Change User</button></div>
                     <ul class="list-unstyled chat-list mt-2 mb-0">
                      
                     </ul>
                 </div>
                 <!-- Ende der Kontaktliste -->

                 <!-- das eigentliche Chatfenster -->
                 <div class="chat h-100">
                     <div class="chat-header clearfix">
                         <div class="row">
                             <div class="col-lg-6">

                                 <!-- Name des Chatpartners -->
                                 <div class="chat-about">
                                     <h6 class="m-b-0">Select a Contact</h6>
                                 </div>

                             </div>
                         </div>
                     </div>



                    <!-- div für den anfang der Chat historie -->
                     <div style="height: 32rem" class="chat-history">
                         <ul class="m-b-0" id="chat">

                             
                         </ul>
                     </div>
                     <!-- Input Feld -->
                     <div class="chat-message clearfix">
                         <div class="input-group mb-0">
                             <div class="input-group-prepend">
                                 <span class="input-group-text"><i class="fa btn fa-send"></i></span>
                             </div>
                             <input type="text" class="form-control" placeholder="Enter text here...">
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </div>
`;
const changeUser = `
                 <div id="plist" class="people-list" style="text-align: center">
                 <div><button class="btn new">New User</button><button class="btn cancel">back</button></div>
                     <ul class="list-unstyled chat-list mt-2 mb-0">
                      
                     </ul>
                 </div>
`

export default class App {
    /**
     * @type {HTMLElement}
     */
    container;

    /**
     * @type {Number}
     */
    activeID;
    // /**
    //  * @type {User}
    //  */
    // currentUser = new User('Max Mustermann');


    /**
     * @type {User[]}
     */
    users = [
        new User('Max Mustermann'),
        new User('Frank Mustermann'),
        new User('Karl Schreiber'),
    ];

    /**
     *
     * @type {Message[]}
     */
    messages = [
        new Message(1, 2, 'Hallo'),
        new Message(2, 1, 'Läuft...'),
        new Message(3, 1, 'Läuft...')
    ];
    /**
     * @type {string}
     */
    messageInput;

    /**
     * @type {number}
     */
    currentID = 1;
    /**
     * @param {HTMLElement} container
     */

    constructor(container) {
        container.innerHTML = body;
        this.container = container;

        this.render();
    }

    render() {
        this.container.querySelector('.new')
            ?.addEventListener('click', this.showPrompt.bind(this));
        this.container.querySelector('.form-control').oninput = e => this.onInput(e)
        this.container.querySelector('.fa-send').addEventListener('click', this.onSend.bind(this))
        this.container.querySelector('.change').addEventListener('click', this.onChangeUserBtn.bind(this))

        const userList = this.container.querySelector('.chat-list');
        userList.innerHTML = '';

        this.users.forEach(user => {

            const userElement = document.createElement('li');
            userElement.classList.add('clearfix');
            userElement.setAttribute('data-user-id', `${user.id}`)
            userElement.innerHTML = inactiveContact(user);
            userElement.addEventListener('click', () => this.onInactiveUserClick(user))
            userList.appendChild(userElement);
        });

    };



    messageRender() {
        const messageList = this.container.querySelector('#chat')
        messageList.innerHTML = '';

        this.messages.forEach(message => {

            if (message.senderId === this.currentID && message.receiverId === this.activeID ){
                const sentMessage = document.createElement('li')
                sentMessage.classList.add('clearfix');
                sentMessage.innerHTML = messageSent(message);
                messageList.appendChild(sentMessage)
            }
            else if (message.senderId === this.activeID && message.receiverId === this.currentID){
                const sentMessage = document.createElement('li')
                sentMessage.classList.add('clearfix');
                sentMessage.innerHTML = messageReceived(message);
                messageList.appendChild(sentMessage)
            }
        })

    }

    showPrompt() {
        let inputName = prompt('Please enter your name', '');
        if (inputName != null) {
            //UMBEDINGT NOCH EINEN DUPLICATE FILTER EINBAUEN
            // if (!this.users.includes) {
            //
            //     alert('User already exists!')
            // }
            this.users.push(new User(inputName));
            this.render()
        }
    };

    /**
     * @param {User} user
     */
    onInactiveUserClick(user) {
        const activeUser = document.querySelector('.active')
        if (activeUser != null) {
            activeUser.classList.remove('active')
        }
        const userElement = document.querySelector(`li[data-user-id="${user.id}"]`)
        userElement.classList.add('active')
        const about = document.querySelector('.m-b-0')
        about.innerHTML = user.name;
        this.activeID = user.id
        this.messageRender()

    }

    /**
     *
     * @param {Event} e
     */
    onInput(e,) {
        this.messageInput = e.target.value.trim();
    }

    /**
     *
     */
    onSend() {
        this.messages.push(new Message(this.currentID,this.activeID,this.messageInput));
        this.messageRender()

    }

    onCancel() {

        this.container.innerHTML = body;
        this.render()
    }

    onChangeUserBtn() {
        this.container.innerHTML = changeUser
        this.container.querySelector('.cancel').addEventListener('click', this.onCancel.bind(this))
        this.changeUserRender()
    }
    changeUserRender() {



        const userList = this.container.querySelector('.chat-list');
        userList.innerHTML = '';

        this.users.forEach(user => {

            const userElement = document.createElement('li');
            userElement.classList.add('clearfix');
            userElement.setAttribute('data-user-id', `${user.id}`)
            userElement.innerHTML = inactiveContact(user);
            userElement.addEventListener('click', () => this.onChangeUser(user))
            userList.appendChild(userElement);
        });

    };

    /**
     *
     * @param {User} user
     */
    onChangeUser(user) {
        this.currentID = user.id
    }
};


