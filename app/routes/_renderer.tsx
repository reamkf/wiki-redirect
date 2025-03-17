import React from 'react'
import { reactRenderer } from '@hono/react-renderer'
import { HasIslands, Link } from 'honox/server'

export default reactRenderer(({ children }) => {
	return (
		<html lang='ja'>
			<head>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				{import.meta.env.PROD ? (
					<>
						<link rel='stylesheet' href='/static/assets/style.css' />
						<HasIslands>
							<script type='module' src='/static/client.js'></script>
						</HasIslands>
					</>
				) : (
					<>
						<Link rel='stylesheet' href='/app/style.css' />
						<script type='module' src='/app/client.ts'></script>
					</>
				)}
			</head>
			<body>{children}</body>
		</html>
	)
})