
// search and filter function
function searchFilter() {
  let searchbarTop = document.getElementById("searchbarTop").value;
  searchbarTop = searchbarTop.toLowerCase();
  let rows = document.getElementsByTagName("tr");
  let noEmployeesFoundMessage = document.getElementById("notFound");
  let found = false;
  // condition
  for (let i = 1; i < rows.length; i++) {
    if (!rows[i].innerHTML.toLowerCase().includes(searchbarTop)) {
      rows[i].style.display = "none";
    } else {
      rows[i].style.display = "";
      found = true;
    }
  }
  // employee not found text
  if (found) {
    noEmployeesFoundMessage.style.display = "none";
  } else {
    noEmployeesFoundMessage.style.display = "block";
  }
}

// add employee popup
function addEmployee() {

  const addEmployee = document.getElementById("addEmployee");
  addEmployee.style.visibility = "visible";
  addEmployee.style.opacity = "1";

  const overlay = document.getElementById("overlay");
  overlay.style.visibility = "visible";
  overlay.style.opacity = "1";

  // const miniOption = document.getElementById("miniOption");
  // miniOption.style.visibility = "hidden";

}

// edit employe
function editEmployee(id) {

  const editEmployee = document.getElementById("editEmployee");
  editEmployee.style.visibility = "visible";
  editEmployee.style.opacity = "1";

  const overlay = document.getElementById("overlay");
  overlay.style.visibility = "visible";
  overlay.style.opacity = "1";

  const options = document.getElementById("miniOption");
  options.style.visibility = "hidden";
  // edit function
  editData(id);
}

// add employee successs msg popup
function addEmployeeSuccessPopup() {

  const addEmployeeSuccessMsg = document.getElementById("addEmployeeSuccessMsg");
  addEmployeeSuccessMsg.style.visibility = "visible";
  addEmployeeSuccessMsg.style.opacity = "1";

  const overlay = document.getElementById("overlay");
  overlay.style.visibility = "visible";
  overlay.style.opacity = "1";

  const addEmployee = document.getElementById("addEmployee");
  addEmployee.style.opacity = "0";

  //time out function
  const mytimeout = setTimeout(addEmployeeout,500);
  function addEmployeeout(){
    addEmployee.style.visibility="hidden";
  }

  const reup = document.getElementById("reup");
  reup.style.visibility = "hidden";

  const changeText = document.getElementById("changeText");
  changeText.style.visibility = "hidden";

}
 
// edit employee successs msg popup
function editEmployeeSuccessPopup() {

  const editEmployeeSuccessMsg = document.getElementById("editEmployeeSuccessMsg");
  editEmployeeSuccessMsg.style.visibility = "visible";
  editEmployeeSuccessMsg.style.opacity = "1";

  const overlay = document.getElementById("overlay");
  overlay.style.visibility = "visible";
  overlay.style.opacity = "1";

  const editEmployee = document.getElementById("editEmployee");
  editEmployee.style.opacity = "0";
  //timeout function
  const mytimeout = setTimeout(editEmployeeclose,500);
  function editEmployeeclose () {
    editEmployee.style.visibility = "hidden";
  }

}

// // edit submit button function
// const editEmployeeSubmitBtn = document.getElementById("editSubmitBtn");
// editEmployeeSubmitBtn.addEventListener('click', editEmployeeSuccessPopup);

