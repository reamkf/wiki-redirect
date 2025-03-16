import { createRoute } from 'honox/factory'
import { getWikiNanodaPageAddUrl } from '../../utils/seesaawiki';

export default createRoute((c) => {
	const name = c.req.param('name');
	const url = getWikiNanodaPageAddUrl(name);

	return c.redirect(url)
})