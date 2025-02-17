
import { getSingletonHighlighter } from 'shiki'

export function useShiki() {

    async function highlightCode(code, options = {}) {

        const highlighter = await getSingletonHighlighter({
            themes: ['github-dark'],
            langs: ['json'],
        })


        return highlighter.codeToHtml(code, {
            lang: 'json',
            theme: 'github-dark',
        })
    }

    return {
        highlightCode
    };
}