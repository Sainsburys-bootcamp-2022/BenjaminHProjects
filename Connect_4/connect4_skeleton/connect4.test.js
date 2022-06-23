const {getNewBoard} = require('./helper')

describe('when getNewBoard is called', () => {
    it('returns array of length 6', () => {
        const actual = getNewBoard()

        expect(actual).toHaveLength(6)
    })
})
