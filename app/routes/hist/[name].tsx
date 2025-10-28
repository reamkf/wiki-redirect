import { createRoute } from 'honox/factory'
import { getWikiNanodaPageHistoryUrl } from '../../utils/seesaawiki';

export default createRoute((c) => {
	const name = c.req.param('name');
	const url = getWikiNanodaPageHistoryUrl(name);

	return c.redirect(url)
})