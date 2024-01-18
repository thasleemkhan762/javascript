const url = new URL(window.location.href);

const id =  url.searchParams.get("id");

console.log("url is:",id);
// Get the employee to be edited from database using id passed in URL parameter

console.log(id);




function editEmployeeEd(){
    const editEmployeeEd = document.getElementById("editEmployeeEd");
    editEmployeeEd.style.visibility="visible";
    editEmployeeEd.style.opacity="1";
    const overlayEd = document.getElementById("overlayEd");
    overlayEd.style.visibility="visible";
    overlayEd.style.opacity="1";

    editData(id)
 }

 function cancelEd () {
    const editEmployeeEd = document.getElementById("editEmployeeEd");
    
    editEmployeeEd.style.opacity="0";

    const timeout = setTimeout(editemployeeout,500);
    function editemployeeout(){
      editEmployeeEd.style.visibility="hidden";
    }
    

    const overlayEd = document.getElementById("overlayEd");
    overlayEd.style.opacity="0";
    const timeoutoverlay = setTimeout(overlayout,500);
    function overlayout(){
      overlayEd.style.visibility="hidden";
    }

    const deleteEmployeePopupMenuED = document.getElementById("deleteEmployeePopupMenuED");
    deleteEmployeePopupMenuED.style.visibility = "hidden";
 }

 viewEmployee(id);
 function viewEmployee(id) {
   fetch(`http://localhost:3000/employees/${id}`)
   .then(res => {
      return res.json();
   })
   .then(data => {

      document.getElementById("viewProfilePic").innerHTML = `<img src ="http://localhost:3000/employees/${id}/avatar">`
      const fullName = data.salutation + " " + data.firstName + " " + data.lastName;
      document.getElementById("fullName").innerHTML = fullName;
      document.getElementById("viewEmail").innerHTML = data.email;
      document.getElementById("viewGender").innerHTML = data.gender;
      document.getElementById("viewDOB").innerHTML = data.dob;
      //age calculator//////////////////////
      const DOB = dobformat(data.dob);
      const age = calculateAge(DOB);
      /////////////////////////////////////
      document.getElementById('viewAge').innerHTML = age;
      document.getElementById("viewPhoneNumber").innerHTML = data.phone;
      document.getElementById("viewQualification").innerHTML = data.qualifications;
      document.getElementById("viewAddress").innerHTML = data.address;
      const userName = data.firstName + data.lastName;
      document.getElementById("viewUsername").innerHTML = userName;

      const viewEmployeeHeaderTitle = document.getElementById("viewEmployeeHeaderTitle");
      viewEmployeeHeaderTitle.innerText = `Dashboard / Employees /${data.salutation} ${data.firstName} ${data.lastName} `;

   });
 }

 function calculateAge(dateOfBirth) {
   const dob = new Date(dateOfBirth);
   const currentDate = new Date();
   const timeDiff = currentDate - dob;
   const age = Math.floor(timeDiff / (365.25 * 24 * 60 * 60 * 1000));
   return age;
}
function dobformat(DOB) {
   const [date, month, year] = DOB.split("-");
   let formatteddate = year + "-" + month + "-" + date;
   return formatteddate;
}




//edit view

