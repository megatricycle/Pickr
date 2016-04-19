export default function (sequelize, DataTypes) {
    let Account = sequelize.define("Account", {
        Fname: DataTypes.STRING,
        MI: DataTypes.STRING,
        Lname: DataTypes.STRING,
        Username: DataTypes.STRING,
        EmailAddress: DataTypes.STRING,
        Password: DataTypes.STRING
    }, {
        classMethods: {
            associate(models) {
                Account.hasMany(models.Class);
            }
        },
        instanceMethods: {
            createNewClass(data) {
                return this.createClass({
                    className: data.className,
                    classCode: data.classCode
                });
            }
        }
    });

    return Account;
};
