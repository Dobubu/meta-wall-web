const ghpages = require('gh-pages');

const options = {
  branch: 'gh-pages',
  repo: 'https://github.com/Dobubu/meta-wall-web.git',
};

const cb = (err) => {
  if (err) console.error(err);
  else console.log('publish success');
};

ghpages.publish('dist', options, cb);
