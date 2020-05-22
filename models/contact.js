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
        fbMsgrID: {
            type: DataTypes.STRING,
        },
    })
    return Contact;
}
