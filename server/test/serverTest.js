const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const pool = require('../db');

const { expect } = chai;
chai.use(chaiHttp);

describe('Story', async() => {
  await describe('/GET story with story id 1', () => {
    it('it should get story with an ID of 1', (done) => {
      chai.request(server)
        .get('/story/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('story_id');
          done();
        });
    });
  });

  await describe('/POST story', () => {
    let story = {
      user_id: 1,
      story_title: "Test of Ages",
      summary: "Gwendolyn, an young mage, must undergo multiple trials to become the next time guardian."
    };

    it('it should create a new story and insert into the database', (done) => {
      chai.request(server)
        .post('/story/create')
        .send(story)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('story_id');
          expect(res.body).to.have.property('user_id');
          expect(res.body).to.have.property('creation_date');
          expect(res.body).to.have.property('summary');
          expect(res.body).to.have.property('story_title');
          done();
        });
    });

    // after(function(done) {
    //   pool.query(`DELETE FROM story where story_title = $1;`, ['Test of Ages']);
    //   done();
    // });
  });

  /*
  await describe('/DELETE story', () => {
    var story_id;

    before(function(done) {
      // Get the story id of the story from the previous test case
      let result = pool.query('SELECT story_id FROM story WHERE story_title = $1;', ['Test of Ages']);
      story_id = result.rows[0].story_id;
    });

    it('it should delete the recently made story from the database and return success message', (done) => {
      chai.request(server)
        .delete(`/story/${story_id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Deleted story');
          done();
        });
    });
  });*/
});

describe('Stories', async() => {
  await describe('/GET all stories', () => {
    it('it should return an array in response body', (done) => {
      chai.request(server)
        .get('/stories')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('allStories');
          done();
        });
    });
  });

  after(async function(done) {
    pool.end();
    done();
  });
});

