/*******************
* Парсер контента для Одноклассников ok.ru, скрипт выводит все новости заменяя страницу одноклассников, показывает название, репосты, комменты и ссылку на пост.
* v 1.1 (01.21)
*
*
**********************/

llet posts = document.querySelectorAll('.feed-w');
let arrPost = [];
console.log (`Итого постов: ${posts.length}`)

// Разбираем новости на элементы (заголовок, лайки, репосты и так далее)
for (i = 0; i < posts.length; i++){
    let a = posts[i].querySelectorAll('.js-count');
    let baseURL = posts[i].querySelectorAll('a');
    let textBlock = posts[i].querySelector('.media-text_cnt');
    // Загоняем в массив объекты с данными
    arrPost.push({text: textBlock.textContent, komm: a[0].textContent, repost: a[1].textContent, like: a[2].textContent, link: baseURL[2]},);
};

//Сортируем массив от большего к меньшему по репостам (repost) или лайкам (like) или комментам (komm) нужно раскоментировать
arrPost.sort(function(a, b){
    //return b.repost-a.repost
    return b.like-a.like
    //return b.komm-a.komm
});

//Вывод на экран результатов
for (ii=0;ii<arrPost.length;ii++){
    document.write (`/*****************************************  ${ii + 1}  ******************************************/<br><br>
    Заголовок: ${arrPost[ii].text}<br>
    Коментов:   ${arrPost[ii].komm}<br>
    Репостов:  ${arrPost[ii].repost}<br>
    Лайков:  ${arrPost[ii].like}<br>
    Ссылка:  <a href='${arrPost[ii].link.href}' target="_blank"> ${arrPost[ii].link} </a><br>
    <br>`)
};
