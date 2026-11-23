
const skins = [
  // RIFLES
  {name:"Reaver Vandal",weapon:"Vandal",category:"Rifle",rarity:"Premium",icon:"⚔"},
  {name:"Prime Vandal",weapon:"Vandal",category:"Rifle",rarity:"Premium",icon:"✦"},
  {name:"Elderflame Vandal",weapon:"Vandal",category:"Rifle",rarity:"Ultra",icon:"🔥"},
  {name:"RGX 11z Pro Vandal",weapon:"Vandal",category:"Rifle",rarity:"Premium",icon:"⚡"},
  {name:"Prelude to Chaos Vandal",weapon:"Vandal",category:"Rifle",rarity:"Premium",icon:"☄"},
  {name:"Champions Vandal",weapon:"Vandal",category:"Rifle",rarity:"Exclusive",icon:"🏆"},
  {name:"Gaia's Vengeance Vandal",weapon:"Vandal",category:"Rifle",rarity:"Premium",icon:"🌳"},
  {name:"Kuronami Vandal",weapon:"Vandal",category:"Rifle",rarity:"Exclusive",icon:"🌊"},
  {name:"Oni Vandal",weapon:"Vandal",category:"Rifle",rarity:"Premium",icon:"👹"},
  {name:"Forsaken Vandal",weapon:"Vandal",category:"Rifle",rarity:"Premium",icon:"🔮"},
  {name:"Oni Phantom",weapon:"Phantom",category:"Rifle",rarity:"Premium",icon:"👹"},
  {name:"Prime Phantom",weapon:"Phantom",category:"Rifle",rarity:"Premium",icon:"✦"},
  {name:"Recon Phantom",weapon:"Phantom",category:"Rifle",rarity:"Premium",icon:"🎯"},
  {name:"Ion Phantom",weapon:"Phantom",category:"Rifle",rarity:"Premium",icon:"⚡"},
  {name:"Spectrum Phantom",weapon:"Phantom",category:"Rifle",rarity:"Exclusive",icon:"🌈"},
  {name:"Ruination Phantom",weapon:"Phantom",category:"Rifle",rarity:"Premium",icon:"☠"},
  {name:"Singularity Phantom",weapon:"Phantom",category:"Rifle",rarity:"Exclusive",icon:"🌀"},

  // SMGS
  {name:"Prime Spectre",weapon:"Spectre",category:"SMG",rarity:"Premium",icon:"✦"},
  {name:"RGX Spectre",weapon:"Spectre",category:"SMG",rarity:"Premium",icon:"⚡"},
  {name:"Protocol Spectre",weapon:"Spectre",category:"SMG",rarity:"Exclusive",icon:"🤖"},
  {name:"BlastX Spectre",weapon:"Spectre",category:"SMG",rarity:"Premium",icon:"💥"},
  {name:"Magepunk Spectre",weapon:"Spectre",category:"SMG",rarity:"Premium",icon:"🔋"},

  // SNIPERS
  {name:"Reaver Operator",weapon:"Operator",category:"Sniper",rarity:"Premium",icon:"⚔"},
  {name:"Ion Operator",weapon:"Operator",category:"Sniper",rarity:"Premium",icon:"⚡"},
  {name:"Elderflame Operator",weapon:"Operator",category:"Sniper",rarity:"Ultra",icon:"🔥"},
  {name:"Origin Operator",weapon:"Operator",category:"Sniper",rarity:"Premium",icon:"🌀"},
  {name:"Forsaken Operator",weapon:"Operator",category:"Sniper",rarity:"Premium",icon:"🔮"},

  // SIDEARMS
  {name:"Reaver Sheriff",weapon:"Sheriff",category:"Sidearm",rarity:"Premium",icon:"⚔"},
  {name:"Ion Sheriff",weapon:"Sheriff",category:"Sidearm",rarity:"Premium",icon:"⚡"},
  {name:"Protocol Sheriff",weapon:"Sheriff",category:"Sidearm",rarity:"Exclusive",icon:"🤖"},
  {name:"Sovereign Ghost",weapon:"Ghost",category:"Sidearm",rarity:"Premium",icon:"👑"},
  {name:"Recon Ghost",weapon:"Ghost",category:"Sidearm",rarity:"Premium",icon:"🎯"},
  {name:"Magepunk Ghost",weapon:"Ghost",category:"Sidearm",rarity:"Premium",icon:"🔋"},
  {name:"Luna Ghost",weapon:"Ghost",category:"Sidearm",rarity:"Deluxe",icon:"🌙"},
  {name:"Prime Classic",weapon:"Classic",category:"Sidearm",rarity:"Premium",icon:"✦"},

  // SHOTGUNS
  {name:"Oni Bucky",weapon:"Bucky",category:"Shotgun",rarity:"Premium",icon:"👹"},
  {name:"Prime Judge",weapon:"Judge",category:"Shotgun",rarity:"Premium",icon:"✦"},
  {name:"Glitchpop Judge",weapon:"Judge",category:"Shotgun",rarity:"Exclusive",icon:"🎨"},

  // MELEE
  {name:"Reaver Karambit",weapon:"Melee",category:"Melee",rarity:"Exclusive",icon:"⚔"},
  {name:"Prime Axe",weapon:"Melee",category:"Melee",rarity:"Premium",icon:"🪓"},
  {name:"RGX Blade",weapon:"Melee",category:"Melee",rarity:"Exclusive",icon:"⚡"},
  {name:"Champions Karambit",weapon:"Melee",category:"Melee",rarity:"Exclusive",icon:"🏆"},
  {name:"Kuronami No Yaiba",weapon:"Melee",category:"Melee",rarity:"Exclusive",icon:"🌊"},
  {name:"Oni Katana",weapon:"Melee",category:"Melee",rarity:"Exclusive",icon:"👹"}
];

