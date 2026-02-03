import path from "path-browserify";

export interface ArticleData {
    title: string;
    url: string;
    author: string;
}
export type AuthorUrl = Record<string, string | null>;

const articleModules = import.meta.glob("../../content/articles/**/*.md");
export const articles: ArticleData[] = [];
for (const [filename, _module] of Object.entries(articleModules)) {
    const title = path.basename(filename, ".md");
    const author = path.basename(path.dirname(filename));
    articles.push({
        title: title,
        author: author,
        url: `/articles/${author}/${title}.html`
    });
}
export const authorUrls: AuthorUrl = articles.map(article => (
    article.title === "readme"
        ? { [article.author]: `/articles/${article.author}/readme.html` }
        : {}
)).reduce((acc, cur) => ({ ...acc, ...cur }), {} as AuthorUrl) || {};
export default articles;