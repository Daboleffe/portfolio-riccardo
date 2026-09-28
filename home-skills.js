/* ==========================================================
   HOME — SKILLS ACCORDION
========================================================== */

(() => {

    "use strict";


    /* ======================================================
       PAGE CHECK
    ====================================================== */

    const skillsSection =
        document.querySelector(
            ".home-skills-preview"
        );


    if (!skillsSection) {
        return;
    }



    /* ======================================================
       ELEMENTS
    ====================================================== */

    const skillRows =
        skillsSection.querySelectorAll(
            ".home-skill-row"
        );


    if (!skillRows.length) {
        return;
    }



    /* ======================================================
       CLOSE ROW
    ====================================================== */

    function closeRow(
        row
    ) {

        const trigger =
            row.querySelector(
                ".home-skill-trigger"
            );


        if (!trigger) {
            return;
        }


        row.classList.remove(
            "is-open"
        );


        trigger.setAttribute(
            "aria-expanded",
            "false"
        );

    }



    /* ======================================================
       OPEN ROW
    ====================================================== */

    function openRow(
        row
    ) {

        const trigger =
            row.querySelector(
                ".home-skill-trigger"
            );


        if (!trigger) {
            return;
        }


        row.classList.add(
            "is-open"
        );


        trigger.setAttribute(
            "aria-expanded",
            "true"
        );

    }



    /* ======================================================
       CLICK EVENTS
    ====================================================== */

    skillRows.forEach(
        row => {

            const trigger =
                row.querySelector(
                    ".home-skill-trigger"
                );


            if (!trigger) {
                return;
            }


            trigger.addEventListener(
                "click",
                () => {

                    const isOpen =
                        row.classList.contains(
                            "is-open"
                        );


                    /*
                        Chiude tutte le altre voci.
                        In questo modo rimane aperta
                        una sola skill alla volta.
                    */

                    skillRows.forEach(
                        otherRow => {

                            if (
                                otherRow !==
                                row
                            ) {

                                closeRow(
                                    otherRow
                                );

                            }

                        }
                    );


                    /*
                        Toggle della voce cliccata.
                    */

                    if (
                        isOpen
                    ) {

                        closeRow(
                            row
                        );

                    }

                    else {

                        openRow(
                            row
                        );

                    }

                }
            );

        }
    );

})();