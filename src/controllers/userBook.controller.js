// src/controllers/userBook.controller.js

const userBookService = require('../services/userBook.service')

const getUsersBooksById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userBookService.getUsersBooksById(id);

    if (!user)
      return res.status(404).json({ message: 'Pessoa não encontrada' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  };
};

const getBooksUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await userBookService.getBooksUsersById(id);

    if (!book)
      return res.status(404).json({ message: 'Livro não encontrado!' });

    return res.status(200).json(book);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  };
};

const getAll = async (_req, res) => {
  try {
    const result = await userBookService.getAll();
    if (!result)
      return res.status(404).json({ message: 'Livros não cadastrados' });
      return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getAllUser = async (_req, res) => {
  try {
    const result = await userBookService.getAllUser();
    if (!result)
      return res.status(404).json({ message: 'Usuários não encontrados' });
      return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getBookId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userBookService.getBookId(Number(id));
    if (!result)
      return res.status(404).json({ message: 'Livros não encontrado!' });
      return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userBookService.getUserId(Number(id));
    if (!result)
      return res.status(404).json({ message: 'Usuario não encontrado' });
      return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

const insertUser = async (req, res) => {
  try {
    const { firstName, lastName, age, books } = req.body;
    const result = await userBookService.insert({ firstName, lastName, age, books });
    if (!result)
      return res.status(404).json({ message: 'Erro ao cadastrar!' });
      return res.status(201).json({ message: `Cadastrado com sucesso o user ${firstName}` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

const insertUserBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const result = await userBookService.insertUserBook({ userId, bookId });
    if (!result)
      return res.status(404).json({ message: 'Erro ao cadastrar!' });
      return res.status(201).json({ message: `Cadastrado com sucesso o user ${userId}` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getSearch = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await userBookService.getAllSearch();
    const r = result.filter(({ name }) => name.includes(q));
    if (r.length < 1)
    return res.status(404).json({ message: 'Livros não encontrado!' });
    return res.status(200).json(r);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  getUsersBooksById,
  getAll,
  getBookId,
  getSearch,
  insertUser,
  getAllUser,
  getUserId,
  insertUserBook,
  getBooksUsersById,
};
