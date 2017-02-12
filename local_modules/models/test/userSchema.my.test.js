'use strict';

const expect = require('chai').expect;
const Mongoose = require('mongoose').Mongoose;
const mongoose = new Mongoose();
const mockgoose = require('mockgoose');

const User = require('../user/User');

describe('User Schema', () => {

  before((done) => {
    mockgoose(mongoose)
    .then(() => {
      mongoose.connect('mongodb://localhost/TestingDB', (err) => {
        done(err);
      });

    });
  });

  it('should require a userName', (done) => {
    let testUser = new User();
    testUser.save((err) => {
      expect(err.name).to.equal('ValidationError');
      done();
    });
  });

  it('should salt a password', (done) => {
    let testUser = new User({userName: 'frodo'});
    testUser.save();
    testUser.basic.password = 'tacocat';

    expect(testUser.userName).to.equal('frodo');
    testUser.checkPassword('tacocat', (err, passwordIsValid) => {
      if (err) done(err);
      expect(passwordIsValid).to.equal(true);
      done();
    });
  });

  after((done) => {
    mockgoose.reset();
    mongoose.unmock((err) => {
      if (err) done(err);
      done();
    });
  });
});
