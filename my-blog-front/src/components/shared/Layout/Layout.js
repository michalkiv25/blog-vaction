import React from 'react';

import Empty from './templates/Empty';
import DefaultLayout from './templates/Default';
import Container from './templates/Container';


const renderTemplate = (template,header) => {
  let output;

  switch (template) {
    case 'empty':
      output = <Empty />;
      break;
    case 'container':
      output = <Container/>;
      break;
    default:
      output = <DefaultLayout header={header} />;
      break;
  }

  return output;
}

const Layout = (props) => {
  const {
    template,
    header,
  } = props;

  return renderTemplate(template,header);
}


export default Layout;