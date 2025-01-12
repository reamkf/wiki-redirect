// 基準となる設定
const BASE_DATE = new Date('2020-08-01T00:00:00Z');  // UTC
const BASE_COUNT = 2;

function getJSTDate(date) {
	// UTCの時刻に9時間を加算してJSTに変換（ミリ秒単位で計算）
	const jstTime = date.getTime() + (9 * 60 * 60 * 1000);
	const jstDate = new Date(jstTime);

	// 日本時間の年月日を取得して、新しいDateオブジェクトを作成
	return new Date(Date.UTC(
		jstDate.getUTCFullYear(),
		jstDate.getUTCMonth(),
		jstDate.getUTCDate()
	));
}

function calculateSeasonCount(dateTimeJST) {
	// 基準日からの月数を計算
	const baseYear = BASE_DATE.getUTCFullYear();
	const baseMonth = BASE_DATE.getUTCMonth();

	const currentYear = dateTimeJST.getUTCFullYear();
	const currentMonth = dateTimeJST.getUTCMonth();

	// 経過した月数を計算
	const monthsDiff = (currentYear - baseYear) * 12 + (currentMonth - baseMonth);

	// 偶数月の数を計算（基準月を0として）
	const evenMonthsPassed = Math.floor(monthsDiff / 2);

	// 現在のカウントを計算
	return BASE_COUNT + evenMonthsPassed;
}

async function handleRequest(request, env) {
	// 現在の日本時間を取得
	const currentJST = getJSTDate(new Date());
	const currentCount = calculateSeasonCount(currentJST);

	// URLを組み立て
	const targetUrl = `https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d${currentCount}%a1%cb`;

	// デバッグ情報をコンソールに出力
	console.log({
		currentJST: currentJST.toISOString(),
		currentJSTYear: currentJST.getUTCFullYear(),
		currentJSTMonth: currentJST.getUTCMonth(),
		baseYear: BASE_DATE.getUTCFullYear(),
		baseMonth: BASE_DATE.getUTCMonth(),
		currentCount,
		targetUrl
	});

	// リダイレクト応答を返す
	return Response.redirect(targetUrl, 302);
}

export default {
	async fetch(request, env, ctx) {
		return handleRequest(request, env);
	}
};