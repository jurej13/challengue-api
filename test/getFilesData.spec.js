import { expect } from "chai"
import { getFilesData } from "../controllers/files.js"

describe("getFilesData", function () {
	it("should return structured data if files are retrieved and parsed correctly", async function () {
		const req = {
			query: {
				fileName: "test.csv",
			},
			testData: [
				{
					file: "test.csv",
					lines: [
						{
							text: "test text",
							number: 123,
							hex: "0123456789abcdef0123456789abcdef",
						},
					],
				},
			],
		}

		const res = {
			json(data) {
				expect(data).to.be.an("array")
				expect(data[0]).to.have.property("file")
				expect(data[0]).to.have.property("lines")
				expect(data[0].file).to.equal("test.csv")
			},
			status(code) {
				expect(code).to.equal(200)
				return this
			},
		}

		await getFilesData(req, res)
	})
	it("should handle errors and return status 500", async function () {
		const req = {
			query: {
				fileName: "nonexistent.csv",
			},
			testData: [
				{
					file: "test.csv",
					lines: [
						{
							text: "test text",
							number: 123,
							hex: "0123456789abcdef0123456789abcdef",
						},
					],
				},
			],
		}

		const res = {
			json(data) {
				expect(data)
					.to.have.property("message")
					.that.equals("Error retrieving files data")
			},
			status(code) {
				expect(code).to.equal(500)
				return this
			},
		}

		await getFilesData(req, res)
	})
})
