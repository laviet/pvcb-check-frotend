export default interface TokenResponse {
    full_name: string
    access_token: string
    refresh_token: string
}
export interface DecodedToken {
    name: string
    preferred_username: string
    email: string
}