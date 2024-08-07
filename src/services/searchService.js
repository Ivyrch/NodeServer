const response = require('../data/response');
const { normalizeString, containsWord } = require('../utils/utils');

const filterResults = (search) => {
    const filteredHighlights = response.highlights.filter(item => {
        const simpleTitle = normalizeString(item.title);
        const simpleQueries = item.queries.map(normalizeString);
        return containsWord(simpleTitle, search) || simpleQueries.some(srtQueries => containsWord(srtQueries, search));
    });
    
    const filteredSuggestions = response.suggestions.filter(item =>
        item.includes(search)
    );

    return { filteredHighlights, filteredSuggestions };
};


module.exports = {
    filterResults
};