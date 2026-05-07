import { createRoute } from 'honox/factory'
import { getPageEditUrl } from 'seesaawiki-url';
import { SEESAA_WIKI_BASE_URL } from '../../utils/seesaawiki-base-url'

export default createRoute(async (c) => {
	const name = c.req.param('name');
	const url = await getPageEditUrl(SEESAA_WIKI_BASE_URL, name);

	if (!url){
		return c.notFound();
	}

	return c.redirect(url)
});
