import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const remoteUpload = multer({
    storage : multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILES_API_KEY,
        relativePath: '/library-books-api/*'
    })
})