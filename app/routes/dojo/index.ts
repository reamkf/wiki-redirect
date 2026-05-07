import { createRoute } from 'honox/factory'
import { getPageUrl } from 'seesaawiki-url';
import { getCurrentSeasonCount } from '../../utils/dojo-season';
import { SEESAA_WIKI_BASE_URL } from '../../utils/seesaawiki-base-url'

export default createRoute((c) => {
	const currentCount = getCurrentSeasonCount();
	const dojoUrl = getPageUrl(SEESAA_WIKI_BASE_URL, `シーサーバル道場（β2-${currentCount}）`);

	return c.redirect(dojoUrl)
})