export default class User {
    /**
     * @type {number}
     */
    id;

    /**
     * @type {string}
     */
    name;

    /**
     * @param {string} name
     * @param {number|null} id
     */
    constructor(name, id = null) {
        this.name = name;

        this.id = id ? id : ++User.sequence;
    }
}
User.sequence = 0
