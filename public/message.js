export default class Message {
    /**
     * @type {string}
     */
    content;

    /**
     * @type {Date|null}
     */
    sentAt = null;

    /**
     * @type {number}
     */
    senderId;

    /**
     * @type {number}
     */
    receiverId;

    /**
     * @param {number} senderId
     * @param {Date|null} sentAt
     * @param {number} receiverId
     * @param {string} content
     */
    constructor(senderId, receiverId, content, sentAt = null) {
        this.content = content;
        this.sentAt = sentAt || new Date();
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}