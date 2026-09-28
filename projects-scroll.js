/* ==========================================================
   PROJECTS PAGE — SMOOTH SCROLL REVEAL
   Dedicated only to projects.html
========================================================== */

(() => {

    "use strict";


    /* ======================================================
       PAGE CHECK
    ====================================================== */

    const projectsPage =
        document.querySelector(
            ".projects-split-main"
        );


    if (!projectsPage) {
        return;
    }



    /* ======================================================
       SETTINGS
    ====================================================== */

    const SETTINGS = {

        /*
            Dove comincia il reveal.
            1.00 = fondo viewport.
        */

        start:
            1.02,


        /*
            Dove deve essere quasi completato.
        */

        end:
            0.46,


        /*
            Morbidezza.
        */

        smoothing:
            0.11,


        /*
            Precisione finale.
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
       ADD ITEM
    ====================================================== */

    function addItem(
        element,
        options = {}
    ) {

        if (!element) {
            return;
        }


        if (
            element.dataset.projectsRevealItem ===
            "true"
        ) {
            return;
        }


        element.dataset.projectsRevealItem =
            "true";


        const item = {

            element,

            direction:
                options.direction ||
                "up",

            distance:
                options.distance ??
                55,

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


        /*
            Preparazione GPU.
        */

        element.style.willChange =
            "opacity, transform";

        element.style.backfaceVisibility =
            "hidden";

        element.style.transition =
            "none";

    }



    /* ======================================================
       HERO

       Lasciamo il titolo principale visibile.
       Facciamo entrare solo i contenuti secondari.
    ====================================================== */

    addItem(
        document.querySelector(
            ".projects-split-top"
        ),
        {
            direction:
                "up",

            distance:
                26
        }
    );


    addItem(
        document.querySelector(
            ".projects-split-intro"
        ),
        {
            direction:
                "up",

            distance:
                34,

            offset:
                20
        }
    );



    /* ======================================================
       PROJECT 01
       DOUBLE TAKE
    ====================================================== */

    addItem(
        document.querySelector(
            ".split-project-double .split-project-copy"
        ),
        {
            direction:
                "up",

            distance:
                54
        }
    );


    addItem(
        document.querySelector(
            ".split-project-double .split-project-visual"
        ),
        {
            direction:
                "up",

            distance:
                68,

            offset:
                28
        }
    );



    /* ======================================================
       PROJECT 02
       MOKAE
    ====================================================== */

    addItem(
        document.querySelector(
            ".split-project-mokae .split-project-visual"
        ),
        {
            direction:
                "up",

            distance:
                68
        }
    );


    addItem(
        document.querySelector(
            ".split-project-mokae .split-project-copy"
        ),
        {
            direction:
                "up",

            distance:
                54,

            offset:
                30
        }
    );



    /* ======================================================
       PROJECT 03
       SPARTAN
    ====================================================== */

    addItem(
        document.querySelector(
            ".split-project-spartan .split-project-copy"
        ),
        {
            direction:
                "up",

            distance:
                54
        }
    );


    addItem(
        document.querySelector(
            ".split-project-spartan .split-project-visual"
        ),
        {
            direction:
                "up",

            distance:
                68,

            offset:
                28
        }
    );



    /* ======================================================
       FOOTER
    ====================================================== */

    addItem(
        document.querySelector(
            ".projects-split-footer"
        ),
        {
            direction:
                "up",

            distance:
                42,

            offset:
                -100,

            bottomComplete:
                true
        }
    );



    /* ======================================================
       CLAMP
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
       SMOOTHSTEP
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
       DISTANCE FROM BOTTOM
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
       TARGET CALCULATION
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
           FINAL PAGE BOOST
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
       APPLY VISUAL STATE
    ====================================================== */

    function applyItem(
        item
    ) {

        const eased =
            smoothStep(
                item.current
            );


        /*
            Opacity rallentata all'inizio.
        */

        const opacity =
            Math.pow(
                eased,
                1.4
            );


        const remaining =
            1 -
            eased;


        const movement =
            item.distance *
            remaining;


        item.element.style.opacity =
            opacity.toFixed(4);



        /* ==================================================
           MOVEMENT
        ================================================== */

        if (
            item.direction ===
            "left"
        ) {

            item.element.style.transform =
                `translate3d(
                    ${-movement}px,
                    0,
                    0
                )`;

        }


        else if (
            item.direction ===
            "right"
        ) {

            item.element.style.transform =
                `translate3d(
                    ${movement}px,
                    0,
                    0
                )`;

        }


        else {

            item.element.style.transform =
                `translate3d(
                    0,
                    ${movement}px,
                    0
                )`;

        }

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

        let keepRendering =
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

                    keepRendering =
                        true;

                }


                applyItem(
                    item
                );

            }
        );


        if (
            keepRendering
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
       INITIALIZE
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
                    Gli elementi già visibili
                    all'apertura partono dal loro
                    stato corretto.
                */

                if (
                    rect.top
                    <
                    window.innerHeight *
                    0.70
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
       EVENTS
    ====================================================== */

    window.addEventListener(
        "scroll",
        updateTargets,
        {
            passive:
                true
        }
    );


    window.addEventListener(
        "resize",
        updateTargets,
        {
            passive:
                true
        }
    );


    window.addEventListener(
        "pageshow",
        updateTargets
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