// cancel button function
function cancel(){
  /////////////////////////////////////////////////////////////////////
  const addEmployee = document.getElementById("addEmployee");
  addEmployee.style.opacity = "0";

  //time out function
  const mytimeout = setTimeout(addEmployeeout,500);
  function addEmployeeout(){
    addEmployee.style.visibility="hidden";
  }

  const editEmployee = document.getElementById("editEmployee");
  editEmployee.style.opacity="0";
  
  //timeout function
  const edittimeout = setTimeout(editemployeeout,500);
  function editemployeeout(){
    editEmployee.style.visibility="hidden";
  }

  const deleteEmployeePopupMenu = document.getElementById("deleteEmployeePopupMenu");
  deleteEmployeePopupMenu.style.opacity ="0";
  //timeout function
  const deletetimeout = setTimeout(deleteemployeeout,500);
  function deleteemployeeout(){
    deleteEmployeePopupMenu.style.visibility="hidden";
  }


  const overlay = document.getElementById("overlay");
  overlay.style.opacity = "0";

  //timeoutfunction
  const myTimeout2 = setTimeout(overlayout,500);
  function overlayout(){
    overlay.style.visibility="hidden";
  }

  const addEmployeeForm = document.getElementById("addEmployeeForm");
  addEmployeeForm.reset();
  
  const image = document.getElementById("image");
  image.src='';

  const imageCard = document.getElementById("imageCard");
  imageCard.style.width = "100%";

  const imagediv = document.getElementById("image");
  imagediv.style.display = "none";

  const hidden = document.getElementById("hidden");
  hidden.style.display = "block";

  const reUp = document.getElementById("reup");
  reUp.style.visibility = "hidden";

  const changeText = document.getElementById("changeText");
  changeText.style.visibility = "hidden";

  const editEmployeeForm = document.getElementById("editEmployeeForm");
  editEmployeeForm.reset();

  // const nullText = document.querySelector('.nullSelectionText');
  // nullText.style.visibility = "hidden";

  // window.location.reload();

 }

   // minimize only function
   function minimize(){
  
    const addEmployee = document.getElementById("addEmployee");
    addEmployee.style.visibility="hidden";
  
    const editEmployee = document.getElementById("editEmployee");
    editEmployee.style.visibility="hidden";
  
    const deleteEmployeePopupMenu = document.getElementById("deleteEmployeePopupMenu");
    deleteEmployeePopupMenu.style.visibility="hidden";
  
    const overlay = document.getElementById("overlay");
    overlay.style.visibility="hidden";
  
    const addEmployeeForm = document.getElementById("addEmployeeForm");
    addEmployeeForm.reset();
    
    const image = document.getElementById("image");
    image.src='';
    image.value = '';
  
    const hidden = document.getElementById("hidden");
    hidden.style.display = "block";
  
    const reUp = document.getElementById("reup");
    reUp.style.visibility = "hidden";
  
    const changeText = document.getElementById("changeText");
    changeText.style.visibility = "hidden";
  
    const editEmployeeForm = document.getElementById("editEmployeeForm");
    editEmployeeForm.reset();
  
   }

 // cancel function
 const addcancel = document.getElementById("cancel");
 addcancel.addEventListener("click", cancel);





//Table data fetching
getData();
async function getData() {
  await fetch('http://localhost:3000/employees')
   .then ((res) => {
      return res.json();
   })
    .then((data) => {
      employeeData = data;
      
      let tab = '';

      //  list-select
      const employee_number = document.getElementById('employee_number');  
      employee_number.addEventListener("click", getData);
      const TotalCountOnPage = employee_number.value;

      //page
      const employeeTotal = document.getElementById("employeeTotal");
      employeeTotal.innerHTML = `of ${employeeData.length}`;     
      const totalPages = Math.ceil(data.length / TotalCountOnPage);
      pagination(totalPages);
      const start = TotalCountOnPage * (CurrentPage - 1);     
      const end = Math.min(TotalCountOnPage * CurrentPage, data.length);

      //table data
      for (let i = start; i < end; i++) {
        const user = data[i];
        let serialNumber = i + 1;
        let formattedSerialNumber = serialNumber > 9 ?
        `#${serialNumber}` : `#0${serialNumber}`;
        tab += `<tr>
                    <td></td>
                    <td>${formattedSerialNumber}</td>
                    <td><img  class="tableProfilePic" style="height: 30px;" src='http://localhost:3000/employees/${user.id}/avatar'></img>${user.salutation} ${user.firstName} ${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.gender}</td>
                    <td>${user.dob}</td>
                    <td>${user.country}</td>
                    <td>
                      <button class="button-option" id="threeDotButton" onclick="optionMenu('${user.id}')"  >
                        <div >
                          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1_167)">
                              <path d="M6 10.1947C4.9 10.1947 4 11.0947 4 12.1947C4 13.2947 4.9 14.1947 6 14.1947C7.1 14.1947 8 13.2947 8 12.1947C8 11.0947 7.1 10.1947 6 10.1947ZM18 10.1947C16.9 10.1947 16 11.0947 16 12.1947C16 13.2947 16.9 14.1947 18 14.1947C19.1 14.1947 20 13.2947 20 12.1947C20 11.0947 19.1 10.1947 18 10.1947ZM12 10.1947C10.9 10.1947 10 11.0947 10 12.1947C10 13.2947 10.9 14.1947 12 14.1947C13.1 14.1947 14 13.2947 14 12.1947C14 11.0947 13.1 10.1947 12 10.1947Z" fill="#4318FF"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_1_167">
                                <rect width="24" height="24" fill="white" transform="translate(0 0.194656)"/>
                              </clipPath>
                             </defs>
                           </svg>
                         </div>
                        <div id="optionMini">
                        
                        </div>

                      </button>
                    </td>
                  </tr>`;
      }
      document.getElementById('tbody').innerHTML = tab;
    })
   .catch((err) => {
      console.log(err);
   });
}

