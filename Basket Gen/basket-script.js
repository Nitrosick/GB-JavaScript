"use strict";

const product = {

    goods: [
        {item: 'Футболка', brand: 'Pull&Bear', size: 'S', color: 'Черный', sex: 'М', price: 450, id: 7521900},
        {item: 'Водолазка', brand: 'Mango', size: 'L', color: 'Бордовый', sex: 'Ж', price: 970, id: 7599641},
        {item: 'Юбка', brand: 'Stradivarius', size: 'XS', color: 'Темно-синий', sex: 'Ж', price: 1000, id: 7580044},
        {item: 'Куртка', brand: 'Snowimage', size: 'XL', color: 'Коричневый', sex: 'М/Ж', price: 5650, id: 7997612}
    ],

    catalogBox: null,
    catalogTable: null,
    buyButtons: [],

    createTable(basket) {
        let table = document.createElement('table');
        if (!basket) table.classList.add('product-table');
        else table.classList.add('basket-table');
        table.insertAdjacentHTML('beforeend', `<tr> <th>Наименование</th> <th>Брэнд</th> <th>Размер</th> <th>Цвет</th> <th>Пол</th> <th>Стоимость</th> <th>ID</th> ${basket ? '<th>Количество</th>' : ''} </tr>`);
        return table;
    },

    createItems(arr, index, addBuy) {
        this.catalogTable.insertAdjacentHTML('beforeend', `<tr> <td>${arr[index].item}</td> <td>${arr[index].brand}</td> <td>${arr[index].size}</td> <td>${arr[index].color}</td> <td>${arr[index].sex}</td> <td>${arr[index].price}</td> <td>${arr[index].id}</td> ${addBuy ? '<th class="buy-button">Купить</th>' : ''} </tr>`);
    },

    getBuyButtons() {
        let buttons = document.querySelectorAll('.buy-button');
        for (let b of buttons) {
            this.buyButtons.push(b);
        }
    },

    eventHandler() {
        for (let i=0; i<this.buyButtons.length; i++) {
            this.buyButtons[i].addEventListener('click', () => {
                basket.purchase(i);
            });
        }
    },

    init() {
        this.catalogBox = document.querySelector('#catalog');
        this.catalogBox.appendChild(this.createTable(false));
        this.catalogTable = document.querySelector('.product-table');
        for (let i=0; i<this.goods.length; i++) {
            this.createItems(this.goods, i, true);
        }
        this.getBuyButtons();
        this.eventHandler();
    }
};

const basket = {

    goods: [],
    textField: null,
    basketBox: null,
    basketTable: null,

    purchase(id) {
        this.basketTable.insertAdjacentHTML('beforeend', `<tr> <td>${product.goods[id].item}</td>
                                                               <td>${product.goods[id].brand}</td>
                                                               <td>${product.goods[id].size}</td>
                                                               <td>${product.goods[id].color}</td>
                                                               <td>${product.goods[id].sex}</td>
                                                               <td>${product.goods[id].price}</td>
                                                               <td>${product.goods[id].id}</td>
                                                               <td>1</td> </tr>`);
        this.goods.push(product.goods[id]);
        this.textField.innerHTML = this.basketTextRefresh();
    },

    getTotalPrice() {
        let total = 0;
        for (let g of this.goods) {
            total += +g.price;
        }
        return total;
    },

    getTotalCount() {
        return this.goods.length;
    },

    basketTextOutput() {
        let span = document.createElement('span');
        span.classList.add('basket-text');
        span.textContent = this.basketTextRefresh();
        return span;
    },

    basketTextRefresh() {
        if (this.goods.length === 0) {
            return 'Корзина пуста';
        } else {
            return `В корзине ${this.getTotalCount()} ед. товара на сумму ${this.getTotalPrice()} рублей.`;
        }
    },

    init() {
        this.textField = document.querySelector('.basket-info');
        this.basketBox = document.querySelector('.basket');
        this.textField.appendChild(this.basketTextOutput());
        this.basketBox.appendChild(product.createTable(true));
        this.basketTable = document.querySelector('.basket-table');
    }
};

const slider = {

    sliderLeft: null,
    sliderRight: null,
    sliderLine: null,
    images: null,
    modal: null,
    modalImage: null,
    margin: 0,

    eventHandler() {
        document.addEventListener('click', event => {
            switch (event.target.className) {
                case 'left':
                    if (this.margin < 0) {
                        this.margin += 100;
                        this.sliderLine.style.marginLeft = this.margin + 'px';
                    }
                    break;
                case 'right':
                    if (this.margin > -((this.images.length - 8)) *100) {
                        this.margin -= 100;
                        this.sliderLine.style.marginLeft = this.margin + 'px';
                    }
                    break;
                case 'modal':
                case 'modal-image':
                    this.modal.style.display = 'none';
                    break;
            }
        });
        for (let i=0; i<this.images.length; i++) {
            this.images[i].addEventListener('click', () => {
                this.modal.style.display = 'flex';
                this.modalImage.src = 'images/item_' + (i+1) + '.jpg';
            });
        }
    },

    init() {
        this.sliderLeft = document.querySelector('button.left');
        this.sliderRight = document.querySelector('button.right');
        this.sliderLine = document.querySelector('.slider');
        this.images = document.querySelectorAll('.slider img');
        this.modal = document.querySelector('.modal');
        this.modalImage = document.querySelector('.modal-image');
        this.eventHandler();
    }
};

product.init();
basket.init();
slider.init();
