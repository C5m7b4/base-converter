module.exports = {
  hooks: {
    'pre-commit': 'npm check-types && npm lint --fix',
    'pre-push': 'npm test:coverage',
  },
};
