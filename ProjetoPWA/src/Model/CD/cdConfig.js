const DiscoChico = document.getElementById('bntChicoBuarque');
const Disco1 = document.getElementById('CdChicoBuarque');
const DiscoImg1 = document.getElementById('CdImgChico');

DiscoChico.addEventListener('click', () => {
    Disco1.classList.toggle('show');
    DiscoImg1.classList.toggle('size')

});

const DiscoAveSangria = document.getElementById('bntAveSangria');
const Disco2 = document.getElementById('CdAveSangria');
const DiscoImg2 = document.getElementById('CdImgAveSangria');

DiscoAveSangria.addEventListener('click', () => {
    Disco2.classList.toggle('show');
    DiscoImg2.classList.toggle('size')

});

const DiscoLegiaoUrbana = document.getElementById('bntLegiaoUrbana');
const Disco3 = document.getElementById('CdLegiaoUrbana');
const DiscoImg3 = document.getElementById('CdImgLegiaoUrbana');

DiscoLegiaoUrbana.addEventListener('click', () => {
    Disco3.classList.toggle('show');   // mostra/oculta lista
    DiscoImg3.classList.toggle('size'); // aumenta a imagem
});


const DiscoOGrilo = document.getElementById('bntOGrilo');
const Disco4 = document.getElementById('CdOGrilo');
const DiscoImg4 = document.getElementById('CdImgOGrilo');

DiscoOGrilo.addEventListener('click', () => {
    Disco4.classList.toggle('show');
    DiscoImg4.classList.toggle('size')
});

const DiscoOsParalamasDoSucesso = document.getElementById('bntOsParalamasDoSucesso');
const Disco5 = document.getElementById('CdOsParalamasDoSucesso');
const DiscoImg5 = document.getElementById('CdImgOsParalamasDoSucesso');

DiscoOsParalamasDoSucesso.addEventListener('click', () => {
    Disco5.classList.toggle('show');
    DiscoImg5.classList.toggle('size')

});

const DiscoPullovers = document.getElementById('bntPullovers');
const Disco6 = document.getElementById('CdPullovers');
const DiscoImg6 = document.getElementById('CdImgPullovers');

DiscoPullovers.addEventListener('click', () => {
    Disco6.classList.toggle('show');
    DiscoImg6.classList.toggle('size')

});
