import Message from "./message.js";
import User from "./user.js";
import {inactiveContact, inactiveContactMod, messageReceived, messageSent} from "./template.js";
import {ServerContactsStore, ServerMessageStore} from "./server_storages.js";
import {onRepeatingPassword, onTypingChatMessage, onTypingEmail, onTypingName, onTypingPassword} from "./inputs.js";
import UserRepository from "./userRepository.js";
import {getItem} from "./session.js";

const contactStorage = new ServerContactsStore();
const messageStorage = new ServerMessageStore();
const userRepository = new UserRepository();


// Alles nicht-dynamische
const chat = `
 <div  class=" container">
     <div class="row clearfix">
         <div class=" col-lg-12">
             <div style="height: 40rem" class="card chat-app">

                 <!-- Anfang der Kontaktliste -->

                 <div id="plist" class="people-list">
                 <div class="text-center "><button class="btn change">logout</button></div>
                 <div><p class="currentUserName"></p></div>
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
const landingPage = `
<div class="row text-center">   </div>
<div class="row">  <div class=col-5></div> <div class=col-2 ><input type="email" class="emailInput form-control" placeholder="E-Mail"></div>
 <div class=col-5 ></div> </div>
 <div class="row text-center"><p></p></div>
<div class="row"><div class=col-5></div><div class=col-2><input type="password" class="form-control passwordInput" placeholder="Password">
</div> <div class=col-5></div></div>
<div class="row">
<div class="row"><p></p></div>
<div class="col-4 text-right"></div> <div class="col-2  text-end "> <button class="btn btn-success loginButton">Login</button> </div>
<div class="col-2 text-start"><button class="btn btn-primary registerButton">Register</button></div> <div class="col-4"></div>
</div>
                
                 </div>
`;

const registerPage = `
<div class="row text-center">   </div>
<div class="row"><div class=col-5></div><div class=col-2><input type="text" class="form-control nameInput" placeholder="Name">
</div> <div class=col-5></div></div>
<div class="row text-center"><p></p></div>
<div class="row">  <div class=col-5></div> <div class=col-2 ><input type="email" class="emailInput form-control" placeholder="E-Mail"></div>
 <div class=col-5 ></div> </div>
 <div class="row text-center"><p></p></div>
<div class="row"><div class=col-5></div><div class=col-2><input type="password" class="form-control passwordInput" placeholder="Password">
</div> <div class=col-5></div></div>
<div class="row text-center"><p></p></div>
<div class="row"><div class=col-5></div><div class=col-2><input type="password" class="form-control passwordRepeat" placeholder="Repeat Password">
</div> <div class=col-5></div></div>
<div class="row">
<div class="row text-center"><p></p></div>
<div class="col-4"></div> <div class="col-2 text-end"> <button class="btn btn-danger cancel">Cancel</button> </div>
<div class="col-2 text-start"><button class="btn btn-success registerBtn">Register</button></div> <div class="col-4"></div>
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
     *
     * @type {string}
     */
    emailInput = '';

    /**
     * @type {string}
     */
    passwordInput = '';

    /**
     * @type {string}
     */
    passwordRepeatInput = '';
    /**
     * @type {string}
     */
    nameInput = '';


    /**
     * @type {int}
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
            .then(() => this.loggedInCheck());


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

    renderChat() {
        this.container.innerHTML = chat;


        this.container.querySelector('.form-control').oninput = e => onTypingChatMessage(this, e);
        this.container.querySelector('.fa-send').addEventListener('click', this.onSend.bind(this));
        this.container.querySelector('.form-control').addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.querySelector('.fa-send').click();
            }
        });
        this.container.querySelector('.change').addEventListener('click', this.onLogout.bind(this));

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


    /**
     *
     */
    onRegistration() {
        if (!this.passwordInput) {
            alert('Fill all fields!');
        } else if (!this.emailInput) {
            alert('Fill all fields!');
        } else if (!this.nameInput) {
            alert('Fill all fields!');
        } else if (!this.passwordRepeatInput) {
            alert('Fill all fields!');
        } else if (this.passwordInput !== this.passwordRepeatInput) {
            alert('Passwords arent identical');
        } else {
            const user = new User(null, this.nameInput, this.emailInput, this.passwordInput);
            userRepository.save(user)
                .then(response => response.json())
                .then(response => {
                        if (response.success) {
                            window.location.href = '/';
                        }
                    }
                );

        }
    }

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


    onSend() {
        this.messages.push(new Message(this.currentID, this.activeID, this.messageInput));
        messageStorage.save(this.messages);
        this.container.querySelector('.form-control').value = '';
        this.messageRender();

    }

    onLogout() {
        this.killSession();
        this.renderLogin();

    }

    killSession() {
        fetch(`/logout.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }

    renderLogin() {
        this.container.innerHTML = landingPage;
        this.container.querySelector('.registerButton').addEventListener('click', this.renderRegisterPage.bind(this));
        this.container.querySelector('.emailInput').oninput = e => onTypingEmail(this, e);
        this.container.querySelector('.passwordInput').oninput = e => onTypingPassword(this, e);
        this.container.querySelector('.loginButton').addEventListener('click', this.onLogin.bind(this));
        this.container.querySelector('.passwordInput').addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                document.querySelector('.loginButton').click();
            }
        });
        this.container.querySelector('.emailInput').addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                document.querySelector('.loginButton').click();
            }
        });

        //   this.renderChangeUserList();
    }

    pressLoginByEnter(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            document.querySelector('.loginButton').click();
        }
    }


    renderRegisterPage() {
        this.container.innerHTML = registerPage;
        this.container.querySelector('.cancel').addEventListener('click', this.renderLogin.bind(this));
        this.container.querySelector('.emailInput').oninput = e => onTypingEmail(this, e);
        this.container.querySelector('.passwordInput').oninput = e => onTypingPassword(this, e);
        this.container.querySelector('.passwordRepeat').oninput = e => onRepeatingPassword(this, e);
        this.container.querySelector('.nameInput').oninput = e => onTypingName(this, e);
        this.container.querySelector('.registerBtn').addEventListener('click', this.onRegistration.bind(this));
        this.container.querySelector('.emailInput').addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                document.querySelector('.registerBtn').click();
            }
        });
        this.container.querySelector('.passwordInput').addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                document.querySelector('.registerBtn').click();
            }
        });
        this.container.querySelector('.passwordRepeat').addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                document.querySelector('.registerBtn').click();
            }
        });
        this.container.querySelector('.nameInput').addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                document.querySelector('.registerBtn').click();
            }
        });

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

    /**
     *
     */
    onLogin() {
        const userLogin = new User(null, '', this.emailInput, this.passwordInput);
        userRepository.login(userLogin)
            .then(response => response.json())
            .then(response => {
                if (response.success === false) {

                    alert('Wrong Email or Password');

                } else {
                    this.currentID = response.id;
                    this.renderChat();
                    this.container.querySelector('.currentUserName').innerHTML = 'Current User : ' + response.name;

                }
            });


    };

    /**
     *
     * @returns {Promise<any>}
     */
    loggedInCheck() {
        return getItem()
            .then(response => response.json())
            .then(payload => {
                if (payload.success === true) {
                    this.currentID = payload.id;
                    this.renderChat();
                    this.container.querySelector('.currentUserName').innerHTML = 'Current User : ' + payload.name;
                    return;
                }
                this.renderLogin();

            });


    }
}


