'use strict';
module.exports = (sequelize, DataTypes) => {
    var Project = sequelize.define('Project', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING
    });

    Project.associate = function (models) {
        models.Project.hasMany(models.Model, {
            as: 'Models',
        });
        models.Project.hasMany(models.Relation, {
            as: 'Relations',
        });
    };
    return Project;
};
