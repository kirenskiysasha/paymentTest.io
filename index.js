let language = "ru-RU"

Paymentbutton = document.querySelector('#paymentButton')


this.startFunc = function () {
    email = document.forms[0]['email'].value;
    phone = document.forms[0]['phone'].value;
    firstName = document.forms[0]['firstName'].value;
    lastName = document.forms[0]['secondName'].value;
    middleName = document.forms[0]['middleName'].value;
    comment = document.forms[0]['comment'].value;
    checkbox = document.forms[0]['checkbox'].checked;
    console.log(email, phone, firstName, lastName, middleName, comment, checkbox)
    pay(email, phone, firstName, lastName, middleName, comment, checkbox)
}

this.pay = function (email, phone, firstName, lastName, middleName, comment, checkbox) {
    var widget = new cp.CloudPayments();

    var data = {
        email : email,
        phone : phone,
        name : firstName + ' ' + middleName + ' ' + lastName,
        firstName : firstName,
        lastName : lastName,
        middleName : middleName,
        comment : comment
    }

    if (checkbox) { 
        data.CloudPayments = {
            recurrent: { interval: 'Month', period: 1 }
        }
    }

    widget.pay('charge',
        { //options
            publicId: 'pk_37c7e424d66b39e881cdb54bbfd1c', //id из личного кабинета
            description: 'Пожертвование в фонд', //назначение
            amount: 100, //сумма
            currency: 'RUB', //валюта
            accountId: email, //идентификатор плательщика (необязательно)
            invoiceId: '1234567', //номер заказа  (необязательно)
            email: email, //email плательщика (необязательно)
            skin: "mini", //дизайн виджета (необязательно)
            autoClose: 3, //время в секундах до авто-закрытия виджета (необязательный)
            data : data,
            configuration: {
                common: {
                    successRedirectUrl: "https://kirenskiysasha.github.io/paymentTest.io/?success", // адреса для перенаправления 
                    failRedirectUrl: "https://kirenskiysasha.github.io/paymentTest.io/?fail"        // при оплате по Tinkoff Pay
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