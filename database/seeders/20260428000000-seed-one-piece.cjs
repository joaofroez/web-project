'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Profiles e Permissions já foram criados pelo seeder anterior (seed-rbac.cjs)
    // Este seeder apenas cria dados de teste: Sagas, Arcos, Ilhas e Personagens

    // 1. Create Sagas
    const sagas = await queryInterface.bulkInsert('sagas', [
      {
        name: 'East Blue',
        description: 'O começo da jornada de Luffy',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Alabasta',
        description: 'A luta contra Crocodile',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Skypiea',
        description: 'A ilha no céu',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ], { returning: true });

    // 4. Create Arcs
    const arcs = await queryInterface.bulkInsert('arcs', [
      {
        name: 'Shells Town',
        description: 'Primeira parada no East Blue',
        saga_id: 1,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Orange Town',
        description: 'Segunda parada no East Blue',
        saga_id: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Loguetown',
        description: 'A cidade do ouro, última parada antes de Grand Line',
        saga_id: 1,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Alabasta Arc',
        description: 'A luta contra o Warlord Crocodile',
        saga_id: 2,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Skypiea Main Arc',
        description: 'A aventura na ilha celestial',
        saga_id: 3,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ], { returning: true });

    // 5. Create Islands
    const islands = await queryInterface.bulkInsert('islands', [
      {
        name: 'Shells Town',
        description: 'Uma pequena ilha no East Blue',
        coordinate_x: 10.5,
        coordinate_y: 20.3,
        coordinate_z: 0.0,
        model_url: 'https://example.com/shells-town.glb',
        thumbnail_url: 'https://example.com/shells-town.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Orange Town',
        description: 'Uma cidade no East Blue',
        coordinate_x: 15.2,
        coordinate_y: 25.1,
        coordinate_z: 0.0,
        model_url: 'https://example.com/orange-town.glb',
        thumbnail_url: 'https://example.com/orange-town.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Loguetown',
        description: 'A cidade do ouro',
        coordinate_x: 30.0,
        coordinate_y: 40.0,
        coordinate_z: 0.0,
        model_url: 'https://example.com/loguetown.glb',
        thumbnail_url: 'https://example.com/loguetown.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Alabasta',
        description: 'A ilha deserto do Grand Line',
        coordinate_x: 50.5,
        coordinate_y: 60.3,
        coordinate_z: 0.0,
        model_url: 'https://example.com/alabasta.glb',
        thumbnail_url: 'https://example.com/alabasta.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Skypiea',
        description: 'A ilha celestial no céu',
        coordinate_x: 100.0,
        coordinate_y: 100.0,
        coordinate_z: 500.0,
        model_url: 'https://example.com/skypiea.glb',
        thumbnail_url: 'https://example.com/skypiea.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ], { returning: true });

    // 6. Create Arc-Island associations
    await queryInterface.bulkInsert('arc_islands', [
      {
        arc_id: 1,
        island_id: 1,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        arc_id: 2,
        island_id: 2,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        arc_id: 3,
        island_id: 3,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        arc_id: 4,
        island_id: 4,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        arc_id: 5,
        island_id: 5,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ], { returning: true });

    // 7. Create Characters
    const characters = await queryInterface.bulkInsert('characters', [
      {
        name: 'Monkey D. Luffy',
        slug: 'monkey-d-luffy',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Roronoa Zoro',
        slug: 'roronoa-zoro',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Nami',
        slug: 'nami',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Sanji',
        slug: 'sanji',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Nico Robin',
        slug: 'nico-robin',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'Tony Tony Chopper',
        slug: 'tony-tony-chopper',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ], { returning: true });

    // 8. Create Character Versions (East Blue Saga)
    const characterVersions = await queryInterface.bulkInsert('character_versions', [
      {
        character_id: 1,
        alias: 'Pirate King',
        epithet: 'The Rubber Man',
        bounty: 30000000n,
        status: 'ALIVE',
        image_url: 'https://example.com/luffy.jpg',
        description: 'Captain of the Straw Hat Pirates',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        character_id: 2,
        alias: 'Swordsman',
        epithet: 'The Demon',
        bounty: 30000000n,
        status: 'ALIVE',
        image_url: 'https://example.com/zoro.jpg',
        description: 'Swordsman and second strongest',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        character_id: 3,
        alias: 'Navigator',
        epithet: 'The Thief',
        bounty: 16000000n,
        status: 'ALIVE',
        image_url: 'https://example.com/nami.jpg',
        description: 'Navigator and weather expert',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        character_id: 4,
        alias: 'Chef',
        epithet: 'Black Leg',
        bounty: 25000000n,
        status: 'ALIVE',
        image_url: 'https://example.com/sanji.jpg',
        description: 'Chef and combatant',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        character_id: 5,
        alias: 'Archaeologist',
        epithet: 'The Flower',
        bounty: 30000000n,
        status: 'ALIVE',
        image_url: 'https://example.com/robin.jpg',
        description: 'Archaeologist and scholar',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        character_id: 6,
        alias: 'Doctor',
        epithet: 'The Cotton Candy Lovers',
        bounty: 100n,
        status: 'ALIVE',
        image_url: 'https://example.com/chopper.jpg',
        description: 'Doctor and reindeer',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ], { returning: true });

    // 9. Create Arc-CharacterVersion associations
    await queryInterface.bulkInsert('arc_character_versions', [
      // East Blue Arc - Shells Town
      {
        arc_id: 1,
        character_version_id: 1,
        character_id: 1,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        arc_id: 1,
        character_version_id: 2,
        character_id: 2,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      // East Blue Arc - Orange Town
      {
        arc_id: 2,
        character_version_id: 1,
        character_id: 1,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        arc_id: 2,
        character_version_id: 2,
        character_id: 2,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        arc_id: 2,
        character_version_id: 3,
        character_id: 3,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      // East Blue Arc - Loguetown
      {
        arc_id: 3,
        character_version_id: 1,
        character_id: 1,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        arc_id: 3,
        character_version_id: 2,
        character_id: 2,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        arc_id: 3,
        character_version_id: 3,
        character_id: 3,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        arc_id: 3,
        character_version_id: 4,
        character_id: 4,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      // Alabasta Arc
      {
        arc_id: 4,
        character_version_id: 1,
        character_id: 1,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        arc_id: 4,
        character_version_id: 5,
        character_id: 5,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      // Skypiea Arc
      {
        arc_id: 5,
        character_version_id: 1,
        character_id: 1,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        arc_id: 5,
        character_version_id: 6,
        character_id: 6,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ], { returning: true });

    // 10. Create Events
    await queryInterface.bulkInsert('events', [
      {
        island_id: 1,
        arc_id: 1,
        title: 'Encontro com Coby',
        type: 'Recrutamento',
        description: 'Luffy recruta Coby enquanto invade a base da Marinha',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        island_id: 2,
        arc_id: 2,
        title: 'Recrutamento de Nami',
        type: 'Recrutamento',
        description: 'Nami se junta ao crew após Luffy a salvar',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        island_id: 3,
        arc_id: 3,
        title: 'Execução de Gol D. Roger',
        type: 'Histórico',
        description: 'Local onde foi executado o Rei dos Piratas',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        island_id: 3,
        arc_id: 3,
        title: 'Recrutamento de Sanji',
        type: 'Recrutamento',
        description: 'Sanji se junta ao crew em Loguetown',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        island_id: 4,
        arc_id: 4,
        title: 'Batalha contra Crocodile',
        type: 'Batalha',
        description: 'Enfrentamento épico contra o Warlord Crocodile',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        island_id: 5,
        arc_id: 5,
        title: 'Chegada em Skypiea',
        type: 'Exploração',
        description: 'O crew chega à misteriosa ilha celestial',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ], { returning: true });

    console.log('✅ One Piece seed data inserted successfully!');
  },

  down: async (queryInterface, Sequelize) => {
    // Delete in reverse order of creation to respect foreign keys
    await queryInterface.bulkDelete('arc_character_versions', null, {});
    await queryInterface.bulkDelete('island_character_versions', null, {});
    await queryInterface.bulkDelete('character_versions', null, {});
    await queryInterface.bulkDelete('characters', null, {});
    await queryInterface.bulkDelete('event_participants', null, {});
    await queryInterface.bulkDelete('events', null, {});
    await queryInterface.bulkDelete('arc_islands', null, {});
    await queryInterface.bulkDelete('islands', null, {});
    await queryInterface.bulkDelete('arcs', null, {});
    await queryInterface.bulkDelete('sagas', null, {});
    await queryInterface.bulkDelete('profile_permissions', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('profiles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
