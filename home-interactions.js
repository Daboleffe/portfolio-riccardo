/* =========================================================
   RICCARDO PORTFOLIO
   HOME INTERACTIONS

   - Hero image entrance
   - Discipline overlay
   - Stable scroll lock
   - No body position: fixed
   - No window.scrollTo()
   - Images loaded directly from HTML
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       BASE
    ===================================================== */

    const body =
        document.body;

    const html =
        document.documentElement;

    const home =
        document.querySelector(
            ".home-portfolio"
        );


    if (
        !body ||
        !home ||
        !body.classList.contains(
            "home-page"
        )
    ) {
        return;
    }


    const intro =
        document.getElementById(
            "intro"
        );


    const enterButton =
        document.getElementById(
            "enter-button"
        );


    const disciplineTriggers =
        Array.from(
            document.querySelectorAll(
                "[data-discipline-open]"
            )
        );


    const overlay =
        document.getElementById(
            "discipline-overlay"
        );


    const panels =
        overlay
            ? Array.from(
                overlay.querySelectorAll(
                    "[data-discipline-panel]"
                )
            )
            : [];


    const closeButtons =
        overlay
            ? Array.from(
                overlay.querySelectorAll(
                    "[data-discipline-close]"
                )
            )
            : [];


    const SETTINGS = {

        heroDelay:
            150,

        overlayCloseDuration:
            520

    };


    body.classList.add(
        "home-interactions-ready"
    );


    /* =====================================================
       HERO IMAGE ENTRANCE
    ===================================================== */

    let heroStarted =
        false;

    let heroTimer =
        null;


    function introIsFinished() {

        if (
            !intro
        ) {
            return true;
        }


        return (
            window
                .getComputedStyle(
                    intro
                )
                .display ===
            "none"
        );

    }


    function showHero() {

        if (
            heroStarted
        ) {
            return;
        }


        heroStarted =
            true;


        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    () => {

                        heroTimer =
                            window.setTimeout(
                                () => {

                                    body.classList.add(
                                        "home-hero-visible"
                                    );


                                    heroTimer =
                                        null;

                                },
                                SETTINGS.heroDelay
                            );

                    }
                );

            }
        );

    }


    if (
        introIsFinished()
    ) {

        showHero();

    }

    else {

        const introObserver =
            new MutationObserver(
                () => {

                    if (
                        introIsFinished()
                    ) {

                        introObserver.disconnect();


                        showHero();

                    }

                }
            );


        introObserver.observe(
            intro,
            {

                attributes:
                    true,

                attributeFilter:
                    [
                        "style",
                        "class"
                    ]

            }
        );


        if (
            enterButton
        ) {

            enterButton.addEventListener(
                "click",
                () => {

                    window.setTimeout(
                        () => {

                            if (
                                !heroStarted
                            ) {

                                showHero();

                            }

                        },
                        1120
                    );

                }
            );

        }

    }


    /* =====================================================
       DISCIPLINE OVERLAY STATE
    ===================================================== */

    let overlayOpen =
        false;

    let activePanel =
        null;

    let lastTrigger =
        null;

    let closeTimer =
        null;


    /*
       Store previous inline values so we can restore
       exactly what was there before opening the overlay.
    */

    let previousHtmlOverflow =
        "";

    let previousBodyOverflow =
        "";

    let previousBodyPaddingRight =
        "";


    /* =====================================================
       GET PANEL
    ===================================================== */

    function getPanel(
        discipline
    ) {

        return panels.find(
            panel =>

                panel.dataset
                    .disciplinePanel ===
                discipline
        );

    }


    /* =====================================================
       STABLE SCROLL LOCK

       IMPORTANT:

       We DO NOT:
       - change body to position: fixed
       - change body top
       - move the document
       - use window.scrollTo()

       Therefore the page stays exactly where it is.
    ===================================================== */

    function lockPageScroll() {

        if (
            body.classList.contains(
                "home-overlay-open"
            )
        ) {
            return;
        }


        /*
           Save current inline styles.
        */

        previousHtmlOverflow =
            html.style.overflow;

        previousBodyOverflow =
            body.style.overflow;

        previousBodyPaddingRight =
            body.style.paddingRight;


        /*
           Calculate scrollbar width.

           When overflow disappears, the browser can gain
           a few pixels of viewport width.

           Padding compensates for that so the page
           does not move horizontally.
        */

        const scrollbarWidth =
            window.innerWidth -
            html.clientWidth;


        body.classList.add(
            "home-overlay-open"
        );


        html.style.overflow =
            "hidden";


        body.style.overflow =
            "hidden";


        if (
            scrollbarWidth > 0
        ) {

            const currentPaddingRight =
                parseFloat(
                    window
                        .getComputedStyle(
                            body
                        )
                        .paddingRight
                ) || 0;


            body.style.paddingRight =
                `${
                    currentPaddingRight +
                    scrollbarWidth
                }px`;

        }

    }


    /* =====================================================
       UNLOCK PAGE

       No scrolling is performed here.
    ===================================================== */

    function unlockPageScroll() {

        body.classList.remove(
            "home-overlay-open"
        );


        html.style.overflow =
            previousHtmlOverflow;


        body.style.overflow =
            previousBodyOverflow;


        body.style.paddingRight =
            previousBodyPaddingRight;


        previousHtmlOverflow =
            "";

        previousBodyOverflow =
            "";

        previousBodyPaddingRight =
            "";

    }


    /* =====================================================
       DEACTIVATE ALL PANELS
    ===================================================== */

    function deactivatePanels() {

        panels.forEach(
            panel => {

                panel.classList.remove(
                    "is-active"
                );


                panel.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }
        );


        activePanel =
            null;

    }


    /* =====================================================
       ACTIVATE PANEL
    ===================================================== */

    function activatePanel(
        requestedPanel
    ) {

        panels.forEach(
            panel => {

                const isActive =
                    panel ===
                    requestedPanel;


                panel.classList.toggle(
                    "is-active",
                    isActive
                );


                panel.setAttribute(
                    "aria-hidden",
                    isActive
                        ? "false"
                        : "true"
                );

            }
        );


        activePanel =
            requestedPanel;

    }


    /* =====================================================
       OPEN DISCIPLINE
    ===================================================== */

    function openDiscipline(
        discipline,
        trigger
    ) {

        if (
            !overlay ||
            !discipline
        ) {
            return;
        }


        const requestedPanel =
            getPanel(
                discipline
            );


        if (
            !requestedPanel
        ) {

            console.warn(
                "Discipline panel not found:",
                discipline
            );

            return;

        }


        /*
           Cancel pending close cleanup.
        */

        if (
            closeTimer !==
            null
        ) {

            window.clearTimeout(
                closeTimer
            );


            closeTimer =
                null;

        }


        /*
           Save the clicked button so focus can return
           there after closing.
        */

        lastTrigger =
            trigger ||
            document.activeElement ||
            null;


        /*
           If the overlay is already open,
           only switch the active discipline.
        */

        if (
            overlayOpen
        ) {

            activatePanel(
                requestedPanel
            );


            return;

        }


        /*
           Activate requested content BEFORE showing
           the overlay.
        */

        activatePanel(
            requestedPanel
        );


        overlayOpen =
            true;


        overlay.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
           Lock scrolling without moving the page.
        */

        lockPageScroll();


        /*
           Force the browser to acknowledge the initial
           hidden state before starting the CSS transition.
        */

        void overlay.offsetWidth;


        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    () => {

                        if (
                            overlayOpen
                        ) {

                            overlay.classList.add(
                                "is-open"
                            );

                        }

                    }
                );

            }
        );


        /*
           Focus CLOSE without browser scrolling.
        */

        const closeButton =
            overlay.querySelector(
                ".home-discipline-close"
            );


        if (
            closeButton
        ) {

            window.setTimeout(
                () => {

                    if (
                        overlayOpen
                    ) {

                        closeButton.focus(
                            {
                                preventScroll:
                                    true
                            }
                        );

                    }

                },
                160
            );

        }

    }


    /* =====================================================
       CLOSE DISCIPLINE
    ===================================================== */

    function closeDiscipline() {

        if (
            !overlay ||
            !overlayOpen
        ) {
            return;
        }


        overlayOpen =
            false;


        overlay.classList.remove(
            "is-open"
        );


        overlay.setAttribute(
            "aria-hidden",
            "true"
        );


        /*
           Release page immediately.

           IMPORTANT:
           no window.scrollTo() here.
        */

        unlockPageScroll();


        /*
           Keep the active panel during the closing
           animation, then remove it.
        */

        closeTimer =
            window.setTimeout(
                () => {

                    deactivatePanels();


                    closeTimer =
                        null;

                },
                SETTINGS
                    .overlayCloseDuration
            );


        /*
           Return keyboard focus to the original button.

           preventScroll ensures this cannot move
           the document.
        */

        if (
            lastTrigger &&
            typeof lastTrigger.focus ===
                "function"
        ) {

            window.setTimeout(
                () => {

                    lastTrigger.focus(
                        {
                            preventScroll:
                                true
                        }
                    );

                },
                SETTINGS
                    .overlayCloseDuration
            );

        }

    }


    /* =====================================================
       OPEN BUTTONS
    ===================================================== */

    disciplineTriggers.forEach(
        trigger => {

            trigger.addEventListener(
                "click",
                event => {

                    /*
                       They are type="button", but preventDefault
                       adds another layer of protection against
                       unexpected browser behaviour.
                    */

                    event.preventDefault();


                    openDiscipline(
                        trigger.dataset
                            .disciplineOpen,
                        trigger
                    );

                }
            );

        }
    );


    /* =====================================================
       CLOSE BUTTONS
    ===================================================== */

    closeButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    closeDiscipline();

                }
            );

        }
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                overlayOpen &&
                event.key ===
                    "Escape"
            ) {

                event.preventDefault();


                closeDiscipline();

            }

        }
    );


    /* =====================================================
       FOCUS TRAP
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !overlayOpen ||
                event.key !==
                    "Tab" ||
                !overlay
            ) {
                return;
            }


            const focusable =
                Array.from(
                    overlay.querySelectorAll(
                        `
                        button:not([disabled]),
                        a[href],
                        input:not([disabled]),
                        select:not([disabled]),
                        textarea:not([disabled]),
                        [tabindex]:not([tabindex="-1"])
                        `
                    )
                )
                .filter(
                    element => {

                        return (
                            element.offsetParent !==
                            null
                        );

                    }
                );


            if (
                focusable.length ===
                0
            ) {

                event.preventDefault();

                return;

            }


            const first =
                focusable[0];


            const last =
                focusable[
                    focusable.length -
                    1
                ];


            if (
                event.shiftKey &&
                document.activeElement ===
                    first
            ) {

                event.preventDefault();


                last.focus(
                    {
                        preventScroll:
                            true
                    }
                );

            }

            else if (
                !event.shiftKey &&
                document.activeElement ===
                    last
            ) {

                event.preventDefault();


                first.focus(
                    {
                        preventScroll:
                            true
                    }
                );

            }

        }
    );


    /* =====================================================
       PAGE SHOW
    ===================================================== */

    window.addEventListener(
        "pageshow",
        event => {

            body.classList.remove(
                "page-leaving"
            );


            /*
               Safety reset in case the browser restored
               the page from back-forward cache while
               the overlay was open.
            */

            if (
                body.classList.contains(
                    "home-overlay-open"
                )
            ) {

                unlockPageScroll();

            }


            if (
                overlay
            ) {

                overlay.classList.remove(
                    "is-open"
                );


                overlay.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            overlayOpen =
                false;


            deactivatePanels();


            if (
                event.persisted
            ) {

                body.classList.remove(
                    "home-hero-visible"
                );


                heroStarted =
                    false;


                showHero();

            }

        }
    );


    /* =====================================================
       PAGE HIDE CLEANUP
    ===================================================== */

    window.addEventListener(
        "pagehide",
        () => {

            if (
                heroTimer !==
                null
            ) {

                window.clearTimeout(
                    heroTimer
                );


                heroTimer =
                    null;

            }


            if (
                closeTimer !==
                null
            ) {

                window.clearTimeout(
                    closeTimer
                );


                closeTimer =
                    null;

            }


            /*
               Restore scrolling without changing
               the user's scroll position.
            */

            if (
                body.classList.contains(
                    "home-overlay-open"
                )
            ) {

                unlockPageScroll();

            }

        }
    );

})();