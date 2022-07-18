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