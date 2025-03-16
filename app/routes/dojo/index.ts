import { createRoute } from 'honox/factory'
import { getWikiNanodaPageUrl } from '../../utils/seesaawiki';
import { getCurrentSeasonCount } from '../../utils/dojo-season';

export default createRoute((c) => {
	const currentCount = getCurrentSeasonCount();
	const dojoUrl = getWikiNanodaPageUrl(`シーサーバル道場（β2-${currentCount}）`);

	return c.redirect(dojoUrl)
})