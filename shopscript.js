const url = "https://opensheet.elk.sh/1AJcZHTwczbvbq3olN9H5WhyyiOSGc1YteYJl7zzondw/Shop";
const shopContainer = document.getElementById("shop");

fetch(url)
  .then(res => res.json())
  .then(data => {
    // tri par catégorie puis par id
    data.sort((a, b) => {
      if (a.Catégorie === b.Catégorie) {
        return Number(a.ID) - Number(b.ID);
      }
      return a.Catégorie.localeCompare(b.Catégorie);
    });

    let currentCategory = "";

    data.forEach(item => {
      // nouvelle catégorie
      if (item.Catégorie !== currentCategory) {
        currentCategory = item.Catégorie;

        const categoryTitle = document.createElement("h2");
        categoryTitle.className = "mt-5 mb-3";
        categoryTitle.textContent = currentCategory;
        shopContainer.appendChild(categoryTitle);
      }

      // **gestion promo**
      const promoBadge = item.Promo
        ? `
          <div class="promo-badge">
            <img src="promo.png" alt="Promo">
            <span>${item.Promo}</span>
          </div>
        `
        : "";

      // carte produit
      const card = document.createElement("div");
      card.className = "card mb-3";

      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${item.Titre}</h5>
          <p class="card-text">${item.Description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center gap-2">
              <strong>${item.Prix_Final} €</strong>
              ${promoBadge}
            </div>
            <a href="${item.Lien}" class="btn btn-primary" target="_blank">
              Acheter
            </a>
          </div>
        </div>
      `;

      shopContainer.appendChild(card);
    });
  })
  .catch(err => {
    shopContainer.innerHTML = "<p>Erreur de chargement du shop.</p>";
    console.error(err);
  });
