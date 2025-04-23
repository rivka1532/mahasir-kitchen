
const ol = document.querySelector('ol');
const cList = () => {
    const list = sessionStorage.getItem('currentList');
    if (!list) {
        return [];
    }
    return JSON.parse(list);
}
const setList = () => {
    const list = cList();
    ol.innerHTML = '';
    list.forEach(l => {
        const li = document.createElement('li');
        const trash = document.createElement('img');
        trash.src = "/images/styleImages/trash-can.svg";
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.disabled = true;
        const div = document.createElement('div');
        div.append(check, ' ', l);
        li.append(div, trash);
        ol.append(li);

        trash.onclick = () => {
            const index = list.indexOf(l);
            list.splice(index, 1);
            sessionStorage.setItem('currentList', JSON.stringify(list));
            setList();
        }
    });
}

setList();

const toPrint = document.getElementById('toPrint');
toPrint.onclick = () => {
    window.print();
}
