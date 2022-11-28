// Корзина
let cartIcon = document.querySelector("#cart-icon") //Объявляем переменную которая в css является иконкой корзины
let cart = document.querySelector(".cart") //Объявляем переменную которая в css является корзиной
let closeCart = document.querySelector("#close-cart") //Объявляем переменную которая в css является крестиком для закрытия корзины
//Открыть корзину
cartIcon.onclick = () => { //При нажатии на иконку корзины...
    cart.classList.add("active") //...добавляем корзине свойство Активная
};
//Закрыть корзину
closeCart.onclick = () => { //При нажатии на крестик в корзине...
    cart.classList.remove("active") //...удаляем у корзины свойство Активная
};


// Работа корзины JS
if (document.readyState == "loading") { //Если состояние загрузки файла загружается...
    document.addEventListener("DOMContentLoaded", ready); //...Добавляем обработчик событий когда html документ полностью пропарсен и готов к использованию запускаем функцию ready
} else { // Или
    ready(); //...Просто запускаем функцию готово
}

//Функция готово
function ready() {
    //Удалить товары из корзины
    var removeCartButtons = document.getElementsByClassName("cart-remove"); //Объявляем переменную для удаления товаров из корзин - элемент css = cart-remove
    console.log(removeCartButtons) //Выводим в консоль
    for (var i = 0; i < removeCartButtons.length; i++) { // Пока количество крестиков в корзине больше i делаем:
        var button = removeCartButtons[i]; // объявляем локальную переменную кнопка и присваиваем ей значение removeCartButtons
        button.addEventListener("click", removeCartItem); //Добавляем обработчик событий чтобы при нажатии срабатывала функция removeCartItem
    }
    // Изменение количества
    var quantityInputs = document.getElementsByClassName("cart-quantity") //Объявляем переменную для количества - элемент css = cart-quantity
    for (var i = 0; i < quantityInputs.length; i++) { // Пока количество товаров больше i делаем:
        var input = quantityInputs[i]; //Добавляем локальную переменную input и присваиваем ей значение i элемента quantityInputs
        input.addEventListener("change", quantityChanged); //Добавляем обработчик событий чтобы при смене значений вызвалась функция quantityChanged
    }
    // Добавление товара в корзину
    var addCart = document.getElementsByClassName("add-cart") //Объявляем переменную для добавления товара в корзину - элемент css = add-cart
    for (var i = 0; i < addCart.length; i++) { //Пока количество элементов addCart больше i делаем
        var button = addCart[i] // Добавляем локальную переменную button и присваиваем ей значение i элемента addCart
        button.addEventListener("click", addCartClicked) //Добавляем обработчик событий чтобы при нажатии срабатывала функция addCartClicked
        alert()
    }
    // Кнопка купить
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);// Из документа извлекаем элемент с ClassName btn-buy и добавляем ему обработчик событий чтобы при нажатии срабатывала функция ByuButtonClicked
}
// Кнопка купить
function buyButtonClicked() {
    alert('Заказ принят') //Вывод alert с текстом Заказ принят
    var cartContent = document.getElementsByClassName("cart-content")[0] // Добавляем локальную переменную cartContent и присваиваем ему значение первого элемента с ClassName cart-content
    while (cartContent.hasChildNodes()) { //Пока cartContent имеет наследуемые узлы
        cartContent.removeChild(cartContent.firstChild); //удаляем в cartContent наследуемые узлы
    }
    updatetotal(); //Вызывем фунцию для обновления итоговой суммы
}

//Удалить товары из корзины
function removeCartItem(event) { //Добавляем класс событие к функции
    var buttonClicked = event.target; //Локлаьная перемаенная buttonClicked = элемент на котором сработало событие
    buttonClicked.parentElement.remove(); //Элемент на котором сработало событие удален
    updatetotal(); //Вызывем фунцию для обновления итоговой суммы
}
//Изменение количества
function quantityChanged(event) { //Добавляем класс событие к функции
    var input = event.target //Локальная переменная input = элемент на котором сработало событие
    if (isNaN(input.value) || input.value <= 0) { //если значение input недоступно или меньше либо равно нулю то
        input.value = 1 // Присваиваем input значение 1
    }
    updatetotal(); //Вызывем фунцию для обновления итоговой суммы
}
//Добавить в корзину
function addCartClicked(event) { //Добавляем класс событие к функции
    var button = event.target; //Локальная переменная button = элемент на котором сработало событие
    var shopProducts = button.parentElement; //Локальная переменная shopProducts = родительский элемент переменной button
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText; //Локальная переменная title = первый элемент с именем класса product-title, считываем его текст
    var price = shopProducts.getElementsByClassName("price")[0].innerText; //Локальная переменная price = первый элемент с именем класса price, считываем его текст
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src; //Локальная переменная productImg = первый элемент с именем класса product-img, из источника
    addProductToCart(title, price, productImg); //Вызываем функцию для добавление товаров в корзину и передаем в неё title price productImg
    updatetotal(); //Вызывем фунцию для обновления итоговой суммы
}

function addProductToCart(title, price, productImg) { //Функция для добавления товара в корзину принимаемые элементы title price productImg
    var cartShopBox = document.createElement("div"); //Локальная переменная cartShopBox = в документе создается элемент класса div
    cartShopBox.classList.add("cart-box"); //в локальной переменной cartShopBox добавляем classList cart-box
    var cartItems = document.getElementsByClassName("cart-content")[0]; //Локальная переменная cartItems = получаем первое значение из документа с ClassName cart-content
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title"); //Локальная переменная cartItemsNames = получаем элемент с ClassName cart-product-title
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already add this item to cart");
            return;
        }
    }
    var cartBoxContent = `
                            <img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!-- Удалить -->
                            <i class='bx bxs-trash cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}
//Обновление общей цены
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""))
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    //Если цена содержит копейки/центы
    total = Math.round(total * 100) / 100;


    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
