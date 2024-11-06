import { expect } from "chai"
import { httpsGet } from "../controllers/files.js"

describe("httpsGet", function () {
	it("should reject with an error if JSON parsing fails", async function () {
		const invalidJsonData = "Invalid JSON"

		try {
			await httpsGet({ data: invalidJsonData })
			throw new Error("Should have failed")
		} catch (error) {
			expect(error).to.be.an("error")
			expect(error.message).to.equal("Error parsing JSON")
		}
	})
})
