import chai from 'chai';
import injectModel from '../../server/db/controllers/users';
import sinon from 'sinon';

var expect = chai.expect; 

describe('User Controllers', function() {
  const data = [{
    id: '1a',
    email: 'someEmail@somehost.com',
    firstName: 'Bob',
    lastName: 'Dobalina',
    gender: 'Male',
    city: 'Portland',
    state: 'Oregon',
    picture: 'http://i.imgur.com/j5ZqyLB.jpg',
    google: 'Ande3402VeoeRfe3203'
  }];

  const Model = {
    User: {
      findById: function(id) {
        return new Promise(function(resolve) {
          const userObj = data.find((user) => {
            return user.id === id;
          });
          resolve(userObj);
        });
      }
    }
  };

  const Instance = {
    
  };

  const controller = injectModel(Model);

  let sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create(); // eslint-disable-line
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('Gets a user from the database', function(done) {
    controller.getUserById('1a')
    .then((user) => {

      expect(user).to.be.a('object');
      expect(user.id).to.equal('1a');
      expect(user).to.have.all.keys(Object.keys(data[0]));

      done();
    });

  });
  
});