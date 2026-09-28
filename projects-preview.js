/* =========================================================
   PROJECTS — VISUAL HOVER PREVIEW
   Preview starts ONLY when hovering the project visual panel.
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       PAGE CHECK
    ===================================================== */

    const page =
        document.querySelector(
            ".projects-page.projects-split-page"
        );


    if (!page) {
        return;
    }



    /* =====================================================
       DESKTOP HOVER ONLY
    ===================================================== */

    const canHover =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (!canHover) {
        return;
    }



    /* =====================================================
       SETTINGS
    ===================================================== */

    const SETTINGS = {

        /*
            Tempo tra un'immagine e la successiva
        */

        slideDuration:
            1900,


        /*
            Tempo del fade-out finale
        */

        fadeOutDuration:
            720,


        /*
            Piccolo ritardo prima di chiudere
            la preview quando il mouse esce
        */

        leaveDelay:
            100

    };



    /* =====================================================
       PROJECTS
    ===================================================== */

    const projectSections =
        Array.from(
            document.querySelectorAll(
                ".split-project[data-project]"
            )
        );


    if (!projectSections.length) {
        return;
    }



    /* =====================================================
       HELPERS
    ===================================================== */

    function clearTimeoutSafe(
        id
    ) {

        if (
            id !== null
        ) {

            window.clearTimeout(
                id
            );

        }

    }



    function clearIntervalSafe(
        id
    ) {

        if (
            id !== null
        ) {

            window.clearInterval(
                id
            );

        }

    }



    /* =====================================================
       INITIALISE PROJECT
    ===================================================== */

    projectSections.forEach(
        section => {


            /* =============================================
               PROJECT ID
            ============================================= */

            const projectId =
                section.dataset.project;


            if (!projectId) {
                return;
            }



            /* =============================================
               VISUAL PANEL

               IMPORTANT:
               La preview parte SOLO passando sopra
               al rettangolo visuale.
            ============================================= */

            const panel =
                section.querySelector(
                    `[data-project-preview-panel="${projectId}"]`
                );



            /* =============================================
               PREVIEW LAYER
            ============================================= */

            const preview =
                section.querySelector(
                    `[data-project-preview="${projectId}"]`
                );


            if (
                !panel ||
                !preview
            ) {

                return;

            }



            /* =============================================
               SLIDES
            ============================================= */

            const slides =
                Array.from(
                    preview.querySelectorAll(
                        "[data-preview-slide]"
                    )
                );


            if (!slides.length) {
                return;
            }



            /* =============================================
               STATE
            ============================================= */

            const state = {

                active:
                    false,

                currentIndex:
                    0,

                intervalId:
                    null,

                leaveTimeout:
                    null,

                hideTimeout:
                    null

            };



            /* =============================================
               PRELOAD
            ============================================= */

            slides.forEach(
                slide => {


                    slide.loading =
                        "eager";


                    slide.decoding =
                        "async";



                    /* -------------------------------------
                       IMAGE ERROR
                    ------------------------------------- */

                    slide.addEventListener(
                        "error",
                        () => {


                            slide.dataset.previewBroken =
                                "true";


                            slide.classList.remove(
                                "is-active",
                                "is-leaving"
                            );


                            slide.style.display =
                                "none";

                        }
                    );


                }
            );



            /* =============================================
               USABLE SLIDES
            ============================================= */

            function getUsableIndexes() {


                return slides

                    .map(
                        (
                            slide,
                            index
                        ) => {


                            if (
                                slide.dataset.previewBroken ===
                                "true"
                            ) {

                                return null;

                            }


                            return index;

                        }
                    )

                    .filter(
                        index =>
                            index !== null
                    );


            }



            /* =============================================
               RESET SLIDES
            ============================================= */

            function resetSlides() {


                slides.forEach(
                    slide => {


                        slide.classList.remove(
                            "is-active",
                            "is-leaving"
                        );


                    }
                );



                const usable =
                    getUsableIndexes();



                state.currentIndex =
                    usable.length
                        ? usable[0]
                        : 0;



                if (
                    slides[
                        state.currentIndex
                    ] &&
                    slides[
                        state.currentIndex
                    ].dataset.previewBroken !==
                    "true"
                ) {


                    slides[
                        state.currentIndex
                    ].classList.add(
                        "is-active"
                    );


                }


            }



            /* =============================================
               FIND NEXT SLIDE
            ============================================= */

            function getNextIndex() {


                const usable =
                    getUsableIndexes();



                if (
                    usable.length <= 1
                ) {

                    return null;

                }



                const currentPosition =
                    usable.indexOf(
                        state.currentIndex
                    );



                const nextPosition =
                    currentPosition === -1
                        ? 0
                        : (
                            currentPosition +
                            1
                        ) %
                        usable.length;



                return usable[
                    nextPosition
                ];


            }



            /* =============================================
               SHOW SLIDE
            ============================================= */

            function showSlide(
                nextIndex
            ) {


                if (
                    !state.active ||
                    nextIndex === null ||
                    nextIndex ===
                        state.currentIndex
                ) {

                    return;

                }



                const currentSlide =
                    slides[
                        state.currentIndex
                    ];



                const nextSlide =
                    slides[
                        nextIndex
                    ];



                if (
                    !nextSlide ||
                    nextSlide.dataset.previewBroken ===
                    "true"
                ) {

                    return;

                }



                /* -----------------------------------------
                   OLD SLIDE
                ----------------------------------------- */

                if (
                    currentSlide &&
                    currentSlide.dataset.previewBroken !==
                    "true"
                ) {


                    currentSlide.classList.add(
                        "is-leaving"
                    );


                    currentSlide.classList.remove(
                        "is-active"
                    );


                }



                /* -----------------------------------------
                   NEW SLIDE
                ----------------------------------------- */

                nextSlide.classList.remove(
                    "is-leaving"
                );



                /*
                   Serve per far registrare al browser
                   lo stato iniziale prima della transizione.
                */

                void nextSlide.offsetWidth;



                nextSlide.classList.add(
                    "is-active"
                );



                state.currentIndex =
                    nextIndex;



                /* -----------------------------------------
                   CLEAN OLD SLIDE
                ----------------------------------------- */

                window.setTimeout(
                    () => {


                        if (
                            currentSlide
                        ) {


                            currentSlide.classList.remove(
                                "is-leaving"
                            );


                        }


                    },
                    1050
                );


            }



            /* =============================================
               NEXT SLIDE
            ============================================= */

            function nextSlide() {


                showSlide(
                    getNextIndex()
                );


            }



            /* =============================================
               START LOOP
            ============================================= */

            function startLoop() {


                clearIntervalSafe(
                    state.intervalId
                );


                state.intervalId =
                    null;



                if (
                    getUsableIndexes().length <=
                    1
                ) {

                    return;

                }



                state.intervalId =
                    window.setInterval(
                        nextSlide,
                        SETTINGS.slideDuration
                    );


            }



            /* =============================================
               START PREVIEW
            ============================================= */

            function startPreview() {


                clearTimeoutSafe(
                    state.leaveTimeout
                );


                state.leaveTimeout =
                    null;



                clearTimeoutSafe(
                    state.hideTimeout
                );


                state.hideTimeout =
                    null;



                if (
                    state.active
                ) {

                    return;

                }



                state.active =
                    true;



                resetSlides();



                preview.hidden =
                    false;



                preview.setAttribute(
                    "aria-hidden",
                    "false"
                );



                /*
                   Due frame per permettere
                   al CSS di partire correttamente
                   dallo stato opacity 0.
                */

                requestAnimationFrame(
                    () => {


                        requestAnimationFrame(
                            () => {


                                if (
                                    !state.active
                                ) {

                                    return;

                                }



                                section.classList.add(
                                    "is-previewing"
                                );



                                startLoop();


                            }
                        );


                    }
                );


            }



            /* =============================================
               STOP PREVIEW
            ============================================= */

            function stopPreview() {


                if (
                    !state.active
                ) {

                    return;

                }



                state.active =
                    false;



                clearIntervalSafe(
                    state.intervalId
                );


                state.intervalId =
                    null;



                section.classList.remove(
                    "is-previewing"
                );



                preview.setAttribute(
                    "aria-hidden",
                    "true"
                );



                /* -----------------------------------------
                   HIDE AFTER FADE
                ----------------------------------------- */

                state.hideTimeout =
                    window.setTimeout(
                        () => {


                            if (
                                state.active
                            ) {

                                return;

                            }



                            preview.hidden =
                                true;



                            resetSlides();



                            state.hideTimeout =
                                null;


                        },
                        SETTINGS.fadeOutDuration
                    );


            }



            /* =============================================
               MOUSE ENTER
               PREVIEW STARTS HERE
            ============================================= */

            panel.addEventListener(
                "mouseenter",
                () => {


                    startPreview();


                }
            );



            /* =============================================
               MOUSE LEAVE
            ============================================= */

            panel.addEventListener(
                "mouseleave",
                () => {


                    clearTimeoutSafe(
                        state.leaveTimeout
                    );



                    state.leaveTimeout =
                        window.setTimeout(
                            () => {


                                stopPreview();


                            },
                            SETTINGS.leaveDelay
                        );


                }
            );



            /* =============================================
               KEYBOARD
            ============================================= */

            panel.addEventListener(
                "focus",
                () => {


                    startPreview();


                }
            );



            panel.addEventListener(
                "blur",
                () => {


                    stopPreview();


                }
            );



            /* =============================================
               ESC
            ============================================= */

            panel.addEventListener(
                "keydown",
                event => {


                    if (
                        event.key !==
                        "Escape"
                    ) {

                        return;

                    }



                    stopPreview();



                    panel.blur();


                }
            );



            /* =============================================
               INITIAL STATE
            ============================================= */

            resetSlides();



            preview.hidden =
                true;



            preview.setAttribute(
                "aria-hidden",
                "true"
            );



            /* =============================================
               BF CACHE RESTORE
            ============================================= */

            window.addEventListener(
                "pageshow",
                event => {


                    if (
                        !event.persisted
                    ) {

                        return;

                    }



                    clearTimeoutSafe(
                        state.leaveTimeout
                    );



                    clearTimeoutSafe(
                        state.hideTimeout
                    );



                    clearIntervalSafe(
                        state.intervalId
                    );



                    state.active =
                        false;



                    state.intervalId =
                        null;



                    state.leaveTimeout =
                        null;



                    state.hideTimeout =
                        null;



                    section.classList.remove(
                        "is-previewing"
                    );



                    resetSlides();



                    preview.hidden =
                        true;



                    preview.setAttribute(
                        "aria-hidden",
                        "true"
                    );


                }
            );


        }
    );



    /* =====================================================
       PAGE LEAVE CLEANUP
    ===================================================== */

    window.addEventListener(
        "pagehide",
        () => {


            projectSections.forEach(
                section => {


                    section.classList.remove(
                        "is-previewing"
                    );


                }
            );


        }
    );


})();