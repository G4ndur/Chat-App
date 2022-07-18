import Message from "./message.js";
import User from "./user.js";
import {inactiveContact, inactiveContactMod, messageReceived, messageSent} from "./template.js";
import {ServerContactsStore, ServerMessageStore} from "./server_storages.js";


const contactStorage = new ServerContactsStore();
const messageStorage = new ServerMessageStore();


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
                 <div><button class="btn new">New User</button><button class="btn cancel">Chats</button><button class="btn Msgdel">Delete all Messages</button></div>
                     <ul class="list-unstyled chat-list mt-2 mb-0">
                      
                     </ul>
                 </div>
`;


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
    users = [];

    /**
     *
     * @type {Message[]}
     */
    messages = [];
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
        this.container = container;
    }

    run() {

        // this.serverStorage.getItem('contacts')
        //     .then(response => response.json())
        //     .then(contacts => this.load = contacts)
        //     .then(() => this.users = this.load.users)
        //     .then(() => User.sequence = this.load.sequence)
        //     .then(() => this.onChangeUserBtn())

        contactStorage.load()
            .then(storedContacts => {
                this.users = storedContacts.users;
                User.sequence = storedContacts.sequence;

            })
            .then(() => this.renderChangeUserDialog());

        this.queryAndRenderMessages();
    }

    queryAndRenderMessages() {
        messageStorage.load()
            .then(storedMessages => {
                this.messages = storedMessages.messages;
            })
            .then(() => this.messageRender())
            .then(() => setTimeout(this.queryAndRenderMessages.bind(this), 5000));
    }

    render() {
        this.container.querySelector('.new')
            ?.addEventListener('click', this.showChatPromptToAddNewUser.bind(this));
        this.container.querySelector('.form-control').oninput = e => this.onInput(e);
        this.container.querySelector('.fa-send').addEventListener('click', this.onSend.bind(this));
        this.container.querySelector('.change').addEventListener('click', this.renderChangeUserDialog.bind(this));

        const userList = this.container.querySelector('.chat-list');
        userList.innerHTML = '';

        this.users.forEach(user => {

            const userElement = document.createElement('li');
            userElement.classList.add('clearfix');
            userElement.setAttribute('data-user-id', `${user.id}`);
            userElement.innerHTML = inactiveContact(user);
            userElement.addEventListener('click', () => this.onInactiveUserClick(user));
            userList.appendChild(userElement);
        });

    };


    messageRender() {

        const messageList = this.container.querySelector('#chat');
        if (!messageList) {
            return;
        }

        messageList.innerHTML = '';
        this.messages.forEach(message => {

            if (message.senderId === this.currentID && message.receiverId === this.activeID) {
                const sentMessage = document.createElement('li');
                sentMessage.classList.add('clearfix');
                sentMessage.innerHTML = messageSent(message);
                messageList.appendChild(sentMessage);
            } else if (message.senderId === this.activeID && message.receiverId === this.currentID) {
                const sentMessage = document.createElement('li');
                sentMessage.classList.add('clearfix');
                sentMessage.innerHTML = messageReceived(message);
                messageList.appendChild(sentMessage);
            }
        });

    }

    showChatPromptToAddNewUser() {
        let inputName = prompt('Please enter your name', '');

        if (!inputName) {
            return;
        }

        this.users.push(new User(inputName));
        contactStorage.save(this.users, User.sequence);
        this.render();
    };

    showModeratorPromptToAddNewUser() {
        let inputName = prompt('Please enter your name', '');

        if (!inputName) {
            return;
        }

        this.users.push(new User(inputName));
        contactStorage.save(this.users, User.sequence);

        this.renderChangeUserList();
    };

    /**
     * @param {User} user
     */
    onInactiveUserClick(user) {
        const activeUser = document.querySelector('.active');
        if (activeUser) {
            activeUser.classList.remove('active');
        }
        const userElement = document.querySelector(`li[data-user-id="${user.id}"]`);
        userElement.classList.add('active');
        const about = document.querySelector('.m-b-0');
        about.innerHTML = user.name;
        this.activeID = user.id;
        this.messageRender();
    }

    /**
     * @param {Event} e
     */
    onInput(e,) {
        this.messageInput = e.target.value.trim();
    }

    onSend() {
        console.log('hello');
        this.messages.push(new Message(this.currentID, this.activeID, this.messageInput));
        messageStorage.save(this.messages);
        this.messageRender();

    }

    onCancel() {

        this.container.innerHTML = body;
        this.render();
    }

    renderChangeUserDialog() {
        this.container.innerHTML = changeUser;

        this.container.querySelector('.new')
            ?.addEventListener('click', this.showModeratorPromptToAddNewUser.bind(this));
        this.container.querySelector('.cancel').addEventListener('click', this.onCancel.bind(this));
        this.container.querySelector('.Msgdel').addEventListener('click', this.onDeleteMessages);
        this.renderChangeUserList();
    }

    renderChangeUserList() {

        const userList = this.container.querySelector('.chat-list');
        userList.innerHTML = '';

        this.users.forEach(user => {

            const userElement = document.createElement('button');
            userElement.classList.add('btn');
            userElement.setAttribute('data-user-id', `${user.id}`);
            userElement.innerHTML = inactiveContactMod(user);
            userElement.querySelector('.user').addEventListener('click', () => this.onChangeUser(user));
            userElement.querySelector('.del').addEventListener('click', () => this.onDeleteUser(user));
            userList.appendChild(userElement);
        });

    };

    /**
     * @param {User} user
     */
    onChangeUser(user) {
        alert('Current User has been changed to: ' + user.name);
        this.currentID = user.id;

    }

    /**
     * @param {User} user
     */
    onDeleteUser(user) {
        this.users.splice(this.users.indexOf(user), 1);
        contactStorage.save(this.users, User.sequence);
        this.renderChangeUserList();
    }

    onDeleteMessages() {
        this.messages = [];
        messageStorage.save([]);
        alert('All messages have been deleted!');
    }
};


