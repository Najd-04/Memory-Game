// Check les champs du formulaire
function validateEmail(email) {
    // Utilisez une expression régulière pour valider l'email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    // Vérifiez si le mot de passe a au moins 8 caractères, 1 majuscule, 1 minuscule et 1 caractère spécial
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&!*])[A-Za-z\d@#$%^&!*]{8,}$/;
    return passwordPattern.test(password);
}
export {validateEmail,validatePassword}