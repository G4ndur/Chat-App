class User {
    /**
     * @type {string}
     */
    name;
    /**
     * @param {string} name
     */
    constructor(name = 'Test') {
        this.name = name;
    }
}

class Message {
    /**
     * @type {string}
     */
    content;
    /**
     *
     */
    timestamp;
}





//Inaktiver Kontakt
/**
 *
 * @param {User} user
 * @constructor
 */
const inactiveContact = user => {
    return `
    <div class="about">
        <div class="name">${user.name}</div>
    </div>
`
};
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
const messageSent =`
<li class="clearfix">
    <div style="text-align:right" class="message-data text-align">
        <span class="message-data-time"></span>
    </div>
    <div class="message my-message float-right"></div>
</li>
`
//Erhaltene Nachricht
const messageReceived = `
<li class="clearfix">
    <div class="message-data">
        <span class="message-data-time"></span>
    </div>
    <div class="message other-message"></div>
</li>
`
// Alles nicht-dynamische
const body = `
 <div style="height: 40rem" class=" container">
     <div class="row clearfix">
         <div class=" col-lg-12">
             <div style="height: 40rem" class="card chat-app">

                 <!-- Anfang der Kontaktliste -->

                 <div id="plist" class="people-list">
                 <div><button class="btn new">New User</button></div>
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
                                     <h6 class="m-b-0"></h6>
                                 </div>

                             </div>
                         </div>
                     </div>



                    <!-- div für den anfang der Chat historie -->
                     <div style="height: 33rem" class="chat-history">
                         <ul class="m-b-0">

                             
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

export default class App {
    /**
     * @type {HTMLElement}
     */
    container;
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
     * @param {HTMLElement} container
     */

    constructor(container) {
        container.innerHTML = body;
        this.container = container;

        container.querySelector('.new')
            ?.addEventListener('click', this.showPrompt.bind(this));
    }

    render() {


        const userList = this.container.querySelector('.chat-list');
       userList.innerHTML = '';

        this.users.forEach(User => {
            const userElement = document.createElement('li');
            userElement.classList.add('clearfix');
            userElement.classList.add(User.name);
            userElement.innerHTML = inactiveContact(User);
            userElement.addEventListener('click',() => this.onInactiveUserClick(User))
            userList.appendChild(userElement);
                            });
            };

    showPrompt() {
        let inputName = prompt('Please enter your name','');
        if (inputName != null) {
            // if (!this.users.includes) {
            //
            //     alert('User already exists!')
            // }
            this.users.push(new User(inputName));
            this.render()
        }
    };

    onInactiveUserClick(User) {
        const activeUser = document.querySelector('.active')
        if (activeUser != null) {
            activeUser.classList.remove('active')
        }
const selector = '.' + User.name
const userElement = document.querySelector(selector)
        userElement.classList.add('active')
    }

};


