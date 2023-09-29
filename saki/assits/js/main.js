
const baceurl = `https://staging.saki-app.com`;
SETUI()
toggleLoader(false);
function loginbutclick()  {
    let numbarPhone = document.getElementById("Phone-Numbar-input").value;

    const params = {
        "phone" : numbarPhone
    }
    toggleLoader(true);

    axios.post(`${baceurl}/api/login` , params)
    .then((response) =>  {
        toggleLoader(false);

        showScuse(`${response.data.message}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success d-inline" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        `)
        let modalcreatepost =  document.getElementById("Login-model")

        let modelInstescreatpost =  bootstrap.Modal.getInstance(modalcreatepost)
  
  
        modelInstescreatpost.hide()
        VerificationPhone(numbarPhone)
        

    }).catch((error)  =>  {
        toggleLoader(false)
        showScuse(`${error.message}` , "danger")

    })
}
    function VerificationPhone( phoneNum) {

        let modalIntarsPass =  new bootstrap.Modal(`#verification-code-modal`)
        modalIntarsPass.show()
        toggleLoader(false);

        let verificationCode  = document.getElementById("Phone-Verification-code-input").value;
        const params = {
            "phone": phoneNum , 
            "sms": verificationCode
        }
        document.getElementById("verification-btn").addEventListener("click" , () => {
            toggleLoader(true)
            axios.post(`${baceurl}/api/validate_otp` , params)
            .then((response) => {
                toggleLoader(false)
                console.log(response)
                localStorage.setItem("token" , response.data.data.token)
                localStorage.setItem("user",JSON.stringify(response.data.data))
                SETUI()
                modalIntarsPass.hide()
                showScuse(`${response.data.message}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success d-inline" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                ` )
                closeReload(20)

            }).catch((error)  =>  {
                toggleLoader(false)
                showScuse(`${error.message}` , "danger")
        
            })
            
        })

    }

    function toggleLoader(show = true) {
        const loader = document.getElementById("loaderJs");
        
        if (show === true) {
            loader.style.opacity = "1";
            loader.style.visibility = "visible";
        } else if (show === false) {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }
    }

function showScuse(message, type = "success" , timeSec = 3) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

    const appendAlert = (messagee, type) => {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible fade show"  id="shwoScusses" role="alert">`,
            `   <div>${messagee}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');

        alertPlaceholder.append(wrapper);


        setTimeout(() => {
            wrapper.querySelector('.btn-close').click();
        }, `${timeSec}000`);
    }

    appendAlert(`${message}`, type);
}

// function ShwoTime(e) {
//     let AllElm = document.querySelectorAll("#liveAlertPlaceholder .fade.show");
//     console.log(AllElm)
//     setTimeout(() => {
//     for (show of AllElm) {
//         show.classList.remove("show")
//         setTimeout( () => {
//             show.remove()
//         }, 1000)
//     }
//             e.classList.add("show")
//
//     }
//
//         ,3000)
//
// }
function SETUI()  {
    let token = localStorage.getItem("token");  
       
    let buttonlog = document.getElementById("button-login");
    let buttonrg = document.getElementById("button-regster");
    let logoutbtn = document.getElementById("logout");

    let addpostbtn = document.getElementById("add-post-user");
    if(token == null) {
        buttonlog.style.display = "inline-block";
        buttonrg.style.display = "inline-block";
        document.querySelector(".buttons.log-out").style.display = "none"
            //todos:
            // divCommentsAdd.remove();
     
        if(addpostbtn != null ) {
            addpostbtn.style.display = "none";
        }
       
    }else {
        buttonlog.style.display = "none";
        buttonrg.style.display = "none";

        logoutbtn.style.display = "inline-block";
        if(addpostbtn != null ) {
            addpostbtn.style.display = "block";
        }

        let user = getCreant()
        document.getElementById("userName").innerHTML = user.name;
     
    }
} 
function getCreant() {
    let user = null
    let storeuser = localStorage.getItem("user")
    if(storeuser != null) {
        user = JSON.parse(storeuser);
    }
    return user ;
}

function Logout() {
    let headers = {
        "Accept": "application/json" , 
        "Authorization" : `Bearer ${localStorage.getItem("token")}`

    }
    let params = {

    }
    toggleLoader(true)

        axios.post(`${baceurl}/api/logout` , params , {
            headers : headers
        } ).then((response) => {
    toggleLoader(false)

            localStorage.removeItem("user")
            localStorage.removeItem("token")
            SETUI()
            showScuse(`تم تسجيل الخروج بنجاح
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success d-inline" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            `)

        }).catch((error)=> {
    toggleLoader(false)

            showScuse(`${error.message}` , "danger")

        })
}
function HomeReqoset() {

        let headers = {
            "Accept": "application/json" , 
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
    
        }
        let params = {
    
   
    }
    toggleLoader(true)
axios.post(`${baceurl}/api/dashboard` , params , {
    headers:headers
}).then((response) => {

    document.getElementById("PriceHaed").textContent = ` ${response.data.data.balance} ريال `;
    console.log(response)
    let posts = response.data.data.market

    for( post of posts) {
        let contete = `
        <div class="item-post">
        <div class="image">
          <img src="${post.image}" alt="">
        </div>
        <h3 class="w-100 h-100 H3-All"  onclick="ModalMarket('${encodeURIComponent(JSON.stringify(post))}')">${post.name}</h3>
    </div>
        `
        document.getElementById("postsAll").innerHTML += contete;
    }
    toggleLoader(false)

}).catch((error)=> {
    toggleLoader(false)

    showScuse(`${error.message}` , "danger")
})

}