async function editData(id) {
   await fetch(`http://localhost:3000/employees/${id}`)
     .then((res) => {
       return res.json();
     })
     .then((data) => {
      
       document.getElementById("viewEditSalutation").value = data.salutation;
       document.getElementById("viewEditFirstName").value = data.firstName;
       document.getElementById("viewEditLastName").value = data.lastName;
       document.getElementById("viewEditEmail").value = data.email;
       document.getElementById("viewEditPhonenumber").value = data.phone;
       console.log(data.phone);
       const dobValue = data.dob;
       const [day, month, year] = dobValue.split("-");
       const formattedDob = `${year}-${month}-${day}`;
       document.getElementById("viewEditDOB").value = formattedDob;
       document.getElementById("viewEditAddress").value = data.address;
       document.getElementById("viewEditCity").value = data.city;
       document.querySelector(`input[name="viewEditgender"][value="${data.gender}"]`).checked = true;
       document.getElementById("viewEditQualifications").value = data.qualifications;
       document.getElementById("viewEditCountry").value = data.country;
       document.getElementById("viewEditState").value = data.state;
       document.getElementById("viewEditPinZip").value = data.pin;
 
       const editImageShow = document.getElementById("viewEditImageShow");
       editImageShow.src = `http://localhost:3000/employees/${id}/avatar`;
 
     })
     .catch((err) => {
       console.log(err);
     });
 
   const editSubmissionBtn = document.getElementById("viewEditSubmitBtn");
   editSubmissionBtn.addEventListener("click", () => {
     updateeData(id);
     window.location.reload(); 
    // console.log(firstName);

   });
   
 }
 

 // edit submisssion

async function updateeData(id) {
   const salutation = document.getElementById("viewEditSalutation").value;
   const firstName = document.getElementById("viewEditFirstName").value;
   const lastName = document.getElementById("viewEditLastName").value;
   const email = document.getElementById("viewEditEmail").value;
   const addNumber = document.getElementById("viewEditPhonenumber").value;
   const Dateofbirth = document.getElementById("viewEditDOB").value;
   const gender = document.querySelector('input[name="viewEditgender"]:checked').value;
   const Qualification = document.getElementById("viewEditQualifications").value;
   const addAddress = document.getElementById("viewEditAddress").value;
   const country = document.getElementById("viewEditCountry").value;
   const state = document.getElementById("viewEditState").value;
   const city = document.getElementById("viewEditCity").value;
   const pincode = document.getElementById("viewEditPinZip").value;
   const dob = Dateofbirth;
   const [year, month, day] = dob.split("-");
   const formattedDate = `${day}-${month}-${year}`;



 const updatedData = {
   salutation: salutation,
   firstName: firstName,
   lastName: lastName,
   email: email,
   phone: addNumber,
   dob: formattedDate,
   gender: gender,
   qualifications: Qualification,
   address: addAddress,
   country: country,
   state: state,
   city: city,
   pin: pincode,
   username: firstName,
   password: addNumber,
 };
 // put
 fetch(`http://localhost:3000/employees/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(updatedData),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  // edit pic upload
  const editImageUpload = document.getElementById("viewEditImageUpload");
  if (editImageUpload.files.length > 0) {
    const formData = new FormData();
    formData.append("avatar", editImageUpload.files[0]);

    // upload
    fetch(`http://localhost:3000/employees/${id}/avatar`, {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

 

}




///edit upload image
let selectedImage = document.getElementById('viewEditImageShow');
let editImageUpload = document.getElementById('viewEditImageUpload');
editImageUpload.onchange = function () {
    selectedImage.src = URL.createObjectURL(editImageUpload.files[0]);
    selectedImage.style.width = "140px";
    selectedImage.style.height = "134px";

}





///////////delete employeee////////


const ViewEmployeeDeteButton = document.getElementById("ViewEmployeeDeteButton");
ViewEmployeeDeteButton.addEventListener('click', () =>{
  //  delete_employee(id) ;
   deletepopup ();
   
});

const popupDeletebuttonEd = document.getElementById("popupDeletebuttonEd");
popupDeletebuttonEd.addEventListener('click', () => {
  delete_employee(id);
})

function delete_employee(id) {
   fetch( `http://localhost:3000/employees/${id}`, {
       method: 'DELETE',
   }
   ).then(response => response.json())
       .then(data => {
           console.log('API Response:', data);
           window.location.href="PRJSdesign.html";
          
       })
       .catch(error => {
           console.error('Error:', error);
       });
       
       
}

// delete popup
function deletepopup () {
  const deleteEmployeePopupMenuED = document.getElementById("deleteEmployeePopupMenuED");
  deleteEmployeePopupMenuED.style.visibility = "visible";

  const overlay = document.getElementById("overlayEd");
  overlay.style.visibility="visible";
}





