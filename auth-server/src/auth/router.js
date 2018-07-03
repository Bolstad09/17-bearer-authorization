'use strict';

import express from 'express';
const authRouter = express.Router();

import User from './model.js';
import auth from './middleware.js';

import modelFinder from '../middleware/model.js';
authRouter.param('model', modelFinder);

authRouter.post('/signup', (req, res, next) => {
  if(!Object.keys(req.body).length) {
    console.log('no body');
    next(400);
  }
  let user = new User(req.body);
  user.save()
    .then(user => res.send(user.generateToken()))
    .catch(next);
});

authRouter.get('/signin', auth, (req, res, next) => {
  res.cookie('Token', req.token);
  res.send(req.token);
});

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

authRouter.get('/', (req, res) => {
  res.write('Hello');
  res.end();
});

authRouter.get('/api/v1/:model', auth, (req, res, next) => {
  if(req.id) {
    req.model.find({})
      .then(data => sendJSON(res, data))
      .catch(next);
  }
  else {
    next(401);
  }
});

authRouter.get('/api/v1/:model/:id', auth, (req, res, next) => {
  if(req.id) {
    if(req.params.id) {
      req.model.findById(req.params.id)
        .then(data => {
          if(data === null) {
            next(404);
          }
          if(JSON.stringify(req.id) === JSON.stringify(data.userID)) {
            console.log(data);
            sendJSON(res, data);
          }
          else {
            next(401);
          }
        })
        .catch(() => {
          next();
        });
    }
    else {
      next(404);
    }
  }
});

authRouter.post('/api/v1/:model', auth, (req, res, next) => {
  if(!Object.keys(req.body).length) {
    next(400);
  }
  if(req.id) {
    let record = new req.model(req.body);
    record.userID = req.id;
    record.save()
      .then(data => sendJSON(res, data))
      .catch(next);
  }
  else {
    next(401);
  }
});

authRouter.put('/api/v1/:model/:id', auth, (req, res, next) => {
  if(!Object.keys(req.body).length) {
    next(400);
  }
  if(req.id) {
    req.model.findById(req.params.id)
      .then(data => {
        if(JSON.stringify(req.id) === JSON.stringify(data.userID)) {
          req.model.findByIdAndUpdate(req.params.id, req.body, {new:true})
            .then(data => {
              sendJSON(res, data);
            })
            .catch(next);
        }
        else {
          next(401);
        }
      })
      .catch(() => {
        next();
      });
  }
  else {
    next(401);
  }
});

authRouter.delete('/api/v1/:model/:id', auth, (req, res, next) => {
  if(req.id) {
    req.model.findById(req.params.id)
      .then(data => {
        if(JSON.stringify(req.id) === JSON.stringify(data.userID)) {
          req.model.findByIdAndDelete(req.params.id)
            .then(() => {
              res.statusCode = 204;
              res.end();
            })
            .catch(next);
        }
        else {
          next(401);
        }
      });
  }
  else {
    next(404);
  }
});

export default authRouter;