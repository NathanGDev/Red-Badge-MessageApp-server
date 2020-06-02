module.exports = (sequelize, DataTypes) => {

    const Contact = sequelize.define('contact', {

        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        mobileNum: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fbMsgrId: {
            type: DataTypes.STRING,
        },
    })
    return Contact;
}
