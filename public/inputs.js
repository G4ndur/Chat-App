
/**
 * @param {App} app
 * @param {Event} e
 */
export function onTypingEmail(app, e){
    app.emailInput = e.target.value.trim();
    console.log(app.emailInput)
}
/**
 * @param {App} app
 * @param {Event} e
 */
export function onTypingPassword(app, e){
    app.passwordInput = e.target.value.trim();
    console.log(app.passwordInput)
}

/**
 * @param {App} app
 * @param {Event} e
 */
export function onRepeatingPassword(app, e){
    app.passwordRepeatInput = e.target.value.trim();
}

/**
 * @param app
 * @param {Event} e
 */
export function onTypingChatMessage(app, e) {
    app.messageInput = e.target.value.trim();
}

/**
 * @param {App} app
 * @param {Event} e
 */
export function onTypingName(app, e){
    app.nameInput = e.target.value.trim();
}