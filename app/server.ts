import { Hono } from 'hono'
import { getPageAddUrl, getPageHistoryUrl, getPageUrl } from 'seesaawiki-url'
import { getCurrentSeasonCount } from './utils/dojo-season'
import { SEESAA_WIKI_BASE_URL } from './utils/seesaawiki-base-url'
import { getPageEditUrl } from './utils/seesaawiki-edit-url'

const app = new Hono()

app.get('/page/:name', (c) => {
	const name = c.req.param('name')
	return c.redirect(getPageUrl(SEESAA_WIKI_BASE_URL, name))
})

app.get('/history/:name', (c) => {
	const name = c.req.param('name')
	return c.redirect(getPageHistoryUrl(SEESAA_WIKI_BASE_URL, name))
})

app.get('/hist/:name', (c) => {
	const name = c.req.param('name')
	return c.redirect(getPageHistoryUrl(SEESAA_WIKI_BASE_URL, name))
})

app.get('/add/:name', (c) => {
	const name = c.req.param('name')
	return c.redirect(getPageAddUrl(SEESAA_WIKI_BASE_URL, name))
})

app.get('/edit/:name', async (c) => {
	const name = c.req.param('name')
	const url = await getPageEditUrl(SEESAA_WIKI_BASE_URL, name)

	if (!url) {
		return c.notFound()
	}

	return c.redirect(url)
})

app.get('/dojo', (c) => {
	const currentCount = getCurrentSeasonCount()
	const dojoUrl = getPageUrl(SEESAA_WIKI_BASE_URL, `シーサーバル道場（β2-${currentCount}）`)

	return c.redirect(dojoUrl)
})

app.notFound((c) => c.redirect('/'))

export default app
