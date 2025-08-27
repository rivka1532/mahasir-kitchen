const searchInput = document.getElementById('search');
const allRecipes = document.getElementById('allRecipes');

const displayConfig = {
    searchBy: '',
    sortBy: ''
}

const book = {
    recipes: []
}
$.ajax({
    url: "/Data/recipes.json",
    success: (data) => {
        book.recipes = data.recipes;
        setRecipes();
        weekRecipe();
    }
})

const filtereRecipes = () => {
    return book.recipes.filter((recipe) => recipe.name.includes(displayConfig.searchBy));
}

const setRecipes = () => {
    const filteredRecipes = filtereRecipes();
    allRecipes.innerHTML = '';
    const love = currentLove().map((l)=>l.name);
    filteredRecipes.forEach((recipe) => {
        const { name, image,time,level,kashrut} = recipe;
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
        p.append(span1,span2,span3);
        heart.onclick = (e) => {
            e.preventDefault();
            const love = currentLove();
            const recipeFromLove = love.find((l) => l.name === name);
            if (!recipeFromLove) {
                heart.children[0].src="/images/styleImages/לב מלא.png";
                love.push(recipe);
                heart.children[0].title=`אהבתי ${name}`
            } else {
                heart.children[0].src = "/images/styleImages/לב ריק.png";
                const index = love.indexOf(recipe);
                love.splice(index,1);
                heart.children[0].title=`בא לי ${name}`
            }
            sessionStorage.setItem('currentLove',JSON.stringify(love));
        }
        if(love.includes(name)){
            heart.children[0].src="/images/styleImages/לב מלא.png";
            heart.children[0].title=`אהבתי ${name}`
        }
    
        div.append(img, imgLogo, h4, a, heart,p);
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
    displayConfig.searchBy = searchInput.value;
    setRecipes();
}

const weekRecipe = () => {
    const randRecipe = book.recipes[Math.floor(Math.random() * book.recipes.length)];
    console.log(randRecipe.image);
    const im = randRecipe.image.replaceAll(" ","\\ ");
    document.getElementById("back").style.backgroundImage = `url(/images/recipesImages/${im})`;
    document.getElementById("n").innerHTML = randRecipe.name;
    document.querySelector("#back>a").href = `/pages/recipe/recipe.html?recipeName=${randRecipe.name}`;
} 


