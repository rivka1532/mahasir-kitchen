
const productsIn = document.getElementById("products");
const btnadd = document.getElementById("btnadd");
btnadd.onclick = (e) => {
    e.preventDefault();
    const newProd = document.createElement('div');
    newProd.classList.add("product");
    const input = document.createElement('input');
    input.name = "product";
    input.setAttribute("placeholder", "חפש או הכנס מצרך חדש");
    const btn = document.createElement('button');
    btn.innerHTML = "-";
    btn.onclick = () => {
        newProd.remove();
    }
    newProd.append(input, btn);
    productsIn.append(newProd);
}

const filter = {
    recipes: [],
    searchByProducts: [],
    filteredRecipesOfProducts: [],
    searchBy: '',
}

$.ajax({
    url: "/Data/recipes.json",
    success: (data) => {
        filter.recipes = data.recipes;
    }
})

const filterRecipesOfProducts = (ifWith) => {
    if (ifWith)
        return filter.recipes.filter((recipe) => contain(recipe.products));
    return filter.recipes.filter((recipe) => notContain(recipe.products));
}
const contain = (pfr) => {
    let r = true;
    filter.searchByProducts.forEach((p1) => {
        let r2 = false;
        pfr.forEach((p2) => {
            if (p2.includes(p1)) {
                r2 = true;
            }
        })
        if (!r2)
            r = false;
    });
    return r;
}
const notContain = (pfr) => {
    let r = true;
    filter.searchByProducts.forEach((p1) => {
        pfr.forEach((p2) => {
            if (p2.includes(p1)) {
                r = false;
            }
        });
    });
    return r;
}

const form = document.querySelector("form");
const h1 = document.querySelector("section>h1");
const rs = document.querySelector("#contain"); 

form.onsubmit = (e) => {
    e.preventDefault();
    setRecipes1();
}

const setRecipes1 = () => {
    const ifWith = form.withORwithout.value == 1;
    filter.searchByProducts = [];
    if (!form.product.length) {
        if (!form.product.value)
            return;
        filter.searchByProducts[0] = form.product.value;
    }
    else for (p of form.product) {
        if (p.value)
            filter.searchByProducts.push(p.value);
    }

    filter.filteredRecipesOfProducts = filterRecipesOfProducts(ifWith);
    if (filter.filteredRecipesOfProducts.length == 0) {
        h1.innerHTML = "לא נמצאו מתכונים מתאימים";
        rs.innerHTML = "";
    }
    else {
        if (ifWith) {
            h1.innerHTML = "מתכונים המכילים ";
        }
        else {
            h1.innerHTML = "מתכונים שאינם מכילים ";
        }
        for (let i = 0; i < filter.searchByProducts.length; i++) {
            if (i < filter.searchByProducts.length - 1)
                h1.innerHTML += `${filter.searchByProducts[i]}, `;
            else h1.innerHTML += `${filter.searchByProducts[i]}:`;
        }
        setRecipes2();
    }
}

const filterRecipes = () => {
    return filter.filteredRecipesOfProducts.filter((recipe) => recipe.name.includes(filter.searchBy));
}

const setRecipes2 = () => {
    rs.innerHTML = "";
    const filteredRecipes = filterRecipes();
    filteredRecipes.forEach((r) => {
        const div = document.createElement("div");
        div.id = "r";
        const img = document.createElement("img");
        img.src = `/images/recipesImages/${r.image}`;
        const a = document.createElement("a");
        a.innerHTML = r.name;
        a.href = `/pages/recipe/recipe.html?recipeName=${r.name}`;
        const p = document.createElement('p');
        p.id = "p";
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');
        span1.innerHTML = `כ-${r.time} דקות`;
        span2.innerHTML = r.level;
        span3.innerHTML = r.kashrut;
        span1.classList.add('span');
        span2.classList.add('span');
        span3.classList.add('span');
        p.append(span1, span2, span3);
        div.append(img, a, p);
        rs.append(div);
    })
}

const searchInput = document.getElementById('search');
searchInput.onkeyup = () => {
    filter.searchBy = searchInput.value;
    setRecipes2();
}

// const btndelete = document.getElementById("btndelete");
form.onreset = () => {
    const products = document.querySelectorAll(".product");
    products.forEach(p => {
        p.remove();
    });
    filter.filteredRecipesOfProducts = [];
    h1.innerHTML = "";
    filter.searchBy = searchInput.value = '';
    setRecipes2();
}


form.withORwithout.forEach((w) => {
    w.onchange = () => {
        if (h1.innerHTML)
            setRecipes1();
    }
})
