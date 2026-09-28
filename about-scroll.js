/* =========================================================
   ABOUT — EDITORIAL MOTION SYSTEM
   Reliable on first entry, refresh and bfcache restore
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       PAGE CHECK
    ===================================================== */

    const body =
        document.body;


    const page =
        document.querySelector(
            ".about-page"
        );


    if (
        !body ||
        !page
    ) {

        return;

    }



    /* =====================================================
       SETTINGS
    ===================================================== */

    const SETTINGS = {

        /*
            Small pause before the hero begins.
            The actual movement then lasts about 3.3s.
        */

        heroDelay:
            1200,


        revealThreshold:
            0.12,


        revealRootMargin:
            "0px 0px -8% 0px"

    };



    /* =====================================================
       ELEMENTS
    ===================================================== */

    const introItems =
        Array.from(
            document.querySelectorAll(
                "[data-about-intro]"
            )
        );


    const heroTopItems =
        Array.from(
            document.querySelectorAll(
                ".about-hero-top-reveal"
            )
        );


    const revealItems =
        Array.from(
            document.querySelectorAll(
                "[data-about-reveal]"
            )
        );


    const miniItems =
        Array.from(
            document.querySelectorAll(
                ".about-mini-item"
            )
        );


    const hero =
        document.getElementById(
            "about-hero"
        );


    const photo =
        document.querySelector(
            ".about-photo img"
        );



    /* =====================================================
       BASE CLASSES
    ===================================================== */

    body.classList.add(
        "about-page-body",
        "about-motion-ready",
        "about-force-motion"
    );



    /* =====================================================
       HERO TIMER STATE
    ===================================================== */

    let heroTimer =
        null;


    let heroHasStarted =
        false;



    /* =====================================================
       HERO — RESET
    ===================================================== */

    function resetHero() {

        if (
            heroTimer !== null
        ) {

            window.clearTimeout(
                heroTimer
            );


            heroTimer =
                null;

        }


        heroHasStarted =
            false;


        body.classList.remove(
            "about-intro-visible"
        );


        body.classList.add(
            "about-intro-pending"
        );


        /*
            Remove any stale inline values that may have
            survived bfcache or previous script versions.
        */

        introItems.forEach(
            item => {

                item.style.opacity =
                    "";

                item.style.transform =
                    "";

            }
        );


        heroTopItems.forEach(
            item => {

                item.style.opacity =
                    "";

                item.style.transform =
                    "";

            }
        );


        /*
            Force the browser to commit the hidden start state
            before we schedule the visible state.
        */

        void body.offsetWidth;

    }



    /* =====================================================
       HERO — START
    ===================================================== */

    function startHero() {

        if (
            heroHasStarted
        ) {

            return;

        }


        heroHasStarted =
            true;


        body.classList.add(
            "about-intro-visible"
        );


        body.classList.remove(
            "about-intro-pending"
        );

    }



    /* =====================================================
       HERO — SCHEDULE
    ===================================================== */

    function scheduleHero() {

        resetHero();


        /*
            Two RAFs make this reliable when arriving from
            another internal page transition, not only refresh.
        */

        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    () => {

                        heroTimer =
                            window.setTimeout(
                                startHeroWithMiniInfo,
                                SETTINGS.heroDelay
                            );

                    }
                );

            }
        );

    }



    /* =====================================================
       MINI INFO
    ===================================================== */

    miniItems.forEach(
        (
            item,
            index
        ) => {

            item.style.opacity =
                "0";


            item.style.transform =
                "translate3d(0, 18px, 0)";


            item.style.transition =
                `
                opacity 1.5s ease ${150 + index * 130}ms,
                transform 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${150 + index * 130}ms
                `;

        }
    );


    function revealMiniInfo() {

        miniItems.forEach(
            item => {

                item.style.opacity =
                    "1";


                item.style.transform =
                    "translate3d(0, 0, 0)";

            }
        );

    }



    /*
        Start mini info slightly after the hero begins.
    */

    function startHeroWithMiniInfo() {

        if (
            heroHasStarted
        ) {

            return;

        }


        startHero();


        window.setTimeout(
            revealMiniInfo,
            700
        );

    }



    /* =====================================================
       SCROLL REVEALS
    ===================================================== */

    let revealObserver =
        null;


    if (
        "IntersectionObserver" in window
    ) {

        revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold:
                        SETTINGS.revealThreshold,

                    rootMargin:
                        SETTINGS.revealRootMargin
                }
            );


        revealItems.forEach(
            item => {

                revealObserver.observe(
                    item
                );

            }
        );

    } else {

        revealItems.forEach(
            item => {

                item.classList.add(
                    "is-visible"
                );

            }
        );

    }



    /* =====================================================
       PHOTO PARALLAX
    ===================================================== */

    let ticking =
        false;


    function updateParallax() {

        ticking =
            false;


        if (
            !hero ||
            !photo
        ) {

            return;

        }


        const rect =
            hero.getBoundingClientRect();


        const viewportHeight =
            window.innerHeight ||
            document.documentElement.clientHeight;


        /*
            Only work while the hero is near the viewport.
        */

        if (
            rect.bottom < -100 ||
            rect.top > viewportHeight + 100
        ) {

            return;

        }


        const progress =
            (
                viewportHeight -
                rect.top
            )
            /
            (
                viewportHeight +
                rect.height
            );


        const clamped =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        const offset =
            (
                clamped -
                0.5
            )
            *
            18;


        photo.style.transform =
            `translate3d(0, ${offset}px, 0) scale(1.025)`;

    }



    function requestParallax() {

        if (
            ticking
        ) {

            return;

        }


        ticking =
            true;


        requestAnimationFrame(
            updateParallax
        );

    }



    window.addEventListener(
        "scroll",
        requestParallax,
        {
            passive:
                true
        }
    );


    window.addEventListener(
        "resize",
        requestParallax
    );


    requestParallax();



    /* =====================================================
       FIRST ENTRY
    ===================================================== */

    scheduleHero();



    /* =====================================================
       BF CACHE / BACK-FORWARD NAVIGATION
    ===================================================== */

    window.addEventListener(
        "pageshow",
        event => {

            /*
                On normal first load scheduleHero already ran.
                On bfcache restore we intentionally replay it.
            */

            if (
                event.persisted
            ) {

                miniItems.forEach(
                    item => {

                        item.style.opacity =
                            "0";


                        item.style.transform =
                            "translate3d(0, 18px, 0)";

                    }
                );


                scheduleHero();

            }

        }
    );



    /* =====================================================
       SAFETY FOR TAB VISIBILITY / DELAYED PAINT
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                    "visible" &&
                !heroHasStarted &&
                !body.classList.contains(
                    "about-intro-visible"
                )
            ) {

                scheduleHero();

            }

        }
    );



})();