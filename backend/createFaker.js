const { Faker } = require('@faker-js/faker')

const createFaker = (locale) => {
  const faker = new Faker({
    locale: [locale],
  });
  return faker;
}

module.exports = { createFaker }