import express from "express"
import cors from "cors"
import filesRouter from "../routes/files.js"
class Server {
	constructor() {
		this.app = express()
		this.port = 3200
		this.paths = {
			files: "/files/data",
		}
		this.middlewares()
		this.routes()
	}
	middlewares() {
		this.app.use(cors())
		this.app.use(express.json())
		this.app.use(express.static("public"))
	}
	routes() {
		this.app.use(this.paths.files, filesRouter)
	}
	listen() {
		this.app.listen(this.port, () => {
			console.log("Server runing in port: ", this.port)
		})
	}
}
export default Server
