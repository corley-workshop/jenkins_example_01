const request = require('supertest')
const assert = require('assert')
const app = require('../index')

describe('GET /', function() {
    it('responds with Hello World', function(done) {
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
            if (err) {
                throw err
            }

            assert.equal(res.text, 'Hello World!!!')
            done()
        })
    })
})