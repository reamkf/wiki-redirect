import { describe, expect, test } from 'vitest'
import { getPageEditUrl } from '../seesaawiki-edit-url'

const WIKI_BASE_URL = 'https://seesaawiki.jp/example_wiki'

function responseFromChunks(chunks: Uint8Array[], onCancel: () => void, keepOpen = false): Response {
	let index = 0

	return new Response(new ReadableStream({
		pull(controller) {
			if (index === chunks.length) {
				if (keepOpen) {
					controller.enqueue(new Uint8Array([120]))
					return
				}

				controller.close()
				return
			}

			controller.enqueue(chunks[index++])
		},
		cancel: onCancel,
	}))
}

describe('getPageEditUrl', () => {
	test('チャンク境界をまたぐ編集URLを見つけてストリームをキャンセルする', async () => {
		const encoder = new TextEncoder()
		const editUrl = `${WIKI_BASE_URL}/e/edit?id=123456`
		let cancelled = false
		const response = responseFromChunks([
			encoder.encode(`${'x'.repeat(6403)}${editUrl.slice(0, -4)}`),
			encoder.encode(`${editUrl.slice(-4)}${'x'.repeat(200_000)}`),
		], () => {
			cancelled = true
		}, true)

		const result = await getPageEditUrl(WIKI_BASE_URL, 'test', async () => response)

		expect(result).toBe(editUrl)
		expect(cancelled).toBe(true)
	})

	test('編集URLがなければnullを返す', async () => {
		const response = responseFromChunks([new TextEncoder().encode('no edit url')], () => {})

		await expect(getPageEditUrl(WIKI_BASE_URL, 'test', async () => response)).resolves.toBeNull()
	})

	test('編集IDのない候補を無視する', async () => {
		const encoder = new TextEncoder()
		const body = `${WIKI_BASE_URL}/e/edit?id=x ${WIKI_BASE_URL}/e/edit?id=42`
		const response = responseFromChunks([encoder.encode(body)], () => {})

		await expect(getPageEditUrl(WIKI_BASE_URL, 'test', async () => response)).resolves.toBe(
			`${WIKI_BASE_URL}/e/edit?id=42`,
		)
	})

	test('cancels the upstream error response body', async () => {
		let cancelled = false
		const response = new Response(new ReadableStream({
			start(controller) {
				controller.enqueue(new Uint8Array([120]))
			},
			cancel() {
				cancelled = true
			},
		}), { status: 500 })

		await expect(getPageEditUrl(WIKI_BASE_URL, 'test', async () => response)).resolves.toBeNull()
		expect(cancelled).toBe(true)
	})
})
