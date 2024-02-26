function createRandomUser(faker, formats, seed) {
  const city = faker.location.city()
  const streetAddress = faker.location.streetAddress(true)

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    address: city + ' '+ streetAddress,
    phone: faker.helpers.replaceSymbols(faker.helpers.arrayElement(formats))
  };
}

module.exports = { createRandomUser }