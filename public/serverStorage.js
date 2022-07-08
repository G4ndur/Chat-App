export default class ServerStorage {
    /**
     * @param {string} key
     * @param {string} payload
     */
    setItem(key, payload) {
        return fetch(`/storage.php?key=${key}`, {
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
}