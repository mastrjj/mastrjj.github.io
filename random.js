function getRandomString(length) {
    var randomChars = 'BCDFGHJKLMNPQRSTVWXZ';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

export { getRandomString };
