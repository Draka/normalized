let list = {
  '500': {
    'statusCode': 500,
    'title': 'internalServerError',
    'errorMessage': 'internalServerError'
  },
  '400': {
    'statusCode': 400,
    'title': 'badRequest',
    'errorMessage': 'badRequest'
  },
  '401': {
    'statusCode': 401,
    'title': 'unauthorized',
    'errorMessage': 'unauthorized'
  },
  '404': {
    'statusCode': 404,
    'title': 'notFound',
    'errorMessage': 'notFound'
  }
};

module.exports = (code, res, values) => {
  let err = list[code];
  if (!err) {
    err = list[code.toString()];
    global.__(err.errorMessage || 'internalServerError', code);
  }
  err.code = parseInt(code);
  if (values) {
    err.values = values;
  }

  if (res) {
    return res.status(err.statusCode || 500).send(err);
  } else {
    return err;
  }
};
