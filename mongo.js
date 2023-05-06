const mongoose = require("mongoose")

if (process.argv.length<3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.gd4baig.mongodb.net/`

mongoose.set("strictQuery",false)
mongoose.connect(url)

const personSchema = {
  name: String,
  number: String
}

const Person = mongoose.model("Person", personSchema)
if (process.argv.length>=5){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}else{
  Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })

}