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

formRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    setStatusWithMessage(res, 400, "Invalid ID format");
    return;
  }

  try {
    const form = await FormModel.findById(id);

    if (!form) {
      setStatusWithMessage(res, 404, "Form not found");
      return;
    }

    res.json({
      message: "Form fetched successfully",
      form,
    });
  } catch (error) {
    console.error("Error fetching form:", error);
    setStatusWithMessage(res, 500, "Failed to fetch form");
  }
});

function setStatusWithMessage(
  res: Response,
  code: number,
  message: string
): Response {
  return res.status(code).json({ message });
}

export default formRoutes;
