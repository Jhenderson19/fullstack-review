const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://jhenderson19:${process.env.dbPass}@cluster0.z4h69.mongodb.net/fetcher?retryWrites=true&w=majority`);

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {
    type: Number,
    unique: true
  },
  name: String,
  html_url: String,
  owner: String,
  size: Number,
  watchers: Number

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoDatas) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repoDatas.map(repo => {
    new Repo({
      id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      owner: repo.owner.login,
      size: repo.size,
      watchers: repo.watchers
    }).save().catch((e) => {
      if(e.code === 11000) {
        return;
      }
    });
  });

}

let get25 = () => {
  return Repo.find({}).sort({watchers: -1}).limit(25).then((results) => {
    var trimmedData = [];
    results.map((result) => {
      trimmedData.push(result._doc);
    })
    return trimmedData;
  });
}

module.exports.save = save;
module.exports.get25 = get25;