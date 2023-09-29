if(localStorage.getItem("token") != null) {
    HomeReqoset()
}


function clickItemMarket(itemId) {



    const headers = {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`

    }

    const prams = {
        "item_id": itemId
    }
    document.getElementById("verificationBuy").addEventListener("click", () => {
    toggleLoader(true)

        axios.post(`${baceurl}/api/purchase`, prams, {
            headers: headers
        }).then((response) => {
    toggleLoader(false)
            console.log(response)
            let postDitels = response.data.data;
            document.getElementById("titleSeal").innerHTML = `${postDitels.market_name} ${postDitels.amount} ريال`;
            document.getElementById("modalMarketTwoBack").src = postDitels.image;
            document.getElementById("valdithenCode").innerHTML = postDitels.code;

            showScuse(`${response.data.message}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success d-inline" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            `, "success" , 1)
            let modalcreatepost =  document.getElementById("modalMarket")

            let modelInstescreatpost =  bootstrap.Modal.getInstance(modalcreatepost)


            modelInstescreatpost.hide()
            let modalIntarsPass =  new bootstrap.Modal(`#modalMarketTwo`)
            modalIntarsPass.show()

            

        }).catch((error) => {
    toggleLoader(false)

            showScuse(`${error.message}`, "danger")

        })

    })
}
document.getElementById("slectItem").addEventListener("change", function () {
    let selectedItem = this.options[this.selectedIndex];
    let itemId = selectedItem.getAttribute("data-item-id");
    clickItemMarket(itemId);
});

document.getElementById("copyTextButton").addEventListener("click", () => {
    let textCopy = document.getElementById("valdithenCode");
    copyText(textCopy);
});



let  isCopied = false;

document.getElementById("allPostsAll").addEventListener("click" , () => {
    if(localStorage.getItem("token") != null ) {
        let modalIntarsPass = new bootstrap.Modal(`#modalSearch`);
        modalIntarsPass.show();

        if(!isCopied) {
           
            let originalElement = document.getElementById("postsAll");

           
            let clonedElement = originalElement.cloneNode(true);
            
           
           document.getElementById("ElmentCleanode").appendChild(clonedElement);    
           isCopied = true;
        }
     
        document.getElementById("searchInput").addEventListener("input", function () {
            let filter = this.value.toLowerCase();
            const items = document.querySelectorAll("#ElmentCleanode .item-post");
        
            items.forEach( (item) => {
                let text = item.querySelector("h3").textContent.toLowerCase();
                if (text.includes(filter)) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
                
            
        });
     
      let items = document.querySelectorAll("#ElmentCleanode .item-post")
      items.forEach((item) => {
                let h3= item.querySelector("h3")
                h3.addEventListener("click",() => {
                    modalIntarsPass.hide()
                    item.classList.remove("hidden")
                })
      })
    }else {
        showScuse(`سجل الدخول <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill d-inline text-danger" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
      </svg>`, 'danger', 2);    }
  
    
})