//pagination
var CurrentPage = 1;
function pagination(totalPages) {
  // button
  var pgnum = document.getElementById("Page_Num_Btns");
  let temp = '';
  // condition
  for (let i = 1; i <= totalPages; i++) {
    temp += `<button id="page${i}">${i}</button>`;
  }
  // function
  pgnum.innerHTML = temp;
  pgnum.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const pageNumber = parseInt(e.target.textContent);
    if (!isNaN(pageNumber)) {
    CurrentPage = pageNumber;
    getData();
    }
  }
  });
  // left and right icon 
  var pageLeftButton = document.getElementById("pageleft");
  var pageRightButton = document.getElementById("pageright");
  // condition
  if (CurrentPage === 1) {
    pageLeftButton.classList.add("hidden");
  } else {
    pageLeftButton.classList.remove("hidden");
  }

  if (CurrentPage === totalPages) {
    pageRightButton.classList.add("hidden");
  } else {
    pageRightButton.classList.remove("hidden");
  }

  pageLeftButton.addEventListener("click", function () {
    if (CurrentPage > 1) {
      CurrentPage--;
      getData();
    }
  });

  pageRightButton.addEventListener("click", function () {
    if (CurrentPage < totalPages) {
      CurrentPage++;
      getData();
    }
  });
  const actionButton = document.getElementById(`page${CurrentPage}`);
  actionButton.classList.add('active');
}

//threedot option
function optionMenu(id) {
  let optionMini = document.getElementById("optionMini");
  optionMini.innerHTML = `<div class="options" id="miniOption">
                            <ul class="mini-options-style">
                              <li >

                                <a href="PRJSemployeeDetails.html?id=${id}"> <i class="fa-regular fa-eye"></i>

                                  View Details

                                </a>

                              </li>
                              <li onclick="editEmployee('${id}')" class="edit">

                                <i class="fa-solid fa-pen ">

                                </i>
                                Edit
                              </li>
                              <li onclick="deleteEmployeePopupMenu('${id}')" class="delete">

                                <i class="fa-regular fa-trash-can ">

                                </i>
                                Delete
                              </li>
                            </ul>
                          </div>`;

  // minioption div position
  const moreOptionToggles = document.querySelectorAll("#threeDotButton");
  moreOptionToggles.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const miniOtionPos = btn.getBoundingClientRect();
      const ThreeDotResponsebun = document.getElementById("miniOption");
      ThreeDotResponsebun.style.top = miniOtionPos.top - 150 + "px";
      ThreeDotResponsebun.style.visibility =
        (ThreeDotResponsebun.style.visibility === "hidden" ||
        ThreeDotResponsebun.style.visibility === "")
          ? "visible"
          : "hidden";
      event.stopPropagation();
    
    });
  });
  // condition for display
  const anything = document.getElementById("miniOption");
  if (anything.style.visibility === "visible") {
    anything.style.visibility = "hidden";
  } else {
    anything.style.visibility = "visible";
  }


  function closeMenu() {
    miniOption.style.visibility = "hidden";
    document.removeEventListener("mousedown", handleOutside);
}
   // mini option style
 function handleOutside(event) {


  if (!miniOption.contains(event.target)) {
   miniOption.style.visibility = "hidden";
   closeMenu()
  }
}
document.addEventListener("mousedown", handleOutside);
  
}

