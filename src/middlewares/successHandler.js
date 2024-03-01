import {makeHttpResponse} from '#utils/index.js';

export default (_req, res, next) => {
  res.success = (obj = {}) => {
    const {message, data} = {message: 'Successful Request', data: obj};
    const formattedResponse = makeHttpResponse({message, data});
    res.send(formattedResponse);
  };
  next();
};
