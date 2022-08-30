function todoApp() {

    const container = document.querySelector('.container');
    const form = container.querySelector('.form');
    const input = form.querySelector('.input');
    const btnAddItem = form.querySelector('.add__item');
    const btnClearItems = container.querySelector('.clear__items');
    const listWrap = container.querySelector('.list__wrap');
    const todoListKey = 'todoTask';
    let itemsArr;

    function addToList() {
        form.addEventListener('submit', e => {
            e.preventDefault();

            getLocalData ();

            itemsArr.push(input.value);
            localStorage.setItem(todoListKey, JSON.stringify(itemsArr));
            input.value = '';

            callGeneratedFunc ();
            checkItemsArr();
            checkInputValue();
        });
    }

    function generateBtnWrap (imgName1, imgName2) {
        return `
            <div class="btn__wrap">
                <button class="${imgName1}__item">
                    <img src="./icons/${imgName1}.png" alt="edit">
                </button>
                <button class="${imgName2}__item">
                    <img src="./icons/${imgName2}.png" alt="delete">
                </button>
            </div>
        `;
    }

    function createItem() {
        let out = '';

        getLocalData ();

        itemsArr.forEach((el) => {
            out += `
                <li class="item">${el}
                    ${generateBtnWrap ('edit', 'delete')}
                </li>
            `;
        });

        listWrap.innerHTML = out;
    }

    function getLocalData () {
        let localItems = JSON.parse(localStorage.getItem(todoListKey));
            if (localItems === null) {
                itemsArr = [];
            } else {
                itemsArr = localItems;
            }
    }

    function checkItemsArr() {
        if (itemsArr.length) {
            btnClearItems.classList.remove('hide');
        } else {
            btnClearItems.classList.add('hide');
        }
    }

    function checkInputValue() {
        btnAddItem.disabled = !input.value.length;
        input.addEventListener('input', () => {
            btnAddItem.disabled = !input.value.length;
        });
    }

    function deletItem() {
        const btnDelItem = listWrap.querySelectorAll('.delete__item');
        btnDelItem.forEach((item, index) => {
            item.addEventListener('click', () => {
                itemsArr.splice(index, 1);
                localStorage.setItem(todoListKey, JSON.stringify(itemsArr));
                callGeneratedFunc ();
                checkItemsArr();
            });
        });
    }

    function editItem() {
        const btnEditItem = listWrap.querySelectorAll('.edit__item');
        const todoItem = listWrap.querySelectorAll('.item');

        getLocalData ();

        btnEditItem.forEach((item, index) => {
            item.addEventListener('click', () => {
                let out = `
                    <li class="item">
                        <input class="edit__input" type="text" value="${itemsArr[index]}">
                        ${generateBtnWrap ('complete', 'cancel')}
                    </li>
                `;

                todoItem[index].innerHTML = out;
                localStorage.setItem(todoListKey, JSON.stringify(itemsArr));

                const editInput = listWrap.querySelector('.edit__input');
                const comlpetelBtn = listWrap.querySelector('.complete__item');
                const cancelBtn = listWrap.querySelector('.cancel__item');

                editInput.focus();
                editInput.selectionStart = editInput.value.length;

                comlpetelBtn && comlpetelBtn.addEventListener('click', () => {
                    itemsArr[index] = editInput.value;
                    localStorage.setItem(todoListKey, JSON.stringify(itemsArr));
                    callGeneratedFunc ();
                    checkItemsArr();
                });

                cancelBtn && cancelBtn.addEventListener('click', () => {
                    callGeneratedFunc ();
                });
            });
        });
    }

    function callGeneratedFunc () {
        createItem();
        editItem();
        deletItem();
    }

    btnClearItems.addEventListener('click', () => {
        localStorage.clear();
        createItem();
        checkItemsArr();
    });

    callGeneratedFunc ();
    addToList();
    checkInputValue();
    checkItemsArr();
}

todoApp();