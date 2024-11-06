import { expect } from "chai"
import { fetchFileData } from "../controllers/files.js"

describe("fetchFileData", function () {
	it("should parse CSV data correctly and return structured file content", async function () {
		const csvData =
			"file,text,number,hex\nfile1,text1,1234,abcdefabcdefabcdefabcdefabcdefab\nfile1,text2,5678,abcdefabcdefabcdefabcdefabcdefac"

		const result = await fetchFileData({ data: csvData }, "file1.csv")

		expect(result).to.deep.equal({
			file: "file1.csv",
			lines: [
				{
					text: "text1",
					number: 1234,
					hex: "abcdefabcdefabcdefabcdefabcdefab",
				},
				{
					text: "text2",
					number: 5678,
					hex: "abcdefabcdefabcdefabcdefabcdefac",
				},
			],
		})
	})

	it("should skip lines that do not have a valid 32-character hex value", async function () {
		const csvData =
			"file,text,number,hex\nfile1,text1,1234,abcdefabcdefabcdefabcdefabcdefab\nfile1,text2,5678,invalidhex"

		const result = await fetchFileData({ data: csvData }, "file1.csv")

		expect(result).to.deep.equal({
			file: "file1.csv",
			lines: [
				{
					text: "text1",
					number: 1234,
					hex: "abcdefabcdefabcdefabcdefabcdefab",
				},
			],
		})
	})
})
