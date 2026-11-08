
window.onload = function () {

    // Ce code est exécuté lorsque toute la page est chargée
    console.log("DOM ready!");

    // Fonction de validation de l'email
    function validateEmail(email) {

        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(String(email).toLowerCase());
    }

    // Sélection du formulaire
    const form = document.querySelector("#registrationForm");

    // Interception de la soumission du formulaire
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Récupération des valeurs des champs
        const name = document.querySelector("#name").value.trim();

        const firstname = document.querySelector("#firstname").value.trim();

        const birthday = document.querySelector("#birthday").value;

        const address = document.querySelector("#address").value.trim();

        const email = document.querySelector("#email").value.trim();

        const city = document.querySelector("#city").value.trim();

        // Tableau pour enregistrer les erreurs
        let errors = [];

        // Vérification du nom
        if (name.length < 5) {
            errors.push("Le nom doit contenir au moins 5 caractères.");
        }

        // Vérification du prénom
        if (firstname.length < 5) {
            errors.push("Le prénom doit contenir au moins 5 caractères.");
        }

        // Vérification de l'adresse
        if (address.length < 5) {
            errors.push("L'adresse doit contenir au moins 5 caractères.");
        }

        // Vérification de la ville
        if (city.length < 5) {
            errors.push("La ville doit contenir au moins 5 caractères.");
        }

        // Vérification de l'adresse mail
        if (!validateEmail(email)) {
            errors.push("L'adresse mail n'est pas valide.");
        }

        // Vérification de la date de naissance
        if (birthday === "") {

            errors.push("Veuillez saisir votre date de naissance.");

        } else {

            const birthdayDate = new Date(birthday);

            const birthdayTimestamp = birthdayDate.getTime();

            const nowTimestamp = Date.now();

            if (birthdayTimestamp > nowTimestamp) {
                errors.push("La date de naissance ne doit pas être dans le futur.");
            }
        }

        // Création de la fenêtre modale
        var myModal = new bootstrap.Modal(
            document.getElementById("myModal")
        );

        // Sélection des éléments de la modale
        const modalTitle = document.querySelector(".modal-title");

        const modalBody = document.querySelector(".modal-body");

        // Si des erreurs existent
        if (errors.length > 0) {

            modalTitle.textContent = "Erreurs dans le formulaire";

            modalBody.innerHTML = "<ul></ul>";

            const ul = modalBody.querySelector("ul");

            errors.forEach(function (error) {

                const li = document.createElement("li");

                li.textContent = error;

                ul.appendChild(li);

            });

        } else {

            // Tous les champs sont corrects
            modalTitle.textContent = "Formulaire validé !";

            // Nettoyage du contenu de la modale
            modalBody.innerHTML = "";

            // Message de bienvenue
            const message = document.createElement("p");

            message.textContent =
                "Bienvenue " + firstname + " " + name + " !";

            // Affichage des informations personnelles
            const informations = document.createElement("ul");

            const date = document.createElement("li");

            date.textContent = "Date de naissance : " + birthday;

            const adresse = document.createElement("li");

            adresse.textContent = "Adresse postale : " + address;

            const mail = document.createElement("li");

            mail.textContent = "Adresse mail : " + email;

            informations.appendChild(date);

            informations.appendChild(adresse);

            informations.appendChild(mail);

            // Création du lien Google Maps
            const mapsUrl =
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent(city);

            const cityLink = document.createElement("a");

            cityLink.href = mapsUrl;

            cityLink.target = "_blank";

            cityLink.rel = "noopener noreferrer";

            cityLink.textContent = "Ouvrir dans Google Maps";

            // Affichage du nom de la ville
            const cityParagraph = document.createElement("p");

            cityParagraph.textContent = "Votre ville : " + city;

            // Création de la carte Google Maps
            const mapFrame = document.createElement("iframe");

            mapFrame.src =
                "https://maps.google.com/maps?q=" +
                encodeURIComponent(city) +
                "&output=embed";

            mapFrame.width = "100%";

            mapFrame.height = "300";

            mapFrame.style.border = "0";

            mapFrame.loading = "lazy";

            mapFrame.allowFullscreen = true;

            // Affichage du lien
            const linkParagraph = document.createElement("p");

            linkParagraph.appendChild(cityLink);

            // Ajout des éléments dans la fenêtre modale
            modalBody.appendChild(message);

            modalBody.appendChild(informations);

            modalBody.appendChild(cityParagraph);

            modalBody.appendChild(mapFrame);

            modalBody.appendChild(linkParagraph);

        }

        // Affichage de la fenêtre modale
        myModal.show();

    });

};
