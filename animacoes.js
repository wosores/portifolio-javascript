function initTabNav(){
    const tabMenu=document.querySelectorAll('[data-tab="menu"] li');
    const tabContent = document.querySelectorAll('[data-tab="content"] section');

    if(tabMenu.length && tabContent.length){
        tabContent[0].classList.add('ativo');
        
        function activeTab(index){
            tabContent.forEach((section) => {
                section.classList.remove('ativo');
            });
            const direcao = tabContent[index].dataset.anime;
            tabContent[index].classList.add('ativo',direcao);
        }
        tabMenu.forEach((itemMenu, index) => {
            itemMenu.addEventListener('mouseover',() =>{
                activeTab(index);
            });
       });
    }
}
initTabNav();

function initAccordion(){
    const accordionList=document.querySelectorAll('[data-anime="accordion"] dt');
    if(accordionList.length){
    accordionList[0].classList.toggle('ativo');
    accordionList[0].nextElementSibling.classList.toggle('ativo');

    function ActiveAccordion(){
        this.classList.toggle('ativo');
        this.nextElementSibling.classList.toggle('ativo');
    }

    accordionList.forEach((item) => {
        item.addEventListener('mouseover',ActiveAccordion);
    });
}
};

initAccordion();

function initScrollSuave(){

    const linksInternos = document.querySelectorAll('[data-menu="suave"] a[href^="#"]');

    function scrollToSection(event) {
        event.preventDefault();
        const href = event.currentTarget.getAttribute('href');
        const section = document.querySelector(href);
        //FORMA ANTIGA DE FAZER SCROOLL SUAVE
        // section.scrollIntoView({
        //     behavior: 'smooth',
        //     block:'start',
        // });

        //FORMA NOVA NÃO COMPATIVEL COMO TODOS NAVEGADORES
        const topo = section.offsetTop;
        window.scrollTo({
            top: topo,
            behavior: 'smooth',
        });
    }

    linksInternos.forEach((link) => {
        link.addEventListener('mouseover', scrollToSection);
    });
}

initScrollSuave();

function initAnimacaoScroll(){

const sections=document.querySelectorAll('[data-anime="scroll"]');
const sections2=document.querySelectorAll('[data-anime="scroll2"]');
const windowMetade = window.innerHeight * 0.6;


function animaScroll(){
    sections.forEach((section) => {
        const sectionTop=section.getBoundingClientRect().top;
        const isSectionVisible=(sectionTop - windowMetade) <0;
        if(isSectionVisible){
            section.classList.add('ativo');
        }
    })
    sections2.forEach((section) => {
        const sectionTop=section.getBoundingClientRect().top;
        const isSectionVisible=(sectionTop - windowMetade) <0;
        if(isSectionVisible){
            section.classList.add('ativo');
        }
    })
}
animaScroll()

window.addEventListener('scroll',animaScroll)
}
initAnimacaoScroll();

function initModal(){
    const botaoAbrir = document.querySelector('[data-modal="abrir"]');
    const botaoFechar = document.querySelector('[data-modal="fechar"]');
    const containerModal = document.querySelector('[data-modal="container"]');
    console.log(botaoAbrir)
    
    if(botaoAbrir && botaoFechar && containerModal){
    function toggleModal(event){
        event.preventDefault();
        containerModal.classList.toggle('ativo');
    };
    function fecharForaDoModal(event){
        event.preventDefault();
        if(event.target === this);
        toggleModal(event);
    };
    botaoAbrir.addEventListener('mouseover',toggleModal);
    botaoFechar.addEventListener('mouseover',toggleModal);
    containerModal.addEventListener('click', fecharForaDoModal);
};
};
initModal();


function initTopo(){
var btn = document.querySelector("#back-to-top");
btn.addEventListener("mouseover", function() {
    window.scrollTo(0, 0);
});

};
initTopo();

function initToolTip(){
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach((item)=>{
    item.addEventListener('mouseover', onMouseOver);
})

function onMouseOver(event){

    const tooltipBox = criarTooltipBox(this);

    this.addEventListener('mouseleave', onMouseLeave);

    onMouseLeave.tooltipBox = tooltipBox; //passa caracteristicas do tooltipBox onMouseOver para o tooltipBox do objeto onMouseLeave
    onMouseLeave.element =this;
    onMouseMove.tooltipBox = tooltipBox;

    this.addEventListener('mousemove', onMouseMove); // segue mesma caracteristicas do objeto onMouseLeave sendo criada fora

};
const onMouseLeave ={
    tooltipBox:'',
    element:'',
    handleEvent(){
        //remove as divs
        this.tooltipBox.remove();
        //removeEventListener remove o evento onMouseLeave quando tira o mouse, deixando mais otimizado
        this.element.removeEventListener('mouseleave', onMouseLeave);
        this.element.removeEventListener('mousemove', onMouseMove);
    }
};
const onMouseMove ={
    handleEvent(event){
        this.tooltipBox.style.top = event.pageY + 25 + 'px';
        this.tooltipBox.style.left = event.pageX + 25 + 'px';
    }
};

function criarTooltipBox(element){

    const tooltipBox =document.createElement('div');


    const text = element.getAttribute('aria-label'); 

    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText=text;

    document.body.appendChild(tooltipBox);
    return tooltipBox;
};
};
initToolTip();

function initOutsideClick() {

    const dropdownMenus = document.querySelectorAll('[data-dropdown]');

    dropdownMenus.forEach((item) => {
        // item.addEventListener('mouseover',handleClick);
        // item.addEventListener('touchstart',handleClick);
        // item.addEventListener('click',handleClick);
        //outra forma de fazer abaixo
        ['mouseover', 'touchstart', 'click'].forEach(userEvent => {
            item.addEventListener(userEvent, handleClick);
        })
    });
    function handleClick(event) {
        event.preventDefault();
        this.classList.add('active');
        outsideClick(this, ['touchstart', 'click', 'mouseover'], () => {
            this.classList.remove('active');
        });
    };
    function outsideClick(element, events, callback) {
        const html = document.documentElement;

        if (!element.hasAttribute('[data-outside]')) {
            events.forEach(userEvent => {
                html.addEventListener(userEvent, handleOutsideClick);
            });
            element.setAttribute('data-outside', '');
        };
        function handleOutsideClick(event) {
            if (!element.contains(event.target)) {
                element.removeAttribute('[data-outside]');
                events.forEach(userEvent => {
                    html.removeEventListener(userEvent, handleOutsideClick);
                })

                callback();
            };
        };
    };
};
initOutsideClick();

function initOpenMenu() {
    const menuButton = document.querySelector('[data-menu="button"]');
    const menuList = document.querySelector('[data-menu="list"]');
    const eventos = ['click', 'touchstart','mouseover'];

    if (menuButton) {

        function openMenu(event) {
            console.log('event')
            menuList.classList.toggle('active');
            menuButton.classList.toggle('active');
        };
        eventos.forEach((evento) => {
            menuButton.addEventListener(evento, openMenu);
        })
    };
};
initOpenMenu();


