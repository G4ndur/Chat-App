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
     * @type {int || null}
     */
    id;

    /**
     * @param {null || int} id
     * @param {string} name
     * @param {string} email
     * @param {string} password
     *
     */
    constructor(id,name,email,password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
User.sequence = 0
