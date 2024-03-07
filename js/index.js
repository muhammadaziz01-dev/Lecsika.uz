"use stric"


//--------------------HTML ELEMENTS------
const serchInput = $("#serch-input");

const infoWrap = $('.info-cantent')




//----------------------GLOBOL VERAYBLIS-----

const besUrl= "https://api.dictionaryapi.dev/api/v2"; // ----/entries/en/<word>

let cardInfoCklassName = 'p-4 rounded-[18px] shadow-lg w-[840px] mx-auto border mt-[40px]';

let cardErrorClassName = "flex items-center gap-10 w-[1000px] mx-auto mt-5";


//---------START ---------


serchInput.addEventListener('keyup', (e)=>{
    if(e.keyCode == 13 && e.target.value.trim().length){
        let text = e.target.value;
        getPsost(text)
    }
});


async function getPsost(text) {
    try{
        let response = await fetch(`${besUrl}/entries/en/${text}`);
        let resalt =  await response.json();
        renderInfo(resalt[0])
    }catch(err){
        // console.log(err);
        infoEror(err);
    }
}




//----------RENDEER INFO -------

function renderInfo(data){
    infoWrap.innerHTML= "";
   let cardInfo = render('div' , cardInfoCklassName , `
   <h1 class="text-[28px] font-medium ">${data.word}</h1> 
   <p class="text-[18px] font-normal text-gray-400 mt-2">${data.meanings[0].partOfSpeech} , ${data.meanings[1].partOfSpeech} , ${data.meanings[2].partOfSpeech}</p>
   <p class="flex items-center gap-5 mt-2">
   <audio src="${data.phonetics[0].audio}" controls class="mb-[15px]"></audio>
     <span class="text-[18px] font-normal text-gray-400">${data.phonetics[2].text}</span>
   </p>
   <p class="mt-2">
     <strong>hello girl</strong>
     <span>${data.meanings[0].definitions[0].definition}</span>
   </p>
   <a href="${data.phonetics[0].sourceUrl}"class="text-[18px] font-normal mt-2 text-gray-400">Red mor..</a>
   `)
   infoWrap.appendChild(cardInfo);
}




// -------INFO ERROR--------------

function infoEror(data) {
    infoWrap.innerHTML="";
    let dataEror = render("div" , cardErrorClassName ,`
    <img src="./aseets/imgs/sheksper.png" alt="sheksper">
    <div class="info-wrapp w-[500px] flex flex-col ">
        <h1 class="text-[26px] mt-5 font-medium">${data.title}</h1>
        <p class="text-[16px] mt-5 text-center">
            ${data.message}
        </p>
    </div>
    ` );
    infoWrap.appendChild(dataEror);
}