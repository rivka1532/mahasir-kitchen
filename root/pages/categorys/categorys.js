const searchParams = new URLSearchParams(location.search);
const categoryName = searchParams.get('categoryName');
const sort = searchParams.get('sort');
const searchInput = document.getElementById('search');
const allRecipes = document.getElementById('allRecipes');
const h1 = document.querySelector("section>h1");
const h2 = document.querySelector("section>h2");

let recipes;
$.ajax({
    url: "/Data/recipes.json",
    success: (data) => {
        if (sort === 'c') {
            recipes = data.recipes.filter((recipe) => recipe.category === categoryName);
            h1.innerHTML = `מתכוני ${categoryName}`;
            h2.innerHTML = `מחפשים מתכוני ${categoryName}? כאן תמצאו מגוון ענק של כל סוגי מתכוני ה${categoryName}, טיפים והמון מידע נוסף, מצאו את המתכון המנצח הבא שלכם!`
        }
        else{
            if (sort === 'l') {
                recipes = data.recipes.filter((recipe) => recipe.level === categoryName);
                h1.innerHTML = `מתכונים ברמת קושי ${categoryName}`;
                h2.innerHTML = `כאן תמצאו מגוון ענק של כל סוגי המתכונים, מצאו את המתכון המנצח שלכם, טיפים והמון מידע נוסף!`;
            }
            else{
                recipes = data.recipes.filter((recipe) => recipe.kashrut === categoryName);
                if (categoryName === 'כשר פרווה') {
                    h1.innerHTML =  'מתכונים פרווה';
                    h2.innerHTML = `מחפשים מתכונים פרווה? כאן תמצאו מגוון ענק של מתכונים פרווה, מצאו את המתכון המנצח שלכם, טיפים והמון מידע נוסף!`;
                } 
                else {
                    const s = categoryName.substring(categoryName.indexOf(' '));
                    h1.innerHTML = `מתכונים ${s}ים`;
                    h2.innerHTML = `מחפשים מתכונים ${s}ים? כאן תמצאו מגוון ענק של מתכונים ${s}ים, טיפים והמון מידע נוסף, מצאו את המתכון המנצח הבא שלכם!`
                }
            }
        }
        setRecipes();
    }
})
let searchBy = "";

const filtereRecipes = () => {
    return recipes.filter((recipe) => recipe.name.includes(searchBy));
}

const setRecipes = () => {
    const filteredRecipes = filtereRecipes();
    allRecipes.innerHTML = '';
    const love = currentLove().map((l) => l.name);
    filteredRecipes.forEach((recipe) => {
        const { name, image, time, level, kashrut } = recipe;
        const div = document.createElement('div');
        // div.innerHTML = `<a href="./recipe.html?recipeName=${name}">${name} ${category}</a>`;
        const img = document.createElement('img');
        img.src = `/images/recipesImages/${image}`;
        img.setAttribute("class", "food");
        const a = document.createElement('a');
        a.innerHTML = name;
        a.href = `/pages/recipe/recipe.html?recipeName=${name}`;
        a.id = "title";
        const h4 = document.createElement('h4');
        h4.innerHTML = "צוות מה בסיר";
        const imgLogo = document.createElement('img');
        imgLogo.src = "/images/styleImages/לוגו לבן.png";
        imgLogo.classList.add("imgLogo");
        const heart = document.createElement('a');
        heart.innerHTML = `<img src="/images/styleImages/לב ריק.png" class="heart" title="בא לי ${name}" >`;
        heart.href = "";
        const p = document.createElement('p');
        p.id = "p";
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');
        span1.innerHTML = `כ-${time} דקות`;
        span2.innerHTML = level;
        span3.innerHTML = kashrut;
        span1.classList.add('span');
        span2.classList.add('span');
        span3.classList.add('span');
        p.append(span1, span2, span3);
        heart.onclick = (e) => {
            e.preventDefault();
            const love = currentLove();
            const recipeFromLove = love.find((l) => l.name === name);
            if (!recipeFromLove) {
                heart.children[0].src = "/images/styleImages/לב מלא.png";
                love.push(recipe);
                heart.children[0].title = `אהבתי ${name}`
            } else {
                heart.children[0].src = "/images/styleImages/לב ריק.png";
                const index = love.indexOf(recipe);
                love.splice(index, 1);
                heart.children[0].title = `בא לי ${name}`
            }
            sessionStorage.setItem('currentLove', JSON.stringify(love));
        }
        if (love.includes(name)) {
            heart.children[0].src = "/images/styleImages/לב מלא.png";
            heart.children[0].title = `אהבתי ${name}`
        }
        div.append(img, imgLogo, h4, a, heart, p);
        allRecipes.appendChild(div);
    })
}

const currentLove = () => {
    const love = sessionStorage.getItem('currentLove');
    if (!love) {
        return [];
    }
    return JSON.parse(love);
}

searchInput.onkeyup = (e) => {
    // e.preventDefault();
    searchBy = searchInput.value;
    setRecipes();
}
