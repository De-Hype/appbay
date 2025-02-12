import { Request, Response, NextFunction } from "express";

import catchAsync from "../errors/catchAsync";
import AppResponse from "../helpers/AppResponse";

import AppError from "../errors/AppError";
import { logAction } from "../helpers/logAction";
import { Item } from "../models/item.model";
import { Op } from "sequelize";

export const createItemHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price } = req.body;
    const numPrice = Number(price);

    const newItem = await Item.create({ name, description, price: numPrice });
    await logAction("create", "Item", { newItem });

    if (!newItem) return next(new AppError("Could not create a new Item", 400));

    return AppResponse(res, "Item created successfully", 201, newItem);
  }
);
export const fetchItemsHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: items } = await Item.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    if (!items.length) return next(new AppError("No items found", 404));

    return AppResponse(res, "Items fetched successfully", 200, {
      items,
      totalItems: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  }
);

export const fetchItemHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if (!item)
      return next(
        new AppError(`Could not find item matching the ID ${id} `, 400)
      );

    return AppResponse(res, "Item fetched successfully", 200, item);
  }
);

export const updateItemHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const item = await Item.findByPk(id);
    if (!item)
      return next(
        new AppError(`Could not find Item matching the ID ${id} `, 400)
      );
    const updateItem = await item.update({
      name,
      description,
      price,
    });
    await logAction("update", "Item", { item });
    if (!updateItem)
      return next(
        new AppError(`Could not update Item with the ID ${id} `, 400)
      );
    return AppResponse(res, "Item updated successfully", 200, item);
  }
);

export const deleteItemHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const item = await Item.findByPk(id);
    if (!item)
      return next(
        new AppError(`Could not find item matching the ID ${id} `, 400)
      );

    const deletedItem = await item.destroy();
    await logAction("delete", "Item", { deletedItem });

    return AppResponse(res, "Item deleted successfully", 200, deletedItem);
  }
);

export const searchItemsHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const name = req.query.name;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: items } = await Item.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      offset,
      limit,
    });

    if (!items.length) {
      return next(new AppError("No items found", 404));
    }

    return AppResponse(res, "Items fetched successfully", 200, {
      total: count,
      page,
      limit,
      items,
    });
  }
);
