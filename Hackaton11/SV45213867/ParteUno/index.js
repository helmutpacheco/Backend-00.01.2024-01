import { Sequelize, DataTypes } from 'sequelize';

//const sequelize = new Sequelize('sqlite::memory:');

const sequelize = new Sequelize(
 'hello_world_db',
 'root',
 '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

const User = sequelize.define('User', {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    profesion: DataTypes.STRING,
    pais: DataTypes.STRING,
    sexo: DataTypes.BOOLEAN,
});

//await sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');
const jane = await User.create({
    username: 'RomelCarlof24',
    birthday: new Date(1988, 2, 24),
    profesion: 'Ingeniero de Sistema',
    pais: 'Pais',
    sexo: false,
});

const users = await User.findAll();
console.log(users)