// delete employeepopup
function deleteEmployeePopupMenu(id){
  // popup menu
  console.log(id);
  const deleteEmployeePopupMenu = document.getElementById("deleteEmployeePopupMenu");
  deleteEmployeePopupMenu.style.visibility="visible";
  deleteEmployeePopupMenu.style.opacity = "1";
  // overlay
  const overlay = document.getElementById("overlay");
  overlay.style.visibility="visible";
  overlay.style.opacity = "1";
  // delete button in popup
  const delebutton = document.getElementById('popupDeletebutton')
  delebutton.addEventListener('click', () => {
  // delete function
  delete_employee(id);
  deleteEmployeePopupMenu.style.visibility="hidden";
  overlay.style.visibility="hidden";
  })

}

// delete function
function delete_employee(id) {

  fetch( `http://localhost:3000/employees/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log('API Response:', data);
    getData();       
  })
  .catch(error => {
    console.error('Error:', error);
  });
  
}

// Employeee deleted info msg
$(document).ready(function () {
  $("#popupDeletebutton").click(function () {
    $("#deletedAlert").fadeIn();
    setTimeout(function () {
      $("#deletedAlert").fadeOut();
    }, 3000);
  });
});

//edit employee view
async function editData(id) {

  await fetch(`http://localhost:3000/employees/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      document.getElementById("editSalutation").value = data.salutation;
      document.getElementById("editFirstName").value = data.firstName;
      document.getElementById("editLastName").value = data.lastName;
      document.getElementById("editEmail").value = data.email;
      document.getElementById("editPhoneNumber").value = data.phone;
      document.getElementById("editAddress").value = data.address;
      document.getElementById("editCity").value = data.city;
      document.getElementById("editQualifications").value = data.qualifications;
      document.getElementById("editCountry").value = data.country;
      document.getElementById("editState").value = data.state;
      document.getElementById("editPinZip").value = data.pin;
      // dob
      const dobValue = data.dob;
      const [year, month, day] = dobValue.split("-");
      const formattedDob = `${day}-${month}-${year}`;
      document.getElementById("editDOB").value = formattedDob;
      // gender
      document.querySelector(`input[name="editGender"][value="${data.gender}"]`).checked = true;
      // edit image show
      const editImageShow = document.getElementById("editImageShow");
      editImageShow.src = `http://localhost:3000/employees/${id}/avatar`;

    })
    .catch((err) => {
      console.log(err);
    });

