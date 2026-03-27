export const trimSentence = (text, count = 30) => {
    console.log(text.toString())
    if (typeof text !== 'string')
        return

    return text.slice(0, count).trim()+'...';
}