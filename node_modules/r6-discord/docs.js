const Docma = require('docma');
const Package = require('./package');

const config = {
  src: [
    './src/*.js',
    './README.md'
  ],
  dest: './docs',
  template: {
    options: {
      title: Package.name,
      navItems: [
        {
          label: 'Documentation',
          href: '?api=r6-discord',
          iconClass: 'ico-book'
        },
        {
          label: 'GitHub',
          href: Package.homepage,
          target: '_blank',
          iconClass: 'ico-md ico-github'
        }
      ]
    }
  }
};

Docma.create()
  .build(config)
  .catch(error => {
    console.log(error);
  });