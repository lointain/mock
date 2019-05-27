'use strict';
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Model', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        config: DataTypes.TEXT,
        x: DataTypes.FLOAT,
        y: DataTypes.FLOAT,
    });

    Model.associate = function (models) {
        models.Model.belongsToMany(models.Model, {
            as: 'RelationModels',
            through: models.Relation,
            // foreignKey: {
            //     allowNull: false
            // }
        });
    };
    return Model;
};
