
async function getArticles() {
    try {
        const response = await fetch(`/api/articles`);
        const articles = await response.json();

        const html = articles.map(json => `
            <a href="/article.html?slug=${json.slug}">
            <img src="${json.author.avatar}" />
            <p>${json.author.name} — ${formatDate(json.publishedAt)}</p>
            <h2>${json.title}</h2>
            <p>~ ${json.readingTime}м</p>
            ${json.cover?.url ? `<img src="${json.cover.url}" />` : ''}
            </a>
            `).join('');
        document.getElementById('main').innerHTML = html;

    } catch (error) {
        console.error('Failed to load JSON:', error);
    }
}

function renderBlock(block) {
    switch (block.type) {
        case 'heading':
            return `<h${block.level}>${block.text}</h${block.level}>`;

        case 'paragraph':
            return `<p>${block.text}</p>`;

        case 'image':
            return `<img src="${block.path}" alt="${block.alt || ''}">`;

        default:
            return '';
    }
}

function formatDate(time) {
    if (!time) return '';
    const date = new Date(time);
    return isNaN(date) ? '' : date.toLocaleDateString('ru-RU');
}
























getArticles();