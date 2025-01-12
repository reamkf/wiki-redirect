// 基準となる設定
const BASE_DATE = new Date('2020-08-01T00:00:00+09:00');  // JST
const BASE_COUNT = 2;

function getJSTDate(date) {
	// UTCの時刻を取得
	const utc = date.getTime();
	// JSTのオフセット（+9時間）を適用
	const jstOffset = 9 * 60 * 60 * 1000;

	// 新しいDateオブジェクトを作成（JSTベース）
	return new Date(utc + jstOffset);
}

function calculateSeasonCount(dateTimeJST) {
	// 基準日からの月数を計算
	const baseYear = BASE_DATE.getFullYear();
	const baseMonth = BASE_DATE.getMonth();

	const currentYear = dateTimeJST.getFullYear();
	const currentMonth = dateTimeJST.getMonth();

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

	// 新しいURLを組み立て
	const newUrl = `https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d${currentCount}%a1%cb`;

	// デバッグ情報をコンソールに出力
	console.log({
		currentJST: currentJST.toISOString(),
		currentCount,
		newUrl
	});

	// リダイレクト応答を返す
	return Response.redirect(newUrl, 302);
}

export default {
	async fetch(request, env, ctx) {
		return handleRequest(request, env);
	}
};