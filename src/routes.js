import {Router} from 'express';

import login from './controller/loginController'
import dashboard from './controller/dashboardController'
import user from './controller/userController'
import fertilizer from './controller/fertilizerController'
import tender from './controller/tenderController'
import distributor from './controller/distributorController'
import news from './controller/newsController'
import smartTips from './controller/smartTipsController'

import fertilizerAPI from './APIController/fertilizerController'
import distributorAPI from './APIController/distributorController'
import userAPI from './APIController/userController'
import newsAPI from './APIController/newsController'
import tipsAPI from './APIController/smartTipsController'

let router = Router();

router.use('/',login);
router.use('/dashboard',dashboard);
router.use('/user',user);
router.use('/fertilizer',fertilizer);
router.use('/tender',tender);
router.use('/distributor',distributor);
router.use('/news',news);
router.use('/smartTips',smartTips);

router.use('/api/fertilizer',fertilizerAPI);
router.use('/api/distributor',distributorAPI);
router.use('/api/user',userAPI);
router.use('/api/news',newsAPI);
router.use('/api/smartTips',tipsAPI);

export default router;