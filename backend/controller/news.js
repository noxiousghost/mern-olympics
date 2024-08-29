import { Router } from "express";
import News from "../models/news.js";
import { newsExists } from "../utils/existsMiddleware.js";
import { checkAdmin, setFileType } from "../utils/middleware.js";
import { uploadImage, s3, fileSizeLimitErrorHandler } from "../utils/multer.js";
import { SECRET, AWS_S3_BUCKET_NAME, FILE_STORAGE } from "../utils/config.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";

const newsRouter = Router();

newsRouter.get("/", async (request, response) => {
  const news = await News.find({}).populate("user", { username: 1, email: 1 });
  return response.status(200).json(news);
});

newsRouter.get("/:id", async (request, response) => {
  const news = await News.findById(request.params.id).populate("user", {
    username: 1,
    email: 1,
  });
  news
    ? response.status(200).json(news)
    : response.status(404).json({ error: "News doesn't exists!" }).end();
});

newsRouter.post(
  "/",
  setFileType,
  checkAdmin,
  uploadImage,
  newsExists,
  fileSizeLimitErrorHandler,
  async (request, response) => {
    const body = request.body;
    const token = request.token;
    const user = request.user;
    let imagePath;

    if (FILE_STORAGE == "aws") {
      if (request.file && request.file.location) {
        imagePath = request.file.location; // S3 location URL
      }
    } else if (FILE_STORAGE == "disk") {
      const { path } = request.file;
      if (path) {
        imagePath = path.replace("public", "");
      }
    } else {
      return response.json({ error: "invalid image path" });
    }
    const decodeToken = jwt.verify(token, SECRET);

    if (!(user && token && decodeToken.id)) {
      return response.status(401).json({ error: "Token missing or invalid!" });
    }

    const news = await new News({
      title: body.title,
      description: body.description,
      image: imagePath,
      user: user.id,
    }).populate("user", { username: 1, email: 1 });
    const savedNews = await news.save();
    savedNews
      ? response.status(201).json(savedNews)
      : response
          .status(400)
          .json({
            error: "Failed to save!",
          })
          .end();
  }
);

newsRouter.patch("/:id", checkAdmin, async (request, response) => {
  const findAndUpdate = await News.findByIdAndUpdate(
    request.params.id,
    request.body,
    { runValidators: true }
  );
  const updatedData = await News.findById(request.params.id);
  findAndUpdate
    ? response.status(200).json(updatedData)
    : response
        .status(400)
        .json({
          error: "Failed to update",
        })
        .end();
});

newsRouter.delete("/:id", checkAdmin, async (request, response) => {
  const token = request.token;
  const user = request.user;
  const decodeToken = jwt.verify(token, SECRET);
  if (!(token && user && decodeToken.id)) {
    return response.status(401).json({ error: "token is missing or invalid" });
  }
  const exists = await News.findById(request.params.id);
  if (!exists) {
    return response.status(400).json({ error: "News doesnot exists" });
  }
  if (FILE_STORAGE == "aws") {
    const imageUrl = exists.image;
    const imageKey = imageUrl.split("s3.amazonaws.com/").pop();
    // Delete the image from S3
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: imageKey,
    };
    await s3.deleteObject(params).promise();
  } else if (FILE_STORAGE == "disk") {
    const deletePath = path.join("public", exists.image);
    fs.rmSync(deletePath);
    const result = await News.deleteOne({ _id: request.params.id });
    if (result.deletedCount === 1) {
      response.status(204).end();
    } else {
      return response.status(400).json({ error: "Failed to delete" });
    }
  } else {
    return response.status(400).json({ error: "Invalid image path" });
  }

  // delete news article from database
  try {
    // Now delete the news article from the database
    const result = await News.deleteOne({ _id: request.params.id });
    if (result.deletedCount === 1) {
      response.status(204).end();
    } else {
      return response
        .status(400)
        .json({ error: "Failed to delete the news article" });
    }
  } catch (error) {
    console.error("Error deleting image from S3:", error);
    return response
      .status(500)
      .json({ error: "Failed to delete the image from S3" });
  }
});

// Get comments for a news article
newsRouter.get("/:id/comments", async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate(
      "comments.postedBy",
      "username"
    );
    res.json(news.comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Post a comment to a news article
newsRouter.post("/:id/comments", async (req, res) => {
  try {
    const { text } = req.body;
    const user = req.user; // Assuming user is authenticated and available in req.user
    const news = await News.findById(req.params.id);

    const newComment = {
      text,
      postedBy: user._id,
    };

    news.comments.push(newComment);
    await news.save();

    const populatedComment = await News.populate(newComment, {
      path: "postedBy",
      select: "username",
    });

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
});

export default newsRouter;
