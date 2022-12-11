// src/services/userBook.service.js

const { User, Book, sequelize, UserBook } = require('../models');

const getUsersBooksById = (id) => User.findOne({
  where: { id },
  include: [{ model: Book, as: 'books', through: { attributes: [] } }],
});

const getBooksUsersById = (id) => Book.findOne({
  where: { id },
  include: [{ model: User, as: 'users', through: { attributes: [] } }],
});

const getAll = async () => {
  const result = await Book.findAll();
  return result;
};

const getAllUser = async () => {
  const result = await User.findAll();
  return result;
};

const getAllSearch = async () => {
  const result = await Book.findAll({
    attributes: { exclude: ['id', 'releaseYear', 'totalPages'] },
  });
  return result;
};

const getBookId = async (id) => {
  const result = await Book.findOne({
    where: { id },
    attributes: { exclude: ['id', 'releaseYear', 'totalPages'] },
  });
  return result;
};

const getUserId = async (id) => {
  const result = await User.findOne({
    where: { id },
    attributes: { exclude: ['id'] },
  });
  return result;
};
/* const insert = async ({ firstName, lastName, age }) => {
  try{
  const res = await User.create({ firstName, lastName, age });
  return res;
  } catch (e) {
    await t.rollback();
    console.log(e);
    throw e; // Jogamos o erro para a controller tratar
  }
}; */

const insert = async ({ firstName, lastName, age, books }) => {
  const t = await sequelize.transaction();
  try {
    // Depois executamos as operações
    const employee = await User.create(
      { firstName, lastName, age },
      { transaction: t },
    );
    const result = await User.findAll();
    await UserBook.create(
      { userId: result.length + 1, bookId: books },
      { transaction: t },
    );

    // Se chegou até essa linha, quer dizer que nenhum erro ocorreu.
    // Com isso, podemos finalizar a transação usando a função `commit`.
    await t.commit();
    return employee;
  } catch (e) {
    // Se entrou nesse bloco é porque alguma operação falhou.
    // Nesse caso, o sequelize irá reverter as operações anteriores com a função rollback, não sendo necessário fazer manualmente
    await t.rollback();
    console.log(e);
    throw e; // Jogamos o erro para a controller tratar
  }
};

const insertUserBook = async ({ userId, bookId }) => {
  try{
  const res = await UserBook.create({ userId, bookId  });
  return res;
  } catch (e) {
    await t.rollback();
    console.log(e);
    throw e; // Jogamos o erro para a controller tratar
  }
};

module.exports = {
  getUsersBooksById,
  getAll,
  getBookId,
  getAllSearch,
  insert,
  getAllUser,
  getUserId,
  insertUserBook,
  getBooksUsersById,
};
