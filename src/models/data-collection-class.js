'use strict';

// wrapper for our CRUD actions to perform on DB
class Collection {
  constructor(models) {
    this.model = models;
  }

  read(id) {
    if (id) {
      return this.model.findOne({ _id: id});
    } else {
      return this.model.find({});
    }
  }

  create(obj){
    let newObj = new this.model(obj);
    return newObj.save();
  }

  update(_id, obj) {
    return this.model.findByIdAndUpdate(_id, obj, { new: true });
  }

  delete(_id){
    return this.model.findByIdAndDelete(_id);
  }
}

module.exports = Collection;
