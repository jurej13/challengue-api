import { Router } from "express"
import { getFilesData } from "../controllers/files.js"

const router = Router()

router.get("/", getFilesData)

export default router
