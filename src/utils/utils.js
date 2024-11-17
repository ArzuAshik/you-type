export function removePunction(sentence = ""){
    const list = [".", ",", "?", "!"]
    const arr = sentence.split("")
    return arr.filter(a => {
        return !list.includes(a);
    })
}