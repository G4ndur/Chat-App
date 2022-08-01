import ServerStorage from "./serverStorage.js";
import User from "./user.js";
import Message from "./message.js";

const serverStorage = new ServerStorage();

export class ServerContactsStore {

    /**
     * @param {User[]} users
     * @param {number} lastUserSequence
     * @returns Promise<any>
     */
    save(users, lastUserSequence) {
        return serverStorage.setItem('contacts', JSON.stringify({
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
     * @returns Promise<any>
     */
    load() {
        return serverStorage.getItem('contacts')
            .then(respond => respond.json())
            .then(payload => {
                payload.users = payload.users || [];
                payload.sequence = payload.sequence || User.sequence;

                return payload;
            })
            .then(contacts => {
                contacts.users = contacts.users.map(record => new User(record.id,record.name,'',''));
                return contacts;
            });
    };


}

export class ServerMessageStore {

    /**
     * @param {Message[]} messages
     */
    save(messages) {
        return serverStorage.setItem('messages', JSON.stringify({
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
     * @returns Promise<any>
     */
    load() {
        return serverStorage.getItem('messages')
            .then(respond => respond.json())
            .then(payload => {
                payload.messages = payload.messages || [];

                return payload;
            })
            .then(payload => {
                payload.messages = payload.messages.map(record => {
                    return new Message(record.senderId,
                        record.receiverId,
                        record.content,
                        new Date(record.sentAt)
                    );
                });
                return payload;
            });

    };

}