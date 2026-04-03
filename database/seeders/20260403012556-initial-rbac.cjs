'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Inserir Perfis
    await queryInterface.bulkInsert('Profiles', [
      {
        id: 1,
        name: 'ADMIN',
        description: 'Acesso total ao sistema e gerenciamento de conteúdo.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'PLAYER',
        description: 'Usuário padrão que explora o mapa e responde quizzes.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // 2. Inserir Permissões Básicas
    await queryInterface.bulkInsert('Permissions', [
      {
        id: 1,
        name: 'Gerenciar Usuários',
        slug: 'MANAGE_USERS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Criar Conteúdo',
        slug: 'CREATE_CONTENT',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // 3. Vincular Permissões ao Perfil ADMIN (Tabela Pivô)
    return queryInterface.bulkInsert('ProfilePermissions', [
      { profile_id: 1, permission_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { profile_id: 1, permission_id: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Ordem inversa para o "Undo" não dar erro de FK
    await queryInterface.bulkDelete('ProfilePermissions', null, {});
    await queryInterface.bulkDelete('Permissions', null, {});
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};