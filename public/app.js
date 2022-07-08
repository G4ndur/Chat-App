import Message from "./message.js";
import User from "./user.js";
import {inactiveContact, inactiveContactMod} from "./template.js";
import LocaleContactsStore from "./contacts.js";

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
                 <div><button class="btn new">New User</button><button class="btn cancel">Back</button><button class="btn Msgdel">Delete all Messages</button></div>
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
            ];

    /**
     *
     * @type {Message[]}
     */
    messages = [
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
     *
     * @type {LocaleContactsStore}
     */
    localContacts = new LocaleContactsStore()


    /**
     * @param {HTMLElement} container
     */

    constructor(container) {
        container.innerHTML = body;
        this.container = container;


    }
    run(){
       // const  json = localStorage.getItem('users')
       //  if (json){
       //      this.users = JSON.parse(json) || [];
       //  }
       //  const json0 = localStorage.getItem('sequence')
       //  if (json0){
       //      User.sequence = JSON.parse(json0)
       //  }
        const load = this.localContacts.load()
        User.sequence = load.sequence
        this.users = load.users


        const json2 = localStorage.getItem('messages');

        if (json2) {
            this.messages = JSON.parse(json2) || [];
        }

        this.onChangeUserBtn()
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
        const json2 = localStorage.getItem('messages');

        if (json2) {
            this.messages = JSON.parse(json2) || [];
        }
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
            console.log(this.messages)
        })

    }

    showPrompt() {
        let inputName = prompt('Please enter your name', '');
        if (inputName != null) {
            this.users.push(new User(inputName));
            // localStorage.setItem('users', JSON.stringify(this.users))
            // localStorage.setItem('sequence', JSON.stringify(User.sequence))
            this.localContacts.save(this.users, User.sequence)
            this.render()
        }
    };

    showPromptMod() {
        let inputName = prompt('Please enter your name', '');
        if (inputName != null) {
            this.users.push(new User(inputName));
            // localStorage.setItem('users', JSON.stringify(this.users))
            // localStorage.setItem('sequence', JSON.stringify(User.sequence))
            this.localContacts.save(this.users, User.sequence)

            this.changeUserRender()
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
        localStorage.setItem('messages', JSON.stringify(this.messages))
        this.messageRender()

    }

    onCancel() {

        this.container.innerHTML = body;
        this.render()
    }

    onChangeUserBtn() {
        this.container.innerHTML = changeUser

        this.container.querySelector('.new')
            ?.addEventListener('click', this.showPromptMod.bind(this));
        this.container.querySelector('.cancel').addEventListener('click', this.onCancel.bind(this))
        this.container.querySelector('.Msgdel').addEventListener('click', this.onDeleteMessages)
        this.changeUserRender()
    }
    changeUserRender() {



        const userList = this.container.querySelector('.chat-list');
        userList.innerHTML = '';

        this.users.forEach(user => {

            const userElement = document.createElement('button');
            userElement.classList.add('btn');
            userElement.setAttribute('data-user-id', `${user.id}`)
            userElement.innerHTML = inactiveContactMod(user);
            userElement.querySelector('.user').addEventListener('click', () => this.onChangeUser(user))
            userElement.querySelector('.del').addEventListener('click',() => this.onDeleteUser(user) )
            userList.appendChild(userElement);
        });

    };

    /**
     *
     * @param {User} user
     */
    onChangeUser(user) {
        alert('Current User has been changed to: ' + user.name)
        this.currentID = user.id

    }

    /**
     *
     * @param {User} user
     */
    onDeleteUser(user) {
        this.users.splice(this.users.indexOf(user), 1);
        // localStorage.setItem('users', JSON.stringify(this.users))
        // localStorage.setItem('sequence', JSON.stringify(User.sequence))
        this.localContacts.save(this.users, User.sequence)
        this.changeUserRender();
    }
    onDeleteMessages(){
        this.messages = [ ];
        localStorage.setItem('messages', JSON.stringify(this.messages))
        alert('All messages have been deleted!')
    }
};


