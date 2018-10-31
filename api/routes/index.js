module.exports = (app) => {
  const {
    lstatSync,
    readdirSync
  } = require('fs');
  const {
    join
  } = require('path');

  const isDirectory = source => lstatSync(source).isDirectory();

  const getDirectories = source =>
    readdirSync(source).map(name => join(source, name)).filter(isDirectory);
  _.forEach(getDirectories('./routes'), d => {
    require(`../${d}`)(app);
  });

  app.get(`/`, (req, res, next) => {
    var memory = process.memoryUsage();
    res.send({
      rss: memory.rss / 1048576,
      heapTotal: memory.heapTotal / 1048576,
      heapUsed: memory.heapUsed / 1048576
    })
  });
};