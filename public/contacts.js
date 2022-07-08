import User from "./user.js";
import ServerStorage from "./serverStorage.js";

export default class LocaleContactsStore {


    /**
     * @param {User[]} users
     * @param {number} lastUserSequence
     * @param {ServerStorage} serverStorage
     */
    save(users, lastUserSequence,serverStorage) {

        serverStorage.setItem('contacts', JSON.stringify({
            sequence: lastUserSequence,
            users: users.map(user => {
                return {
                    id: user.id,
                    name: user.name
                }
            })
        }))
    }

    /**
     * @returns {{sequence: number, users: User[]}}
     */
    load() {
        const contacts = JSON.parse(localStorage.getItem('contacts') || '') || null;

        if (contacts) {
            contacts.users = contacts.users.map(record => new User(record.name, record.id))
        }

        return contacts || {
            sequence: 0,
            users: [],
        };
    }
}

