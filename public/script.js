"use strict";
function todoApp() {
    var container = document.querySelector('.container');
    var form = container === null || container === void 0 ? void 0 : container.querySelector('.form');
    var input = form === null || form === void 0 ? void 0 : form.querySelector('.input');
    var btnAddItem = form === null || form === void 0 ? void 0 : form.querySelector('.add__item');
    var btnClearItems = (container === null || container === void 0 ? void 0 : container.querySelector('.clear__items'));
    var listWrap = container === null || container === void 0 ? void 0 : container.querySelector('.list__wrap');
    var todoListKey = 'todoTask';
    var itemsArr = [];
    function addToList() {
        if (form) {
            form.addEventListener('submit', function (e) {
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
    function generateBtnWrap(imgName1, imgName2) {
        return "\n            <div class=\"btn__wrap\">\n                <button class=\"".concat(imgName1, "__item\">\n                    <img src=\"./icons/").concat(imgName1, ".png\" alt=\"edit\">\n                </button>\n                <button class=\"").concat(imgName2, "__item\">\n                    <img src=\"./icons/").concat(imgName2, ".png\" alt=\"delete\">\n                </button>\n            </div>\n        ");
    }
    function createItem() {
        var out = '';
        getLocalData();
        itemsArr &&
            itemsArr.forEach(function (el) {
                out += "\n                <li class=\"item\">".concat(el, "\n                    ").concat(generateBtnWrap('edit', 'delete'), "\n                </li>\n            ");
            });
        listWrap.innerHTML = out;
    }
    function getLocalData() {
        var value = localStorage.getItem(todoListKey);
        if (typeof value === 'string') {
            var localItems = JSON.parse(value);
            if (localItems === null) {
                itemsArr = [];
            }
            else {
                itemsArr = localItems;
            }
        }
        else
            itemsArr = [];
    }
    function checkItemsArr() {
        if (itemsArr === null || itemsArr === void 0 ? void 0 : itemsArr.length) {
            btnClearItems === null || btnClearItems === void 0 ? void 0 : btnClearItems.classList.remove('hide');
        }
        else {
            btnClearItems === null || btnClearItems === void 0 ? void 0 : btnClearItems.classList.add('hide');
        }
    }
    function checkInputValue() {
        btnAddItem.disabled = !input.value.length;
        input.addEventListener('input', function () {
            btnAddItem.disabled = !input.value.length;
        });
    }
    function deletItem() {
        var btnDelItem = listWrap.querySelectorAll('.delete__item');
        btnDelItem.forEach(function (item, index) {
            item.addEventListener('click', function () {
                itemsArr.splice(index, 1);
                localStorage.setItem(todoListKey, JSON.stringify(itemsArr));
                callGeneratedFunc();
                checkItemsArr();
            });
        });
    }
    function editItem() {
        var btnEditItem = listWrap.querySelectorAll('.edit__item');
        var todoItem = listWrap.querySelectorAll('.item');
        getLocalData();
        btnEditItem.forEach(function (item, index) {
            item.addEventListener('click', function () {
                var out = "\n                    <li class=\"item\">\n                        <input class=\"edit__input\" type=\"text\" value=\"".concat(itemsArr[index], "\">\n                        ").concat(generateBtnWrap('complete', 'cancel'), "\n                    </li>\n                ");
                todoItem[index].innerHTML = out;
                localStorage.setItem(todoListKey, JSON.stringify(itemsArr));
                var editInput = (listWrap.querySelector('.edit__input'));
                var comlpetelBtn = (listWrap.querySelector('.complete__item'));
                var cancelBtn = (listWrap.querySelector('.cancel__item'));
                editInput.focus();
                editInput.selectionStart = editInput.value.length;
                comlpetelBtn &&
                    comlpetelBtn.addEventListener('click', function () {
                        itemsArr[index] = editInput.value;
                        localStorage.setItem(todoListKey, JSON.stringify(itemsArr));
                        callGeneratedFunc();
                        checkItemsArr();
                    });
                cancelBtn &&
                    cancelBtn.addEventListener('click', function () {
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
    btnClearItems.addEventListener('click', function () {
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
