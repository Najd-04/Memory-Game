document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('mail');
    const passwordInput = document.getElementById('motdepasse');
    const confirmPasswordInput = document.getElementById('password');
    
    const nameError = document.getElementById('erreur-name');
    const emailError = document.getElementById('erreur-mail');
    const passwordError = document.getElementById('erreur-motdepasse');
    const confirmPasswordError = document.getElementById('erreur-password');

    // Fonction de validation du nom d'utilisateur
    function validateName() {
        console.log("Validation du nom d'utilisateur en cours...");
        if (nameInput.value.length < 3) {
            nameError.textContent = "Le nom d'utilisateur doit contenir au moins 3 caractères.";
            console.log("Nom d'utilisateur non valide : moins de 3 caractères");
            return false;
        }
        nameError.textContent = "";
        console.log("Nom d'utilisateur valide");
        return true;
    }

    // Fonction de validation de l'email
    function validateEmail() {
        console.log("Validation de l'email en cours...");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = "L'adresse email n'est pas valide.";
            console.log("Email non valide");
            return false;
        }
        emailError.textContent = "";
        console.log("Email valide");
        return true;
    }

    // Fonction de validation du mot de passe
    function validatePassword() {
        console.log("Validation du mot de passe en cours...");
        const password = passwordInput.value;
        let strength = 'faible';
        if (password.length < 6) {
            strength = 'faible';
        } else if (password.length >= 6 && /[\W_]/.test(password) && /\d/.test(password)) {
            strength = 'moyen';
        } else if (password.length >= 9 && /[\W_]/.test(password) && /\d/.test(password)) {
            strength = 'fort';
        }

        console.log(`Niveau de sécurité du mot de passe : ${strength}`);

        if (password.length < 6) {
            passwordError.textContent = "Le mot de passe doit contenir au moins 6 caractères.";
            console.log("Mot de passe non valide : moins de 6 caractères");
            return false;
        } else if (!/[\W_]/.test(password)) {
            passwordError.textContent = "Le mot de passe doit contenir au moins un symbole.";
            console.log("Mot de passe non valide : pas de symbole");
            return false;
        } else if (!/\d/.test(password)) {
            passwordError.textContent = "Le mot de passe doit contenir au moins un chiffre.";
            console.log("Mot de passe non valide : pas de chiffre");
            return false;
        }

        passwordError.textContent = `Niveau de sécurité du mot de passe : ${strength}`;
        console.log("Mot de passe valide");
        return true;
    }

    // Fonction de validation de la confirmation du mot de passe
    function validateConfirmPassword() {
        console.log("Validation de la confirmation du mot de passe en cours...");
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = "Les mots de passe ne correspondent pas.";
            console.log("Les mots de passe ne correspondent pas");
            return false;
        }
        confirmPasswordError.textContent = "";
        console.log("Confirmation du mot de passe valide");
        return true;
    }

    // Fonction pour enregistrer l'utilisateur dans le localStorage
    function storeUser() {
        console.log("Enregistrement de l'utilisateur dans le localStorage...");
        const user = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Utilisateur enregistré avec succès :", user);
    }

    // Écouteur d'événement pour la soumission du formulaire
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("Soumission du formulaire...");
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            storeUser();
            alert("Inscription réussie !");
            form.reset();
        } else {
            console.log("Échec de la validation du formulaire");
        }
    });

    // Écouteurs d'événements pour valider
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
});