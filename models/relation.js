'use strict';
module.exports = (sequelize, DataTypes) => {
    var Relation = sequelize.define('Relation', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        type: DataTypes.ENUM('hasOne', 'hasMany', 'belongsTo', 'belongsToMany'),
        config: DataTypes.TEXT,
    });

    return Relation;
};
