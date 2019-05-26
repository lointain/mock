'use strict';
module.exports = (sequelize, DataTypes) => {
    var Relation = sequelize.define('Relation', {
        name: DataTypes.STRING,
        type: DataTypes.ENUM('11', '1N', 'N1', 'MN')
    });

    return Relation;
};