let equipped = JSON.parse(localStorage.getItem("equippedSkins") || "{}");
let favorites = JSON.parse(localStorage.getItem("favoriteSkins") || "[]");

let currentCategory = "All";
let showFavorites = false;
let selectedSkin = null;

const grid = document.getElementById("skinGrid");
const search = document.getElementById("search");
const rarity = document.getElementById("rarity");

function saveData() {
  localStorage.setItem("equippedSkins", JSON.stringify(equipped));
  localStorage.setItem("favoriteSkins", JSON.stringify(favorites));
}

function updateStats() {
  document.getElementById("totalCount").textContent = skins.length;
  document.getElementById("equippedCount").textContent = Object.keys(equipped).length;
  document.getElementById("favoriteCount").textContent = favorites.length;
}

function renderSkins() {
  const query = search.value.toLowerCase();
  const selectedRarity = rarity.value;

  const filtered = skins.filter(skin => {
    return (
      (currentCategory === "All" || skin.category === currentCategory) &&
      (skin.name.toLowerCase().includes(query) || skin.weapon.toLowerCase().includes(query)) &&
      (selectedRarity === "All" || skin.rarity === selectedRarity) &&
      (!showFavorites || favorites.includes(skin.name))
    );
  });

  grid.innerHTML = "";
  document.getElementById("resultCount").textContent = filtered.length + " RESULTS";

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:#999;padding:25px">No skins found.</p>';
  }

  filtered.forEach(skin => {
    const isEquipped = equipped[skin.weapon] === skin.name;
    const isFavorite = favorites.includes(skin.name);

    const card = document.createElement("article");
    card.className = "skin-card";

    card.innerHTML = `
      <div class="skin-art">${skin.icon}</div>
      <div class="skin-info">
        <h3></h3>
        <p class="weapon-name"></p>
        <span class="rarity"></span>
        <div class="card-actions">
          <button class="equip">${isEquipped ? "UNEQUIP" : "EQUIP"}</button>
          <button class="favorite ${isFavorite ? "selected" : ""}">
            ${isFavorite ? "♥" : "♡"}
          </button>
        </div>
        ${isEquipped ? '<p class="equipped-label">✓ EQUIPPED IN SIMULATOR</p>' : ""}
      </div>
    `;

    card.querySelector("h3").textContent = skin.name;
    card.querySelector(".weapon-name").textContent = skin.weapon;
    card.querySelector(".rarity").textContent = skin.rarity;

    card.querySelector(".equip").addEventListener("click", () => {
      if (equipped[skin.weapon] === skin.name) {
        delete equipped[skin.weapon];
      } else {
        equipped[skin.weapon] = skin.name;
      }

      saveData();
      renderSkins();
    });

    card.querySelector(".favorite").addEventListener("click", () => {
      if (favorites.includes(skin.name)) {
        favorites = favorites.filter(name => name !== skin.name);
      } else {
        favorites.push(skin.name);
      }

      saveData();
      renderSkins();
    });

    card.querySelector(".skin-art").addEventListener("click", () => openPreview(skin));

    grid.appendChild(card);
  });

  updateStats();
}

function openPreview(skin) {
  selectedSkin = skin;
  document.getElementById("modalIcon").textContent = skin.icon;
  document.getElementById("modalName").textContent = skin.name;
  document.getElementById("modalWeapon").textContent = skin.weapon;
  document.getElementById("modalRarity").textContent = skin.rarity;
  document.getElementById("modal").classList.remove("hidden");
}

document.getElementById("modalEquip").addEventListener("click", () => {
  if (!selectedSkin) return;

  const weapon = selectedSkin.weapon;

  if (equipped[weapon] === selectedSkin.name) {
    delete equipped[weapon];
  } else {
    equipped[weapon] = selectedSkin.name;
  }

  saveData();
  renderSkins();
  document.getElementById("modal").classList.add("hidden");
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

document.getElementById("modal").addEventListener("click", event => {
  if (event.target.id === "modal") {
    document.getElementById("modal").classList.add("hidden");
  }
});

document.querySelectorAll(".nav").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".nav.active").classList.remove("active");
    button.classList.add("active");
    currentCategory = button.dataset.category;
    renderSkins();
  });
});

search.addEventListener("input", renderSkins);
rarity.addEventListener("change", renderSkins);

document.getElementById("favoritesOnly").addEventListener("click", event => {
  showFavorites = !showFavorites;
  event.currentTarget.textContent = showFavorites ? "♥ Favorites ON" : "♡ Favorites";
  event.currentTarget.style.borderColor = showFavorites ? "#ff4655" : "#333541";
  renderSkins();
});

renderSkins();
