export default class User {

    /**
     * @type {string}
     */
    name;

    /**
     * @type {string}
     */
    email;

    /**
     *@type {string}
     */
    password;

    /**
     * @param {string} name
     * @param {string} email
     * @param {string} password
     *
     */
    constructor(name,email,password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
User.sequence = 0
