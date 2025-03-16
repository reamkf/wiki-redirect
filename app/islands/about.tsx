import React from 'react';
import { useState } from 'hono/jsx';
import UrlWithCopyButton from './components/url-with-copy-button';
import CustomCode from '../components/custom-code';

export default function About() {
	const [pageName, setPageName] = useState('');
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wiki-redirect.reamkf-strcn.workers.dev';

	const handlePageNameChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		setPageName(target.value);
	};

	const dojoPath = `/dojo`;
	const pagePath = `/page/${pageName}`;
	const addPath = `/add/${pageName}`;

	return (
		<div className="max-w-4xl mx-auto p-8 m-8 bg-gray-50 rounded-lg">
			<h1 className="text-4xl font-bold text-green-500 mb-8">なのだWikiリダイレクト</h1>

			{/* サービス説明 */}
			<section className="mb-12">
				Seesaa WikiではURLのエンコードにEUC-JPを使用しているため、Discordなどに貼り付けた際に不具合が生じたり、ブラウザーの検索エンジンに登録できない問題があります。
				このサービスは、UTF-8でURLを受け付け、EUC-JPに変換してリダイレクトします。
			</section>

			<section className="my-7">
				<h2 className="text-2xl font-semibold mb-4">使用可能なURL</h2>
				<ul className="space-y-2 list-disc list-inside">
					<li><a href='/dojo'><CustomCode>/dojo</CustomCode></a> : 最新の道場ページへリダイレクト</li>
					<li><CustomCode>/page/ページ名</CustomCode> : 指定したページへリダイレクト</li>
					<li><CustomCode>/add/ページ名</CustomCode> : 新しいページの作成ページへリダイレクト</li>
				</ul>
			</section>

			{/* リンク生成ツール */}
			<section className="space-y-6">
				<div>
					<label htmlFor="pageName" className="block font-medium mb-2">
						ページ名を入力
					</label>
					<input
						type="text"
						id="pageName"
						value={pageName}
						onChange={handlePageNameChange}
						className="w-full p-2 border rounded"
						placeholder="例: getting-started"
					/>
				</div>
				<div className="space-y-4">
					<UrlWithCopyButton url={dojoPath} text={`${baseUrl}${dojoPath}`}/>
					<UrlWithCopyButton url={pagePath} text={`${baseUrl}${pagePath}`}/>
					<UrlWithCopyButton url={addPath} text={`${baseUrl}${addPath}`}/>
				</div>
			</section>
		</div>
	);
}
