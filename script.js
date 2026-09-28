/* =========================================================
   BROWSER BACK / FORWARD FIX
========================================================= */

window.addEventListener("pageshow", () => {
    document.body.classList.remove("page-leaving");
    document.body.style.opacity = "";
});


/* =========================================================
   NAVIGATION TYPE
========================================================= */

const navigationEntry =
    performance.getEntriesByType("navigation")[0];

const isHistoryNavigation =
    navigationEntry &&
    navigationEntry.type === "back_forward";

const isReloadNavigation =
    navigationEntry &&
    navigationEntry.type === "reload";


/* =========================================================
   HOME INTRO — CLEAN TYPEWRITER
========================================================= */

const typewriter =
    document.getElementById("typewriter");

const typewriterGlow =
    document.getElementById("typewriter-glow");

const introTypeStage =
    document.getElementById("intro-type-stage");

const enterButton =
    document.getElementById("enter-button");

const intro =
    document.getElementById("intro");


/* =========================================================
   INTRO STYLE
========================================================= */

const introBaseStyle =
    document.createElement("style");

introBaseStyle.id =
    "intro-base-style";

introBaseStyle.textContent = `

body.intro-active {
    overflow: hidden !important;
}


/* =========================================================
   INTRO / TENDINA
========================================================= */

.intro {
    position: fixed !important;
    inset: 0 !important;

    z-index: 10000 !important;

    display: flex !important;

    align-items: center !important;
    justify-content: center !important;

    width: 100% !important;
    height: 100svh !important;

    background: #000000 !important;

    opacity: 1 !important;
    visibility: visible !important;

    overflow: hidden !important;

    transform:
        translate3d(
            0,
            0,
            0
        )
        !important;

    will-change:
        transform
        !important;

    /*
       VELOCITÀ TENDINA RIPRISTINATA.

       Non più 1400ms.
       Torna a 1000ms.
    */

    transition:
        transform
        1000ms
        cubic-bezier(
            0.77,
            0,
            0.175,
            1
        )
        !important;
}


/* =========================================================
   TENDINA CHE SALE
========================================================= */

.intro.is-curtain-up {
    transform:
        translate3d(
            0,
            -100%,
            0
        )
        !important;

    pointer-events:
        none
        !important;
}


.intro.hide {
    visibility:
        hidden
        !important;

    pointer-events:
        none
        !important;
}


/* =========================================================
   SITO NASCOSTO DURANTE LA TENDINA
========================================================= */

body.home-page.site-entering
.home-portfolio-nav,

body.home-page.site-entering
.home-portfolio {

    opacity:
        0
        !important;

    transform:
        none
        !important;

    transition:
        none
        !important;
}


/* =========================================================
   FADE SITO
   SOLO OPACITY
========================================================= */

body.home-page.site-entering.site-visible
.home-portfolio-nav,

body.home-page.site-entering.site-visible
.home-portfolio {

    opacity:
        1
        !important;

    transform:
        none
        !important;

    transition:
        opacity
        700ms
        ease
        !important;
}


/* =========================================================
   BLOCCO ZOOM HERO DURANTE IL FADE
========================================================= */

body.home-page.site-reveal-lock
.home-hero-visual,

body.home-page.site-reveal-lock
.home-hero-image {

    transform:
        none
        !important;

    transition:
        none
        !important;
}


body.home-page.site-reveal-lock
.home-hero-visual {

    opacity:
        1
        !important;
}


/* =========================================================
   INTRO CONTENT
========================================================= */

.intro .intro-content {

    position:
        relative
        !important;

    z-index:
        5
        !important;

    width:
        min(
            1500px,
            calc(
                100vw - 90px
            )
        )
        !important;

    margin:
        0 auto
        !important;

    padding:
        0
        !important;

    display:
        flex
        !important;

    flex-direction:
        column
        !important;

    align-items:
        center
        !important;

    justify-content:
        center
        !important;

    text-align:
        center
        !important;


    /*
       QUESTA È LA MODIFICA DELLE SCRITTE.

       Le scritte iniziali non spariscono
       più di colpo.

       Passano lentamente da opacity 1 a 0
       in 700ms.

       Questo NON rallenta la tendina.
    */

    opacity:
        1
        !important;

    transition:
        opacity
        700ms
        ease
        !important;
}


/* =========================================================
   SCOMPARSA SCRITTE
========================================================= */

.intro.is-text-leaving
.intro-content {

    opacity:
        0
        !important;
}


/* =========================================================
   TYPE STAGE
========================================================= */

.intro .intro-type-stage {

    position:
        relative
        !important;

    width:
        100%
        !important;

    margin:
        0
        !important;

    padding:
        0
        !important;

    background:
        transparent
        !important;

    border:
        0
        !important;

    box-shadow:
        none
        !important;

    filter:
        none
        !important;

    overflow:
        visible
        !important;
}


.intro .intro-type-stage::before,

.intro .intro-type-stage::after {

    content:
        none
        !important;

    display:
        none
        !important;
}


/* =========================================================
   TYPEWRITER
========================================================= */

html body.home-page
.intro
.intro-type-stage
#typewriter {

    display:
        block
        !important;

    width:
        100%
        !important;

    margin:
        0
        !important;

    padding:
        0
        !important;

    color:
        #ffffff
        !important;

    -webkit-text-fill-color:
        #ffffff
        !important;

    -webkit-text-stroke:
        0
        transparent
        !important;

    font-family:
        "Bebas Neue",
        "Arial Narrow",
        Arial,
        Helvetica,
        sans-serif
        !important;

    font-size:
        clamp(
            72px,
            8.6vw,
            150px
        )
        !important;

    font-weight:
        400
        !important;

    line-height:
        0.94
        !important;

    letter-spacing:
        0.005em
        !important;

    text-transform:
        uppercase
        !important;

    text-align:
        center
        !important;

    white-space:
        pre-line
        !important;

    background:
        transparent
        !important;

    text-shadow:
        none
        !important;

    box-shadow:
        none
        !important;

    filter:
        none
        !important;
}


/* =========================================================
   CURSORE TYPEWRITER
========================================================= */

html body.home-page
.intro
.intro-type-stage
#typewriter::after {

    content:
        "|"
        !important;

    display:
        inline-block
        !important;

    margin-left:
        0.04em
        !important;

    color:
        #ffffff
        !important;

    -webkit-text-fill-color:
        #ffffff
        !important;

    font:
        inherit
        !important;

    opacity:
        1
        !important;

    animation:
        intro-caret-blink
        0.72s
        step-end
        infinite
        !important;
}


/* =========================================================
   OLD GLOW OFF
========================================================= */

.intro-typewriter-glow,

#typewriter-glow {

    display:
        none
        !important;

    visibility:
        hidden
        !important;

    width:
        0
        !important;

    height:
        0
        !important;

    opacity:
        0
        !important;

    text-shadow:
        none
        !important;

    filter:
        none
        !important;
}


.intro-char,

.intro-space,

.intro-line {

    color:
        #ffffff
        !important;

    -webkit-text-fill-color:
        #ffffff
        !important;

    text-shadow:
        none
        !important;

    filter:
        none
        !important;
}


/* =========================================================
   ENTER BUTTON
========================================================= */

#enter-button {

    position:
        relative
        !important;

    margin-top:
        54px
        !important;

    padding:
        12px
        0
        !important;

    border:
        0
        !important;

    background:
        transparent
        !important;

    color:
        #ffffff
        !important;

    -webkit-text-fill-color:
        #ffffff
        !important;

    font-family:
        "IBM Plex Mono",
        monospace
        !important;

    font-size:
        13px
        !important;

    font-weight:
        500
        !important;

    letter-spacing:
        0.18em
        !important;

    text-transform:
        uppercase
        !important;

    opacity:
        0
        !important;

    visibility:
        hidden
        !important;

    cursor:
        pointer
        !important;

    transition:
        opacity
        450ms
        ease,

        letter-spacing
        300ms
        ease
        !important;
}


#enter-button.visible {

    opacity:
        1
        !important;

    visibility:
        visible
        !important;
}


#enter-button.visible:hover {

    letter-spacing:
        0.28em
        !important;
}


/* =========================================================
   CURSOR BLINK
========================================================= */

@keyframes intro-caret-blink {

    0%,
    48% {

        opacity:
            1;
    }


    49%,
    100% {

        opacity:
            0;
    }

}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 820px) {

    .intro .intro-content {

        width:
            calc(
                100vw - 40px
            )
            !important;
    }


    html body.home-page
    .intro
    .intro-type-stage
    #typewriter {

        font-size:
            clamp(
                54px,
                14vw,
                100px
            )
            !important;

        line-height:
            0.98
            !important;
    }


    #enter-button {

        margin-top:
            38px
            !important;
    }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 520px) {

    html body.home-page
    .intro
    .intro-type-stage
    #typewriter {

        font-size:
            clamp(
                46px,
                14vw,
                76px
            )
            !important;
    }

}


/* =========================================================
   REDUCED MOTION
========================================================= */

@media (prefers-reduced-motion: reduce) {

    .intro,

    #enter-button {

        transition:
            none
            !important;
    }


    html body.home-page
    .intro
    .intro-type-stage
    #typewriter::after {

        animation:
            none
            !important;
    }

}

`;


