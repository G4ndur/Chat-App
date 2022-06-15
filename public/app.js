class Notice {
    /**
     * @type {string}
     */
    title;

    /**
     * @type {Date}
     */
    createdAt = new Date();

    /**
     * @type {Date|null}
     */
    updatedAt = null;

    /**
     * @param {string} title
     */
    constructor(title = '') {
        this.title = title;
    }
}

class ServerStorage {
    /**
     * @param {string} key
     * @param {string} payload
     */
    setItem(key, payload) {
        return fetch('/storage.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({key: key, payload: payload})
        });
    }
}


let notes = [];


const template = `
<h1 class="text-center"> Notice-App </h1>
<div class="container">
    <div class="row">
        <div class="col-2"></div>
        <h4 class="col">Notices</h4>
        <div class="col">
            <button class="btn btn-outline-success new">+</button>
        </div>
    </div>
    <hr>
    <div class="notices">
    </div>
</div>
`;


/**
 * @param {Notice} notice
 * @constructor
 */
const NoticeTemplate = notice => {
    return `
    <div class="row">
        <div class="col-2"></div>
        <div class="col">
            <form>
                <div class="mb-3">
                    <input type="text" value="${notice.title}">
                </div>
            </form>
        </div>
        <div class="col">
            <button class="btn-outline-primary btn">Edit</button>
            <button class="delete btn btn-outline-danger">Del</button>
        </div>
    </div>
</div>`
};

/**
 *
 * @type {String}
 */
const template2 = `
    <div class="row">
        <div class="col-2"></div>
        <div class="col">
            <form>
                <div class="mb-3">
                    <input type="text">
                </div>
            </form>
        </div>
        <div class="col">
            <button class="btn-outline-primary btn">Edit</button>
            <button id="del" class="delete btn btn-outline-danger">Del</button>
        </div>
    </div>
</div>`


export default class App {
    /**
     * @type {HTMLElement}
     */
    container;

    /**
     * @type {ServerStorage}
     */
    serverStorage = new ServerStorage();

    /**
     * @param {HTMLElement} container
     */
    constructor(container) {
        container.innerHTML = template;

        container.querySelector('.new')
            ?.addEventListener('click', this.onCreateNewNotice.bind(this));

        this.container = container;
    }

    render() {
        const noticesContainer = this.container.querySelector('.notices');
        noticesContainer.innerHTML = '';

        notes.forEach(notice => {
            const div = document.createElement('div')
            div.innerHTML = NoticeTemplate(notice);
            noticesContainer.appendChild(div);


            div.querySelector('input').oninput = e => this.onChangeNoticeTitle(e, notice);
            div.querySelector('.delete').addEventListener('click', () => this.onDeleteNotice(notice))
        });
    }

    run() {
        const json = localStorage.getItem('Notices');

        notes = [];
        if (json) {
            notes = JSON.parse(json) || [];
        }

        this.render();
    }

    /**
     * @param {Event} e
     * @param {Notice} notice
     */
    onChangeNoticeTitle(e, notice) {
        notice.title = e.target.value.trim();
        notice.updatedAt = new Date();
        localStorage.setItem('Notices', JSON.stringify(notes));
        this.serverStorage.setItem('Notices', JSON.stringify(notes));
        console.log(notice);
    }

    onCreateNewNotice() {
        notes.push(new Notice())

        localStorage.setItem('Notices', JSON.stringify(notes))
        this.serverStorage.setItem('Notices', JSON.stringify(notes));
        this.render();
    }

    onDeleteNotice(notice) {
        notes.splice(notes.indexOf(notice), 1)

        localStorage.setItem('Notices', JSON.stringify(notes))
        this.serverStorage.setItem('Notices', JSON.stringify(notes))
        this.render();
    }
};