module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {

        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobileNum: {
            type: DataTypes.STRING,
        },
        fbMsgrID: {
            type: DataTypes.STRING,
        },
        salesUserID: {
            type: DataTypes.INTEGER,
        },
    })
    return User;
}
