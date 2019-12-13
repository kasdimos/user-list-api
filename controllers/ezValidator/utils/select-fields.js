

module.exports = (data, context, options = {}) => {
  
  const optionalityFilter = options.filterOptionals == null || options.filterOptionals
    ? createOptionalityFilter(context)
    : Boolean;
  const sanitizerMapper = createSanitizerMapper(data, context, options);

  let fieldKey = context.field;
  
  let field = {
    key: fieldKey,
    value: data[fieldKey],
    originalValue: data[fieldKey]
  };
  
  field = sanitizerMapper(field)
    
  if (!optionalityFilter(field)) return null;

  data[fieldKey] = field.value;
  
  return field;
};


function createSanitizerMapper(data, { sanitizers = [] }, { sanitize = true }) {
  return !sanitize ? field => field : field => sanitizers.reduce((prev, sanitizer) => {
    const value = typeof prev.value === 'string' ?
      callSanitizer(sanitizer, prev) :
      prev.value;
    return Object.assign({}, prev, { value });
  }, field);

  function callSanitizer(config, field) {
    return !config.custom ?
      config.sanitizer(field.value, ...config.options) :
      config.sanitizer(field.value, {
        data,
        key: field.key
      });
  }
}

function createOptionalityFilter({ optional }) {
  const checks = [
    value => value !== undefined,
    value => optional.nullable ? value != null : true,
    value => optional.checkFalsy ? value : true
  ];

  return field => {
    if (!optional) {
      return true;
    }

    return checks.every(check => check(field.value));
  };
}
