/*******************
* Парсер контента для Одноклассников ok.ru, скрипт выводит все новости заменяя страницу одноклассников, показывает название, репосты, 
  комменты и ссылку на пост.
* v 1.2.2
* Create: Darkdizainer
**********************/

// Шаг 1: Спарсить все элементы с классом feed-w и записать их в массив
const feedElements = Array.from(document.querySelectorAll('.feed-w'));

// Шаг 2: Распарсить массив и обработать его элементы
const parsedData = feedElements.map(feedElement => {

    const feedInfoDate = feedElement.querySelector('.feed-info-date.feed-info-subtitle_i');
    const date = feedInfoDate ? feedInfoDate.textContent : '';

    const mediaText = feedElement.querySelector('.media-text_cnt_tx.emoji-tx.textWrap');
    const text = mediaText ? mediaText.textContent : '';

    const collageImg = feedElement.querySelector('.collage_cnt.image-hover .collage_img');
    const imageSrc = collageImg ? collageImg.getAttribute('src') : '';

    const collageImg2 = feedElement.querySelector('.collage-slider-v2_i_image');
    const imageSrc2 = collageImg2 ? collageImg2.getAttribute('src') : '';

    const likeCount = feedElement.querySelector('.feed_info_sm_a.js-reactions');
    const likes = likeCount ? likeCount.textContent.replace(/\D/g, '') : '';

    const repostCount = feedElement.querySelector('.inlineBlock');
    const reposts = repostCount ? repostCount.textContent.replace(/\D/g, '') : '';

    const mediaMore = feedElement.querySelector('.media_more a');
    const href = mediaMore ? mediaMore.getAttribute('href') : '';

    return {
        date,
        text,
        imageSrc,
        imageSrc2,
        likes,
        reposts,
        href
    };
});

// Шаг 3: Отсортировать по количеству лайков
parsedData.sort((a, b) => b.likes - a.likes);

// Шаг 4: Результат
document.write `
    <style>
        * {padding: 0; margin: 0; box-sizing: border-box;}
        body {width:90%; margin: 0 auto; display: flex; justify-content: space-around; flex-wrap: wrap;}
        .feed-item {width: 33%; box-sizing: border-box; padding: 10px; border: 1px solid #dedede;}
        .feed-item img {max-width: 100%;}
    </style>
`;

parsedData.forEach(item => {
    document.write(`<div class="feed-item">`);
    document.write(`<p>Date: ${item.date}</p>`);
    document.write(`<p>Text: ${item.text}</p>`);
    item.imageSrc ? document.write(`<img src="${item.imageSrc}" alt="Image 1">`) : '';
    item.imageSrc2 ? document.write(`<img src="${item.imageSrc2}" alt="Image 2">`) : '';
    document.write(`<p>Likes: ${item.likes}</p>`);
    document.write(`<p>Reposts: ${item.reposts}</p>`);
    document.write(`<a href="${item.href}" target="_blank">${item.href}</a>`);
    document.write(`</div>`);
});


