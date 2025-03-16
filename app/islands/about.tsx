import React from 'react';
import { useState } from 'react';
import UrlWithCopyButton from './components/url-with-copy-button';

export default function About() {
	const [pageName, setPageName] = useState('ページ名');

	const dojoPath = `/dojo`;
	const pagePath = `/page/${pageName}`;
	const addPath = `/add/${pageName}`;

	return (
		<div className="p-0 sm:p-8">
			<div className="max-w-4xl p-6 sm:p-8 mx-auto space-y-4 bg-gray-50 sm:rounded-lg">
				<h1 className="text-4xl font-bold">なのだWikiリダイレクト</h1>

				{/* サービス説明 */}
				<section className="space-y-1">
					<p>
						<a
							className='text-green-500 font-bold'
							href='https://seesaawiki.jp/kemono_friends3_5ch/'
							rel='noreferrer'
						>
							アプリ版けものフレンズ３wikiなのだ！
						</a>
						のページへリダイレクトするサイトです。
					</p>
					<p>
						Seesaa WikiではURLのエンコードにEUC-JPを使用しているため、Discordなどに貼り付けた際に不具合が生じたり、ブラウザーの検索エンジンに登録できなかったりします。
					</p>
					<p>
						このサイトは、UTF-8でURLを受け付け、EUC-JPに変換してリダイレクトします。
					</p>
				</section>

				<section className="space-y-4">
					<div>
						<label htmlFor="pageName" className="block font-medium">
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
							className="w-full p-2 border-gray-400 border rounded"
							placeholder="例: ウミネコ"
						/>
					</div>
					<ul className="space-y-2 list-disc list-inside">
						<li className="flex items-center">•<UrlWithCopyButton url={`${dojoPath}`}/> <span className="ml-2">: 最新の道場ページ</span></li>
						<li className="flex items-center">•<UrlWithCopyButton url={`${pagePath}`}/> <span className="ml-2">: 指定したページ</span></li>
						<li className="flex items-center">•<UrlWithCopyButton url={`${addPath}`}/> <span className="ml-2">: 新規作成ページ</span></li>
					</ul>
				</section>
			</div>
		</div>
	);
}
