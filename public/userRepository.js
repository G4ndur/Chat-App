import User from "./user.js"

export default class UserRepository {


    /**
     * @param {string} key
     * @param {string} payload
     */
    setItem(key, payload) {
        return fetch(`/registration.php?key=${key}`, {
            method: 'POST',
            body: payload
        });
    }

    /**
     * @param {string} key
     */
    getItem(key) {
        return fetch(`/storage.php?key=${key}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    /**
     * @param {User} user
     * @returns Promise<any>
     */
    save(user) {
        return this.setItem('registration', JSON.stringify(user));
    }

    /**
     *
     * @param email {string}
     * @param password {string}
     * @returns {Promise<Response>}
     */
    login(email, password) {
        const user = new User('',email,password)

        return fetch('/login.php?key=login', {
            method: 'POST',
            body: user
        });


    }

}