function ModalMarket(id ) {

    let post = JSON.parse(decodeURIComponent(id))
    let modalIntarsPass =  new bootstrap.Modal(`#modalMarket` , {})
    modalIntarsPass.show()
     document.getElementById("valueId").value = post.id;
    document.getElementById("imageMarketBack").src = post.background_image;

    const headerse = {
        "Accept": "application/json" , 
        "Authorization" : `Bearer ${localStorage.getItem("token")}`

    }
    document.getElementById("slectItem").innerHTML = ` <option onclick="NoneBtnclick()" selected>إختر مبلغ القسيمة</option>`;

    let valdeeshen = document.getElementById("valueId").value;
    toggleLoader(true)

        axios.get(`${baceurl}/api/market/${valdeeshen}`  , {
        headers:headerse
    }).then((response) => {
let posts = response.data.data;
for( poste of posts) {
    let contente = `
        <option data-item-id="${poste.item_id}" onclick="clickItemMarket(${poste.item_id})" >${poste.price}</option>
    `

    document.getElementById("slectItem").innerHTML += contente;
}
toggleLoader(false)


    }).catch((error)=> {

        console.log(error)
            showScuse(`${error.message}` , "danger")

        })
    
}
function NoneBtnclick() {
    return  showScuse(`إختر مبلغ القسيمة` , "danger")
}

function closeReload( i = 5) {
    setTimeout(function() {
        location.reload();
    }, `${i}00`);
}


function copyText(textElement) {
    const text = textElement.innerText;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showScuse(`تم النسخ بنجاح <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success d-inline" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>`, 'success', 2);
        }).catch(error => {
            showScuse(`فشل في النسخ: ${error}`, 'danger', 2);
        });
    } else {
        const hiddenInput = document.createElement('textarea');
        hiddenInput.value = text;
        document.body.appendChild(hiddenInput);
        hiddenInput.select();
        hiddenInput.setSelectionRange(0, 99999);
        document.execCommand('copy');
        document.body.removeChild(hiddenInput);
        showScuse(`تم النسخ بنجاح <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success d-inline" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>`, 'success', 2);
    }
}
