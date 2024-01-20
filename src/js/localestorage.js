export function setKeyLocalStorage(arr, key) {
    localStorage.setItem(key, JSON.stringify(arr))
}
export function removeKeyLocalStorage(key) {
    localStorage.removeItem(key)
}