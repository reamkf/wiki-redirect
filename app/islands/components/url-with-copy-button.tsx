import React from 'react';
import { useState } from 'react';
import CustomCode from '../../components/custom-code';
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

function copyToClipboard(text: string): Promise<void> {
	return navigator.clipboard.writeText(text);
};

export function CopyButton({ url }: { url: string }) {
	const [isCopied, setIsCopied] = useState(false);

	const baseUrl = import.meta.env.NEXT_PUBLIC_BASE_URL || 'https://wiki-redirect.reamkf-strcn.workers.dev';

	async function handleCopyButtonClick(url: string) {
		if(url.startsWith('/')) {
			url = `${baseUrl}${url}`;
		}

		try {
			await copyToClipboard(url);
			setIsCopied(true);
		} catch (error) {
			console.error('クリップボードへのコピーに失敗しました:', error);
			// iOSのSafariなどでは手動でコピーするための代替手段を提供
			const textArea = document.createElement('textarea');
			textArea.value = url;
			textArea.style.position = 'fixed';
			textArea.style.opacity = '0';
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();

			try {
				document.execCommand('copy');
				setIsCopied(true);
			} catch (err) {
				console.error('代替コピー方法も失敗しました:', err);
				alert('URLをコピーできませんでした。手動でコピーしてください: ' + url);
			}

			document.body.removeChild(textArea);
		}

		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	}

	const IconComponent = isCopied
		? ClipboardDocumentCheckIcon
		: ClipboardDocumentIcon ;

	return (
		<button
			onClick={() => handleCopyButtonClick(url)}
			className="ml-1 p-1 hover:bg-gray-200 rounded flex items-center"
			title="URLをコピー"
		>
			<IconComponent className="size-6" />
			<span className="ml-1 text-sm text-gray-500">
				{isCopied ? 'コピーしました' : 'コピー'}
			</span>
		</button>
	);
}

export type UrlWithCopyButtonProps = {
	url: string;
	text?: string;
}

export default function UrlWithCopyButton({ url, text }: UrlWithCopyButtonProps) {
	if(!text) {
		text = url;
	}
	return (
		<div className="flex items-center bg-gray-50 rounded-lg m-0">
			<a href={url} rel="noopener noreferrer">
				<CustomCode>{text}</CustomCode>
			</a>
			<CopyButton url={url} />
		</div>
	);
}