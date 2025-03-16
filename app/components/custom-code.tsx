import React from 'react';

export default function CustomCode({ children }: { children: React.ReactNode }) {
	return (
		<code className="bg-gray-200 text-purple-900 px-2 py-1 rounded-md">
			{children}
		</code>
	);
}
