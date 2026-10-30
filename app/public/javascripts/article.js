async function renderArticle() {
    const slug = new URLSearchParams(location.search).get('slug');

    try {
        const response = await fetch(`/api/article/${slug}`);
        const article = await response.json();
        const date = formatDate(article.publishedAt);

        const html = `
        <img src="${article.author.avatar}" />
        <p>${article.author.name}</p>
        <p>${date}</p>
        <h1>${article.title}</h1>
        <p>~ ${article.readingTime}м</p>
        <img src="${article.cover.url}" />
        ${article.blocks.map(renderBlock).join('')}
        `;

        document.getElementById('article').innerHTML = html;
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

renderArticle();