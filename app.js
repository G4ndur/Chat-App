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


const notes = [
    new Notice('Test 1'),
    new Notice('Test 2'),
    new Notice('Test 3'),
];


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
     *  @type {Notice}
     */
    test;
    /**
     *  @type {number}
     */
    Index;

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
            noticesContainer.querySelector('.delete')
                ?.addEventListener('click', this.DeleteNotice(notice).bind(this));
            const div = document.createElement('div')
            div.innerHTML = NoticeTemplate(notice);
            noticesContainer.appendChild(div);
            //div.querySelector('.delete').addEventListener('click', this.onDeleteNotice(notice).bind(this))


            div.querySelector('input').oninput = e => this.onChangeNoticeTitle(e, notice);
            noticesContainer.querySelector('.delete').addEventListener('click', this.onDeleteNotice(this.no))
        });
    }

    run() {
        this.render();

        // TODO: löschen implementieren
        // indexOf() -1 | index
        // splice()
    }

    /**
     * @param {Event} e
     * @param {Notice} notice
     */
    onChangeNoticeTitle(e, notice) {
        notice.title = e.target.value.trim();
        notice.updatedAt = new Date();

        console.log(notice);
    }

    onCreateNewNotice() {
        notes.push(new Notice())
        this.render();
    }

    DeleteNotice(notice) {

        notes.indexOf(this.notice.createdAt)
    }
};