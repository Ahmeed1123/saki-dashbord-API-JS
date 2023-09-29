if (localStorage.getItem("token") != null) {
    reqosetProfile();
}

let selectedValue = null;

let selectedValueOp = null;

let  selectedValueT = null;

function reqosetProfile() {
    const headers = {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    };

    toggleLoader(true);

    axios.get(`${baceurl}/api/profile`, {
        headers: headers
    }).then((response) => {
        toggleLoader(false);

        let reqosProf = response.data.data;
        document.getElementById("NameProfile").innerHTML = reqosProf.name;
        document.getElementById("numbarIdentification").innerHTML = reqosProf.id_number;

        document.getElementById("svgAlldithles").addEventListener("click", () => {
            document.getElementById("Name-Profile-input").value = reqosProf.name;
            document.getElementById("PhoneNumbarProfile").value = reqosProf.phone;
            document.getElementById("Emailprofile").value = reqosProf.email;

            selectedValue = null;
            selectedValueOp = null;
            document.querySelectorAll('.input-radio input[type="radio"]').forEach((input) => {
                if (input.value === reqosProf.material_status) {
                    input.checked = true;
                    selectedValue = input.value; 
                   
                } else {
                    input.checked = false;
                }
              
                
            });
            selectedValueT = selectedValue ;
            
    
            const radioInputs = document.querySelectorAll('input[type="radio"]');

            radioInputs.forEach((input) => {
              input.addEventListener("click", function() {
                 selectedValueT = this.value;
                
              });
            }); 
   

            const selectElement = document.getElementById('slectItemS');
            const targetValueOption = reqosProf.income_source;

            const optionInputs = selectElement.querySelectorAll('option');

            optionInputs.forEach((option) => {
                if (option.value === targetValueOption) {
                    option.selected = true;
                    selectedValueOp = option.value;
                } else {
                    option.selected = false;
                }
            });

            document.getElementById("incomeS").value = reqosProf.monthly_income;
            let modalIntarsPass = new bootstrap.Modal(`#profileDthilsSvg`, {});
            modalIntarsPass.show();

            document.getElementById("SaveProfile").addEventListener("click", () => {
                rqosetSaveProfile();
            });

            selectElement.addEventListener("change", () => {
                selectedValueOp = selectElement.value;
            });
        });
    }).catch((error) => {
        toggleLoader(false);

        console.log(error);
        showScuse(`${error.message}`, "danger");
    })
}

function rqosetSaveProfile() {
    let formDat = new FormData();

    formDat.append("email", document.getElementById("Emailprofile").value);
    formDat.append("name", document.getElementById("Name-Profile-input").value);
    formDat.append("material_status", selectedValueT);
    console.log(selectedValueT, selectedValueOp);
    formDat.append("monthly_income", document.getElementById("incomeS").value);
    formDat.append("income_source", selectedValueOp);

    let headers = {
        "Content-Type": "multipart/form-data",
        "authorization": `Bearer ${localStorage.getItem("token")}`
    };

    toggleLoader(true);

    axios.post(`${baceurl}/api/profile`, formDat, {
        headers: headers
    }).then((response) => {
        showScuse(`تم التعديل بنجاح  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success d-inline" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>`);
        toggleLoader(false);
        localStorage.removeItem("user");
        localStorage.setItem("user" , JSON.stringify(response.data.data));

        console.log(response);
        let modalcreatepost =  document.getElementById("profileDthilsSvg")

        let modelInstescreatpost =  bootstrap.Modal.getInstance(modalcreatepost)
  
  
        modelInstescreatpost.hide()
        closeReload(5);

    }).catch((error) => {
        toggleLoader(false);
        showScuse(`${error.message}`, "danger");
    })
}
 
 