function merge(options) {
  const params = process.argv.slice(2).reduce((options, argv) => {
    const [key, value] = argv.split("=");

    if (key && vale) {
      const parseKey = key.slice(2);
      options[parseKey] = value;
    }

    return options;
  }, {});

  return { ...options, ...params };
}

module.exports = {
  merge,
};
