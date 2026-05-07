import { createRoute } from 'honox/factory'
import { getPageAddUrl } from 'seesaawiki-url';
import { SEESAA_WIKI_BASE_URL } from '../../utils/seesaawiki-base-url'

export default createRoute((c) => {
	const name = c.req.param('name');
	const url = getPageAddUrl(SEESAA_WIKI_BASE_URL, name);

	return c.redirect(url)
})