//Inaktiver Kontakt
/**
 *
 * @param {User} user
 * @constructor
 */
export const inactiveContact = user => {
    return `
    <div class="about">
        <div class="btn">${user.name}</div>
    </div>
`
};
export const inactiveContactMod = user => {
    return `
    <div class="about">
        <button class="btn user">${user.name}</button>
        <button class="btn del">Delete</button>
    </div>
`
};