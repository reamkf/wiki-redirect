import { createRoute } from 'honox/factory'
import { getWikiNanodaPageEditUrl } from '../../utils/seesaawiki';

export default createRoute(async (c) => {
	const name = c.req.param('name');
	const url = await getWikiNanodaPageEditUrl(name);

	if (!url){
		return c.notFound();
	}

	return c.redirect(url)
});
