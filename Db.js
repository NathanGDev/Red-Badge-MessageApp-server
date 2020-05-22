const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate()
  .then(() => console.log('postgres db is connected'))
  .catch(err => console.log(err));


// ***************************
// Relationships
// ***************************

User = sequelize.import('./models/user');
Contact = sequelize.import('./models/contact');
Message = sequelize.import('./models/message');
UserType = sequelize.import('./models/userType');

User.belongsTo(UserType);
UserType.hasMany(User);

Contact.belongsTo(User);
User.hasMany(Contact);

Message.belongsTo(User);
User.hasMany(Message);

Message.belongsTo(Contact);
Contact.hasMany(Message);


module.exports = sequelize;