export interface IFormData {
    userName: string;
    email: string;
    homePage: string;
    captcha: string;
    text: string;
    [propName: string]: string;
}