document.head.appendChild(
    introBaseStyle
);


/* =========================================================
   INTRO NAVIGATION
========================================================= */

const skipIntro =
    isHistoryNavigation;


/*
   Se nell'URL c'è #home lo togliamo,
   ma l'intro parte comunque.
*/

if (
    !isHistoryNavigation &&
    window.location.hash === "#home"
) {

    history.replaceState(
        null,
        "",
        window.location.pathname
    );

}


/* =========================================================
   SKIP INTRO SU BACK / FORWARD
========================================================= */

if (
    skipIntro &&
    intro
) {

    intro.style.display =
        "none";


    document.body.classList.remove(
        "intro-active",
        "site-entering",
        "site-reveal-lock"
    );


    document.body.classList.add(
        "site-visible"
    );


    if (
        window.location.hash === "#home"
    ) {

        history.replaceState(
            null,
            "",
            window.location.pathname
        );

    }

}


/* =========================================================
   NORMAL INTRO
========================================================= */

else if (
    typewriter &&
    enterButton &&
    intro
) {

    const text =
`RICCARDO.
GRAPHIC DESIGNER.
PORTFOLIO 2026.`;


    /* =====================================================
       TYPEWRITER SETTINGS
    ===================================================== */

    const TYPE_SPEED =
        70;


    const INTRO_DELAY =
        800;


    const ENTER_DELAY =
        500;


    let index =
        0;


    let typeTimer =
        null;


    let enterTimer =
        null;


    /* =====================================================
       RESET INTRO
    ===================================================== */

    typewriter.textContent =
        "";


    /*
       FORZA DEFINITIVAMENTE IL TESTO BIANCO
    */

    typewriter.style.setProperty(
        "color",
        "#ffffff",
        "important"
    );


    typewriter.style.setProperty(
        "-webkit-text-fill-color",
        "#ffffff",
        "important"
    );


    typewriter.style.setProperty(
        "-webkit-text-stroke",
        "0 transparent",
        "important"
    );


    typewriter.style.setProperty(
        "text-shadow",
        "none",
        "important"
    );


    typewriter.style.setProperty(
        "filter",
        "none",
        "important"
    );


    typewriter.classList.add(
        "is-typing"
    );


    enterButton.classList.remove(
        "visible"
    );


    /*
       IMPORTANTE:
       resettiamo anche is-text-leaving
       quando l'intro riparte.
    */

    intro.classList.remove(
        "hide",
        "is-curtain-up",
        "is-text-leaving"
    );


    intro.style.display =
        "";


    document.body.classList.remove(
        "site-entering",
        "site-visible",
        "site-reveal-lock"
    );


    document.body.classList.add(
        "intro-active"
    );


    /* =====================================================
       OLD GLOW OFF
    ===================================================== */

    if (
        typewriterGlow
    ) {

        typewriterGlow.textContent =
            "";


        typewriterGlow.removeAttribute(
            "data-glow-text"
        );


        typewriterGlow.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (
        introTypeStage
    ) {

        introTypeStage.classList.remove(
            "is-glow-active",
            "is-glow-hot",
            "is-text-visible"
        );


        introTypeStage.removeAttribute(
            "role"
        );


        introTypeStage.removeAttribute(
            "tabindex"
        );


        introTypeStage.removeAttribute(
            "aria-pressed"
        );


        introTypeStage.removeAttribute(
            "aria-label"
        );

    }


    /* =====================================================
       FINE TYPEWRITER
    ===================================================== */

    function finishTyping() {

        typewriter.classList.remove(
            "is-typing"
        );


        typewriter.classList.add(
            "is-typed"
        );


        enterTimer =
            window.setTimeout(

                () => {

                    enterButton.classList.add(
                        "visible"
                    );


                    enterTimer =
                        null;

                },

                ENTER_DELAY

            );

    }


    /* =====================================================
       TYPEWRITER
    ===================================================== */

    function typeText() {

        if (
            index >=
            text.length
        ) {

            finishTyping();

            return;

        }


        typewriter.textContent +=
            text.charAt(
                index
            );


        index++;


        typeTimer =
            window.setTimeout(

                typeText,

                TYPE_SPEED

            );

    }


    /* =====================================================
       START TYPEWRITER
    ===================================================== */

    typeTimer =
        window.setTimeout(

            typeText,

            INTRO_DELAY

        );


    /* =====================================================
       ENTER
    ===================================================== */

    enterButton.addEventListener(

        "click",

        () => {


            if (
                typeTimer !==
                null
            ) {

                window.clearTimeout(
                    typeTimer
                );


                typeTimer =
                    null;

            }


            if (
                enterTimer !==
                null
            ) {

                window.clearTimeout(
                    enterTimer
                );


                enterTimer =
                    null;

            }


            /* =============================================
               01 — SCOMPARSA SCRITTE

               Solo:

               RICCARDO.
               GRAPHIC DESIGNER.
               PORTFOLIO 2026.
               ENTER →

               passano lentamente da opacity 1 a 0.

               Durata: 700ms.

               La tendina NON viene rallentata.
            ============================================= */

            intro.classList.add(
                "is-text-leaving"
            );


            /* =============================================
               02 — PREPARA IL SITO
            ============================================= */

            document.body.classList.add(
                "site-entering",
                "site-reveal-lock"
            );


            /* =============================================
               03 — TENDINA

               Parte SUBITO.

               Nessun ritardo da 350ms.

               Durata:
               1000ms.
            ============================================= */

            requestAnimationFrame(

                () => {

                    intro.classList.add(
                        "is-curtain-up"
                    );

                }

            );


            /* =============================================
               04 — FINE TENDINA

               A 1000ms la tendina è completamente
               uscita verso l'alto.

               Parte quindi la comparsa della Home.
            ============================================= */

            window.setTimeout(

                () => {

                    intro.style.display =
                        "none";


                    intro.classList.add(
                        "hide"
                    );


                    document.body.classList.remove(
                        "intro-active"
                    );


                    /*
                       Hero già nello stato finale.

                       Nessuno zoom.
                    */

                    document.body.classList.add(
                        "home-hero-visible"
                    );


                    /*
                       Comparsa sito:

                       opacity 0 → 1
                       in 700ms.
                    */

                    requestAnimationFrame(

                        () => {

                            requestAnimationFrame(

                                () => {

                                    document.body.classList.add(
                                        "site-visible"
                                    );

                                }

                            );

                        }

                    );

                },

                1000

            );


            /* =============================================
               05 — FINE FADE DEL SITO

               1000ms tendina
               +
               700ms fade
               +
               piccolo margine

               = 1750ms
            ============================================= */

            window.setTimeout(

                () => {

                    document.body.classList.remove(
                        "site-entering",
                        "site-reveal-lock"
                    );

                },

                1750

            );

        }

    );

}


/* =========================================================
   PAGE TRANSITIONS
========================================================= */

const pageLinks =
    document.querySelectorAll(
        ".page-link"
    );


pageLinks.forEach(

    link => {

        link.addEventListener(

            "click",

            event => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    link.target === "_blank"
                ) {

                    return;

                }


                event.preventDefault();


                document.body.classList.add(
                    "page-leaving"
                );


                setTimeout(

                    () => {

                        window.location.href =
                            href;

                    },

                    300

                );

            }

        );

    }

);


