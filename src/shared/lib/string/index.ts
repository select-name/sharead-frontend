export function capitalize(term: string) {
    return term.charAt(0).toUpperCase() + term.slice(1);
}

export function textOverflow(term: string, limit: number = 100) {
    if (term.length <= limit) return term;
    return `${term.slice(0, limit)}...`;
}
