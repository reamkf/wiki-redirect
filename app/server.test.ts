import { describe, expect, test } from 'vitest'
import { getPageAddUrl, getPageHistoryUrl, getPageUrl } from 'seesaawiki-url'
import app from './server'
import { SEESAA_WIKI_BASE_URL } from './utils/seesaawiki-base-url'

describe('redirect routes', () => {
	test.each([
		['/page/けものフレンズ', getPageUrl(SEESAA_WIKI_BASE_URL, 'けものフレンズ')],
		['/history/けものフレンズ', getPageHistoryUrl(SEESAA_WIKI_BASE_URL, 'けものフレンズ')],
		['/hist/けものフレンズ', getPageHistoryUrl(SEESAA_WIKI_BASE_URL, 'けものフレンズ')],
		['/add/けものフレンズ', getPageAddUrl(SEESAA_WIKI_BASE_URL, 'けものフレンズ')],
	] as const)('%s redirects to the wiki URL', async (path, expectedLocation) => {
		const response = await app.request(path)

		expect(response.status).toBe(302)
		expect(response.headers.get('location')).toBe(expectedLocation)
	})

	test('unknown paths redirect to the static home page', async () => {
		const response = await app.request('/unknown')

		expect(response.status).toBe(302)
		expect(response.headers.get('location')).toBe('/')
	})
})
