import { checkTagsStr } from "./check.tags.str";

export const validateForm = (
    data: {userName: string, email: string, homePage: string, captcha: string, text: string},
    setEnterCaptchaError: any, setEnterUserNameError: any, setEnterEmailError: any, setEnterHomePageError: any, setEnterTextError: any) => {

    let isError = false;

    const {userName, email, homePage, captcha, text} = data;

    let namePattern = /[a-zA-Z0-9^]$/;
    let regName = new RegExp(namePattern);

    let emailPattern = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/;
    let regEmail = new RegExp(emailPattern);

    let urlPattern = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    let regHomePage = new RegExp(urlPattern);

    if ((captcha.length === 0) || captcha !== 'smwm') {
        setEnterCaptchaError(true);
        isError = true;
    } else {
        setEnterCaptchaError(false);
    }

    if ((userName.length === 0) || !(regName.test(userName))) {
        setEnterUserNameError(true);
        isError = true;
    } else {
        setEnterUserNameError(false);
    }

    if ((email.length === 0) ||!(regEmail.test(email))) {
        setEnterEmailError(true);
        isError = true;
    } else {
        setEnterEmailError(false);
    }

    if ((homePage.length > 0) && !(regHomePage.test(homePage))) {
        setEnterHomePageError(true);
        isError = true;
    } else {
        setEnterHomePageError(false);
    }


    let checkText = checkTagsStr(text);

    if (!text.length || !checkText) {
        setEnterTextError(true);
        isError = true;
    } else {
        setEnterTextError(false);
    }

    return isError;
}