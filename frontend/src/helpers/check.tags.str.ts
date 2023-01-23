export const checkTagsStr = function(text: string) {

    if (
        (text.indexOf('<i>') > -1 && text.indexOf('</i>') === -1)
        ||
        (text.indexOf('<i>') === -1 && text.indexOf('</i>') > -1)
    )
        return false;
    if (
        (text.indexOf('<strong>') > -1 && text.indexOf('</strong>') === -1)
        ||
        (text.indexOf('<strong>') === -1 && text.indexOf('</strong>') > -1)
    )
        return false;
    if (
        (text.indexOf('<code>') > -1 && text.indexOf('</code>') === -1)
        ||
        (text.indexOf('<code>') === -1 && text.indexOf('</code>') > -1)
    )
        return false;
    if (
        (text.indexOf('<a') > -1 && text.indexOf('</a>') === -1)
        ||
        (text.indexOf('<a') === -1 && text.indexOf('</a>') > -1)
    )
        return false;

    return true;
};