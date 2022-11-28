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
    for (var i = 0; i < removeCartButtons.length; i++) { // Пока количество крестиков в корзине больше 0 делаем:
        var button = removeCartButtons[i]; // объявляем переменную кнопка и присваиваем ей значение removeCartButtons
        button.addEventListener("click", removeCartItem); //Добавляем обработчик событий чтобы при нажатии срабатывала функция removeCartItem
    }
    // Изменение количества
    var quantityInputs = document.getElementsByClassName("cart-quantity") //Объявляем переменную для количества - элемент css = cart-quantity
    for (var i = 0; i < quantityInputs.length; i++) { // Пока количество товаров больше 0 делаем:
        var input = quantityInputs[i]; //Добавляем переменную input и присваиваем i элемент quantityInputs
        input.addEventListener("change", quantityChanged); //Добавляем обработчик событий чтобы при смене значений вызвалась функция quantityChanged
    }
    // Добавление товара в корзину
    var addCart = document.getElementsByClassName("add-cart")
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener("click", addCartClicked)
    }
    // Кнопка купить
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}
// Кнопка купить
function buyButtonClicked() {
    alert('Заказ принят')
    var cartContent = document.getElementsByClassName("cart-content")[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

//Удалить товары из корзины
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
//Изменение количества
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatetotal();
}
//Добавить в корзину
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
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
