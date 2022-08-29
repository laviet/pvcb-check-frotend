export default function getFunctionToken() {
    const user = JSON.parse(localStorage.getItem('userInfo')!);
    if (user && user.access_token) {
        return { Authorization: 'Bearer ' + user.access_token };
    } else {
        return {};
    }
}