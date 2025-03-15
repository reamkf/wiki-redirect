import worker from './worker';

describe('Worker のテスト', () => {
	// 日付をモック化するためのヘルパー関数
	function mockDate(isoDate) {
		const mockDate = new Date(isoDate);
		const originalDate = global.Date;
		const mockTimestamp = mockDate.getTime();

		// Date クラスをモック化
		global.Date = class extends Date {
			constructor(...args) {
				if (args.length === 0) {
					return mockDate;
				}
				return new originalDate(...args);
			}

			static now() {
				return mockTimestamp;
			}
		};

		// テスト後の後片付けのために元の Date を保存
		global.Date.originalDate = originalDate;
	}

	afterEach(() => {
		// 元の Date に戻す
		if (global.Date.originalDate) {
			global.Date = global.Date.originalDate;
		}
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

	test('CPU処理時間が10ミリ秒以内であること', async () => {
		mockDate('2024-03-01T00:00:00+09:00');
		const request = new Request('https://example.com/');

		const startTime = performance.now();
		await worker.fetch(request, {});
		const endTime = performance.now();

		const executionTime = endTime - startTime;
		expect(executionTime).toBeLessThan(10);
		console.log(`実行時間: ${executionTime.toFixed(2)}ミリ秒`);
	});

	// 負荷テストとして連続実行時の処理時間も確認
	test('100回連続実行しても各リクエストが10ミリ秒以内であること', async () => {
		mockDate('2024-03-01T00:00:00+09:00');
		const request = new Request('https://example.com/');

		const executionTimes = [];
		for (let i = 0; i < 100; i++) {
			const startTime = performance.now();
			await worker.fetch(request, {});
			const endTime = performance.now();
			executionTimes.push(endTime - startTime);
		}

		const maxExecutionTime = Math.max(...executionTimes);
		const avgExecutionTime = executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length;

		expect(maxExecutionTime).toBeLessThan(10);
		console.log(`最大実行時間: ${maxExecutionTime.toFixed(2)}ミリ秒`);
		console.log(`平均実行時間: ${avgExecutionTime.toFixed(2)}ミリ秒`);
	});
});