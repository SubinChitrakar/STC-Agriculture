export default function loginHandler(req,res,next) {
    if(req.session.page_views == 1){
        res.redirect('/');
        return;
    }
    next();
}