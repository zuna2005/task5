function createError(faker, user) {
    const keys = Object.keys(user).slice(1)
    const key = faker.helpers.arrayElement(keys)
    const val = user[key]

    let operation = faker.number.int({min: 1, max: 3})
    if (val.length < 2) 
        operation = 3
    else if (val.length > 100)
        operation = faker.number.int({min: 1, max: 2})

    let elem = val.indexOf(faker.helpers.arrayElement(val.split('')))
    let newVal

    switch (operation) {
        case 1:
            //console.log('delete')
            newVal = val.slice(0, elem) + val.slice(elem + 1)
            break
        case 2:
            //console.log("interchange")
            elem = (elem === val.length - 1 ? elem - 1 : elem)
            newVal = val.slice(0, elem) + val[elem + 1] + val[elem] + val.slice(elem + 2)
            break
        case 3:
            //console.log('add')
            newVal = val.slice(0, elem) + faker.string.sample(1) + val.slice(elem)
            break
            
    }
    return {...user, [key]: newVal}
}

const times = (n, fn) => {
    if (n < 0) throw new Error("The first argument cannot be negative.");
    return (faker, arg) => {
        for(let i = Math.floor(n); i--;) arg = fn(faker, arg);
        return faker.number.float() < n % 1 ? fn(faker, arg) : arg;
    };
};

module.exports = {createError, times}