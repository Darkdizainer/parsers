/***********************
*     PARSER billboard.com
*     Парсит и выводит списком подборочные топы песен
*     v 1.0 | 12.2021
*
*
************************/

const arrNow = document.querySelectorAll('.c-gallery-vertical-featured-image__header');
console.log (arrNow)

// Пересобираем массив с конца в начало (Если нужен вывод с конца)
let sortArr = [];
arrNow.forEach(it => {
	sortArr.unshift(it);
})
console.log (sortArr[0].querySelector('span').textContent) // Проверка номера первого элемента

// Если нужен вывод топа по убыванию выводим массив arrNow, если по возрастанию то выводим sortArr
// ВЫВОД МАССИВА
arrNow.forEach((item, i) => {
	document.write(item.querySelector('span').textContent + "	")
	document.write(item.querySelector('h2').textContent + '<br><br>')
});
