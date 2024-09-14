document.addEventListener('DOMContentLoaded', function() {
    // Функция для загрузки YAML файла
    fetch('../assets/ymls/top_games.yaml')
    .then(response => response.text())
    .then(yamlText => {
        // Парсинг YAML данных
        const data = jsyaml.load(yamlText);

        // Генерация HTML на основе данных
        generateHTML(data);
    })
    .catch(error => console.error(error));
});

function generateHTML(data) {
    const accordionContainer = document.getElementById('game-list');

    data.games.forEach((game, index) => {
        // Создание элемента аккордеона
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        // Заголовок аккордеона
        const h2 = document.createElement('h2');
        h2.classList.add('accordion-header');

        const button = document.createElement('button');
        button.classList.add('accordion-button');
        button.type = 'button';
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', `#collapse${index}`);
        button.setAttribute('aria-controls', `collapse${index}`);
        button.textContent = `#${index + 1} - ${game.title}`;

        h2.appendChild(button);
        accordionItem.appendChild(h2);

        // Содержимое аккордеона
        const collapseDiv = document.createElement('div');
        collapseDiv.id = `collapse${index}`;
        collapseDiv.classList.add('accordion-collapse', 'collapse');
        collapseDiv.setAttribute('data-bs-parent', '#accordionExample');

        const bodyDiv = document.createElement('div');
        bodyDiv.classList.add('accordion-body');

        // Добавление описания с поддержкой HTML-тегов
        const descriptionP = document.createElement('p');
        descriptionP.innerHTML = game.description;
        bodyDiv.appendChild(descriptionP);

        // Создание таблицы
        const table = document.createElement('table');
        table.classList.add('table');

        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');

        const th1 = document.createElement('th');
        th1.scope = 'col';
        th1.textContent = 'Оценка за';

        const th2 = document.createElement('th');
        th2.scope = 'col';
        th2.textContent = 'Оценка';

        const th3 = document.createElement('th');
        th3.scope = 'col';
        th3.textContent = 'Комментарий';

        trHead.appendChild(th1);
        trHead.appendChild(th2);
        trHead.appendChild(th3);
        thead.appendChild(trHead);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        // Итерация по оценкам
        for (const [category, details] of Object.entries(game.scores)) {
            const tr = document.createElement('tr');

            const th = document.createElement('th');
            th.scope = 'row';
            // Перевод названий категорий
            let categoryName = '';
            switch (category) {
                case 'story':
                    categoryName = 'Сюжет';
                    break;
                case 'graphics':
                    categoryName = 'Графика';
                    break;
                case 'gameplay':
                    categoryName = 'Геймплей';
                    break;
                case 'overall':
                    categoryName = 'Итоговая оценка';
                    break;
                default:
                    categoryName = category;
            }
            th.textContent = categoryName;

            const tdScore = document.createElement('td');
            // Используем innerHTML для отображения HTML-тегов
            tdScore.innerHTML = details.score;

            const tdComment = document.createElement('td');
            // Также используем innerHTML для комментариев
            tdComment.innerHTML = details.comment;

            tr.appendChild(th);
            tr.appendChild(tdScore);
            tr.appendChild(tdComment);

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);

        bodyDiv.appendChild(table);
        collapseDiv.appendChild(bodyDiv);
        accordionItem.appendChild(collapseDiv);

        accordionContainer.appendChild(accordionItem);
    });
}
