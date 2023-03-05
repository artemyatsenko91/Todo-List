function todoApp() {
    const container = document.querySelector('.container');
    const form = <HTMLFormElement>container?.querySelector('.form');
    const input = <HTMLInputElement>form?.querySelector('.input');
    const btnAddItem = <HTMLButtonElement>form?.querySelector('.add__item');
    const btnClearItems = <HTMLButtonElement>(
        container?.querySelector('.clear__items')
    );
    const listWrap = <HTMLUListElement>container?.querySelector('.list__wrap');
    const todoListKey: string = 'todoTask';
    let itemsArr: string[] = [];

    function addToList() {
        if (form) {
            form.addEventListener('submit', (e: Event) => {
                e.preventDefault();

                getLocalData();

                if (input.value) {
                    itemsArr.push(input.value);
                    localStorage.setItem(todoListKey, JSON.stringify(itemsArr));
                    input.value = '';

                    callGeneratedFunc();
                    checkItemsArr();
                    checkInputValue();
                }
            });
        }
    }

    function generateBtnWrap(imgName1: string, imgName2: string) {
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

    function createItem(): void {
        let out: string = '';

        getLocalData();

        itemsArr &&
            itemsArr.forEach((el: string) => {
                out += `
                <li class="item">${el}
                    ${generateBtnWrap('edit', 'delete')}
                </li>
            `;
            });

        listWrap.innerHTML = out;
    }

    function getLocalData(): void {
        const value = localStorage.getItem(todoListKey);
        if (typeof value === 'string') {
            let localItems: string[] = JSON.parse(value);
            if (localItems === null) {
                itemsArr = [];
            } else {
                itemsArr = localItems;
            }
        } else itemsArr = [];
    }

    function checkItemsArr(): void {
        if (itemsArr?.length) {
            btnClearItems?.classList.remove('hide');
        } else {
            btnClearItems?.classList.add('hide');
        }
    }

    function checkInputValue(): void {
        btnAddItem.disabled = !input.value.length;
        input.addEventListener('input', () => {
            btnAddItem.disabled = !input.value.length;
        });
    }

    function deletItem() {
        const btnDelItem: NodeListOf<Element> =
            listWrap.querySelectorAll('.delete__item');
        btnDelItem.forEach((item, index): void => {
            item.addEventListener('click', () => {
                itemsArr.splice(index, 1);
                localStorage.setItem(todoListKey, JSON.stringify(itemsArr));
                callGeneratedFunc();
                checkItemsArr();
            });
        });
    }

    function editItem() {
        const btnEditItem: NodeListOf<Element> =
            listWrap.querySelectorAll('.edit__item');
        const todoItem: NodeListOf<Element> =
            listWrap.querySelectorAll('.item');

        getLocalData();

        btnEditItem.forEach((item, index) => {
            item.addEventListener('click', () => {
                let out: string = `
                    <li class="item">
                        <input class="edit__input" type="text" value="${
                            itemsArr[index]
                        }">
                        ${generateBtnWrap('complete', 'cancel')}
                    </li>
                `;

                todoItem[index].innerHTML = out;
                localStorage.setItem(todoListKey, JSON.stringify(itemsArr));

                const editInput = <HTMLInputElement>(
                    listWrap.querySelector('.edit__input')
                );
                const comlpetelBtn = <HTMLButtonElement>(
                    listWrap.querySelector('.complete__item')
                );
                const cancelBtn = <HTMLUListElement>(
                    listWrap.querySelector('.cancel__item')
                );

                editInput.focus();
                editInput.selectionStart = editInput.value.length;

                comlpetelBtn &&
                    comlpetelBtn.addEventListener('click', () => {
                        itemsArr[index] = editInput.value;
                        localStorage.setItem(
                            todoListKey,
                            JSON.stringify(itemsArr)
                        );
                        callGeneratedFunc();
                        checkItemsArr();
                    });

                cancelBtn &&
                    cancelBtn.addEventListener('click', () => {
                        callGeneratedFunc();
                    });
            });
        });
    }

    function callGeneratedFunc() {
        createItem();
        editItem();
        deletItem();
    }

    btnClearItems.addEventListener('click', () => {
        localStorage.clear();
        createItem();
        checkItemsArr();
    });

    callGeneratedFunc();
    addToList();
    checkInputValue();
    checkItemsArr();
}

todoApp();
