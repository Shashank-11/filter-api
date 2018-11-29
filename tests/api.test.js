const request= require('supertest')
let server;

describe('test filter api', () => {

  beforeEach(() => {
    server = require('../index');
  })
  
  afterEach(() => {
    server.close()
  })

  describe('POST /', () => {

    it('should return error', async () => {
      const res = await request(server)
       .post('/')
       .send({
        "skip": 0,
        "take": 10,
        "totalRecords": 75
      });
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: "Could not decode request: JSON parsing failed" });
 
     })
    
    it('should return filtered results', async () => {

      const payload = {
        "payload": [
          {
            "drm": true,
            "episodeCount": 3,
            "genre": "Reality",
            "image": {
                "showImage": "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg"
            },
            "slug": "show/16kidsandcounting",
            "title": "16 Kids and Counting",
            "tvChannel": "GEM"
          },
          {
            "drm": true,
            "episodeCount": 2,
            "genre": "Reality",
            "image": {
              "showImage": "http://mybeautifulcatchupservice.com/img/shows/TheTaste1280.jpg"
            },
            "slug": "show/thetaste",
            "title": "The Taste",
            "tvChannel": "GEM"
          }
        ]
      }

     const res = await request(server)
      .post('/')
      .send(payload);
       expect(res.status).toBe(200);
       expect(res.body).toEqual({
        "response": [
          {
            "image": "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg",
            "slug": "show/16kidsandcounting",
            "title": "16 Kids and Counting"
          },
          {
            "image": "http://mybeautifulcatchupservice.com/img/shows/TheTaste1280.jpg",
            "slug": "show/thetaste",
            "title": "The Taste"
          }
        ]
      });
    })
  })
});