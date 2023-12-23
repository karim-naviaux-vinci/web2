import _ from 'lodash';

function component() {
    const main = document.createElement('main');
  
      // Lodash, now imported by this script
    main.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return main;
  }
  
  document.body.appendChild(component());