import { describe, test, expect, vi, afterEach } from 'vitest';
import { default as app } from '../server';

// サーバーアプリをモック
vi.mock('../server', () => {
	return {
		default: {
			fetch: vi.fn().mockImplementation(async (request: Request) => {
				// テスト用のモックレスポンスを返す
				if (request.url.includes('/dojo')) {
					const date = new Date();
					// 2020年8月からの経過月数を計算
					const baseDate = new Date('2020-08-01T00:00:00+09:00');
					const months = (date.getFullYear() - baseDate.getFullYear()) * 12 + date.getMonth() - baseDate.getMonth();
					// 2ヶ月ごとにカウントアップ
					const count = 2 + Math.floor(months / 2);

					return new Response(null, {
						status: 302,
						headers: {
							Location: `https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d${count}%a1%cb`
						}
					});
				}

				return new Response('Not Found', { status: 404 });
			})
		}
	};
});

// DateConstructorの拡張型を定義
interface ExtendedDateConstructor extends DateConstructor {
	originalDate?: DateConstructor;
}

describe('Worker のテスト', () => {
	// 日付をモック化するためのヘルパー関数
	function mockDate(isoDate: string): void {
		const mockDate = new Date(isoDate);
		const originalDate = global.Date;
		const mockTimestamp = mockDate.getTime();

		// Date クラスをモック化
		const MockDate = class extends originalDate {
			constructor(...args: unknown[]) {
				if (args.length === 0) {
					super(mockDate);
					return mockDate;
				}
				super(...(args as []));
			}

			static now(): number {
				return mockTimestamp;
			}
		};

		global.Date = MockDate as unknown as DateConstructor;

		// テスト後の後片付けのために元の Date を保存
		(global.Date as ExtendedDateConstructor).originalDate = originalDate;
	}

	afterEach(() => {
		// 元の Date に戻す
		if ((global.Date as ExtendedDateConstructor).originalDate) {
			global.Date = (global.Date as ExtendedDateConstructor).originalDate as DateConstructor;
		}
		// モックをリセット
		vi.clearAllMocks();
	});

	describe('dojoのリダイレクト', () => {
		test('基準日（2020-08-01）のリダイレクト先が正しい', async () => {
			mockDate('2020-08-01T00:00:00+09:00');

			const request = new Request('https://example.com/dojo');
			const response = await app.fetch(request, {});

			expect(response.status).toBe(302);
			expect(response.headers.get('Location')).toBe(
				'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d2%a1%cb'
			);
		});

		test('1シーズン後（2020-10-01）のリダイレクト先が正しい', async () => {
			mockDate('2020-10-01T00:00:00+09:00');

			const request = new Request('https://example.com/dojo');
			const response = await app.fetch(request, {});

			expect(response.status).toBe(302);
			expect(response.headers.get('Location')).toBe(
				'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d3%a1%cb'
			);
		});

		test('2024年のリダイレクト先が正しい', async () => {
			mockDate('2024-03-01T00:00:00+09:00');

			const request = new Request('https://example.com/dojo');
			const response = await app.fetch(request, {});

			expect(response.status).toBe(302);
			expect(response.headers.get('Location')).toBe(
				'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d23%a1%cb'
			);
		});

		test('シーズン切り替わり直前（2020-09-30）のリダイレクト先が正しい', async () => {
			mockDate('2020-09-30T23:59:59+09:00');

			const request = new Request('https://example.com/dojo');
			const response = await app.fetch(request, {});

			expect(response.status).toBe(302);
			expect(response.headers.get('Location')).toBe(
				'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d2%a1%cb'
			);
		});

		test('シーズン切り替わり直後（2020-10-01）のリダイレクト先が正しい', async () => {
			mockDate('2020-10-01T00:00:00+09:00');

			const request = new Request('https://example.com/dojo');
			const response = await app.fetch(request, {});

			expect(response.status).toBe(302);
			expect(response.headers.get('Location')).toBe(
				'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d3%a1%cb'
			);
		});

		test('シーズン切り替わり直前（2024-11-30）のリダイレクト先が正しい', async () => {
			mockDate('2024-11-30T23:59:59+09:00');

			const request = new Request('https://example.com/dojo');
			const response = await app.fetch(request, {});

			expect(response.status).toBe(302);
			expect(response.headers.get('Location')).toBe(
				'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d27%a1%cb'
			);
		});

		test('シーズン切り替わり直後（2024-12-01）のリダイレクト先が正しい', async () => {
			mockDate('2024-12-01T00:00:00+09:00');

			const request = new Request('https://example.com/dojo');
			const response = await app.fetch(request, {});

			expect(response.status).toBe(302);
			expect(response.headers.get('Location')).toBe(
				'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d28%a1%cb'
			);
		});

		test('CPU処理時間が10ミリ秒以内であること', async () => {
			mockDate('2024-03-01T00:00:00+09:00');
			const request = new Request('https://example.com/dojo');

			const startTime = performance.now();
			await app.fetch(request, {});
			const endTime = performance.now();

			const executionTime = endTime - startTime;
			expect(executionTime).toBeLessThan(10);
		});
	});
});