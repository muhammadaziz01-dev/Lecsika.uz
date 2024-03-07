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
        
        if(Array.isArray(resalt)){
            infoWrap.innerHTML=`<span class="loader"></span>`
            renderInfo(resalt)
        }else{
            infoWrap.innerHTML=`<span class="loader"></span>`
            infoEror(resalt);
        }
        // renderInfo(resalt)
        
        // infoEror(resalt);
    }catch(err){
        console.log(err);
    }
}




//----------RENDEER INFO -------

function renderInfo(data){
    infoWrap.innerHTML= "";
   if(data.length){
    data.forEach((el) => {
        let cardInfo = render('div' , cardInfoCklassName , `
        <h1 class="text-[28px] font-medium ">${el.word}</h1> 
        <p class="text-[18px] font-normal text-gray-400 mt-2">${el.meanings.map((val)=> val.partOfSpeech)}</p>
        <p class="flex items-center gap-5 mt-2">
        <audio src="${el.phonetics[0].audio}" controls class="mb-[15px]"></audio>
          <span class="text-[18px] font-normal text-gray-400">${el.phonetics.map((el)=>el.text)}</span>
        </p>
        <p class="mt-2">
          <span>${el.meanings.map((el)=>el.definitions.map((el)=>el.definition))}</span>
        </p>
        <a href="${el.phonetics[0].sourceUrl}"class="text-[18px] font-normal mt-2 text-gray-400">learn more..</a>
        `)
        infoWrap.appendChild(cardInfo);
    });
   }
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