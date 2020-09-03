 let container = document.querySelector("#container");
 let temp = document.querySelector("template");
 let filter = "alle";
 let retter;
 const popop = document.querySelector("#popop")

 const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";

 async function hentdata() {
     const respons = await fetch(link);
     retter = await respons.json();
     addEventListenerTOButtons()
     vis()
 }

 function vis() {
     container.innerHTML = ""
     //elementerne som bliver vist i loop
     retter.feed.entry.forEach(ret => {
             if (filter == "alle" || filter == ret.gsx$kategori.$t) {

                 const klon = temp.cloneNode(true).content;

                 klon.querySelector(".ret").textContent = ret.gsx$navn.$t;
                 klon.querySelector(".kort").textContent = ret.gsx$kort.$t;
                 klon.querySelector(".pris").textContent = ret.gsx$pris.$t;
                 klon.querySelector("img").src = `imgs/small/${ret.gsx$billede.$t}` + "-sm.jpg";

                 klon.querySelector("article").addEventListener("click", () => visdetaljer(ret));

                 container.appendChild(klon);
             }
         }



     )
 }

 //knap som  til X- luk 

 document.querySelector("#luk").addEventListener("click", () => popop.style.display = "none")
 // elementerne der bliver vis i popop
 function visdetaljer(ret) {
     console.log(ret);

     popop.style.display = "block";

     popop.querySelector(".kategori").textContent = ret.gsx$kategori.$t;

     popop.querySelector(".navn").textContent = ret.gsx$navn.$t;

     popop.querySelector("img").src = `imgs/small/${ret.gsx$billede.$t}` + "-sm.jpg";
     popop.querySelector(".lang").textContent = ret.gsx$lang.$t;
     popop.querySelector(".pris").textContent = ret.gsx$pris.$t;
     popop.querySelector(".oprindelse").textContent = ret.gsx$oprindelse.$t;




 }




 // knapper til filtering 

 function addEventListenerTOButtons() {
     document.querySelectorAll(".filter").forEach(btn => {
         btn.addEventListener("click", filterBTNs);
     })
 }

 function filterBTNs() {

     filter = this.dataset.kategori;
     document.querySelector("h1").textContent = this.textContent;
     document.querySelectorAll(".filter").forEach((btn) => {


         btn.classList.remove("valgt");
     })

     this.classList.add("valgt");
     vis()
 }


 hentdata()