/* =========================================================
   DOUBLE TAKE — DYNAMIC HERO
========================================================= */

const dynamicHero =
    document.getElementById(
        "double-take-hero"
    );


const logoA =
    document.getElementById(
        "dynamic-logo-a"
    );


const logoB =
    document.getElementById(
        "dynamic-logo-b"
    );


const slideCounter =
    document.getElementById(
        "dynamic-slide-current"
    );


if (
    dynamicHero &&
    logoA &&
    logoB
) {

    const slides = [

        {
            src:
                "assets/images/double-take/double-take-logo-01.svg",

            captionColor:
                "#111111"
        },

        {
            src:
                "assets/images/double-take/double-take-logo-02.svg",

            captionColor:
                "#ffffff"
        },

        {
            src:
                "assets/images/double-take/double-take-logo-03.svg",

            captionColor:
                "#ffffff"
        },

        {
            src:
                "assets/images/double-take/double-take-logo-04.svg",

            captionColor:
                "#ffffff"
        },

        {
            src:
                "assets/images/double-take/double-take-logo-05.svg",

            captionColor:
                "#ffffff"
        }

    ];


    /* PRELOAD */

    slides.forEach(

        slide => {

            const image =
                new Image();


            image.src =
                slide.src;

        }

    );


    let currentIndex =
        0;


    let logoAVisible =
        true;


    logoA.src =
        slides[0].src;


    logoB.src =
        slides[1].src;


    logoA.classList.add(
        "is-visible"
    );


    logoB.classList.remove(
        "is-visible"
    );


    dynamicHero.style.setProperty(

        "--hero-caption-color",

        slides[0].captionColor

    );


    function changeDoubleTakeSlide() {

        const nextIndex =
            (
                currentIndex + 1
            )
            %
            slides.length;


        const nextSlide =
            slides[nextIndex];


        dynamicHero.style.setProperty(

            "--hero-caption-color",

            nextSlide.captionColor

        );


        if (
            logoAVisible
        ) {

            logoB.src =
                nextSlide.src;


            logoB.classList.add(
                "is-visible"
            );


            logoA.classList.remove(
                "is-visible"
            );

        }

        else {

            logoA.src =
                nextSlide.src;


            logoA.classList.add(
                "is-visible"
            );


            logoB.classList.remove(
                "is-visible"
            );

        }


        logoAVisible =
            !logoAVisible;


        currentIndex =
            nextIndex;


        if (
            slideCounter
        ) {

            slideCounter.textContent =

                String(
                    currentIndex + 1
                ).padStart(
                    2,
                    "0"
                );

        }

    }


    setInterval(

        changeDoubleTakeSlide,

        2200

    );

}


