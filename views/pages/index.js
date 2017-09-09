#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const program = require('commander');
const colors = require('colors');
var os = require('os-family')

program.usage('node -e <editor-name> -s')
.option('-e, --editor [num]', 'Specify your editor name')
.on('--help', () => {
  console.log(colors.green('Specify hackerrank source with -s'));
})
.parse(process.argv);

(function(editor='sublime', source) {
  console.log(colors.green('Setting up HackerRank React! '))
  console.log('Installing global dependencies..')
  shell.exec('npm install -g frontend-editor-setup yarn gulp');
  console.log('Installing project dependencies..')
  shell.exec('npm install');
  console.log(colors.green('Setting up packages for', editor));
  shell.exec(`frontend-editor-setup -e ${editor}`)

  const nginx = fs.readFile('/usr/local/etc/nginx/nginx.conf', 'utf-8', (err, data) => {
    if (err) throw err;
    if(!data.match(/react_route_control_dev/)) {
      console.log('Adding config to nginx..')
      const updatedFile = data.replace(/include servers\/*/, `include servers/* \n    include ${source}/config/react_route_control_dev.conf;`)
      fs.writeFile('/usr/local/etc/nginx/nginx.conf', updatedFile, 'utf-8', (fileError) => {
          if (fileError) throw fileError;
          console.log(colors.green('Added config to nginx'));
          console.log('Restarting nginx..')
          shell.exec('sudo nginx -s reload');
      });
    }
    console.log(colors.green('React has been set-up!'))
    console.log('Go to the source directory and run:')
    console.log(colors.green('REACT_VERSION=true rails s'))
    console.log('This will run rails with React Mode')
    console.log('Open another tab in the terminal, go to the hackerrank repo and run:')
    console.log(colors.green('gulp'))
    console.log('')
    console.log('You\'re done! Go to http://localhost:8090/domains to see React pages in action')
  })
})(program.editor, program.source)
