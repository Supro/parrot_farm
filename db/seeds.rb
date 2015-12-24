# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


5.times {
  FactoryGirl.create :parrot, color: ['green', 'blue', 'yellow', 'red'].sample,
                              age: rand(12..36),
                              pedigree: true,
                              gender: ['m', 'f'].sample
}
