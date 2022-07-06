export default class Message {
    /**
     * @type {string}
     */
    content;

    /**
     * @type {string}
     */
    sentAt = new Date().toLocaleDateString('en-GB');

    /**
     * @type {number}
     */
    senderId;

    /**
     * @type {number}
     */
    receiverId;

    /**
     *
     * @param {number} senderId
     * @param {number} receiverId
     * @param {string} content
     */
    constructor(senderId, receiverId, content) {
        this.content = content;
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}