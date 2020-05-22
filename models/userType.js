module.exports = (sequelize, DataTypes) => {

    const UserType = sequelize.define('userType', {

        userType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    })
    return UserType;
}
