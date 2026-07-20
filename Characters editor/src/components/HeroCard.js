class HeroCard extends HTMLElement{
   constructor(){
      super()
      this.shadow = this.attachShadow({mode:"open"});
      const template = document.querySelector("#hero-card-template");
      this.shadow.appendChild(template.content.cloneNode(true));
      this.stats = {
         card: this.shadow.querySelector(".card"),
         img: this.shadow.querySelector("#hero-img"),
         name: this.shadow.querySelector("#hero-name"),
         heroClass: this.shadow.querySelector("#hero-class"),
         currentHP: this.shadow.querySelector("#hero-current-HP"),
         maxHP: this.shadow.querySelector("#hero-max-HP"),
         attack: this.shadow.querySelector(".hero-current-attack"),
         defense: this.shadow.querySelector("#hero-current-defense"),
         mana: this.shadow.querySelector("#hero-current-mana"),
         rarity: this.shadow.querySelector("#hero-rarity"),
         sellBtn: this.shadow.querySelector(".sell-btn"),
         healBtn: this.shadow.querySelector(".heal-btn"),
      };
   }
   
   set character(character) {
      this._character = character;
      this.render();
   }

   get character() {
      return this._character;
   }

   set selected(value) {
      this._selected = Boolean(value);
      this.renderSelectedState();
   }

   get selected() {
      return this._selected;
   }

   render(){
      const hero = this._character;

      if (!hero) return;

      this.stats.name.textContent = hero.name;
      this.stats.heroClass.textContent = hero.className;
      this.stats.maxHP.textContent = hero.hp;
      this.stats.currentHP.textContent = hero.currentHP;
      this.stats.attack.textContent = hero.attack;
      this.stats.defense.textContent = hero.defense;
      this.stats.mana.textContent = hero.mana;
      this.stats.rarity.textContent = hero.rarity;
      this.stats.img.src = hero.imagePath;

      this.stats.card.classList.remove(
         "common",
         "rare",
         "epic",
         "legendary"
      );

      this.stats.card.classList.add(
         hero.rarity.toLowerCase()
      );
   }
   renderSelectedState() {
         this.classList.toggle("selected", Boolean(this._selected));
      }
   

   connectedCallback() {
      this.addEventListener("click", () => {
         this.dispatchEvent(
            new CustomEvent("select-character", {
               bubbles: true,
               composed: true,
               detail: {
                  character: this.character
               }
            })
         );
      });

      this.stats.sellBtn.addEventListener("click", (event) => {
         event.stopPropagation();
         this.dispatchEvent(
            new CustomEvent("sell", {
               bubbles: true,
               composed: true,
               detail: {
                  character: this.character
               }
            })
         );
      });
   }
   }
customElements.define("hero-card", HeroCard);

export default HeroCard;