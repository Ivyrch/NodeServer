const express = require('express');
const router = require('../routes/index.js');
const { normalizeString, containsWord } = require('../utils/utils.js');

const app = express();
app.use(router);
describe('Search Service Test', () => {
    
    describe('testing normalize function for string with accents', () => {
        it('testing function normalizeString on a simple string', async () => {
            const testString = "Política"
            const normalizedSearch = normalizeString(testString);
            expect(normalizedSearch).not.toBe('Política');
            expect(normalizedSearch).toBe('politica');
        });
    });
    
    describe('testing filteredHighlights funcionality with mock', () => {
        const mockResponse = {
            highlights: [
                {
                    title: 'Bloco de Carnaval',
                    queries: ['carnaval', 'blocos', 'desfile de carnaval'],
                },
                {
                    title: 'Preservação da Natureza',
                    queries: ['natureza', 'meio ambiente', 'reciclagem'],
                }
            ]
        }
        it('should return true when the search is included in any highlight title or queries', () => {
            const search = 'Natureza';
            const filteredHighlights = mockResponse.highlights.filter(item => {
                const simpleTitle = normalizeString(item.title);
                const simpleQueries = item.queries.map(normalizeString);
                return containsWord(simpleTitle, search) || simpleQueries.some(srtQueries => containsWord(srtQueries, search));
            });
            
            expect(filteredHighlights.length).toBeGreaterThan(0);
            
        });
        
        it('should return false when the search is not included in any highlight title or queries', () => {
        const search = 'Páscoa'
        const filteredHighlights = mockResponse.highlights.filter(item => {
            const simpleTitle = normalizeString(item.title);
            const simpleQueries = item.queries.map(normalizeString);
            return containsWord(simpleTitle, search) || simpleQueries.some(srtQueries => containsWord(srtQueries, search));
        });
        
        expect(filteredHighlights.length).toBe(0);
        
    });
    
});
});