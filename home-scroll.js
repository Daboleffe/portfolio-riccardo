/* ==========================================================
   HOME — SMOOTH SCROLL REVEAL
   Updated for current index.html
========================================================== */

(() => {

    "use strict";


    /* ======================================================
       PAGE CHECK
    ====================================================== */

    const homePage =
        document.querySelector(
            ".home-portfolio"
        );


    if (!homePage) {
        return;
    }



    /* ======================================================
       SETTINGS
    ====================================================== */

    const SETTINGS = {

        /*
            Reveal start:
            1.02 = slightly below viewport bottom
        */

        start:
            1.02,


        /*
            Reveal completion area
        */

        end:
            0.46,


        /*
            Movement interpolation
        */

        smoothing:
            0.11,


        /*
            Stop threshold
        */

        epsilon:
            0.001

    };



    /* ======================================================
       STORAGE
    ====================================================== */

    const items =
        [];



    /* ======================================================
       REGISTER ITEM
    ====================================================== */

    function addItem(
        element,
        options = {}
    ) {

        if (!element) {
            return;
        }


        if (
            element.dataset.homeScrollItem ===
            "true"
        ) {
            return;
        }


        element.dataset.homeScrollItem =
            "true";


        const item = {

            element,

            distance:
                options.distance ??
                48,

            offset:
                options.offset ??
                0,

            bottomComplete:
                options.bottomComplete ??
                false,

            current:
                0,

            target:
                0

        };


        items.push(
            item
        );


        element.style.willChange =
            "opacity, transform";


        element.style.backfaceVisibility =
            "hidden";


        element.style.transition =
            "none";

    }



    /* ======================================================
       01 — APPROACH
    ====================================================== */

    addItem(
        document.querySelector(
            ".home-home-approach .home-portfolio-statement-top"
        ),
        {
            distance:
                34
        }
    );


    addItem(
        document.querySelector(
            ".home-home-approach .home-portfolio-statement-text"
        ),
        {
            distance:
                60,

            offset:
                15
        }
    );


    addItem(
        document.querySelector(
            ".home-approach-description"
        ),
        {
            distance:
                48,

            offset:
                45
        }
    );



    /* ======================================================
       02 — DESIGN PROCESS
    ====================================================== */

    addItem(
        document.querySelector(
            ".home-process-section .home-portfolio-section-header"
        ),
        {
            distance:
                34
        }
    );


    addItem(
        document.querySelector(
            ".home-process-intro h2"
        ),
        {
            distance:
                55
        }
    );


    addItem(
        document.querySelector(
            ".home-process-intro p"
        ),
        {
            distance:
                42,

            offset:
                35
        }
    );



    /* ======================================================
       PROCESS ITEMS
    ====================================================== */

    const processItems =
        document.querySelectorAll(
            ".home-process-item"
        );


    processItems.forEach(
        (
            item,
            index
        ) => {

            addItem(
                item,
                {
                    distance:
                        48,

                    offset:
                        index * 22
                }
            );

        }
    );



    /* ======================================================
       03 — SKILLS
    ====================================================== */

    addItem(
        document.querySelector(
            ".home-skills-preview .home-portfolio-section-header"
        ),
        {
            distance:
                34
        }
    );


    const skillRows =
        document.querySelectorAll(
            ".home-skill-row"
        );


    skillRows.forEach(
        (
            row,
            index
        ) => {

            addItem(
                row,
                {
                    distance:
                        44,

                    offset:
                        index * 18
                }
            );

        }
    );



    /* ======================================================
       04 — SELECTED WORK GATEWAY
    ====================================================== */

    addItem(
        document.querySelector(
            ".home-projects-gateway .home-portfolio-section-header"
        ),
        {
            distance:
                34
        }
    );


    addItem(
        document.querySelector(
            ".home-projects-gateway-title"
        ),
        {
            distance:
                56
        }
    );


    addItem(
        document.querySelector(
            ".home-projects-gateway-copy"
        ),
        {
            distance:
                46,

            offset:
                35
        }
    );



    /* ======================================================
       05 — ABOUT GATEWAY
    ====================================================== */

    addItem(
        document.querySelector(
            ".home-about-gateway .home-portfolio-section-header"
        ),
        {
            distance:
                34
        }
    );


    const aboutGatewayContent =
        document.querySelector(
            ".home-about-gateway-content"
        );


    if (aboutGatewayContent) {

        const aboutGatewayTitle =
            aboutGatewayContent
                .children[0];


        const aboutGatewayCopy =
            aboutGatewayContent
                .querySelector(
                    ".home-about-gateway-copy"
                );


        addItem(
            aboutGatewayTitle,
            {
                distance:
                    56
            }
        );


        addItem(
            aboutGatewayCopy,
            {
                distance:
                    46,

                offset:
                    35
            }
        );

    }



    /* ======================================================
       06 — CONTACT
    ====================================================== */

    addItem(
        document.querySelector(
            ".home-portfolio-contact .home-portfolio-section-header"
        ),
        {
            distance:
                34
        }
    );


    addItem(
        document.querySelector(
            ".home-portfolio-contact-title"
        ),
        {
            distance:
                58
        }
    );


    addItem(
        document.querySelector(
            ".home-portfolio-contact-actions"
        ),
        {
            distance:
                48,

            offset:
                35
        }
    );



    /* ======================================================
       FOOTER
    ====================================================== */

    addItem(
        document.querySelector(
            ".home-portfolio-footer-grid"
        ),
        {
            distance:
                38,

            offset:
                -100,

            bottomComplete:
                true
        }
    );



    /* ======================================================
       HELPERS
    ====================================================== */

    function clamp(
        value,
        min,
        max
    ) {

        return Math.min(
            Math.max(
                value,
                min
            ),
            max
        );

    }



    /* ======================================================
       SMOOTH STEP
    ====================================================== */

    function smoothStep(
        value
    ) {

        return (
            value *
            value *
            (
                3 -
                2 *
                value
            )
        );

    }



    /* ======================================================
       DISTANCE FROM PAGE BOTTOM
    ====================================================== */

    function getDistanceFromBottom() {

        const documentHeight =
            Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
            );


        const viewportBottom =
            window.scrollY +
            window.innerHeight;


        return Math.max(
            documentHeight -
            viewportBottom,
            0
        );

    }



    /* ======================================================
       CALCULATE TARGET
    ====================================================== */

    function calculateTarget(
        item
    ) {

        const rect =
            item.element
                .getBoundingClientRect();


        const viewportHeight =
            window.innerHeight;


        const startPoint =
            (
                viewportHeight *
                SETTINGS.start
            )
            -
            item.offset;


        const endPoint =
            viewportHeight *
            SETTINGS.end;


        const revealDistance =
            startPoint -
            endPoint;


        let progress =
            (
                startPoint -
                rect.top
            )
            /
            revealDistance;


        progress =
            clamp(
                progress,
                0,
                1
            );



        /* ==================================================
           FORCE FINAL ITEM TO 100%
           WHEN REACHING PAGE BOTTOM
        ================================================== */

        if (
            item.bottomComplete
        ) {

            const distanceFromBottom =
                getDistanceFromBottom();


            const bottomProgress =
                1 -
                clamp(
                    distanceFromBottom /
                    340,
                    0,
                    1
                );


            progress =
                Math.max(
                    progress,
                    bottomProgress
                );


            if (
                distanceFromBottom <=
                3
            ) {

                progress =
                    1;

            }

        }


        return progress;

    }



    /* ======================================================
       APPLY ITEM
    ====================================================== */

    function applyItem(
        item
    ) {

        const eased =
            smoothStep(
                item.current
            );


        /*
            Opacity rises slightly slower
            than position.

            This produces the gradual
            appearance from black.
        */

        const opacity =
            Math.pow(
                eased,
                1.42
            );


        const movement =
            item.distance *
            (
                1 -
                eased
            );


        item.element.style.opacity =
            opacity.toFixed(
                4
            );


        item.element.style.transform =
            `translate3d(
                0,
                ${movement}px,
                0
            )`;

    }



    /* ======================================================
       UPDATE TARGETS
    ====================================================== */

    function updateTargets() {

        items.forEach(
            item => {

                item.target =
                    calculateTarget(
                        item
                    );

            }
        );


        startRenderLoop();

    }



    /* ======================================================
       RENDER LOOP
    ====================================================== */

    let rendering =
        false;


    function render() {

        let continueRendering =
            false;


        items.forEach(
            item => {

                const difference =
                    item.target -
                    item.current;


                item.current +=
                    difference *
                    SETTINGS.smoothing;


                if (
                    Math.abs(
                        difference
                    )
                    <
                    SETTINGS.epsilon
                ) {

                    item.current =
                        item.target;

                }

                else {

                    continueRendering =
                        true;

                }


                applyItem(
                    item
                );

            }
        );


        if (
            continueRendering
        ) {

            requestAnimationFrame(
                render
            );

        }

        else {

            rendering =
                false;

        }

    }



    /* ======================================================
       START RENDER LOOP
    ====================================================== */

    function startRenderLoop() {

        if (
            rendering
        ) {
            return;
        }


        rendering =
            true;


        requestAnimationFrame(
            render
        );

    }



    /* ======================================================
       INITIAL STATE
    ====================================================== */

    function initialize() {

        items.forEach(
            item => {

                const rect =
                    item.element
                        .getBoundingClientRect();


                const initialTarget =
                    calculateTarget(
                        item
                    );


                /*
                    Anything already clearly visible
                    when loading the page starts from
                    its proper current state.

                    Everything below waits for scroll.
                */

                if (
                    rect.top
                    <
                    window.innerHeight *
                    0.7
                ) {

                    item.current =
                        initialTarget;

                }

                else {

                    item.current =
                        0;

                }


                item.target =
                    initialTarget;


                applyItem(
                    item
                );

            }
        );


        startRenderLoop();

    }



    /* ======================================================
       SCROLL
    ====================================================== */

    window.addEventListener(
        "scroll",
        updateTargets,
        {
            passive:
                true
        }
    );



    /* ======================================================
       RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        updateTargets,
        {
            passive:
                true
        }
    );



    /* ======================================================
       BACK / FORWARD NAVIGATION
    ====================================================== */

    window.addEventListener(
        "pageshow",
        () => {

            requestAnimationFrame(
                updateTargets
            );

        }
    );



    /* ======================================================
       WATCH LAYOUT CHANGES

       Important for Skills accordion:
       opening a skill changes the page height.
    ====================================================== */

    if (
        "ResizeObserver"
        in
        window
    ) {

        let resizeFrame =
            null;


        const layoutObserver =
            new ResizeObserver(
                () => {

                    if (
                        resizeFrame !==
                        null
                    ) {

                        cancelAnimationFrame(
                            resizeFrame
                        );

                    }


                    resizeFrame =
                        requestAnimationFrame(
                            () => {

                                updateTargets();


                                resizeFrame =
                                    null;

                            }
                        );

                }
            );


        layoutObserver.observe(
            homePage
        );

    }



    /* ======================================================
       SKILLS ACCORDION UPDATE

       Extra recalculation immediately
       after clicking a skill.
    ====================================================== */

    document
        .querySelectorAll(
            ".home-skill-trigger"
        )
        .forEach(
            trigger => {

                trigger.addEventListener(
                    "click",
                    () => {

                        requestAnimationFrame(
                            () => {

                                requestAnimationFrame(
                                    updateTargets
                                );

                            }
                        );

                    }
                );

            }
        );



    /* ======================================================
       START
    ====================================================== */

    requestAnimationFrame(
        () => {

            requestAnimationFrame(
                initialize
            );

        }
    );

})();