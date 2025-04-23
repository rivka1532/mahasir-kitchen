
const searchParams = new URLSearchParams(location.search);
const currentName = searchParams.get('recipeName');
const heart = document.getElementById('aheart');
const h= document.querySelector("#houers>p");
const m = document.querySelector("#minutes>p");
const addToList = document.getElementById('addToList');
$.ajax({
    url: "/Data/recipes.json",
    success: (data) => {
        const currentRecipe = data.recipes.find((recipe) => recipe.name === currentName);
        if (!currentRecipe) {
            location.href = './';
        }
        document.getElementById('imageRecipe').src = `/images/recipesImages/${currentRecipe.image}`;
        document.querySelector('#nameResipe').innerHTML = currentName;
        document.querySelector('#productsNeed').innerHTML = `מה צריך כדי להכין ${currentName}?`;
        const ulp = document.getElementById('products');
        currentRecipe.products.forEach(element => {
            const check = document.createElement('input');
            check.type = 'checkbox';
            const li = document.createElement('li');
            li.append(check, element);
            ulp.append(li);
            if (cList().includes(element)) {
                check.checked = true;
            }
            check.onchange = () =>{
                const list = cList();
                const productFromList = list.find((p) => p === element);
                if (check.checked) {
                    if (!productFromList) {
                        list.push(element);
                    } 
                } 
                else {
                    const index = list.indexOf(element);
                    list.splice(index, 1);
                }
                sessionStorage.setItem('currentList',JSON.stringify(list));
            }
        });
        document.querySelector('#instructionsHow').innerHTML = `איך מכינים ${currentName}?`;
        const uli = document.getElementById('instructions');
        currentRecipe.instructions.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = element;
            uli.append(li);
        });
        const heart = document.querySelector('.heart');
        heart.title=`בא לי ${currentName}`;
        if(cLove().map((l)=>l.name).includes(currentName)){
            heart.src="/images/styleImages/לב מלא.png";
            heart.title=`אהבתי ${currentName}`
        }
        heart.onclick = (e) => {
            e.preventDefault();
            const love = cLove();
            const recipeFromLove = love.find((l) => l.name === currentName);
            if (!recipeFromLove) {
                heart.src="/images/styleImages/לב מלא.png";
                heart.title=`אהבתי ${currentName}`
                love.push(currentRecipe);
            } else {
                heart.title=`בא לי ${currentName}`
                heart.src = "/images/styleImages/לב ריק.png";
                const index = love.indexOf(currentRecipe);
                love.splice(index,1);
            }
            sessionStorage.setItem('currentLove',JSON.stringify(love));
        }
        if(Math.floor(currentRecipe.time/60)<10)
            h.innerHTML = `0${Math.floor(currentRecipe.time/60)}`;
        else h.innerHTML = Math.floor(currentRecipe.time/60);
        if(currentRecipe.time%60<10)
            m.innerHTML = `0${currentRecipe.time%60}`;
        else m.innerHTML = currentRecipe.time%60;

    }
})
const cLove = () => {
    const love = sessionStorage.getItem('currentLove');
    if (!love) {
        return [];
    }
    return JSON.parse(love);
}

const cList = () => {
    const list = sessionStorage.getItem('currentList');
    if (!list) {
        return [];
    }
    return JSON.parse(list);
}

