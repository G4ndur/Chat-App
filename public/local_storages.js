import User from "./user.js";
import Message from "./message.js";

export class LocaleContactsStore {

    /**
     * @param {User[]} users
     * @param {number} lastUserSequence
     * @returns Promise<any>
     */
    async save(users, lastUserSequence) {

        localStorage.setItem('contacts', JSON.stringify({
            sequence: lastUserSequence,
            users: users.map(user => {
                return {
                    id: user.id,
                    name: user.name
                };
            })
        }));
    }

    /**
     * @returns Promise<{{sequence: number, users: User[]}}>
     */
    async load() {
        const json = localStorage.getItem('contacts');
        if (!json) {
            return {
                sequence: 0,
                users: [],
            };
        }

        const contacts = JSON.parse(json) || null;
        if (contacts) {
            contacts.users = contacts.users.map(record => new User(record.name, record.id));
        }

        return contacts || {
            sequence: 0,
            users: [],
        };
    }


}

export class LocalMessageStore {

    /**
     * @param {Message[]} messages
     * @returns Promise<any>
     */
    async save(messages) {
        localStorage.setItem('messages', JSON.stringify({
            messages: messages.map(message => {
                return {
                    senderId: message.senderId,
                    receiverId: message.receiverId,
                    content: message.content,
                    sentAt: message.sentAt.toISOString(),
                };
            })
        }));
    }

    /**
     * @returns Promise<{{messages: Message[]}}>
     */
    async load() {
        const json = localStorage.getItem('messages');
        if (!json) {
            return {
                messages: []
            };
        }

        const payload = JSON.parse(json) || null;
        if (payload) {
            payload.messages = payload.messages.map(record => new Message(
                record.senderId,
                record.receiverId,
                record.content,
                new Date(record.sentAt),
            ));
        }

        return payload || {
            messages: []
        };
    }
}