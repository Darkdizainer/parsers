/*******************
* Парсер контента для Одноклассников ok.ru, скрипт выводит все новости заменяя страницу одноклассников, показывает название, репосты, комменты и ссылку на пост.
* v 1.0 (01.21)
*
*
**********************/

let posts = document.querySelectorAll('.feed-w');
console.log (`Итого постов: ${posts.length}`)

for (i = 0; i <= posts.length; i++){
    let a = posts[i].querySelectorAll('.js-count');
    let baseURL = posts[i].querySelectorAll('a');
    let textBlock = posts[i].querySelector('.media-text_cnt');

    // Отсекаем Null
    if (textBlock == null) {
        textBlock = 'НЕТУ ТЕКСТА, скорее всего видосик';
    }

    // Условия вывода постов
    if (a[1].textContent >= 30){
        document.write (`/*****************************************  ${i + 1}  ******************************************/<br><br>
        Заголовок: ${textBlock.textContent}<br>
        Коментов:   ${a[0].textContent}<br>
        Репостов:  ${a[1].textContent}<br>
        Лайков:  ${a[2].textContent}<br>
        Ссылка:  <a href='${baseURL[2]}' target="_blank"> ${baseURL[2]} </a><br>
        <br>
        `);
    }

};
