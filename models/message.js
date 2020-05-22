module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define('message', {

        salesUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
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