// edit employee submit button validation
const addButton = document.getElementById("editSubmitBtn");
addButton.addEventListener("click", (e) =>{
  e.preventDefault();
  const isValid = editformValidation();
  if(!isValid) {
    return;
  }
  updateData(id);
});
  
}


   //edit validation
   function editformValidation() {
    const salutation = document.getElementById("editSalutation").value.trim();
    const firstName = document.getElementById("editFirstName").value.trim();
    const lastName = document.getElementById("editLastName").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const phone = document.getElementById("editPhoneNumber").value.trim(); 
    const qualifications = document.getElementById("editQualifications").value.trim();
    const address = document.getElementById("editAddress").value.trim();
    const country = document.getElementById("editCountry").value.trim();
    const state = document.getElementById("editState").value.trim();
    const city = document.getElementById("editCity").value.trim();
    const pin = document.getElementById("editPinZip").value.trim();
    //dob
    const dob = document.getElementById("editDOB");
    const nillDob = document.getElementById("editDOBNill");
    const dobValue = dob.value.trim();
    //gender
    const gender = document.querySelector('input[name="editGender"]:checked');
    const nillGender = document.getElementById("nillGender");
    // regex validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^\d{10}$/;
    const namePattern = /^[A-Za-z]+$/;
    let isValid = true;
    // // image_validation-----------------
    // const uploadImage = document.getElementById("editImageUpload");
    // const nillImage = document.getElementById("nillImage");
    // // image validation condition
    // if (uploadImage.files.length === 0) {
    //   nillImage.textContent = "* Please select an image.";
    //   isValid = false;
    // } else {
    //   nillImage.textContent = "";
    // }
  
    //conditions
    if (salutation === "Select") {
      document.getElementById("editSalutationNill").textContent = "* Invalid select";
      isValid = false;
    }
  
    if (!namePattern.test(firstName)) {
      document.getElementById("editFirstNameNill").textContent = "* First Name is required";
      isValid = false;
    }
  
    if (!namePattern.test(lastName)) {
      document.getElementById("editLastNameNill").textContent = "* Last Name is required";
      isValid = false;
    }
  
    if (!emailPattern.test(email)) {
      document.getElementById("editEmailNill").textContent = "* Invalid Email";
      isValid = false;
    }
  
    if (!phonePattern.test(phone)) {
      document.getElementById("editPhoneNumberNill").textContent = "* Invalid Phone Number";
      isValid = false;
    }
  
    if (dobValue === "") {
      nillDob.textContent = "* Date of Birth is required";
      isValid = false;
    }
  
    if (gender) {
      nillGender.textContent = "";
    } else {
      nillGender.textContent = "* Please select a gender";
      isValid = false;
    }
  
    if (qualifications === "") {
      document.getElementById("editQualificationsNill").textContent =
        "* Qualifications is required";
      isValid = false;
    }
  
    if (address === "") {
      document.getElementById("editAddressNill").textContent = "* Address is required";
      isValid = false;
    }
  
    if (country === "Select Country") {
      document.getElementById("editCountryNill").textContent = "* country is required";
      isValid = false;
    }
  
    if (state === "Select State") {
      document.getElementById("editStateNill").textContent = "* state is required";
      isValid = false;
    }
  
    if (city === "") {
      document.getElementById("editCityNill").textContent = "* city is required";
      isValid = false;
    }
  
    if (pin === "") {
      document.getElementById("editPinZipNill").textContent = "* pin is required";
      isValid = false;
    }
    /////////////////////////
  //   // validation false text
  //   document.getElementById("editEmployeeForm").addEventListener("input", (event) => {
  //   DataName = event.target.id;
  //   const errorId = `${DataName}Nill`;
  //   console.log(errorId);
  //   document.getElementById(errorId).textContent = "";
  //   });
  //   return isValid;
  // }

    // validation false text
    const clearErrorMessages = (event) => {
      const dataName = event.target.id;
      const errorId = `${dataName}Nill`;
      document.getElementById(errorId).textContent = "";
    };
  
    document.getElementById("editEmployeeForm").addEventListener("input", clearErrorMessages);
  
    return isValid;
  }



  // gender validation
  const editmaleRadioButton = document.getElementById("editMale");
  const editfemaleRadioButton = document.getElementById("editFemale");
  const nillGender = document.getElementById("nillGender");
  
  // editmaleRadioButton.addEventListener("click", () => {
  //   nillGender.textContent = "";
  // });
  // editfemaleRadioButton.addEventListener("click", () => { 
  //   nillGender.textContent = ""; 
  // });

  const clearGenderError = () => {
    nillGender.textContent = "";
  };
  
  editmaleRadioButton.addEventListener("click", clearGenderError);
  editfemaleRadioButton.addEventListener("click", clearGenderError);
  


// edit submisssion
async function updateData(id) {
  const salutation = document.getElementById("editSalutation").value;
  const firstName = document.getElementById("editFirstName").value;
  const lastName = document.getElementById("editLastName").value;
  const email = document.getElementById("editEmail").value;
  const addNumber = document.getElementById("editPhoneNumber").value;
  const Dateofbirth = document.getElementById("editDOB").value;
  const gender = document.querySelector('input[name="editGender"]:checked').value;
  const Qualification = document.getElementById("editQualifications").value;
  const addAddress = document.getElementById("editAddress").value;
  const country = document.getElementById("editCountry").value;
  const state = document.getElementById("editState").value;
  const city = document.getElementById("editCity").value;
  const pincode = document.getElementById("editPinZip").value;
  const dob = Dateofbirth;
  const [day, month, year] = dob.split("-");
  const formattedDate = `${year}-${month}-${day}`;

  // data to api
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
  // // put function
  // fetch(`http://localhost:3000/employees/${id}`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(updatedData),
  // })
  // .then((response) => {
  //   return response.json();
  // })

    // put function
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

//   //edit pic upload
//   const editImageUpload = document.getElementById("editImageUpload");
//   const formData = new FormData();
//   formData.append("avatar", editImageUpload.files[0]);
//   // upload
//   fetch(`http://localhost:3000/employees/${id}/avatar`, {
//   method: "POST",
//   body: formData
//   })
//   .then((data) => {
//     console.log("Success:", data);  
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
//   editEmployeeSuccessPopup();
// }



  // edit pic upload
  const editImageUpload = document.getElementById("editImageUpload");
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

  editEmployeeSuccessPopup();
}










