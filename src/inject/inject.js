chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            // ----------------------------------------------------------
            // This part of the script triggers when page is done loading
            var observer = new MutationObserver(function (mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === "childList") {
                        for (let addedNode of mutation.addedNodes) {
                            if (addedNode.getAttribute("role") === "presentation") {
                                document.querySelector('div[role="presentation"]').remove();

                                var css = "body { overflow: visible !important; }";
                                var head =
                                    document.head || document.getElementsByTagName("head")[0];
                                var style = document.createElement("style");

                                head.appendChild(style);

                                style.type = "text/css";
                                if (style.styleSheet) {
                                    // This is required for IE8 and below.
                                    style.styleSheet.cssText = css;
                                } else {
                                    style.appendChild(document.createTextNode(css));
                                }
                            }
                        }

                        // links
                        var detailLinks = document.querySelectorAll(
                            "#react-root > section > main article a[href]"
                        );

                        for (let link of detailLinks) {
                            link.addEventListener("click", (event) => {
                                event.stopPropagation();
                            });
                        }
                    }
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
            // ----------------------------------------------------------
        }
    }, 10);
});
