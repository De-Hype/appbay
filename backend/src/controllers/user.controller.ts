import { Request, Response, NextFunction } from "express";

import catchAsync from "../errors/catchAsync";
import AppResponse from "../helpers/AppResponse";

import AppError from "../errors/AppError";
import { User } from "../models/user.model";
import { logAction } from "../helpers/logAction";

export const createUserHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, location, role } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return next(new AppError("User with this email already exist", 400));

    const newUser = await User.create({ name, email, location, role });
    const log = await logAction("create", "User", { newUser });

    if (!newUser) return next(new AppError("Could not create a new user", 400));

    return AppResponse(res, "User created successfully", 201, newUser);
  }
);
export const fetchUsersHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    if (!users.length) return next(new AppError("No users found", 404));

    return AppResponse(res, "Users fetched successfully", 200, {
      users,
      totalUsers: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  }
);

export const fetchAUserHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    console.log(user);

    if (!user)
      return next(
        new AppError(`Could not find user matching the ID ${id} `, 400)
      );

    return AppResponse(res, "User fetched successfully", 200, user);
  }
);

export const updateUserHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, email, location, role } = req.body;

    const user = await User.findByPk(id);
    if (!user)
      return next(
        new AppError(`Could not find user matching the ID ${id} `, 400)
      );
    const updateUser = await user.update({ name, email, location, role });
    await logAction("update", "User", { user });
    if (!updateUser)
      return next(
        new AppError(`Could not update user with the ID ${id} `, 400)
      );
    return AppResponse(res, "User updated successfully", 200, user);
  }
);

export const deleteUserHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user)
      return next(
        new AppError(`Could not find user matching the ID ${id} `, 400)
      );

    const deletedUser = await user.destroy();
    await logAction("delete", "User", { deletedUser });

    return AppResponse(res, "User deleted successfully", 200, deletedUser);
  }
);
