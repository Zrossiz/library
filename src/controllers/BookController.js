import BookModel from "../models/Book.js";

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
      favorite: req.body.favorite,
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

export const update = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const bookId = req.params.id;
    await BookModel.updateOne(
      {
        _id: bookId,
      },
      {
        title: req.body?.title,
        description: req.body?.description,
        authors: req.body?.authors,
        favorite: req.body?.favorite,
        fileCover: req.body?.fileCover,
        fileName: req.body?.fileName,
        fileBook: req.file?.originalname,
      }
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
      res.download(`./upload/${doc.fileBook}`);
    });
  } catch (err) {
    res.status(500).json({
      message: "Ошибка при скачивании книги",
    });
  }
};

export const search = async (req, res) => {
  try {
    console.log(req.body);
    const title = req.body.title;

    const books = await BookModel.find({
      title,
    });

    if (!title || !books) {
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