/* =========================================================
   MOKAE COFFEE HERO
========================================================= */

const mokaeHero =
    document.getElementById(
        "mokae-hero"
    );


const mokaeRain =
    document.getElementById(
        "mokae-rain"
    );


const mokaeFinalLogo =
    document.getElementById(
        "mokae-final-logo"
    );


if (
    mokaeHero &&
    mokaeRain &&
    mokaeFinalLogo
) {

    let mokaeAnimationStarted =
        false;


    function randomBetween(
        min,
        max
    ) {

        return (
            Math.random() *
            (
                max - min
            )
            +
            min
        );

    }


    function createMokaeSymbol() {

        const symbol =
            document.createElement(
                "img"
            );


        symbol.src =
            "assets/images/mokae-coffee/mokae-symbol.svg";


        symbol.alt =
            "";


        symbol.classList.add(
            "mokae-rain-symbol"
        );


        const size =
            randomBetween(
                22,
                72
            );


        const left =
            randomBetween(
                -2,
                98
            );


        const duration =
            randomBetween(
                1.8,
                2.9
            );


        const delay =
            randomBetween(
                0,
                1.2
            );


        const startRotation =
            randomBetween(
                -30,
                30
            );


        const endRotation =
            startRotation +
            randomBetween(
                40,
                130
            );


        symbol.style.left =
            `${left}%`;


        symbol.style.setProperty(

            "--symbol-size",

            `${size}px`

        );


        symbol.style.setProperty(

            "--fall-duration",

            `${duration}s`

        );


        symbol.style.setProperty(

            "--fall-delay",

            `${delay}s`

        );


        symbol.style.setProperty(

            "--start-rotation",

            `${startRotation}deg`

        );


        symbol.style.setProperty(

            "--end-rotation",

            `${endRotation}deg`

        );


        mokaeRain.appendChild(
            symbol
        );

    }


    function startMokaeAnimation() {

        if (
            mokaeAnimationStarted
        ) {

            return;

        }


        mokaeAnimationStarted =
            true;


        mokaeFinalLogo.classList.remove(
            "is-visible"
        );


        mokaeRain.classList.remove(
            "is-fading"
        );


        for (
            let i = 0;
            i < 60;
            i++
        ) {

            createMokaeSymbol();

        }


        setTimeout(

            () => {

                mokaeFinalLogo.classList.add(
                    "is-visible"
                );

            },

            2850

        );


        setTimeout(

            () => {

                mokaeRain.classList.add(
                    "is-fading"
                );

            },

            3000

        );


        setTimeout(

            () => {

                mokaeRain.innerHTML =
                    "";

            },

            5200

        );

    }


    if (
        "IntersectionObserver"
        in window
    ) {

        const mokaeObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(

                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                startMokaeAnimation();


                                mokaeObserver.disconnect();

                            }

                        }

                    );

                },

                {

                    threshold:
                        0.05,


                    rootMargin:
                        "0px 0px -5% 0px"

                }

            );


        mokaeObserver.observe(
            mokaeHero
        );

    }

    else {

        startMokaeAnimation();

    }

}