///edit upload image show
let selectedImage = document.getElementById('editImageShow');
let editImageUpload = document.getElementById('editImageUpload');
editImageUpload.onchange = function () {
  selectedImage.src = URL.createObjectURL(editImageUpload.files[0]);
  selectedImage.style.width = "140px";
  selectedImage.style.height = "134px";

}

//edit reload
const popupOkButtonEditSuccess = document.getElementById("popupOkButtonEditSuccess");
popupOkButtonEditSuccess.addEventListener("click", () => {
  window.location.reload();
 });









// add employee submission
function addEmployeeSubmission() {

  const salutation = document.getElementById("addSalutation").value;
  const firstname = document.getElementById("FirstName").value;
  const lastname = document.getElementById("LastName").value;
  const email = document.getElementById("addEmail").value;
  const phn = document.getElementById("addphonenumber").value;
  const dateOfBirth = document.getElementById("addDOB").value;
  const address = document.getElementById("addAddress").value;
  const city = document.getElementById("addCity").value;
  const Qualifications = document.getElementById("Qualifications").value;
  const gender = document.querySelector ('input[name="gender"]:checked').value;
  const country = document.getElementById("addCountry").value;
  const state = document.getElementById("addState").value;
  const pinZip = document.getElementById("addPinZip").value;
  const [year, month, day] = dateOfBirth.split("-");
  const formattedDate = `${day}-${month}-${year}`;

  const employeeObject = {
    salutation: salutation,
    firstName: firstname,
    lastName: lastname,
    email: email,
    phone: phn,
    dob: formattedDate,
    qualifications: Qualifications,
    gender: gender,
    address: address,
    country: country,
    state: state,
    city: city,
    pin: pinZip,
    username: firstname,
    password: lastname,
  };
  fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeObject),
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
  
  console.log("Success", data);
  //////////image upload//////////////
  console.log('API Response:', data);

  getData();
  const uploadImage = document.getElementById("uploadImage");
  const formData = new FormData();
  formData.append("avatar", uploadImage.files[0]);

  fetch(`http://localhost:3000/employees/${data.id}/avatar`, {
    method: "POST",
    body: formData
  })
  .then((res) => {
    console.log("Image uploaded:", res);
       

  })
  .catch((error) => {
    console.error("Error uploading image:", error);
  })

})
  .catch((error) => {
    console.error('Error:', error);
  });
  addEmployeeSuccessPopup() 
}




/////////////////////image upload///////////////////
const upload_file = document.getElementById("uploadImage");
upload_file.addEventListener("change", uploadImage);
// function
function uploadImage() {

  const imgLink = URL.createObjectURL(upload_file.files[0]);
  const imgView = document.getElementById("image");
  // view image styles
  imgView.src = imgLink;
  imgView.style.height = "102px"
  imgView.style.width = "102px"
  imgView.style.borderRadius = "12px"
  imgView.style.display = "block";
  // image col div
  const imageCard = document.getElementById("imageCard");
  imageCard.style.width = '140px';
  // image upload icon and text
  const cardImg = document.getElementById("imageCard");
  const hidden = document.getElementById('hidden');
  hidden.style.display = "none";
  cardImg.style.display = "flex";
  cardImg.style.justifyContent = "center"
  // image reupload div
  const reup = document.getElementById("reup");
  reup.style.display = "block";
  // image change text div
  const changeText = document.getElementById("changeText");
  changeText.style.visibility = "visible";

}


// add employee submit button validation
const addButton = document.getElementById("addEmployeeSubmitBtn");
addButton.addEventListener("click", (e) =>{
  e.preventDefault();
  const isValid = formValidation();
  if(!isValid) {
    return;
  }
  addEmployeeSubmission();
});

