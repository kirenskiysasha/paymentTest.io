let language = "ru-RU"

Paymentbutton = document.querySelector('#paymentButton')


this.startFunc = function () {
    email = document.forms[0]['email'].value;
    phone = document.forms[0]['phone'].value;
    firstName = document.forms[0]['firstName'].value;
    lastName = document.forms[0]['secondName'].value;
    middleName = document.forms[0]['middleName'].value;
    comment = document.forms[0]['comment'].value;
    checkbox = document.forms[0]['checkbox'].value;
    console.log(email, phone, firstName, lastName, middleName, comment, checkbox)
    pay(email, phone, firstName, lastName, middleName, comment, checkbox)
}

this.pay = function (email, phone, firstName, lastName, middleName, comment, checkbox) {
    var widget = new cp.CloudPayments();
       widget.pay('auth', // или 'charge'
           { //options
               publicId: 'pk_37c7e424d66b39e881cdb54bbfd1c', //id из личного кабинета
               description: 'Оплата товаров', //назначение
               amount: 100, //сумма
               currency: 'RUB', //валюта
               accountId: email, //идентификатор плательщика (необязательно)
               invoiceId: '1234567', //номер заказа  (необязательно)
               email: email, //email плательщика (необязательно)
               skin: "mini", //дизайн виджета (необязательно)
               autoClose: 3, //время в секундах до авто-закрытия виджета (необязательный)
               data: {
                   myProp: 'myProp value'
               },
               configuration: {
                   common: {
                       successRedirectUrl: "https://{ваш сайт}/success", // адреса для перенаправления 
                       failRedirectUrl: "https://{ваш сайт}/fail"        // при оплате по Tinkoff Pay
                   }
               },
               payer: { 
                   firstName: firstName,
                   lastName: lastName,
                   middleName: middleName,
                   birth: '1955-02-24',
                   address: 'тестовый проезд дом тест',
                   street: 'Lenina',
                   city: 'MO',
                   country: 'RU',
                   phone: '123',
                   postcode: '345'
               }
           },
           {
               onSuccess: function (options) { // success
                   //действие при успешной оплате
               },
               onFail: function (reason, options) { // fail
                   //действие при неуспешной оплате
               },
               onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                   //например вызов вашей аналитики
               }
           }
       )
   };

Paymentbutton.onclick = startFunc