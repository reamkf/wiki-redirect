import { createRoute } from 'honox/factory'
import { getPageHistoryUrl } from 'seesaawiki-url';
import { SEESAA_WIKI_BASE_URL } from '../../utils/seesaawiki-base-url'

export default createRoute((c) => {
	const name = c.req.param('name');
	const url = getPageHistoryUrl(SEESAA_WIKI_BASE_URL, name);

	return c.redirect(url)
})