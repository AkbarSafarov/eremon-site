document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;
    const html = document.documentElement;

    const menuBtn = document.querySelector('.burger');
    const menuWrapper = document.querySelector('.menu_burger');

    if (menuBtn && menuWrapper) {
        
        const menuClose = document.querySelector('.menuClose');

        const openedMenu = 'opened';
        const overflowHidden = 'oveflowHidden';

        function toggleMenu() {
            menuWrapper.classList.toggle(openedMenu);
            menuBtn.classList.toggle(openedMenu);
            html.classList.toggle(overflowHidden);
            html.classList.toggle('open_menu');
        }

        function closeMenu() {
            menuWrapper.classList.remove(openedMenu);
            menuBtn.classList.remove(openedMenu);
            html.classList.remove(overflowHidden);
            html.classList.remove('open_menu');
        }

        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        menuClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMenu();
        });

        document.addEventListener('click', function(e) {
            if (
                !menuBtn.contains(e.target) &&
                !menuWrapper.contains(e.target) &&
                menuBtn.classList.contains(openedMenu)
            ) {
                closeMenu();
            }
        });

        const menuAnchor = document.querySelectorAll('.anchor_menu li a');

        if(menuAnchor) {
            menuAnchor.forEach(button => {
                button.addEventListener('click', function (e) {
                    e.preventDefault();

                    closeMenu();

                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        const targetOffsetTop = targetElement.offsetTop;

                        window.scrollTo({
                            top: targetOffsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

    }


    const linkTop = document.querySelectorAll('.btn_top_link');

    if(linkTop) {
        linkTop.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                if (!document.scrollingElement._isScrolling) {
                    document.scrollingElement._isScrolling = true;

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                    setTimeout(() => {
                        document.scrollingElement._isScrolling = false;
                    }, 700);
                }
            });
        });
    }

    
    if (document.cookie.indexOf('cookies_accepted=true') !== -1) {
        const cookieBlock = document.querySelector('.cookie_block');
        if (cookieBlock) cookieBlock.remove();
    }

    if(document.querySelectorAll('.cookies-agree')) {
        document.querySelectorAll('.cookies-agree').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                // Установить куку на 1 год
                document.cookie = "cookies_accepted=true; path=/; max-age=" + (60 * 60 * 24 * 365);

                const cookieBlock = this.closest('.cookie_block');
                if (cookieBlock) cookieBlock.remove();
            });
        });

        if(document.querySelector('.cookies-close')){
            document.querySelector('.cookies-close').addEventListener('click', function (e) {
                e.preventDefault();
                const cookieBlock = this.closest('.cookie_block');
                if (cookieBlock) cookieBlock.remove();
            });
        }
    }

    const similarSlider = document.querySelector('.ce_block_wr');
    let swiperSimilar = null;

    function initSlider() {
        if (window.innerWidth <= 1024 && similarSlider && !swiperSimilar) {
            swiperSimilar = new Swiper(".ce_slider", {
                loop: true,
                slidesPerView: 2,
                spaceBetween: 20,
                lazy: true,
                pagination: {
                    el: ".slider_pagination",
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    }
                }
            });
        } else if (window.innerWidth > 1024 && swiperSimilar) {
            swiperSimilar.destroy(true, true);
            swiperSimilar = null;
        }
    }

    if (similarSlider) {
        initSlider();
        window.addEventListener('resize', initSlider);
    }


    const serviceItems = document.querySelectorAll('.service_block_wr .item');
    const isMobile = window.matchMedia('(max-width: 1110px)').matches;
    
    if(serviceItems.length) {
    
        function activateItem(item) {
            serviceItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        }
        
        serviceItems.forEach(item => {
            if (isMobile) {
                item.addEventListener('click', function(e) {
                    e.stopPropagation(); 
                    activateItem(this);
                });
            } else {
                item.addEventListener('mouseenter', function() {
                    activateItem(this);
                });
            }
        });
        
        if (isMobile) {
            document.addEventListener('click', function() {
                serviceItems.forEach(item => item.classList.remove('active'));
            });
        }
    }


    const laSlider = document.querySelector('.la_slider');

    if(laSlider){
        laSliderInit = new Swiper(".la_slider", {
            loop: false,
            slidesPerView: 2,
            spaceBetween: 13,
            lazy: true,
            pagination: {
                el: ".la_pagination",
            },
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: 13
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 13
                }
            }
        });

        lightGallery(laSlider, {
            animateThumb: false,
            zoomFromOrigin: false,
            allowMediaOverlap: true,
            toggleThumb: false,
            selector: 'a'
        });
    }

    const coSlider = document.querySelector('.co_slider');

    if(coSlider){
        coSliderInit = new Swiper(".co_slider", {
            loop: false,
            slidesPerView: 4,
            spaceBetween: 20,
            lazy: true,
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: 10
                },
                600: {
                    slidesPerView: 4,
                    spaceBetween: 20
                }
            }
        });
    }

    const suntBlock = document.querySelector('.sunt_block_wr');
    if(suntBlock){
        const nameList = suntBlock.querySelectorAll('.left_list_name .name');
        const imageList = suntBlock.querySelectorAll('.image_list .image');
        const textList = suntBlock.querySelectorAll('.text_list .text');
        
        function activeName(item, list) {
            list.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        }
        
        function handleInteraction(name) {
            const dataName = name.getAttribute('data-name');
            activeName(name, nameList);
            
            imageList.forEach((image) => {
                const imageName = image.getAttribute('data-name');
                if(dataName === imageName) {
                    activeName(image, imageList);
                }
            });
            
            textList.forEach((text) => {
                const textName = text.getAttribute('data-name');
                if(dataName === textName) {
                    activeName(text, textList);
                }
            });
        }
        
        nameList.forEach((name) => {
            const handler = function(){
                handleInteraction(this);
            };
            name._handler = handler;
            
            if (window.innerWidth > 940) {
                name.addEventListener('mouseenter', handler);
            } else {
                name.addEventListener('click', handler);
            }
        });
        
        let currentEventType = window.innerWidth > 940 ? 'mouseenter' : 'click';
        
        window.addEventListener('resize', function() {
            const newEventType = window.innerWidth > 940 ? 'mouseenter' : 'click';
            
            if (currentEventType !== newEventType) {
                nameList.forEach((name) => {
                    name.removeEventListener(currentEventType, name._handler);
                });
                
                nameList.forEach(i => i.classList.remove('active'));
                imageList.forEach(i => i.classList.remove('active'));
                textList.forEach(i => i.classList.remove('active'));
                
                nameList.forEach((name) => {
                    const handler = function(){
                        handleInteraction(this);
                    };
                    name._handler = handler;
                    name.addEventListener(newEventType, handler);
                });
                
                currentEventType = newEventType;
            }
        });
    }

    const langBtn = document.querySelector('.dropdown-item-current');

    if(langBtn){
        langBtn.addEventListener('click', function(){
            document.querySelector('.lang_block').classList.toggle('active');
        })


        document.addEventListener('click', function(e) {
            if (
                !document.querySelector('.lang_block').contains(e.target) 
            ) {
                document.querySelector('.lang_block').classList.remove('active');
            }
        });
    }
})