import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import config from 'helmconfig.js';

if(__DEVSERVER__) {
  config.link = config.link.filter(l => l.rel !== 'stylesheet');
}

const Meta = () => (
  <Helmet
    htmlAttributes={{"lang": "en", "amp": undefined}}
    title="Book 2 Book" meta={config.meta}
    link={config.link}
  />
)

ReactDOMServer.renderToString(<Meta />);
const header = Helmet.rewind();

export default header;