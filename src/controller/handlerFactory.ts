import { Request, Response } from "express";

export interface IModel<T> {
  index(): Promise<T[]>;
  show(id: number): Promise<T>;
  create(obj: Omit<T, "id">): Promise<T>;
  update(id: number, obj: T): Promise<T>;
  delete(id: number): Promise<T>;
}

const getAll = (Model: IModel<unknown>) => {
  return async (
    _req: Request,
    res: Response,
    next: () => void
  ): Promise<void> => {
    try {
      const results = await Model.index();
      res.json({ results });
    } catch (error) {
      throw new Error(`Could not get books ${error}`);
    }
  };
};

const getOne = (Model: IModel<unknown>) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (!id || isNaN(id)) {
        res.status(400).json({ error: "No Id Was Found" });
        return;
      }
      const results = await Model.show(id);

      if (!results) {
        res.status(404).json({ error: "Element Not Found" });
        return;
      }

      res.json({ results });
    } catch (error) {
      res.status(500).json({ error });
    }
  };
};

const createOne = (Model: IModel<unknown>) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("i am on creatone controller.");
      // console.log({ body: req.body });

      const results = await Model.create(req.body);

      res.json({ results });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  };
};

const deleteOne = (Model: IModel<unknown>) => {
  return async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      if (!id) {
        res.status(400).json({ error: "No Id Was Found" });
        return;
      }
      const results = await Model.delete(id);
      res.json({ results });
    } catch (error) {
      res.status(500).json({ error });
    }
  };
};

export default {
  getAll,
  getOne,
  createOne,
  deleteOne,
};
