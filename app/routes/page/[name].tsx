import { createRoute } from 'honox/factory'
import { getWikiNanodaPageUrl } from '../../utils/seesaawiki';

export default createRoute((c) => {
	const name = c.req.param('name');
	const url = getWikiNanodaPageUrl(name);

	return c.redirect(url)
})