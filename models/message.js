module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define('message', {

        message: {
            type: DataTypes.STRING,
        },
        sent: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        service: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return Message;
}