/* =========================================================
   PROJECT DETAIL LIGHTBOX
========================================================= */

const detailItems =
    document.querySelectorAll(

        ".case-detail-image, .mokae-detail, .spartan-detail"

    );


if (
    detailItems.length > 0
) {

    const lightbox =
        document.createElement(
            "div"
        );


    lightbox.className =
        "detail-lightbox";


    lightbox.setAttribute(

        "aria-hidden",

        "true"

    );


    lightbox.innerHTML = `

        <div class="detail-lightbox__backdrop"></div>

        <div
            class="detail-lightbox__dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Project detail image"
        >

            <button
                class="detail-lightbox__close"
                type="button"
                aria-label="Close image"
            >
                ×
            </button>

            <div class="detail-lightbox__stage">

                <img
                    class="detail-lightbox__image"
                    src=""
                    alt=""
                >

            </div>

            <p class="detail-lightbox__hint">
                ESC TO CLOSE
            </p>

        </div>

    `;


    document.body.appendChild(
        lightbox
    );


    const lightboxImage =
        lightbox.querySelector(
            ".detail-lightbox__image"
        );


    const lightboxBackdrop =
        lightbox.querySelector(
            ".detail-lightbox__backdrop"
        );


    const lightboxClose =
        lightbox.querySelector(
            ".detail-lightbox__close"
        );


    function openDetailLightbox(
        item
    ) {

        const image =
            item.querySelector(
                "img"
            );


        if (
            !image ||
            image.naturalWidth === 0
        ) {

            return;

        }


        lightboxImage.src =
            image.currentSrc ||
            image.src;


        lightboxImage.alt =
            image.alt ||
            "Project detail";


        lightbox.classList.add(
            "is-open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "lightbox-open"
        );


        setTimeout(

            () => {

                lightboxClose.focus();

            },

            100

        );

    }


    function closeDetailLightbox() {

        lightbox.classList.remove(
            "is-open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "lightbox-open"
        );


        setTimeout(

            () => {

                if (
                    !lightbox.classList.contains(
                        "is-open"
                    )
                ) {

                    lightboxImage.removeAttribute(
                        "src"
                    );

                }

            },

            400

        );

    }


    function activateDetail(
        item
    ) {

        if (
            item.dataset.lightboxReady ===
            "true"
        ) {

            return;

        }


        item.dataset.lightboxReady =
            "true";


        item.classList.add(
            "detail-is-clickable"
        );


        item.setAttribute(
            "tabindex",
            "0"
        );


        item.setAttribute(
            "role",
            "button"
        );


        item.setAttribute(
            "aria-label",
            "Open project detail"
        );


        item.addEventListener(

            "click",

            () => {

                openDetailLightbox(
                    item
                );

            }

        );


        item.addEventListener(

            "keydown",

            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();


                    openDetailLightbox(
                        item
                    );

                }

            }

        );

    }


    detailItems.forEach(

        item => {

            const image =
                item.querySelector(
                    "img"
                );


            if (
                !image
            ) {

                return;

            }


            image.loading =
                "eager";


            if (
                image.complete &&
                image.naturalWidth > 0
            ) {

                activateDetail(
                    item
                );

            }

            else {

                image.addEventListener(

                    "load",

                    () => {

                        activateDetail(
                            item
                        );

                    },

                    {

                        once:
                            true

                    }

                );

            }

        }

    );


    lightboxClose.addEventListener(

        "click",

        closeDetailLightbox

    );


    lightboxBackdrop.addEventListener(

        "click",

        closeDetailLightbox

    );


    document.addEventListener(

        "keydown",

        event => {

            if (
                event.key === "Escape" &&
                lightbox.classList.contains(
                    "is-open"
                )
            ) {

                closeDetailLightbox();

            }

        }

    );

}


