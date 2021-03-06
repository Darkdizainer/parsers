/*******************
* Парсер контента для Одноклассников ok.ru, скрипт выводит все новости заменяя страницу одноклассников, показывает название, репосты, 
  комменты и ссылку на пост.
* v 1.2.1
* Create: Darkdizainer
**********************/

let setup = {
    posts: document.querySelectorAll('.feed-w'), // Сбор всех постов по классу .feed-w
    arrPost: [] // Пустой массив для сортировки
}
console.log (`Итого постов: ${setup.posts.length}`)

// Разбираем новости на элементы (заголовок, лайки, репосты и так далее)
for (i = 0; i < setup.posts.length; i++){
    let a = setup.posts[i].querySelectorAll('.js-count');
    let baseURL = setup.posts[i].querySelectorAll('a');
    let textBlock = setup.posts[i].querySelector('.media-status_cnt'); //.media-text_cnt
    
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
    setup.arrPost.push({id: i, text: textBlock.textContent, komm: a[0].textContent, repost: a[1].textContent, like: a[2].textContent.replace(/\s+/g, ''), link: baseURL[3]},);
    //console.log (baseURL[3].href)
};

//Сортируем массив по параметру выбранному в настройках
setup.arrPost.sort(function(a, b){
    return b.like-a.like
    //return b.repost-a.repost
    //return b.komm-a.komm
});

//Вывод на экран результатов
document.write (`<div style="width: 100%; margin: 0 0 25px 0; text-align: center;">ВСЕГО ПОСТОВ ${setup.arrPost.length}</div>`);
for (ii=0;ii<setup.arrPost.length;ii++){
    document.write (`
        <div class='contentWrapper' id='n${setup.arrPost[ii].id}'>
            <div class="headerWrap">
                <p class="checkboxCon"><span class="checkboxConText">Новость опубликована</span><input type="checkbox" class="checkbox" title="Новость ОПУБЛИКОВАНА!!!" onclick="clickToggle(n${setup.arrPost[ii].id})"></p>
                <p class="removeCon"><span class="remove" onclick="clickRemove(n${setup.arrPost[ii].id})">x</span></p>
            </div>
        <h2 class="title">${setup.arrPost[ii].text}</h2>
            <ul>
                <li title='Комментариев:'>${setup.arrPost[ii].komm}<br><span class='smallTxt'>Коммент</span></li>
                <li title='Репосты:'>${setup.arrPost[ii].repost}<br><span class='smallTxt'>Репост</span></li>
                <li title='Лайков:'>${setup.arrPost[ii].like}<br><span class='smallTxt'>Лайков</span></li>
            </ul>
            <a target='_blank' href='${setup.arrPost[ii].link.href}'>ссылка</a>
        </div>
    `)
};

//переключение цветa у опубликованных новостей + удаление чекбокса
function clickToggle (a){
    a.classList.toggle('postedNews')
};
// Удаление элемента
function clickRemove (a){
    a.remove()
};

document.write (`
<style>
    * {padding: 0; margin: 0; box-sizing: border-box;}
    body {min-width: 610px; max-width: 1000px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-around;}
    .headerWrap {width: 100%; display: flex; flex-wrap: nowrap; justify-content: space-between; position: absolute; left: 0; top: 4px;}
    .checkboxCon {padding: 0 0 0 25px; display: flex; flex-wrap: nowrap; justify-content: center;}
    .checkboxConText {font-size: 80%;}
    .checkbox {width: 20px;}
    .removeCon {cursor: pointer;}
    .remove {padding: 5px 10px; background: red;}
    .contentWrapper {width: 300px; margin: 0 0 15px 0; border: 1px solid #a0a0a0; padding: 30px 10px 10px 10px; position: relative;}
    .contentWrapper h2 {font-size: 0.9em; font-weight: 100; margin: 0 0 10px 0;}
    .contentWrapper ul {width: 100%; display: flex; justify-content: space-around;}
    .contentWrapper ul li {list-style-type: none; width: fit-content; text-align: center;}
    .smallTxt {font-size: 0.5em;}
    .contentWrapper a {display: block; margin: 15px 0 0 0; padding: 10px 0; text-align: center; background: #eee;}
    .contentWrapper a:visited {background: purple;}
    .postedNews {background: red; color: white;}
</style>
`);
