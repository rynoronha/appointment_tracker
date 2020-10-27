export const formatDate = (dateStr) => {
    let date = new Date(dateStr);
    return date.toLocaleDateString();
};

export const formatPhoneNumber = (phoneNumber) => {
    let splitNumber = phoneNumber.split("x");
    let extension = splitNumber.length === 2 ? " x" + splitNumber[1] : "";
    let baseNumber = splitNumber[0].trim();
    var cleaned = ('' + baseNumber).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return ['(', match[2], ') ', match[3], '-', match[4]].join('') + extension; 
    }
    return null
}

