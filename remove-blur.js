var authToken;

const focusImages = () => {
    var blurredContainers = Array.from(document.getElementsByClassName('blurred-container'));
    blurredContainers.forEach( (blurredContainer) => {
        const pgNum = blurredContainer.firstChild.src.match(/\/pages\/blurred\/page([0-9]+)\.(?:jpg|jpeg|png|webp|gif|heic)/)[1];

        if (pgNum == undefined /* || !authToken */) {
            const error = document.createElement("div");
            error.addClass("stuhack-error");
            error.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M569.5 440C588 472 564.8 512 527.9 512H48.1c-36.9 0-60-40.1-41.6-72L246.4 24c18.5-32 64.7-32 83.2 0l239.9 416zM288 354c-25.4 0-46 20.6-46 46s20.6 46 46 46 46-20.6 46-46-20.6-46-46-46zm-43.7-165.3l7.4 136c.3 6.4 5.6 11.3 12 11.3h48.5c6.4 0 11.6-5 12-11.3l7.4-136c.4-6.9-5.1-12.7-12-12.7h-63.4c-6.9 0-12.4 5.8-12 12.7z"/></svg> Error loading this page. Try refreshing.`;
            blurredContainer.replaceChild(error, blurredContainer.firstChild);
            return;
        }
        
        /*
        blurredContainer.firstChild.src = blurredContainer.firstChild.src.replace(
            /\/pages\/blurred\/page[0-9]+\.(?:jpg|jpeg|png|webp|gif|heic)/, `/bg${pgNum.toString(16)}.png`
        ).replace(
            /(?<=\/html\/bg[0-9a-e]+\.(?:jpg|jpeg|png|webp|gif|heic)\?)(.+)/, authToken
        );
        */

        blurredContainer.firstChild.src = blurredContainer.firstChild.src.replace(
            "doc-assets.studocu.com",
            "doc-assets-us-west-1.studocu.com"
        ).replace(
            "/html/pages/blurred",
            "/html/pages"
        );

        blurredContainer.firstChild.classList.add('bi', 'x0', 'y0', 'w1', 'h1');
        blurredContainer.classList.remove('blurred-container');
    });
}

window.addEventListener('load', function(){
    var pages = document.getElementsByClassName('page-content');
    for (let i=0; i<pages.length; i++){
        const pagecontent = pages[i].parentNode.childNodes;
        for (let j=0; j<pagecontent.length; j++){
            if (pagecontent[j].className != "page-content"){
                pagecontent[j].parentNode.removeChild(pagecontent[j]);
            }
            /*
            else if (!authToken && !pagecontent[j].firstChild.classList.contains("blurred-container")) {
                // Grab authentication stuff from an unblurred page
                authToken = pagecontent[j].firstChild.firstChild.src.match(/\/html\/bg[0-9a-e]+\.(?:jpg|jpeg|png|webp|gif|heic)\?(.+)/)[1];
            }
            */
        }
        pages[i].classList.add("nofilter");
    }
    document.getElementById('viewer-wrapper').addEventListener('scroll', () => {focusImages()});
    document.getElementById('document-wrapper').addEventListener('scroll', (e) => { focusImages()});
});