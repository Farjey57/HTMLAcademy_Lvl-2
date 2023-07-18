const applicantForm = document.querySelector('.form__set')
const approveModal = document.querySelector('.approve')
const rejectModal = document.querySelector('.reject')
const modalClose = document.querySelectorAll(".modal__button")

applicantForm.addEventListener('submit', handleFormSubmit)
modalClose.forEach(btn => {
    btn.addEventListener('click', (evt) => {
        console.log("Нажали")
        if (approveModal.classList.contains('modal--show')) {
            approveModal.classList.toggle('modal--show');
        } else {
            rejectModal.classList.toggle('modal--show');
        }
    });
});

/*Получится, что при отправке формы сработает событие submit, которое запустит наш обработчик handleFormSubmit().

В этот обработчик как аргумент event будет передано событие отправки. Мы вызовем event.preventDefault(), и форма не отправится самостоятельно.*/
function handleFormSubmit(event) {
    event.preventDefault()
    const data = serializeForm(applicantForm)
    toggleLoader()
    console.log(Array.from(data.entries()))
    setTimeout(() => {
      toggleLoader()
      onSuccess(approveModal)
    }, 1500)
}

function checkValidity(event) {
    const formNode = event.target.form
    const isValid = formNode.checkValidity()
  
    formNode.querySelector('button').disabled = !isValid
  }

/* Вызовем её вот так:
async function handleFormSubmit(event) {
  event.preventDefault()
  const data = serializeForm(event.target)

  toggleLoader()

  const { status, error } = await sendData(data)
  toggleLoader()

  if (status === 200) {
    onSuccess(event.target)
  } else {
    onError(error)
  }
}*/

//Следующий шаг — собрать всё, что необходимо отправить.Чтобы элементы без названия нам не мешались, мы отфильтруем наш набор. Воспользуемся методом filter, чтобы отбросить элементы с пустым именем. Также заменим метод forEach на map — он соберёт нам массив, который хранит объект с именем и значением каждого отфильтрованного элемента. 
//Для этого мы можем использовать особое свойство checked, которое есть у чекбоксов. Это тоже можно сделать. Прочитаем тип элемента и, если он "checkbox", то возьмём в качестве значения поле checked
//В целом, нынешний формат данных в виде массива объектов нам может и подойти, но мы с вами используем кое-что лучше — FormData ниже.

/*function serializeForm(formNode) {
    const { elements } = formNode

    const data = Array.from(elements)
        .map((element) => {
            const { id, type } = element
            const value = type === 'checkbox' ? element.checked : element.value
            return { id, value }
        })
        .filter((item) => !!item.id)
        console.log(data)
  }*/

  /*function serializeForm(formNode) {
    const { elements } = formNode
  
    const data = new FormData()
  
    Array.from(elements)
      .filter((item) => !!item.name)
      .forEach((element) => {
        const { name, type } = element
        const value = type === 'checkbox' ? element.checked : element.value
  
        data.append(name, value)
      })
  
    return data
  }*/
  //Мы воспользуемся им, чтобы сохранить данные из формы. Создадим экземпляр с помощью new FormData(), откажемся от массива со значениями и будем добавлять имена полей и их значения в FormData с помощью вызова функции append. Но так как тип FormData специально создан для работы с формами, можно сделать гораздо проще 

  function serializeForm(formNode) {
    return new FormData(formNode)
  }

  /*Чтобы проверить, какие данные в себе содержит переменная типа FormData, можно использовать метод .entries(), он выведет список с данными, как в примере выше.
console.log(Array.from(data.entries()))*/

/*async function sendData(data) {//Функция будет асинхронной, потому что работает с сетевыми запросами
    return await fetch('#', {//отправляет запрос с помощью вызова fetch.
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' }, //Нам нужно указать правильный заголовок Content-Type у запроса, для формы он 'multipart/form-data'
      body: data,
    })
  }*/
  //Функция вернёт результат запроса к серверу, который мы сможем проверить на ошибки.

  /*async function handleFormSubmit(event) {
    event.preventDefault()
  
    const data = serializeForm(event.target)
    const response = await sendData(data)
  }*/
  /*Обратите внимание, что функция handleFromSubmit() стала асинхронной, так как она вызывает другую асинхронную функцию и дожидается её результата. Внутри response будет поле status, по которому мы сможем определить, успешно ли прошёл запрос и вывести соответствующее сообщение пользователю.*/


  /*рячем мы его, потому что хотим показать только во время запроса. Для этого напишем функцию, которые будут управлять его состоянием — делать лоадер видимым, если он не виден сейчас, и скрывать, если он виден. Так как технически это добавление и удаление класса hidden, то можно воспользоваться функцией toggle из classList API: 
  Вызовем эту функцию до отправки запроса, чтобы показать лоадер, и после запроса, чтобы скрыть. Лоадер будет виден до тех пор, пока запрос не завершится:*/
  function toggleLoader() {
    const loader = document.querySelector('.form__button')
    loader.classList.toggle('form__button--load')
  }

  /*Давайте теперь проверять ответ сервера. Допустим, нам хочется, чтобы при успешной отправке мы показывали alert() с сообщением об успешной отправке и прятали форму: Мы должны вызвать onSuccess, только если форма была отправлена успешна. Для этого добавим проверку на статус ответа сервера — он должен быть 200 в случае успеха:*/

  /*function onSuccess(formNode) {
    alert('Ваша заявка отправлена!')
    formNode.classList.toggle('hidden')
  }*/
function onSuccess(modal) {
    const loader = document.querySelector('.approve')
    modal.classList.toggle('modal--show')
}

/*Блокируем кнопку отправки на невалидной форме Скопировать ссылку "Блокируем кнопку отправки на невалидной форме"
Сейчас кнопку отправки можно нажать в любой момент, даже если форма невалидна. И хоть пользователь не сможет отправить форму из-за HTML-валидации, было бы неплохо предупредить, что кнопку нажимать пока рано.

Давайте будем её блокировать до тех пор, пока не будут заполнены все поля, которые требуется заполнить.

Напишем функцию, которая будет проверять валидность формы и блокировать кнопку, если требуется. Аргументом она будет принимать событие ввода с клавиатуры на полях ввода.

Так как событие ввода будет происходить на полях, а не на самой форме, то значение event.target — это поле. Чтобы получить форму, воспользуемся свойством form, значением которого является ссылка на родительскую форму.

Проверять валидность формы будем с помощью метода checkValidity() формы. Он запускает стандартные проверки. Результат проверки будем использовать, для того чтобы установить свойство disabled кнопки в значение true, если нужно заблокировать, и false, если кнопка должна быть доступна. */

/*function checkValidity(event) {
  const formNode = event.target.form
  const isValid = formNode.checkValidity()

  formNode.querySelector('button').disabled = !isValid
}

applicantForm.addEventListener('input', checkValidity)*/