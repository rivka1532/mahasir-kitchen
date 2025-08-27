const loveRecipes = document.getElementById('allRecipes');
const sInput = document.getElementById("search");
const title = document.getElementById("title");
const resetAll = document.getElementById("resetAll");

const cLove = () => {
    const love = sessionStorage.getItem('currentLove');
    if (!love) {
        return [];
    }
    return JSON.parse(love);
}
let searchBy = '';
let love = cLove();

const fRecipes = () => {
    return love.filter((recipe) => recipe.name.includes(searchBy));
}
setRecipesL = () => {
    const filteredRecipes = fRecipes();
    loveRecipes.innerHTML = '';
    filteredRecipes.forEach((recipe) => {
        const { name, image, time, level, kashrut } = recipe;
        const div = document.createElement('div');
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
        heart.innerHTML = `<img src="/images/styleImages/לב מלא.png" class="heart" title="אהבתי ${name}" >`;
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
            const index = love.indexOf(recipe);
            love.splice(index, 1);
            sessionStorage.setItem('currentLove', JSON.stringify(love));
            setRecipesL();
            if (cLove().length == 0) {
                resetAll.style.display = "none";
                title.innerHTML = "לא אהבת שום דבר?";
            }
        }
        div.append(img, imgLogo, h4, a, heart, p);
        loveRecipes.appendChild(div);
    });
}
if (love.length == 0) {
    title.innerHTML = "לא אהבת שום דבר?";
}
else {
    resetAll.style.display = "block";
    title.innerHTML = "נבחרת המתכונים שלי";
    setRecipesL();
}
sInput.onkeyup = () => {
    searchBy = sInput.value;
    setRecipesL();
}

resetAll.onclick = () => {
    sessionStorage.setItem('currentLove', "");
    love = cLove();
    setRecipesL();
    title.innerHTML = "לא אהבת שום דבר?";
    resetAll.style.display = "none";
}