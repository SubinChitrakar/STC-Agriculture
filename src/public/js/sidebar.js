function toggleSideBar() {
    document.getElementById("sidebar").classList.toggle('active');
    var element =  document.getElementById("information");
    if(document.getElementById("sidebar").classList.contains('active')){
        element.style.width="100%";
        element.style.margin="60px 0px";
        element.style.transition="all 500ms linear";
    }
    else{
        element.style.width="80%";
        element.style.margin ="40px 0 40px 300px";
        element.style.transition="all 500ms linear";
    }
}