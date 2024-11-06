import https from "https"
import { validateResponseSchema } from "../models/fileData.js"

const isNumeric = (value) => /^[0-9]+$/.test(value)

export const httpsGet = (options) =>
	new Promise((resolve, reject) => {
		if (options.data) {
			try {
				const parsedData = JSON.parse(options.data)
				resolve(parsedData)
			} catch (error) {
				reject(new Error("Error parsing JSON"))
			}
			return
		}
		https.get(options, (response) => {
			let data = ""

			response.on("data", (chunk) => {
				data += chunk
			})

			response.on("end", () => {
				try {
					resolve(JSON.parse(data))
				} catch (error) {
					reject(new Error("Error parsing JSON"))
				}
			})

			response.on("error", (error) => {
				reject(error)
			})
		})
	})

export const getFilesData = async (req, res) => {
	try {
		if (req.testData) {
			const results = req.testData
			if (validateResponseSchema(results)) {
				res.status(200).json(results)
			} else {
				res.status(500).json({ message: "Invalid response schema" })
			}
			return
		}
		const fileOptions = {
			hostname: "echo-serv.tbxnet.com",
			path: "/v1/secret/files",
			method: "GET",
			headers: {
				Authorization: "Bearer aSuperSecretKey",
				"Content-Type": "application/json",
			},
		}

		const fileListResponse = await httpsGet(fileOptions)
		const files = fileListResponse.files

		const results = []
		for (const file of files) {
			const fileDataOptions = {
				hostname: "echo-serv.tbxnet.com",
				path: `/v1/secret/file/${file}`,
				method: "GET",
				headers: {
					Authorization: "Bearer aSuperSecretKey",
					"Content-Type": "application/json",
				},
			}

			try {
				const fileData = await fetchFileData(fileDataOptions, file)
				if (fileData.lines.length > 0) {
					results.push(fileData)
				}
			} catch (error) {
				console.error(`Error retrieving data for file ${file}:`, error)
			}
		}

		if (results.length > 0) {
			res.status(200).json(results)
		} else {
			res.status(500).json({ message: "Error retrieving files data" })
		}
	} catch (error) {
		console.error("Error retrieving files data:", error)
		res.status(500).json({ message: "Error retrieving files data" })
	}
}

export const fetchFileData = (options, fileName) =>
	new Promise((resolve, reject) => {
		if (options.data) {
			const fileContent = { file: fileName, lines: [] }
			const lines = options.data.split("\n")

			for (let i = 1; i < lines.length; i++) {
				const [file, text, number, hex] = lines[i].split(",")
				if (
					file &&
					text &&
					number &&
					isNumeric(number) &&
					hex &&
					/^[0-9a-fA-F]{32}$/.test(hex.trim())
				) {
					fileContent.lines.push({
						text: text.trim(),
						number: parseInt(number.trim(), 10),
						hex: hex.trim(),
					})
				}
			}

			resolve(fileContent)
			return
		}
		https.get(options, (response) => {
			let data = ""

			response.on("data", (chunk) => {
				data += chunk
			})

			response.on("end", () => {
				const fileContent = { file: fileName, lines: [] }

				const lines = data.split("\n")
				for (let i = 1; i < lines.length; i++) {
					const [file, text, number, hex] = lines[i].split(",")
					if (
						file &&
						text &&
						number &&
						isNumeric(number) &&
						hex &&
						/^[0-9a-fA-F]{32}$/.test(hex.trim())
					) {
						fileContent.lines.push({
							text: text.trim(),
							number: parseInt(number.trim(), 10),
							hex: hex.trim(),
						})
					}
				}

				resolve(fileContent)
			})

			response.on("error", (error) => {
				reject(error)
			})
		})
	})
