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

var btn = document.querySelector("#back-to-top");
btn.addEventListener("mouseover", function() {
    window.scrollTo(0, 0);
});
