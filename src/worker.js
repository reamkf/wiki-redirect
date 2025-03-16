import { getWikiNanodaPageUrl, getWikiNanodaPageAddUrl } from "./seesaawiki";
import { getCurrentSeasonCount } from "./dojo-season";

async function handleRequest(request, env) {
	const url = new URL(request.url);
	const path = url.pathname;

	// /dojoへのアクセスを処理
	if (path === '/dojo') {
		const currentCount = getCurrentSeasonCount();
		const dojoUrl = getWikiNanodaPageUrl(`シーサーバル道場（β2-${currentCount}）`);
		return Response.redirect(dojoUrl, 302);
	} else if (path.startsWith('/page/')) {
		const pageName = path.substring(6);

		if (pageName) {
			// ページ名が指定されている場合、EUC-JPに変換してリダイレクト
			const decodedPageName = decodeURIComponent(pageName);
			const targetUrl = getWikiNanodaPageUrl(decodedPageName);

			return Response.redirect(targetUrl, 302);
		}
	} else if (path.startsWith('/add/')) {
		const pageName = path.substring(5);

		if (pageName) {
			// ページ名が指定されている場合、EUC-JPに変換してリダイレクト
			const decodedPageName = decodeURIComponent(pageName);
			const targetUrl = getWikiNanodaPageAddUrl(decodedPageName);

			return Response.redirect(targetUrl, 302);
		}
	}

	// デフォルトの処理（ルートアクセスなど）
	return new Response(`
リダイレクト先が指定されていません。<br><br>
<a href="/dojo">/dojo</a> にアクセスすると最新の道場ページへリダイレクトされます。<br>
その他の任意の文字列を指定するとそのページ名を持つページへリダイレクトされます。
`, {
		status: 400,
		headers: { 'Content-Type': 'text/html; charset=utf-8' }
	});
}

export default {
	async fetch(request, env, ctx) {
		return handleRequest(request, env);
	}
};