/***********************
*	PARSER billboard.com
*	Парсит и выводит списком подборобные топы песен
*	v 1.1 | 12.2021
*
*
************************/
const arrBlocks = document.querySelectorAll('.c-gallery-vertical__slide-wrapper');

// Пересобираем массив с конца в начало (Если нужен вывод с конца)
let sortArr = [];
arrBlocks.forEach(it => {
	sortArr.unshift(it);
});

sortArr.forEach((item, i) => {
	//console.log(item)

	// header
	document.write(item.querySelector('.c-gallery-vertical-featured-image__header span').textContent + '	');
	document.write(item.querySelector('.c-gallery-vertical-featured-image__header h2').textContent + '<br>');

	// image URL
	if (item.querySelector('figure').querySelector('img') != null) {
		document.write(item.querySelector('figure img').src)
		document.write('<br><br>')
	}

	// TEXT
	//document.write(item.querySelector('.c-gallery-vertical-featured-image__description').textContent  + '<br><br><br>');
});
