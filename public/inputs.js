export function emailInput(e){
    app.emailInput = e.target.value.trim();
    console.log(app.emailInput)
}

export function passwordInput(e){
    app.passwordInput = e.target.value.trim();
    console.log(app.passwordInput)
}
export function passwordRepeatInput(e){
    app.passwordRepeatInput = e.target.value.trim();
}

/**
 * @param {Event} e
 */
export function onInput(e,) {
    app.messageInput = e.target.value.trim();
}

export function nameInput(e){
    app.nameInput = e.target.value.trim();
}