import { getWikiNanodaPageEditUrl, getWikiNanodaPageUrl } from '../seesaawiki';
import { describe, test, expect } from 'vitest';

const testCases = [
	{
		pageName: 'トップページ',
		pageUrl: 'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%c8%a5%c3%a5%d7%a5%da%a1%bc%a5%b8',
		editUrl: 'https://seesaawiki.jp/kemono_friends3_5ch/e/edit?id=2398192',
	},
	{
		pageName: 'レガシー_スキル効果別フレンズ一覧/バフ・デバフ',
		pageUrl: 'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%ec%a5%ac%a5%b7%a1%bc%5f%a5%b9%a5%ad%a5%eb%b8%fa%b2%cc%ca%cc%a5%d5%a5%ec%a5%f3%a5%ba%b0%ec%cd%f7/%a5%d0%a5%d5%a1%a6%a5%c7%a5%d0%a5%d5',
		editUrl: 'https://seesaawiki.jp/kemono_friends3_5ch/e/edit?id=5250119',
	},
	{
		pageName: 'わたしたちとあそぼ♡',
		pageUrl: 'https://seesaawiki.jp/kemono_friends3_5ch/d/%a4%ef%a4%bf%a4%b7%a4%bf%a4%c1%a4%c8%a4%a2%a4%bd%a4%dc%26%239825%3b',
		editUrl: 'https://seesaawiki.jp/kemono_friends3_5ch/e/edit?id=5077099',
	},
	{
		pageName: 'Ｑ＆Ａ',
		pageUrl: 'https://seesaawiki.jp/kemono_friends3_5ch/d/%a3%d1%a1%f5%a3%c1',
		editUrl: 'https://seesaawiki.jp/kemono_friends3_5ch/e/edit?id=2398249',
	},
	{
		pageName: 'シーサーバル道場（β2-29）',
		pageUrl: 'https://seesaawiki.jp/kemono_friends3_5ch/d/%a5%b7%a1%bc%a5%b5%a1%bc%a5%d0%a5%eb%c6%bb%be%ec%a1%ca%a6%c22%2d29%a1%cb',
		editUrl: 'https://seesaawiki.jp/kemono_friends3_5ch/e/edit?id=5240624',
	},
	{
		pageName: 'Dear my friends',
		pageUrl: 'https://seesaawiki.jp/kemono_friends3_5ch/d/Dear%20my%20friends',
		editUrl: 'https://seesaawiki.jp/kemono_friends3_5ch/e/edit?id=2917676',
	},
];

describe('ページURLの取得', () => {
	for (const testCase of testCases) {
		test(`${testCase.pageName}のページURLが正しい`, () => {
			const actual = getWikiNanodaPageUrl(testCase.pageName);
			expect(actual).toBe(testCase.pageUrl);
		});
	}
});

describe('編集URLの取得', () => {
	for (const testCase of testCases) {
		test(`${testCase.pageName}の編集URLが正しい`, async () => {
			const actual = await getWikiNanodaPageEditUrl(testCase.pageName);
			expect(actual).toBe(testCase.editUrl);
		});
	}
});