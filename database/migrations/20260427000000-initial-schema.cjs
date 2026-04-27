'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. profiles
    await queryInterface.createTable('profiles', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
    });

    // 2. permissions
    await queryInterface.createTable('permissions', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      slug: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
    });

    // 3. profile_permissions (pivot)
    await queryInterface.createTable('profile_permissions', {
      profile_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'profiles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      permission_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'permissions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
    });

    // 4. users
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password_hash: { type: Sequelize.STRING, allowNull: false },
      profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'profiles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
    });

    // 5. sagas
    await queryInterface.createTable('sagas', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      order: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
    });

    // 6. arcs
    await queryInterface.createTable('arcs', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      saga_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sagas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      order: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
    });

    // 7. islands
    await queryInterface.createTable('islands', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      arc_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'arcs', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      coordinate_x: { type: Sequelize.FLOAT, allowNull: false },
      coordinate_y: { type: Sequelize.FLOAT, allowNull: false },
      coordinate_z: { type: Sequelize.FLOAT, allowNull: false },
      model_url: { type: Sequelize.STRING, allowNull: false },
      thumbnail_url: { type: Sequelize.STRING, allowNull: true },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
    });

    // 8. events
    await queryInterface.createTable('events', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      island_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'islands', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      type: { type: Sequelize.STRING, allowNull: false },
      order: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
    });

    // 9. characters
    await queryInterface.createTable('characters', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      slug: { type: Sequelize.STRING, allowNull: false, unique: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
    });

    // 10. character_versions
    await queryInterface.createTable('character_versions', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      character_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'characters', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      arc_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'arcs', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      alias: { type: Sequelize.STRING, allowNull: true },
      epithet: { type: Sequelize.STRING, allowNull: true },
      bounty: { type: Sequelize.BIGINT, allowNull: true },
      status: {
        type: Sequelize.ENUM('ALIVE', 'DECEASED', 'UNKNOWN', 'IMPRISONED'),
        allowNull: false,
        defaultValue: 'ALIVE',
      },
      image_url: { type: Sequelize.STRING, allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
    });

    // 11. island_character_versions (pivot)
    await queryInterface.createTable('island_character_versions', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      island_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'islands', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      character_version_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'character_versions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      order: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Ordem inversa para dropar
    await queryInterface.dropTable('island_character_versions');
    await queryInterface.dropTable('character_versions');
    await queryInterface.dropTable('characters');
    await queryInterface.dropTable('events');
    await queryInterface.dropTable('islands');
    await queryInterface.dropTable('arcs');
    await queryInterface.dropTable('sagas');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('profile_permissions');
    await queryInterface.dropTable('permissions');
    await queryInterface.dropTable('profiles');
  },
};
