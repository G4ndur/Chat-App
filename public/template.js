//Inaktiver Kontakt
/**
 *
 * @param {User} user
 * @constructor
 */
export const inactiveContact = user => {
    return `
    <div class="about">
        <div class="name">${user.name}</div>
    </div>
`
};