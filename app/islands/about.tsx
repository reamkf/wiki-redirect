import React from 'react';
import { useState } from 'react';
import UrlWithCopyButton from './components/url-with-copy-button';
import CustomCode from '../components/custom-code';

export default function About() {
	const [pageName, setPageName] = useState('');

	const dojoPath = `/dojo`;
	const pagePath = `/page/${pageName}`;
	const addPath = `/add/${pageName}`;

	return (
		<div className="p-0 md:p-8">
			<div className="max-w-4xl p-6 md:p-8 mx-auto bg-gray-50 md:rounded-lg">
				<h1 className="text-4xl font-bold text-green-500 mb-4">なのだWikiリダイレクト</h1>

				{/* サービス説明 */}
				<section className="mb-8 space-y-2">
					<p>
						アプリ版けものフレンズ３wikiなのだ！(<a href='https://seesaawiki.jp/kemono_friends3_5ch/'>https://seesaawiki.jp/kemono_friends3_5ch/</a>)のページへリダイレクトするサイトです。
					</p>
					<p>
						Seesaa WikiではURLのエンコードにEUC-JPを使用しているため、Discordなどに貼り付けた際に不具合が生じたり、ブラウザーの検索エンジンに登録できなかったりします。
						このサイトは、UTF-8でURLを受け付け、EUC-JPに変換してリダイレクトします。
					</p>
				</section>

				<section className="my-8">
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
							onChange={(e) => {
								const value = (e.target as HTMLInputElement).value;
								setPageName(value);
							}}
							className="w-full p-2 border rounded"
							placeholder="例: ウミネコ"
						/>
					</div>
					<div className="space-y-4">
						<UrlWithCopyButton url={`${dojoPath}`}/>
						<UrlWithCopyButton url={`${pagePath}`}/>
						<UrlWithCopyButton url={`${addPath}`}/>
					</div>
				</section>
			</div>
		</div>
	);
}
