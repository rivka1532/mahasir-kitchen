const user = localStorage.getItem('currentUser');
const userText = document.getElementById('spanname');
const emailInput = document.querySelector('footer div input');
userText.innerHTML = JSON.parse(user).userName;
emailInput.value = JSON.parse(user).email;
const backDiv = document.getElementById('backDiv');
document.getElementById("logo").onclick = () => {
    location.href = '/pages/index/index.html';
}
document.getElementById("lev").onclick = () => {
    location.href = '/pages/love/love.html';
}
const category = document.getElementById("category");
const c = document.getElementById('c');
const l = document.getElementById('l');
const k = document.getElementById('k');
const nav = document.querySelector("header nav");
category.onclick = () => {
    nav.style.display = "block";
    backDiv.style.display = "block";
}
backDiv.onclick = () =>{
    nav.style.display = "none";
    backDiv.style.display = "none";
}
$.ajax({
    url: "/Data/recipes.json",
    success: (data) => {
        const { recipes } = data;
        const categorys = recipes.map((r) => r.category).sort();
        for (let i = 0; i < categorys.length; i++) {
            if (categorys[i] === categorys[i + 1])
                categorys.splice(i--, 1);
        }
        categorys.forEach(ca => {
            const category = document.createElement('a');
            category.innerHTML=ca;
            category.href=`/pages/categorys/categorys.html?categoryName=${ca}&sort=c`;
            c.append(category);;
        });
        const levels = recipes.map((r) => r.level).sort();
        for (let i = 0; i < levels.length; i++) {
            if (levels[i] === levels[i + 1])
                levels.splice(i--, 1);
        }
        levels.forEach(le => {
            const level = document.createElement('a');
            level.innerHTML=le;
            level.href=`/pages/categorys/categorys.html?categoryName=${le}&sort=l`;
            l.append(level);;
        });
        const kashruts = recipes.map((r) => r.kashrut).sort();
        for (let i = 0; i < kashruts.length; i++) {
            if (kashruts[i] === kashruts[i + 1])
                kashruts.splice(i--, 1);
        }
        kashruts.forEach(ka => {
            const kashrut = document.createElement('a');
            kashrut.innerHTML=ka;
            kashrut.href=`/pages/categorys/categorys.html?categoryName=${ka}&sort=k`;
            k.append(kashrut);;
        });

    }
})
