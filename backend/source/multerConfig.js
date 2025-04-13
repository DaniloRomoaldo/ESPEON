import multer from "multer";
import path from "path";
import fs from 'fs';

export const storage = multer.diskStorage({
    destination: (req, file, callback) => {

        const dir = path.resolve("./domain/system/exercise_list/db_exercise_dumps");

        if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true})

        callback(null, dir);

    },
    filename: (req, file, callback) => {

        const name_list = req.query.name_list ;

        const new_file = `${name_list}_${file.originalname}`

        callback(null, new_file)
    }
})


export const addPathToBody = (req, res, next) => {
    if (req.file) {
      req.body.db_path = path.join(
        path.resolve("./domain/system/exercise_list/db_exercise_dumps"),
        req.file.filename
      ),
      req.query.db_name = req.file.filename;
    }
      next();
  };