//////validation////////////////
function formValidation() {
  const salutation = document.getElementById("addSalutation").value.trim();
  const firstName = document.getElementById("FirstName").value.trim();
  const lastName = document.getElementById("LastName").value.trim();
  const email = document.getElementById("addEmail").value.trim();
  const phone = document.getElementById("addphonenumber").value.trim(); 
  const qualifications = document.getElementById("Qualifications").value.trim();
  const address = document.getElementById("addAddress").value.trim();
  const country = document.getElementById("addCountry").value.trim();
  const state = document.getElementById("addState").value.trim();
  const city = document.getElementById("addCity").value.trim();
  const pin = document.getElementById("addPinZip").value.trim();
  //dob
  const dob = document.getElementById("addDOB");
  const nullDob = document.getElementById("addDOBNull");
  const dobValue = dob.value.trim();
  //gender
  const gender = document.querySelector('input[name="gender"]:checked');
  const nullGender = document.getElementById("nullGender");
  // regex validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^\d{10}$/;
  const namePattern = /^[A-Za-z]+$/;
  let isValid = true;
  // image_validation-----------------
  const uploadImage = document.getElementById("uploadImage");
  const nullImage = document.getElementById("nullImage");
  // image validation condition
  if (uploadImage.files.length === 0) {
    nullImage.textContent = "* Please select an image.";
    isValid = false;
  } else {
    nullImage.textContent = "";
  }

  //conditions
  if (salutation === "Select") {
    document.getElementById("addSalutationNull").textContent = "* Invalid select";
    isValid = false;
  }

  if (!namePattern.test(firstName)) {
    document.getElementById("FirstNameNull").textContent = "* First Name is required";
    isValid = false;
  }

  if (!namePattern.test(lastName)) {
    document.getElementById("LastNameNull").textContent = "* Last Name is required";
    isValid = false;
  }

  if (!emailPattern.test(email)) {
    document.getElementById("addEmailNull").textContent = "* Invalid Email";
    isValid = false;
  }

  if (!phonePattern.test(phone)) {
    document.getElementById("addphonenumberNull").textContent = "* Invalid Phone Number";
    isValid = false;
  }

  if (dobValue === "") {
    nullDob.textContent = "* Date of Birth is required";
    isValid = false;
  }

  if (gender) {
    nullGender.textContent = "";
  } else {
    nullGender.textContent = "* Please select a gender";
    isValid = false;
  }

  if (qualifications === "") {
    document.getElementById("QualificationsNull").textContent =
      "* Qualifications is required";
    isValid = false;
  }

  if (address === "") {
    document.getElementById("addAddressNull").textContent = "* Address is required";
    isValid = false;
  }

  if (country === "Select Country") {
    document.getElementById("addCountryNull").textContent = "* country is required";
    isValid = false;
  }

  if (state === "Select State") {
    document.getElementById("addStateNull").textContent = "* state is required";
    isValid = false;
  }

  if (city === "") {
    document.getElementById("addCityNull").textContent = "* city is required";
    isValid = false;
  }

  if (pin === "") {
    document.getElementById("addPinZipNull").textContent = "* pin is required";
    isValid = false;
  }
  // validation false text
  document.getElementById("addEmployeeForm").addEventListener("input", (event) => {
  DataName = event.target.id;
  const errorId = `${DataName}Null`;
  console.log(errorId);
  document.getElementById(errorId).textContent = "";
  });
  return isValid;
}
// gender validation
const maleRadioButton = document.getElementById("addMale");
const femaleRadioButton = document.getElementById("addFemale");
const nullGender = document.getElementById("nullGender");
maleRadioButton.addEventListener("click", () => {

  nullGender.textContent = "";

});
femaleRadioButton.addEventListener("click", () => {

  nullGender.textContent = "";

});


// add employee success popup ok button function
const popupOkButton = document.getElementById("popupOkButton");
popupOkButton.addEventListener("click", () => {
// popup
const addEmployeeSuccessMsg = document.getElementById("addEmployeeSuccessMsg");
addEmployeeSuccessMsg.style.visibility = "hidden";
// overlay
const overlay = document.getElementById("overlay");
overlay.style.visibility = "hidden";
// reload
window.location.reload();
});






//time

setInterval(myFunction);

function myFunction() {
  let d = new Date();
  document.getElementById("time").innerHTML=
  "Time - " +
  d.getHours() + ":" +
  d.getMinutes() + ":" +
  d.getSeconds();


}

setInterval(myFunctiondate);

function myFunctiondate() {
  let d = new Date();
  document.getElementById("date").innerHTML=
  "Date - " +
  d.getDate() + ":" +
  (d.getMonth() + 1 ) + ":" +
  d.getFullYear();
}