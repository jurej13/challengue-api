const validateResponseSchema = (response) => {
	if (!Array.isArray(response)) return false

	return response.every((fileData) => validateFileSchema(fileData))
}

const validateFileSchema = (fileData) => {
	if (
		typeof fileData !== "object" ||
		!fileData.file ||
		!Array.isArray(fileData.lines)
	)
		return false

	return (
		fileData.lines.every((line) => validateLineSchema(line)) ||
		fileData.lines.length !== 0
	)
}

const validateLineSchema = (line) => {
	return (
		typeof line === "object" &&
		typeof line.text === "string" &&
		typeof line.number === "number" &&
		typeof line.hex === "string" &&
		/^[0-9a-fA-F]{32}$/.test(line.hex)
	)
}

export { validateResponseSchema, validateFileSchema, validateLineSchema }
