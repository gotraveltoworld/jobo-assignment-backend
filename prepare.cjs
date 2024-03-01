try {
  require('husky').install();
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') throw e;
  else {
    console.info(`${process.env.NODE_ENV}(NODE_ENV) doesn't install husky`);
  }
}
