/* ==========================================================
   GLOBAL THEME TOGGLE
   Dark / Light
========================================================== */

(() => {

    "use strict";


    /* ======================================================
       SETTINGS
    ====================================================== */

    const STORAGE_KEY =
        "riccardo-portfolio-theme";


    const DARK =
        "dark";


    const LIGHT =
        "light";


    const root =
        document.documentElement;



    /* ======================================================
       STORAGE
    ====================================================== */

    function getSavedTheme() {

        try {

            const saved =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (
                saved === LIGHT ||
                saved === DARK
            ) {

                return saved;

            }

        }

        catch (
            error
        ) {

            /*
                If localStorage is unavailable
                simply use dark mode.
            */

        }


        return DARK;

    }



    function saveTheme(
        theme
    ) {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                theme
            );

        }

        catch (
            error
        ) {

            /*
                Theme still works even if
                storage is unavailable.
            */

        }

    }



    /* ======================================================
       APPLY SAVED THEME IMMEDIATELY

       This runs before the page is fully loaded,
       preventing a dark/light flash between pages.
    ====================================================== */

    const initialTheme =
        getSavedTheme();


    root.setAttribute(
        "data-theme",
        initialTheme
    );



    /* ======================================================
       CREATE BUTTON
    ====================================================== */

    function createThemeToggle() {

        /*
            Prevent duplicate button.
        */

        if (
            document.querySelector(
                ".theme-toggle"
            )
        ) {

            return;

        }


        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "theme-toggle";


        button.setAttribute(
            "aria-live",
            "polite"
        );


        button.innerHTML =
            `
                <span
                    class="theme-toggle-icon"
                    aria-hidden="true"
                >
                    <span class="theme-toggle-disc"></span>
                </span>
            `;


        document.body.classList.add(
            "has-theme-toggle"
        );


        document.body.prepend(
            button
        );



        /* ==================================================
           UPDATE BUTTON
        ================================================== */

        function updateButton() {

            const currentTheme =
                root.getAttribute(
                    "data-theme"
                );


            const isLight =
                currentTheme ===
                LIGHT;


            button.setAttribute(
                "aria-label",
                isLight
                    ?
                    "Attiva tema scuro"
                    :
                    "Attiva tema chiaro"
            );


            button.setAttribute(
                "title",
                isLight
                    ?
                    "Dark mode"
                    :
                    "Light mode"
            );


            button.dataset.theme =
                currentTheme;

        }



        /* ==================================================
           TOGGLE
        ================================================== */

        button.addEventListener(
            "click",
            () => {

                const currentTheme =
                    root.getAttribute(
                        "data-theme"
                    );


                const nextTheme =
                    currentTheme === LIGHT
                        ?
                        DARK
                        :
                        LIGHT;


                root.setAttribute(
                    "data-theme",
                    nextTheme
                );


                saveTheme(
                    nextTheme
                );


                updateButton();

            }
        );


        updateButton();

    }



    /* ======================================================
       START
    ====================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            createThemeToggle,
            {
                once:
                    true
            }
        );

    }

    else {

        createThemeToggle();

    }

})();