const form = document.querySelector('form');

form.onsubmit = (e) => {
    e.preventDefault();
    const currentuser = {
        userName: e.target['userName'].value,
        email: e.target['email'].value
    }
    localStorage.setItem("currentUser", JSON.stringify(currentuser));
    sessionStorage.setItem("currentUser", JSON.stringify(currentuser));
    location.href = '/pages/index/index.html';
}