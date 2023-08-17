const User = require('./user');
const Blog = require('./Blog');

// create associiations between user and blog

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Blog };
