window.onload = () => {

    // Récupérer les données envoyées par le formulaire
    const paramsString = document.location.search;

    // Transformer les paramètres de l'URL
    // en objet URLSearchParams
    const searchParams = new URLSearchParams(paramsString);

    // Parcourir les paramètres
    for (const param of searchParams) {

        console.log(param);

        const elementId = param[0];
        const elementValue = param[1];

        // Chercher l'élément HTML correspondant
        const element = document.getElementById(elementId);

        // Afficher la valeur dans la page
        if (element !== null) {
            element.textContent = elementValue;
        }

        // Cas particulier : adresse
        if (param[0] === "address") {

            element.href =
                `https://www.google.com/maps/search/?api=1&query=${elementValue}`;

        }

        // Cas particulier : email
        else if (param[0] === "email") {

            element.href =
                `mailto:${elementValue}?subject=Hello!&body=What's up?`;
        }
    }
};