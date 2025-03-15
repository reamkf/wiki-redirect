import { getWikiNanodaPageUrl } from "./seesaawiki";
import { calculateSeasonCount, getJSTDate } from "./dojo-season";

async function handleRequest(request, env) {
	const url = new URL(request.url);
	const path = url.pathname;

	// /dojoへのアクセスを処理
	if (path === '/dojo') {
		// 現在の日本時間を取得
		const currentJST = getJSTDate(new Date());
		const currentCount = calculateSeasonCount(currentJST);

		// 道場ページへリダイレクト
		const dojoUrl = getWikiNanodaPageUrl(`シーサーバル道場（β2-${currentCount}）`);
		return Response.redirect(dojoUrl, 302);
	}

	// パスからページ名を抽出（先頭の/を除去）
	const pageName = path.substring(1);

	if (pageName) {
		// ページ名が指定されている場合、EUC-JPに変換してリダイレクト
		const decodedPageName = decodeURIComponent(pageName);
		const targetUrl = getWikiNanodaPageUrl(decodedPageName);

		return Response.redirect(targetUrl, 302);
	}

	// デフォルトの処理（ルートアクセスなど）
	return new Response('リダイレクト先が指定されていません。URLにページ名を指定してください。', {
		status: 400,
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}

export default {
	async fetch(request, env, ctx) {
		return handleRequest(request, env);
	}
};