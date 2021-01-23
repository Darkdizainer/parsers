/*******************
* Парсер контента для Одноклассников ok.ru, скрипт выводит все новости заменяя страницу одноклассников, показывает название, репосты, комменты и ссылку на пост.
* v 1.2
* Create: Darkdizainer
**********************/

let setup = {
    sortType: 'like', // Тип сортировки like - по лайкам; comm - по комментам; repost - по репостам
    sort: 1, // Порядок сортировки 1 - от большего к меньшему; 2 - от меньшего к большему
    posts: document.querySelectorAll('.feed-w'), // Сбор всех постов по классу .feed-w
    arrPost: [] // Пустой массив для сортировки
}
console.log (`Итого постов: ${setup.posts.length}`)


// Разбираем новости на элементы (заголовок, лайки, репосты и так далее)
for (i = 0; i < setup.posts.length; i++){
    console.log (`Step: ${i}`)
    let a = setup.posts[i].querySelectorAll('.js-count');
    let baseURL = setup.posts[i].querySelectorAll('a');
    let textBlock = setup.posts[i].querySelector('.media-text_cnt');
    
    // ФИЛЬТРЫ
    // Убираем ненужное
    if (textBlock === null || textBlock.textContent == ' ' || a[0].textContent == 0 || a[1].textContent == 0 || a[2].textContent == 0){
        continue
    };
    // Фильтруем по заголовку, просмотрам, комментам, репостам
    if (textBlock.textContent.length <= 50) {
        continue
    };

    // Загоняем в массив объекты с данными
    setup.arrPost.push({text: textBlock.textContent, komm: a[0].textContent, repost: a[1].textContent, like: a[2].textContent, link: baseURL[2]},);
};

// Определяем тип и порядок сортировки
if (setup.sort == 1) {
    setup.sort = `b.${setup.sortType}-a.${setup.sortType}`;
} else {
    setup.sort = `a.${setup.sortType}-b.${setup.sortType}`;
};

//Сортируем массив по параметру выбранному в настройках
setup.arrPost.sort(function(a, b){
    return setup.sort
});

//Вывод на экран результатов
document.write (`ВСЕГО ПОСТОВ ${setup.arrPost.length}`);
for (ii=0;ii<setup.arrPost.length;ii++){
    document.write (`
        <div class='contentWrapper'>
            <h2>${setup.arrPost[ii].text}</h2>
            <ul>
                <li title='Комментариев:'>${setup.arrPost[ii].komm}<br><span class='smallTxt'>Коммент</span></li>
                <li title='Репосты:'>${setup.arrPost[ii].repost}<br><span class='smallTxt'>Репост</span></li>
                <li title='Лайков:'>${setup.arrPost[ii].like}<br><span class='smallTxt'>Лайков</span></li>
            </ul>
            <a target='_blank' href='${setup.arrPost[ii].link.href}'>ссылка</a>
        </div>
    `)
};



document.write (`
<style>
    * {padding: 0; margin: 0;}
    body {display: flex; flex-wrap: wrap; justify-content: space-around;}
    .contentWrapper {width: 300px; /*box-sizing: border-box;*/ margin: 0 0 15px 0; border: 1px solid #a0a0a0; padding: 10px;}
    .contentWrapper h2 {font-size: 0.9em; font-weight: 100; margin: 0 0 10px 0;}
    .contentWrapper ul {width: 100%; display: flex; justify-content: space-around;}
    .contentWrapper ul li {list-style-type: none; width: fit-content; text-align: center;}
    .smallTxt {font-size: 0.5em;}
    .contentWrapper a {display: block; margin: 15px 0 0 0; padding: 10px 0; text-align: center; background: #eee;}
</style>
`);








/********  v 1.1  ***********/
let posts = document.querySelectorAll('.feed-w');
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
