const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../../server/server')
var should = require('chai').should()

chai.use(chaiHttp)

let testTokken = null

// Testing APi User
describe('/Users', () => {
  it('Create New User', (done) => {
    let newUser = {
      data: {
        username: 'test15',
        email: 'test15',
        password: 'test15'}

    }
    chai.request(server)
      .post('/api/user/signup')
      .send(newUser)
      .end((err, res) => {
        if (err) { console.log(err) }
        res.should.have.status(200)
        done()
      })
  })
  // test login
  it('User Login', (done) => {
    let user = {
      username: 'test15',
      password: 'test15'
    }

    chai.request(server)
      .post('/api/user/login')
      .send(user)
      .end((err, res) => {
        if (err) { console.log(err) }
        testTokken = res.body.token
        res.should.have.status(200)
        res.body.should.have.property('token')
        done()
      })
  })
})

// Testing APi Plan
describe('/Plans', () => {
  it('Create New Plan without token', (done) => {
    let newpack = {
      name: 'test',
      date: 'test'
    }

    chai.request(server)
      .post('/api/planner/plan')
      .send(newpack)
      .end((err, res) => {
        if (err) { console.log(err) }
        res.should.have.status(401)
        done()
      })
  })
})
