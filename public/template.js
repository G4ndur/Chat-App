//Inaktiver Kontakt
/**
 *
 * @param {User} user
 * @constructor
 */
export const inactiveContact = user => {
    return `
    <div class="about">
        <div class="btn">${user.name}</div>
    </div>
`;
};
export const inactiveContactMod = user => {
    return `
    <div class="about">
        <button class="btn user">${user.name}</button>
        <button class="btn del">Delete</button>
    </div>
`;
};

//Eigene gesendete Nachricht
/**
 *
 * @param {Message} message
 * @constructor
 */
export const messageSent = message => {
    return `
    <div style="text-align:right" class="message-data text-align">
        <span class="message-data-time">${message.sentAt.toLocaleDateString('en-GB')}</span>
    </div>
    <div class="message my-message float-right">${message.content}</div>
`;
};
//Erhaltene Nachricht
/**
 *
 * @param {Message} message
 * @constructor
 */
export const messageReceived = message => {
    return `
<li class="clearfix">
    <div class="message-data">
        <span class="message-data-time">${message.sentAt.toLocaleDateString('en-GB')}</span>
    </div>
    <div class="message other-message">${message.content}</div>
</li>
`;
};