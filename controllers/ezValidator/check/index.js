const validator = require('validator');

const runner = require('./runner');
const { isSanitizer, isValidator } = require('../utils/filters');

module.exports = (field, message) => {
  let optional;
  const validators = [];
  const sanitizers = [];
  if(typeof field !== 'string') throw new Error('Field must be a string.');
  
  const middleware = (req) => {
    return runner(req, middleware._context)
        .then(errors => {
                if (errors) req.validationErrors = (req.validationErrors || []).concat(errors);
              }
        );
  };

  Object.keys(validator)
    .filter(isValidator)
    .forEach(methodName => {
      const validationFn = validator[methodName];
      middleware[methodName] = (...options) => {
        validators.push({
          negated: middleware._context.negateNext,
          validator: validationFn,
          options
        });
        middleware._context.negateNext = false;
        return middleware;
      };
    });

  Object.keys(validator)
    .filter(isSanitizer)
    .forEach(methodName => {
      const sanitizerFn = validator[methodName];
      middleware[methodName] = (...options) => {
        sanitizers.push({
          sanitizer: sanitizerFn,
          options
        });
        return middleware;
      };
    });

  middleware.optional = (options = {}) => {
    optional = options;
    return middleware;
  };

  middleware.custom = validator => {
    validators.push({
      validator,
      custom: true,
      negated: middleware._context.negateNext,
      options: []
    });
    middleware._context.negateNext = false;
    return middleware;
  };

  middleware.customSanitizer = sanitizer => {
    sanitizers.push({
      sanitizer,
      custom: true,
      options: []
    });
    return middleware;
  };

  middleware.exists = (options = {}) => {
    const validator = options.checkFalsy
      ? existsValidatorCheckFalsy
      : (options.checkNull ? existsValidatorCheckNull : existsValidator);

    return middleware.custom(validator);
  };

  middleware.isArray = () => middleware.custom(value => Array.isArray(value)); // Object.prototype.toString.call(value) == '[object Array]' (slower)
  middleware.isString = () => middleware.custom(value => typeof value === 'string');

  middleware.withMessage = message => {
    const lastValidator = validators[validators.length - 1];
    if (lastValidator) lastValidator.message = message;
    return middleware;
  };

  middleware.not = () => {
    middleware._context.negateNext = true;
    return middleware;
  };

  middleware.continue = () => {
    const lastValidator = validators[validators.length - 1];
    if (lastValidator) lastValidator.continue = true;
    return middleware;
  };
  
  middleware._context = {
    get optional() {
      return optional;
    },
    negateNext: false,
    message,
    field,
    sanitizers,
    validators
  };

  return middleware;
};

function existsValidator(value) {
  return value !== undefined;
}

function existsValidatorCheckNull(value) {
  return value != null;
}

function existsValidatorCheckFalsy(value) {
  return !!value;
}