/* =========================================================
   SPARTAN FITNESS — FORGE / SLASH HERO
========================================================= */

const spartanHero =
    document.getElementById(
        "spartan-hero"
    );


if (
    spartanHero
) {

    const spartanFlash =
        document.getElementById(
            "spartan-impact-flash"
        );


    const spartanRing =
        document.getElementById(
            "spartan-impact-ring"
        );


    const spartanSparks =
        document.getElementById(
            "spartan-sparks"
        );


    const spartanCracks =
        document.getElementById(
            "spartan-cracks"
        );


    const spartanFinalBrand =
        document.getElementById(
            "spartan-final-brand"
        );


    const spartanFinalLogoImage =
        spartanFinalBrand

            ? spartanFinalBrand.querySelector(
                ".spartan-final-logo-image"
            )

            : null;


    const spartanSlash1 =
        document.getElementById(
            "spartan-slash-1"
        );


    const spartanSlash2 =
        document.getElementById(
            "spartan-slash-2"
        );


    const spartanSlash3 =
        document.getElementById(
            "spartan-slash-3"
        );


    let spartanAnimationStarted =
        false;


    /* =====================================================
       FINAL LOGO PREP
    ===================================================== */

    if (
        spartanFinalLogoImage
    ) {

        spartanFinalLogoImage.loading =
            "eager";


        spartanFinalLogoImage.decoding =
            "async";

    }


    /* =====================================================
       RESET
    ===================================================== */

    function resetSpartanAnimationState() {

        spartanHero.classList.remove(
            "is-fighting",
            "is-shaking",
            "is-final"
        );


        if (
            spartanCracks
        ) {

            spartanCracks.classList.remove(
                "is-visible"
            );

        }


        if (
            spartanFinalBrand
        ) {

            spartanFinalBrand.classList.remove(
                "is-visible",
                "is-impacting"
            );

        }


        [
            spartanSlash1,
            spartanSlash2,
            spartanSlash3
        ].forEach(

            slash => {

                if (
                    slash
                ) {

                    slash.classList.remove(
                        "is-active"
                    );

                }

            }

        );


        if (
            spartanSparks
        ) {

            spartanSparks.innerHTML =
                "";

        }

    }


    /* =====================================================
       REPLAY CLASS
    ===================================================== */

    function replayClass(
        element,
        className
    ) {

        if (
            !element
        ) {

            return;

        }


        element.classList.remove(
            className
        );


        void element.offsetWidth;


        element.classList.add(
            className
        );

    }


    /* =====================================================
       CREATE SPARKS
    ===================================================== */

    function createSpartanSparks(
        amount = 24
    ) {

        if (
            !spartanSparks
        ) {

            return;

        }


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const spark =
                document.createElement(
                    "span"
                );


            spark.classList.add(
                "spartan-spark"
            );


            const angle =
                Math.random() *
                360;


            const distance =
                65 +
                Math.random() *
                120;


            const duration =
                0.35 +
                Math.random() *
                0.35;


            const length =
                10 +
                Math.random() *
                20;


            spark.style.setProperty(

                "--spark-angle",

                `${angle}deg`

            );


            spark.style.setProperty(

                "--spark-distance",

                `${distance}px`

            );


            spark.style.setProperty(

                "--spark-duration",

                `${duration}s`

            );


            spark.style.setProperty(

                "--spark-length",

                `${length}px`

            );


            spartanSparks.appendChild(
                spark
            );


            setTimeout(

                () => {

                    spark.remove();

                },

                850

            );

        }

    }


    /* =====================================================
       IMPACT
    ===================================================== */

    function spartanImpact(
        strength = "normal"
    ) {

        replayClass(
            spartanFlash,
            "is-active"
        );


        replayClass(
            spartanRing,
            "is-active"
        );


        createSpartanSparks(

            strength === "final"

                ? 36

                : 24

        );


        spartanHero.classList.remove(
            "is-shaking"
        );


        void spartanHero.offsetWidth;


        spartanHero.classList.add(
            "is-shaking"
        );


        setTimeout(

            () => {

                spartanHero.classList.remove(
                    "is-shaking"
                );

            },

            250

        );

    }


    /* =====================================================
       SLASH
    ===================================================== */

    function triggerSlash(
        number
    ) {

        if (
            number === 1
        ) {

            replayClass(
                spartanSlash1,
                "is-active"
            );

        }


        if (
            number === 2
        ) {

            replayClass(
                spartanSlash2,
                "is-active"
            );

        }


        if (
            number === 3
        ) {

            replayClass(
                spartanSlash3,
                "is-active"
            );

        }

    }


    /* =====================================================
       START
    ===================================================== */

    function startSpartanAnimation() {

        if (
            spartanAnimationStarted
        ) {

            return;

        }


        spartanAnimationStarted =
            true;


        resetSpartanAnimationState();


        requestAnimationFrame(

            () => {

                requestAnimationFrame(

                    () => {

                        spartanHero.classList.add(
                            "is-fighting"
                        );

                    }

                );

            }

        );


        /* CLASH 01 */

        setTimeout(

            () => {

                spartanImpact();


                triggerSlash(
                    1
                );

            },

            650

        );


        /* CLASH 02 */

        setTimeout(

            () => {

                spartanImpact();


                triggerSlash(
                    2
                );

            },

            1350

        );


        /* CLASH 03 */

        setTimeout(

            () => {

                spartanImpact(
                    "final"
                );


                triggerSlash(
                    3
                );

            },

            2100

        );


        /* CRACKS */

        setTimeout(

            () => {

                if (
                    spartanCracks
                ) {

                    spartanCracks.classList.add(
                        "is-visible"
                    );

                }

            },

            2480

        );


        /* FINAL LOGO */

        setTimeout(

            () => {

                if (
                    spartanFinalBrand
                ) {

                    spartanFinalBrand.classList.add(
                        "is-visible"
                    );

                }


                spartanHero.classList.add(
                    "is-final"
                );

            },

            2700

        );


        /* FINAL IMPACT */

        setTimeout(

            () => {

                if (
                    spartanFinalBrand
                ) {

                    spartanFinalBrand.classList.add(
                        "is-impacting"
                    );

                }


                spartanImpact(
                    "final"
                );

            },

            3250

        );


        /* LOGO SETTLES */

        setTimeout(

            () => {

                if (
                    spartanFinalBrand
                ) {

                    spartanFinalBrand.classList.remove(
                        "is-impacting"
                    );

                }

            },

            3750

        );

    }


    /* =====================================================
       HERO VISIBILITY
    ===================================================== */

    function heroIsAlreadyVisible() {

        const rect =
            spartanHero
                .getBoundingClientRect();


        return (

            rect.bottom > 0 &&

            rect.top <
                window.innerHeight

        );

    }


    /* =====================================================
       OBSERVER
    ===================================================== */

    if (
        "IntersectionObserver"
        in window
    ) {

        const spartanObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(

                        entry => {

                            if (
                                entry.isIntersecting ||
                                entry.intersectionRatio > 0
                            ) {

                                startSpartanAnimation();


                                spartanObserver.disconnect();

                            }

                        }

                    );

                },

                {

                    threshold:
                        0.01,


                    rootMargin:
                        "40px 0px 40px 0px"

                }

            );


        spartanObserver.observe(
            spartanHero
        );


        setTimeout(

            () => {

                if (
                    !spartanAnimationStarted &&
                    heroIsAlreadyVisible()
                ) {

                    startSpartanAnimation();


                    spartanObserver.disconnect();

                }

            },

            250

        );

    }

    else {

        startSpartanAnimation();

    }


    /* =====================================================
       BACK / FORWARD CACHE SAFETY
    ===================================================== */

    window.addEventListener(

        "pageshow",

        event => {

            if (
                event.persisted &&
                !spartanAnimationStarted &&
                heroIsAlreadyVisible()
            ) {

                startSpartanAnimation();

            }

        }

    );

}