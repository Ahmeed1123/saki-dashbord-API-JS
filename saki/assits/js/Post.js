
if(localStorage.getItem("token") != null) {
    reqosetDate()
}
function reqosetDate() {
    const headers = {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
    toggleLoader(true)
    axios.get(`${baceurl}/api/purchase` , {
        headers:headers
    }).then((response) => {
        let reqosts = response.data.data
        for( reqost of reqosts) {
            const apiResponseDate = reqost.created_at; 
            const dateObject = new Date(apiResponseDate);
            const year = dateObject.getFullYear();

            const month = dateObject.getMonth() + 1; 
            const day = dateObject.getDate();
            const huors = dateObject.getHours();
            const mintes = dateObject.getMinutes();
            let contente = `
            <div class="item-reqoset d-flex position-relative">
            <div class="image">
              <img src="${reqost.image}" alt="">
            </div>
            <div class="text">
                <p class="market-title">${reqost.market_name}</p>
                <h5 class="the-amount-market">${reqost.amount} ريال</h5>
                  <p class="date-reqoset">تاريخ الطلب: <span class="date-market">${year}-${month}-${day}  ${huors}:${mintes}</span></p>
                  <p class="details" onclick="detailsReqoset('${encodeURIComponent(JSON.stringify(reqost))}')">التفاصيل</p>
             </div>
             <div class="condition">
              <p>مكتمل</p>
            </div>
            </div>
            `
            document.getElementById("allReqoset").innerHTML  += contente
        }
        toggleLoader(false)
    }).catch((error) => {
        console.log(error)
        showScuse(`${error.message}`, "danger")

    }).finally(() => {
        toggleLoader(false)
    })
}
function detailsReqoset(post) {
    let reqoset = JSON.parse(decodeURIComponent(post))
    document.getElementById("copyTextButtonT").addEventListener("click", () => {
        let textCopy = document.getElementById("valdithenCodeT");
        copyText(textCopy);
 
        
    });
    console.log(reqoset)
    document.getElementById("reaqosetId").innerHTML = ` رقم الطلب ${reqoset.id}`;
    document.getElementById("titleSealT").innerHTML = `${reqoset.market_name} ${reqoset.amount} ريال`;
    document.getElementById("modalMarketTwoBackT").src = reqoset.image;
    document.getElementById("valdithenCodeT").innerHTML = reqoset.code;
  
    document.getElementById("rqosetHal").innerHTML = "مكتمل";
    document.getElementById("dataReqosetT").innerHTML = reqoset.created_at;
    document.getElementById("NameMarkite").innerHTML = reqoset.market_name;
    document.getElementById("PriceMarkite").innerHTML = `${reqoset.amount} ريال`;



    let modalIntarsPass =  new bootstrap.Modal(`#modalMarketTwoT` , {})
    modalIntarsPass.show()
}