'use strict';

import mongoose, {Schema} from 'mongoose';

const DogSchema = mongoose.Schema({
  roast: {type:String, required:true},
  dog: {type:String, required:true},
  userID: {type: Schema.Types.ObjectId, ref: 'users'},
});

export default mongoose.dog('dog', DogSchema);
