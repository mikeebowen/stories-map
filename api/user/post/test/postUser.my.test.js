'use strict';

const expect = require('chai').expect;

const postUser = require('../postUser');

describe('postUser.js', () => {
  it('should be a function', (done) => {
    expect(postUser).to.be.a('function');
    done();
  });
});
