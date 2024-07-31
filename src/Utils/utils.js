function normalizeString(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}


function containsWord(srtQueries, search) {
    return normalizeString(srtQueries).includes(normalizeString(search));
}

module.exports = { normalizeString, containsWord };
