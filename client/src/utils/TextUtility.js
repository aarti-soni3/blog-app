export const trimSentence = (text, count = 30, isDotAllowed = true) => {
    if (typeof text !== 'string')
        return
    if (isDotAllowed && text.length > count)
        return text.slice(0, count).trim() + '...';
    else
        return text.slice(0, count).trim();
}