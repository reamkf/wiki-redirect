import { jest } from '@jest/globals';
import worker from './worker';

describe('Worker のテスト', () => {
	// 日付をモック化するためのヘルパー関数
	function mockDate(isoDate) {
		const mockDate = new Date(isoDate);
		jest.spyOn(global, 'Date')
			.mockImplementation(() => mockDate);
	}

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('基準日（2020-08-01）のリダイレクト先が正しい', async () => {
		mockDate('2020-08-01T00:00:00+09:00');

		const request = new Request('https://example.com/');
		const response = await worker.fetch(request, {});

		expect(response.status).toBe(302);
		expect(response.headers.get('Location')).toBe(
			'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d2%a1%cb'
		);
	});

	test('1シーズン後（2020-10-01）のリダイレクト先が正しい', async () => {
		mockDate('2020-10-01T00:00:00+09:00');

		const request = new Request('https://example.com/');
		const response = await worker.fetch(request, {});

		expect(response.status).toBe(302);
		expect(response.headers.get('Location')).toBe(
			'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d3%a1%cb'
		);
	});

	test('2024年のリダイレクト先が正しい', async () => {
		mockDate('2024-03-01T00:00:00+09:00');

		const request = new Request('https://example.com/');
		const response = await worker.fetch(request, {});

		// 2020-08から2024-03までの偶数月数を計算
		// (2024-2020)*12 + (3-8) = 43ヶ月
		// 43÷2の切り捨て = 21
		// BASE_COUNT(2) + 21 = 23
		expect(response.status).toBe(302);
		expect(response.headers.get('Location')).toBe(
			'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d23%a1%cb'
		);
	});

	test('シーズン切り替わり直前（2020-09-30）のリダイレクト先が正しい', async () => {
		mockDate('2020-09-30T23:59:59+09:00');

		const request = new Request('https://example.com/');
		const response = await worker.fetch(request, {});

		expect(response.status).toBe(302);
		expect(response.headers.get('Location')).toBe(
			'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d2%a1%cb'
		);
	});

	test('シーズン切り替わり直後（2020-10-01）のリダイレクト先が正しい', async () => {
		mockDate('2020-10-01T00:00:00+09:00');

		const request = new Request('https://example.com/');
		const response = await worker.fetch(request, {});

		expect(response.status).toBe(302);
		expect(response.headers.get('Location')).toBe(
			'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d3%a1%cb'
		);
	});

	test('シーズン切り替わり直前（2024-11-30）のリダイレクト先が正しい', async () => {
		mockDate('2024-11-30T23:59:59+09:00');

		const request = new Request('https://example.com/');
		const response = await worker.fetch(request, {});

		expect(response.status).toBe(302);
		expect(response.headers.get('Location')).toBe(
			'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d27%a1%cb'
		);
	});

	test('シーズン切り替わり直後（2024-12-01）のリダイレクト先が正しい', async () => {
		mockDate('2024-12-01T00:00:00+09:00');

		const request = new Request('https://example.com/');
		const response = await worker.fetch(request, {});

		expect(response.status).toBe(302);
		expect(response.headers.get('Location')).toBe(
			'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d28%a1%cb'
		);
	});
});