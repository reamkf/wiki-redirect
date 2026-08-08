import { getPageUrl } from 'seesaawiki-url'

const EDIT_URL_SUFFIX = '/e/edit?id='

function normalizeWikiBaseUrl(baseUrl: string): string {
	return baseUrl.replace(/\/+$/, '')
}

function buildPrefixTable(pattern: Uint8Array): Uint32Array {
	const table = new Uint32Array(pattern.length)
	let prefixLength = 0

	for (let index = 1; index < pattern.length; index++) {
		while (prefixLength > 0 && pattern[index] !== pattern[prefixLength]) {
			prefixLength = table[prefixLength - 1]
		}

		if (pattern[index] === pattern[prefixLength]) {
			prefixLength++
		}

		table[index] = prefixLength
	}

	return table
}

export async function getPageEditUrl(
	baseUrl: string,
	pageName: string,
	fetchImpl: typeof fetch = fetch,
): Promise<string | null> {
	const response = await fetchImpl(getPageUrl(baseUrl, pageName))
	if (!response.ok) {
		await response.body?.cancel()
		return null
	}

	if (response.body === null) {
		return null
	}

	const editUrlPrefix = `${normalizeWikiBaseUrl(baseUrl)}${EDIT_URL_SUFFIX}`
	const prefixBytes = new TextEncoder().encode(editUrlPrefix)
	const prefixTable = buildPrefixTable(prefixBytes)
	const reader = response.body.getReader()
	let prefixLength = 0
	let readingId = false
	let editId = ''

	try {
		while (true) {
			const { done, value } = await reader.read()

			if (done) {
				if (readingId && editId.length > 0) {
					await reader.cancel()
					return `${editUrlPrefix}${editId}`
				}

				return null
			}

			for (const byte of value) {
				if (readingId) {
					if (byte >= 48 && byte <= 57) {
						editId += String.fromCharCode(byte)
						continue
					}

					if (editId.length > 0) {
						await reader.cancel()
						return `${editUrlPrefix}${editId}`
					}

					readingId = false
					prefixLength = byte === prefixBytes[0] ? 1 : 0
					continue
				}

				while (prefixLength > 0 && byte !== prefixBytes[prefixLength]) {
					prefixLength = prefixTable[prefixLength - 1]
				}

				if (byte === prefixBytes[prefixLength]) {
					prefixLength++
				}

				if (prefixLength === prefixBytes.length) {
					prefixLength = 0
					readingId = true
				}
			}
		}
	} finally {
		reader.releaseLock()
	}
}
