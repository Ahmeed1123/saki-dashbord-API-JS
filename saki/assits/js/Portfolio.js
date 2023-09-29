
if(localStorage.getItem("token") != null) {
    PortfolioReqoset()
}

function PortfolioReqoset()  {
    let headers = {
        "Accept": "application/json" , 
        "Authorization" : `Bearer ${localStorage.getItem("token")}`

    }
    toggleLoader(true)
    axios.get(`${baceurl}/api/wallet` , {
        headers
    }).then((response) => {
        console.log(response.data.data)
        document.getElementById("PriceHaedPrtof").textContent =  `${response.data.data.balance} ريال`;
        document.getElementById("PriceHaedro").textContent =  response.data.data.category;
       
        let markets = response.data.data.last_operation;
        for( market of markets) {
           
                let MarkitName =null
                
                if(market.market === null) {
                    MarkitName =  market.charity
                }else {
                    MarkitName =  market.market

                }
               let  todyDay =  false;
                if(market.today != false)  {
                     todyDay = `day`
                }else {
                    todyDay = market.day;
                }
                        let minesOrz =   null;
                        let ColoerSvg =   null;
                    if(market.operation ===  "transfer") {
                        ColoerSvg  =  `
                        <div class="svg-icon-scusses text-scusses p-3 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0v6z"/>
                      </svg>
                    </div>
                        `
                        minesOrz = `<h5 class="text-success">+${market.amount}</h5>`
                       
                    }else if(market.operation === "purchase")   {
                        minesOrz = `<h5 class="text-danger">-${market.amount} </h5>`
                        ColoerSvg  =  `
                        <div class="svg-icon-danger text-danger p-3 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                        </svg>
                    </div>
                        `
                    }

            let contente = `

            <div class="item-prtofolio-data d-flex">
            <p>${todyDay}</p>   
            <p class="data text-dark">${market.date}</p>
        </div>
        <div class="item-groub-prtofolio">
            <div class="item-prtofolio">
               
                ${ColoerSvg}
                <p class="markit-name">${MarkitName}</p>
                <div class="date-time-reqoset">
                    <p class="data-time">${market.time}</p>
                    ${minesOrz}
                </div>
            </div>
        </div>
            `
            document.getElementById("prtofolioAllItems").innerHTML += contente
        }
        toggleLoader(false)

    }).catch((error)=> {
        toggleLoader(false)

        showScuse(`${error.message}` , "danger")

    })
}