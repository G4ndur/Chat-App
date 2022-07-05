class User {
    /**
     * @type {string}
     */
    name;
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
<li class="clearfix">
    <div class="about">
        <div class="name">${user.name}</div>
    </div>
</li>
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
</li>
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
 <div class="container">
     <div class="row clearfix">
         <div class="col-lg-12">
             <div class="card chat-app">

                 <!-- Anfang der Kontaktliste -->

                 <div id="plist" class="people-list">
                     <ul class="list-unstyled chat-list mt-2 mb-0">


                     </ul>
                 </div>
                 <!-- Ende der Kontaktliste -->

                 <!-- das eigentliche Chatfenster -->
                 <div class="chat">
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
                     <div class="chat-history">
                         <ul class="m-b-0">

                             <!-- Input Feld -->
                         </ul>
                     </div>
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
     * @param {HTMLElement} container
     */
    constructor(container) {
        container.innerHTML = body;

        this.container = container;
    }

};
