document.addEventListener('DOMContentLoaded', () => {
    const inscriptionForm = document.getElementById('contactForm');
    const connexionForm = document.getElementById('connexionForm');

    // Fonction pour secouer la fenêtre en cas d'erreur
    function shakeWindow() {
        document.body.classList.add('shake');
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500);
    }
    
    // Vérifier si le formulaire d'inscription existe sur la page
    if (inscriptionForm) {
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

        // Fonction pour vérifier l'unicité du nom d'utilisateur et de l'email
        function isUserUnique() {
            console.log("Vérification de l'unicité de l'utilisateur...");
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const emailExists = users.some(user => user.email === emailInput.value);
            const nameExists = users.some(user => user.name === nameInput.value);

            if (emailExists) {
                emailError.textContent = "L'adresse email est déjà utilisée.";
                console.log("Email déjà utilisé");
                return false;
            }

            if (nameExists) {
                nameError.textContent = "Le nom d'utilisateur est déjà pris.";
                console.log("Nom d'utilisateur déjà pris");
                return false;
            }

            console.log("Utilisateur unique");
            return true;
        }

        // Fonction pour enregistrer l'utilisateur dans le localStorage
        function storeUser() {
            console.log("Enregistrement de l'utilisateur dans le localStorage...");
            const user = {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                score: 0 // Score initialisé à 0
            };

            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            console.log("Utilisateur enregistré avec succès :", user);
        }

        // Écouteur d'événement pour la soumission du formulaire d'inscription
        inscriptionForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log("Soumission du formulaire d'inscription...");
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            const isConfirmPasswordValid = validateConfirmPassword();
            const isUniqueUser = isUserUnique();

            if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isUniqueUser) {
                storeUser();
                alert("Inscription réussie !");
                inscriptionForm.reset();
            } else {
                console.log("Échec de la validation du formulaire d'inscription");
                shakeWindow(); // Appel de la fonction de secousse en cas d'erreur
            }
        });

        // Écouteurs d'événements pour valider les champs à l'entrée
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        passwordInput.addEventListener('input', validatePassword);
        confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    }

    // Vérifier si le formulaire de connexion existe sur la page
    if (connexionForm) {
        const emailInput = document.getElementById('mail');
        const passwordInput = document.getElementById('motdepasse');

        const emailError = document.getElementById('erreur-mail');
        const passwordError = document.getElementById('erreur-motdepasse');

        // Fonction de validation des informations de connexion
        function validateLogin() {
            console.log("Validation de la connexion en cours...");
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === emailInput.value && user.password === passwordInput.value);

            if (!user) {
                emailError.textContent = "Email ou mot de passe incorrect.";
                console.log("Email ou mot de passe incorrect");
                return false;
            }

            // Sauvegarder l'utilisateur courant dans localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));

            console.log("Connexion réussie pour l'utilisateur :", user);
            return true;
        }

        // Écouteur d'événement pour la soumission du formulaire de connexion
        connexionForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log("Soumission du formulaire de connexion...");
            const isValidLogin = validateLogin();

            if (isValidLogin) {
                // Afficher le message de connexion réussie
                alert("Connexion réussie !");
                // Rediriger vers la page "profil.html"
                window.location.href = "profil.html";
            } else {
                console.log("Échec de la validation du formulaire de connexion");
                shakeWindow(); // Appel de la fonction de secousse en cas d'erreur
            }
        });
    }
});


