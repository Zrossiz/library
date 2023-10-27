import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import ApiError from "../error/ApiError.js";

const generateJwt = (id, userName, role) => {
  return jwt.sign({ id, userName, role }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

export const create = async (req, res, next) => {
  try {
    const { login, password, role } = req.body;

    if (!login && !password) {
      return next(ApiError.badRequest("Некорректный логин или пароль"));
    }

    const candidate = await UserModel.findOne({ userName: login });

    if (candidate) {
      return next(ApiError.badRequest("Такой пользователь уже существует"));
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const userData = new UserModel({
      userName: login,
      password: hashPassword,
      role,
    });

    const user = await userData.save();

    const token = generateJwt(user._id, user.userName, role);

    res.status(200).json(token);
  } catch (err) {
    console.log(err);
    return next(ApiError.badRequest("Ошибка сервера"));
  }
};

export const login = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const user = await UserModel.findOne({ userName: login });

    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.userName, user.role);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return next(ApiError.badRequest("Ошибка сервера"));
  }
};

export const check = async (req, res) => {
  const token = generateJwt(req.user.id, req.user.email, req.user.role);
  return res.json({ token });
};

export const switchFavorite = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ userName: req.body.login });
    const bookId = req.body.bookId;

    let isAlreadyInFavorite;

    for (let key in user.favorites) {
      if (user.favorites[key] == bookId) {
        isAlreadyInFavorite = key;
      }
    }

    if (isAlreadyInFavorite) {
      delete user.favorites[isAlreadyInFavorite];

      const filteredArray = user.favorites.filter(Boolean);

      await UserModel.updateOne(
        { userName: req.body.login },
        { favorites: filteredArray }
      );
      return res.status(200).json({
        message: "Убрано из избранных",
      });
    }

    user.favorites.push(bookId);

    const filteredArray = user.favorites.filter(Boolean);

    await UserModel.updateOne(
      { userName: req.body.login },
      { favorites: filteredArray }
    );

    res.status(200).json({
      message: "Добавлено в избранные",
    });
  } catch (err) {
    console.log(err);
    return next(ApiError.badRequest("Ошибка сервера"));
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await UserModel.findOne({ userName: req.body.login });

    res.status(200).json(user.favorites);
  } catch (err) {
    console.log(err);
    return next(ApiError.badRequest("Ошибка сервера"));
  }
};
