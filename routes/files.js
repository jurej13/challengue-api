import { Router } from "express"
import { getFilesData, getFilesList } from "../controllers/files.js"

const router = Router()

router.get("/data", getFilesData)

router.get("/list", getFilesList)

export default router
