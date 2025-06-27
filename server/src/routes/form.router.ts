import { Response, Router } from "express";
import { FormModel } from "../schemas";
import mongoose from "mongoose";

const formRoutes = Router();

formRoutes.post("/save", async (req, res) => {
  let { _id, ...data } = req.body?.form;

  if (!data) {
    setStatusWithMessage(res, 400, "Form is Missing");
    return;
  }

  let isNew = false;
  if (!_id) {
    _id = new mongoose.Types.ObjectId();
    isNew = true;
  }

  try {
    const result = await FormModel.findByIdAndUpdate(_id, data, {
      setDefaultsOnInsert: true,
      upsert: true,
      new: true,
    });

    res.json({
      message: isNew ? "Created new document" : "Updated existing document",
      form: result,
    });
  } catch {
    setStatusWithMessage(res, 400, "Failed to save the form :(");
  }
});

function setStatusWithMessage(
  res: Response,
  code: number,
  message: string
): Response {
  return res.status(code).send(message);
}

export default formRoutes;
