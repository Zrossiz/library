import BookModel from "../models/Book.js";
import axios from "axios";

export const getAll = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить книги",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new BookModel({
      title: req.body.title,
      description: req.body.description,
      authors: req.body.authors,
      favorite: false,
      fileCover: req.body.fileCover,
      fileName: req.body.fileName,
      fileBook: req?.file?.originalname,
    });

    const book = await doc.save();

    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать книгу",
    });
  }
};

export const createTwoAndMore = async (req, res) => {
  try {
    const books = req.body.books;

    const onInsert = (err, docs) => {
      if (err) {
        return res.status(500).json({
          message: "Ошибка при создании книг",
        });
      }

      return res.status(200).json(docs);
    };

    await BookModel.collection.insertMany(books, onInsert);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать книги",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findOneAndUpdate(
      {
        _id: bookId,
      },
      {
        $inc: { viewCount: 1 },
      },
      {
        returnDocument: "after",
      }
    ).then((doc, err) => {
      if (err) {
        console.log(err);
        res.status(404).json({
          message: "Не удалось получить книгу",
        });
        return;
      }

      if (!doc) {
        return res.status(404).json({
          message: "Не удалось найти книгу",
        });
      }

      res.status(200).json(doc);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить книгу",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findOneAndDelete({
      _id: bookId,
    }).then((doc, err) => {
      if (err) {
        console.log(err);
        res.status(404).json({
          message: "Не удалось удалить книгу",
        });
        return;
      }

      if (!doc) {
        return res.status(404).json({
          message: "Не удалось найти книгу",
        });
      }

      res.status(200).json({
        message: "Ok",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить книгу",
    });
  }
};

export const update = async (req, res) => {
  try {
    const bookId = req.params.id;
    const data = {
      title: req.body.title,
      description: req.body.description,
      authors: req.body.authors,
      favorite: false,
      fileCover: req.body.fileCover,
      fileName: req.body.fileName,
      fileBook: req?.file?.originalname,
    };

    for (let i in data) {
      console.log(data[i]);
      if (data[i] === "undefined") {
        delete data[i];
      }
    }

    console.log(data);

    await BookModel.updateOne(
      {
        _id: bookId,
      },
      data
    );

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Ошибка при обновлении книги",
    });
  }
};

export const download = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findOne({
      _id: bookId,
    }).then((doc, err) => {
      if (err) {
        console.log(err);
        res.status(404).json({
          message: "Не удалось скачать книгу",
        });
        return;
      }

      if (!doc) {
        return res.status(404).json({
          message: "Не удалось найти книгу",
        });
      }
      console.log(doc.fileBook);
      res.download(`./src/upload/${doc.fileBook}`);
    });
  } catch (err) {
    res.status(500).json({
      message: "Ошибка при скачивании книги",
    });
  }
};

export const search = async (req, res) => {
  try {
    const RegExpTitle = new RegExp(`${req.body.title}`, "i");
    const books = await BookModel.find({
      title: RegExpTitle,
    }).exec();

    if (!req.body.title || !books) {
      res.status(200).json({
        message: "Упс, ничего не найдено",
      });
      return;
    }

    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Ошибка сервера при поиске",
    });
  }
};

export const incrBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    let data;

    await axios
      .post("http://localhost/incr", {
        _id: bookId,
      })
      .then((res) => {
        data = res.data;
      });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить количество просмотров книги",
    });
  }
};

export const getViewsBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    let data;

    await axios
      .get("http://localhost/getView", {
        _id: bookId,
      })
      .then((res) => {
        data = res.data;
      });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить количество просмотров книги",
    });
  }
};
