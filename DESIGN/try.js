// ......... delete-method...............................................start

// delete_employee_open_form
function open_delete_form(id) {
    var delete_form = document.getElementsByClassName("dialogue-delete")[0];
    delete_form.style.visibility = "visible";
    var overlay = document.getElementsByClassName("background-blur")[0];
    overlay.style.visibility = "visible";

    const delebutton = document.getElementById('popupDeletebutton')
    delebutton.addEventListener('click', () => {

        delete_employee(id);
    })
}


function delete_employee(id) {
  fetch(`http://localhost:3000/employees/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data);
      get_emp();
      deleteshowPopup();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  delete_close_btn();
}









//crud

// form id = student-form
// tbody class = student-list


function clearFields() {
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#email").value = "";
}


// add data

document.querySelector("student-form").addEventListener(submit, (e) => {
  e.preventDefault();

  //get from values
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;

  //validate
  if (firstName == "" || lastName == "" || email == "") {
    showAlert("Please fill all fields", "danger");
  }
  else {
    if (selectedRow == null) {
      const list = document.querySelector("employee-list");
      const row = document.createElement("tr");

      row.innerHTML = `
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${email}</td>
      `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("student added", "success");
    }
     else {
      selectedRow.children[0].textContent = firstName;
      selectedRow.children[1].textContent = lastName;
      selectedRow.children[2].textContent = email;
      selectedRow = null;
      showAlert("student info edited", "info");
    }
    clearFields();
  }
});

//edit data 
document.querySelector("employee-list").addEventListener("click", (e) => {
  target = e.target;
  if(target.classlist.contains("edit")){
    selectedRow = target.parenElement.parenElement;
    document.querySelector("#firstName").value=selectedRow.children[0].textContent;
    document.querySelector("#lastName").value=selectedRow.children[0].textContent;
    document.querySelector("#email").value=selectedRow.children[0].textContent;
  }
})






//edit

async function getData() {
  await fetch('http://localhost:3000/employees')
  .then ((res) => {
    return res.json();
  })
  .then ((data) => {
 document.getElementById("editFirstName").value = data.firstName;
  })
  .catch((err) => {
    console.log(err);
  });
}


//add emplo


function addEmployeeForm() {
  const salutation = document.getElementById("SelectionMethod").value;
  const firstName = document.getElementById("addfirstName").value;
  const lastName = document.getElementById("addLastName").value;
  const email = document.getElementById("addEmail").value;
  const addNumber = document.getElementById("addNumber").value;
  const Dateofbirth = document.getElementById("addDateofbirth").value;
  const gender = document.querySelector('input[name="Gender"]:checked').value;
  const Qualification = document.getElementById("addQualification").value;
  const addAddress = document.getElementById("addAddress").value;
  const country = document.getElementById("addCountry").value;
  const state = document.getElementById("addState").value;
  const city = document.getElementById("addCity").value;
  const pincode = document.getElementById("addPincode").value;
  const dob = Dateofbirth;
  const [year, month, day] = dob.split("-");
  const formattedDate = `${day}-${month}-${year}`;
  const employeeObject = {
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
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}




<div class="dialogue-delete" id="deleteEmployeePopupMenu">
  <div class="delete-heading-button d-flex justify-content-between">
    <h1 class="dialogue-title">Delete Employee</h1>
    <button class="edit-employee-close-button">
      <i class="fa-solid fa-x" onclick="cancel()"></i>
    </button>
  </div>

  <h2 class="dialogue-para">Are you sure you want to delete this employee?</h2>

  <div class="dialogue-delete-buttons">
    <button class="delete-cancel-btn" type="button" onclick="cancel()">
      Cancel
    </button>
    <button class="delete-delete-btn" type="button" id="popupDeletebutton">
      Delete
    </button>
  </div>
</div>;




// deletedAlert  div id
// popupDeletebutton button id


    $(document).ready(function () {
      $("#popupDeletebutton").click(function () {
        $("#deletedAlert").fadeIn();
        setTimeout(function () {
          $("#deletedAlert").fadeOut();
        }, 3000);
      });
    });



    //edit submission

    async function updateData(id) {
      const url = `http://localhost:3000/employees/${id}`;
    
      const updatedData = {
        salutation: document.getElementById("editSalutation").value,
        firstName: document.getElementById("editFirstName").value,
        lastName: document.getElementById("editLastName").value,
        email: document.getElementById("editEmail").value,
        phone: document.getElementById("editPhoneNumber").value,
        dob: document.getElementById("editDOB").value,
        qualifications: document.getElementById("editQualifications").value,
        gender: document.querySelector ('input[name="editGender"]:checked').value,
        address: document.getElementById("editAddress").value,
        country: document.getElementById("editCountry").value,
        state: document.getElementById("editState").value,
        city: document.getElementById("editCity").value,
        pin: document.getElementById("editPinZip").value,
      };
    
      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
    
        if (!response.ok) {
          throw new Error('Failed to update data');
        }
    
        console.log('Data updated successfully');
      } catch (error) {
        console.error(error);
      }
    }







    const salutation = document.getElementById("editSalutation").value;
    const firstName = document.getElementById("editFirstName").value;
    const lastName = document.getElementById("editLastName").value;
    const email = document.getElementById("editEmail").value;
    const addNumber = document.getElementById("editNumber").value;
    const Dateofbirth = document.getElementById("editDateofbirth").value;
    const gender = document.querySelector('input[name="editGender"]:checked').value;
    const Qualification = document.getElementById("editQualification").value;
    const addAddress = document.getElementById("editAddress").value;
    const country = document.getElementById("editCountry").value;
    const state = document.getElementById("editState").value;
    const city = document.getElementById("editCity").value;
    const pincode = document.getElementById("editPincode").value;
    const dob = Dateofbirth;
    const [year, month, day] = dob.split("-");
    const formattedDate = `${day}-${month}-${year}`;




const updateData = {
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

}









async function editData(id) {
  try {
    const response = await fetch(`http://localhost:3000/employees/${id}`);
    const data = await response.json();

    // ... (unchanged code)

  } catch (err) {
    console.log(err);
  }

  const editSubmissionBtn = document.getElementById("editSubmitBtn");
  const updateDataHandler = () => {
    updateData(id);
    editSubmissionBtn.removeEventListener("click", updateDataHandler);
  };
  editSubmissionBtn.addEventListener("click", updateDataHandler);
}

async function updateData(id) {
  try {
    // ... (unchanged code)

    const response = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}






async function editData(id) {
  try {
    const response = await fetch(`http://localhost:3000/employees/${id}`);
    const data = await response.json();

    document.getElementById("editSalutation").value = data.salutation;
    document.getElementById("editFirstName").value = data.firstName;
    document.getElementById("editLastName").value = data.lastName;
    document.getElementById("editEmail").value = data.email;
    document.getElementById("editPhoneNumber").value = data.phone;
    const dobValue = data.dob;
    const [day, month, year] = dobValue.split("-");
    const formattedDob = `${year}-${month}-${day}`;
    document.getElementById("editDOB").value = formattedDob;
    document.getElementById("editAddress").value = data.address;
    document.getElementById("editCity").value = data.city;
    document.querySelector(`input[name="editGender"][value="${data.gender}"]`).checked = true;
    document.getElementById("editQualifications").value = data.qualifications;
    document.getElementById("editCountry").value = data.country;
    document.getElementById("editState").value = data.state;
    document.getElementById("editPinZip").value = data.pin;

  } catch (err) {
    console.log(err);
  }

  const editSubmissionBtn = document.getElementById("editSubmitBtn");
  const updateDataHandler = () => {
    updateData(id);
    editSubmissionBtn.removeEventListener("click", updateDataHandler);
  };
  editSubmissionBtn.addEventListener("click", updateDataHandler);
}

async function updateData(id) {
  try {
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

    const response = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}





//-------function to show the menu------
function ThreeDotResponsebutton(emploID) {
  console.log(emploID);
  const ThreeDotList = document.getElementById("ThreeDotList");
  let temp = " ";
  temp = `
  <div class="ThreeDotResponsebun" id="ThreeDotResponsebun">
  <div class="ViewDetails" id="viewDetails" onclick="redirectToViewEmployee('${emploID}')">
  <i class="fa-regular fa-eye"></i>
  <span>View Details</span>
  </div>
  <div class="EditBtn" id="EditBtn" onclick="EditEmployee('${emploID}')">
      <i class="fa-solid fa-pencil"></i>
      <span>Edit </span>
  </div>
  <div class="Delete" onclick="DeleteWarningModal('${emploID}')">
      <i class="fa-regular fa-trash-can"></i>
      <span>Delete </span>
  </div>
  </div>
  <div id="modal"></div> `;
  ThreeDotList.innerHTML = temp;
  const ThreeDotResponsebun = document.getElementById("ThreeDotResponsebun");
  ThreeDotResponsebun.style.zIndex = "1";
  const moreOptionToggles = document.querySelectorAll("#ThreeDotButton");
  moreOptionToggles.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const buttonRect = btn.getBoundingClientRect();
      const ThreeDotResponsebun = document.getElementById("ThreeDotResponsebun");
      ThreeDotResponsebun.style.top = buttonRect.top - -40 + "px";
      ThreeDotResponsebun.style.visibility =
        ThreeDotResponsebun.style.visibility === "hidden" ||
        ThreeDotResponsebun.style.visibility === ""
          ? "visible"
          : "hidden";
      event.stopPropagation();
    });
  });
}




//main div class = ThreeDotResponsebun
//main div id = ThreeDotResponsebun




getData();

async function getData() {
  await fetch('http://localhost:3000/employees')
   .then ((res) => {
      return res.json();
   })
   .then((data) => {
      
    
    
   })
   .catch((err) => {
      console.log(err);
   });
}








//-------function to show the menu------
function ThreeDotResponsebutton(emploID) {
  console.log(emploID);
  const ThreeDotList = document.getElementById("ThreeDotList");
  let temp = " ";
  temp = `
  <div class="ThreeDotResponsebun" id="ThreeDotResponsebun">
  <div class="ViewDetails" id="viewDetails" onclick="redirectToViewEmployee('${emploID}')">
  <i class="fa-regular fa-eye"></i>
  <span>View Details</span>
  </div>
  <div class="EditBtn" id="EditBtn" onclick="EditEmployee('${emploID}')">
      <i class="fa-solid fa-pencil"></i>
      <span>Edit </span>
  </div>
  <div class="Delete" onclick="DeleteWarningModal('${emploID}')">
      <i class="fa-regular fa-trash-can"></i>
      <span>Delete </span>
  </div>
  </div>
  <div id="modal"></div> `;
  ThreeDotList.innerHTML = temp;
  
  const moreOptionToggles = document.querySelectorAll("#threeDotButton");
  moreOptionToggles.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const buttonRect = btn.getBoundingClientRect();
      const ThreeDotResponsebun = document.getElementById(
        "miniOption"
      );
      ThreeDotResponsebun.style.top = buttonRect.top - -40 + "px";
      ThreeDotResponsebun.style.visibility =
        ThreeDotResponsebun.style.visibility === "hidden" ||
        ThreeDotResponsebun.style.visibility === ""
          ? "visible"
          : "hidden";
      event.stopPropagation();
    });
  });
}
  





const url = new URL(window.location.href);
const id = url.searchParams.get('id');
console.log(id);
// -------------------------------------VIEW EMPLOYEE------------------------------- start
viewDetails(id);

function viewDetails(id) {

    fetch(`http://localhost:5001/api/employees/${id}`)
        .then(res => {
            return res.json();
        })
        .then(data => {

            document.getElementById('EmployeeProfilePic').innerHTML =  `<img src="http://localhost:5001/api/employees/${id}/avatar">`
            const fullName = data.salutation + " " + data.firstName + " " + data.lastName;
            document.getElementById('EmployeeName').innerHTML = fullName;
            document.getElementById('EmployeeEmail').innerHTML = data.email;
            document.getElementById('Gender').innerHTML = data.gender;
            document.getElementById('Dob').innerHTML = data.dob;
            const DOB = changeformatYMD(data.dob);
            const age = calculateAge(DOB);
            document.getElementById('Age').innerHTML = age;
            document.getElementById('PhoneNumberDetails').innerHTML = data.phone;
            document.getElementById('QualificationsDetails').innerHTML = data.qualifications;
            document.getElementById('AddressDetails').innerHTML = data.address;
            document.getElementById('UsernameDetails').innerHTML = data.username;
        });
}


function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();
    const timeDiff = currentDate - dob;
    const age = Math.floor(timeDiff / (365.25 * 24 * 60 * 60 * 1000));
    return age;
}
function changeformatYMD(DOB) {
    const [date, month, year] = DOB.split("-");
    let formatteddate = year + "-" + month + "-" + date;
    return formatteddate;
}









function searchInput() {
  let searchbarTop = document.getElementById("searchbarTop").value;
  searchbarTop = searchbarTop.toLowerCase();
  let rows = document.getElementsByTagName("tr");
  let noEmployeesFoundMessage = document.getElementById("noEmployeeMessage");
  let found = false;

  for (let i = 1; i < rows.length; i++) {
      if (!rows[i].innerHTML.toLowerCase().includes(searchbarTop)) {
          rows[i].style.display = "none";
      } else {
          rows[i].style.display = "";
          found = true;
      }
  }

  if (found) {
      noEmployeesFoundMessage.style.display = "none";

  } else {
      noEmployeesFoundMessage.style.display = "block";
  }
}



////////////////////pagen


get_emp();
function get_emp() {
    
    fetch("http://localhost:3000/employees")
        .then(Response => {
            return Response.json();
        })
        .then(data => {
            employeeData = data;

            let temp = '';
            // -------- list-select-----start

            const list_employee = document.getElementById('list_employee');
            
            list_employee.addEventListener("click", get_emp);
            const TotalCountOnPage = list_employee.value;
            
            // -------- list-select-----end
            const total_employee = document.getElementById("total_employee");
            total_employee.innerHTML = `of ${employeeData.length}`;

            const totalPages = Math.ceil(data.length / TotalCountOnPage);
            pagination(totalPages);
            const start = TotalCountOnPage * (CurrentPage - 1);

            const end = Math.min(TotalCountOnPage * CurrentPage, data.length);
            for (var i = start; i < end; i++) {
                const employee = data[i];


                temp += `<tr id="selectNow">
        <td>#0${i + 1}</td>
        <td><div class="employee_img"><img class="img_table" src='http://localhost:3000/employees/${employee.id}/avatar'>${employee.salutation + " " + employee.firstName + " " + employee.lastName}
        </div></td>
        <td>${employee.email}</td>
        <td>${employee.phone}</td>
        <td>${employee.gender}</td>
        <td>${employee.dob}</td>
        <td class="col_section">${employee.country}</td>
        <td><div class="menu_icon"><button class="three_dot_list"
        onclick="three_dot_list('${employee.id}')"><i class="fa-solid fa-ellipsis"></i></button></div></td>
        <div class="employee_action_btn" ></div>
        <div id="noEmployeeMessage" style="display: none;">No employees found</div>

    </tr>`

            }
            document.getElementById('table_text').innerHTML = temp;

        });
}






///p
var CurrentPage = 1;

function pagination(totalPages) {

    var pgnum = document.getElementById("Page_Num_Btns");
    let temp = '';

    for (let i = 1; i <= totalPages; i++) {
        temp += `<button id="page${i}">${i}</button>`;
    }

    pgnum.innerHTML = temp;

    pgnum.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            const pageNumber = parseInt(e.target.textContent);
            if (!isNaN(pageNumber)) {
                CurrentPage = pageNumber;
                get_emp();
            }
        }
    });

    var pageLeftButton = document.getElementById("pageleft");
    var pageRightButton = document.getElementById("pageright");


    if (CurrentPage === 1) {
        pageLeftButton.classList.add('hidden');
    } else {
        pageLeftButton.classList.remove('hidden');
    }

    if (CurrentPage === totalPages) {
        pageRightButton.classList.add('hidden');
    } else {
        pageRightButton.classList.remove('hidden');
    }

    pageLeftButton.addEventListener("click", function () {
        if (CurrentPage > 1) {
            CurrentPage--;
            get_emp();
            
        }
    });

    pageRightButton.addEventListener("click", function () {
        if (CurrentPage < totalPages) {
            CurrentPage++;
            get_emp();
        }
    });
    const actionButton = document.getElementById(`page${CurrentPage}`);
    actionButton.classList.add('active');
}





////////////up

// ......................image-Post-view..................
const upload_file = document.getElementById("uploadImage");
upload_file.addEventListener("change", uploadImage);

function uploadImage() {
    const imgLink = URL.createObjectURL(upload_file.files[0]);
    const imgView = document.getElementById("image");
    imgView.src = imgLink;
    const cardImg = document.getElementById("imageCard");
    const hidden = document.getElementById('hidden');
    hidden.style.display = "none";
    cardImg.style.display = "flex";
    cardImg.style.justifyContent = "center"

    const border = document.getElementById('viewImage');
    border.style.width = "200px";
    const imageError = document.getElementById('imageError').style.display = "none";

}











let selectedImage = document.getElementById('editImageShow');
let edit_upload_file = document.getElementById('editImageUpload');
edit_upload_file.onchange = function () {
    selectedImage.src = URL.createObjectURL(editImageUpload.files[0]);
    selectedImage.style.width = "110px";
    selectedImage.style.height = "110px";

}




///////////////validate

// ........validateForm.............start
// function validateForm() {
//   const salutation = document.getElementById("Salutation").value.trim();
//   const firstName = document.getElementById("firstName").value.trim();
//   const lastName = document.getElementById("LastName").value.trim();
//   const email = document.getElementById("Email").value.trim();
//   const phone = document.getElementById("Phone").value.trim();
//   const dobInput = document.getElementById("dob");
//   const dobError = document.getElementById("dobError");
//   const dobValue = dobInput.value.trim();

//   const selectedGender = document.querySelector('input[name="gender"]:checked');
//   const genderError = document.getElementById("genderError");

//   const qualifications = document.getElementById("Qualifications").value.trim();
//   const address = document.getElementById("Address").value.trim();
//   const country = document.getElementById("country").value.trim();
//   const state = document.getElementById("State").value.trim();
//   const city = document.getElementById("City").value.trim();
//   const pin = document.getElementById("pin").value.trim();

//   // regex validation

//   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//   const phonePattern = /^\d{10}$/;
//   const namePattern = /^[A-Za-z]+$/;

//   let isValid = true;

//   // image_validation-----------------
//   const imageInput = document.getElementById("upload_file");
//   const imageError = document.getElementById("imageError");
//   if (imageInput.files.length === 0) {
//     imageError.textContent = "Please select an image.";
//     isValid = false;
//   } else {
//     imageError.textContent = "";
//   }


//   if (salutation === "select") {
//     document.getElementById("SalutationError").textContent = "Invalid select";
//     isValid = false;
//   }

//   if (!namePattern.test(firstName)) {
//     document.getElementById("firstNameError").textContent = "First Name is required";
//     isValid = false;
//   }

//   if (!namePattern.test(lastName)) {
//     document.getElementById("LastNameError").textContent = "Last Name is required";
//     isValid = false;
//   }

//   if (!emailPattern.test(email)) {
//     document.getElementById("EmailError").textContent = "Invalid Email";
//     isValid = false;
//   }

//   if (!phonePattern.test(phone)) {
//     document.getElementById("PhoneError").textContent = "Invalid Phone Number";
//     isValid = false;
//   }

//   if (dobValue === "") {
//     dobError.textContent = "Date of Birth is required";
//     isValid = false;
//   }

//   if (selectedGender) {
//     genderError.textContent = "";
//   } else {
//     genderError.textContent = "Please select a gender";
//     isValid = false;
//   }

//   if (qualifications === "") {
//     document.getElementById("QualificationsError").textContent =
//       "Qualifications is required";
//     isValid = false;
//   }

//   if (address === "") {
//     document.getElementById("AddressError").textContent = "Address is required";
//     isValid = false;
//   }

//   if (country === "select country") {
//     document.getElementById("countryError").textContent = "country is required";
//     isValid = false;
//   }

//   if (state === "select state") {
//     document.getElementById("StateError").textContent = "state is required";
//     isValid = false;
//   }

//   if (city === "") {
//     document.getElementById("CityError").textContent = "city is required";
//     isValid = false;
//   }

//   if (pin === "") {
//     document.getElementById("pinError").textContent = "pin is required";
//     isValid = false;
//   }

//   document.getElementById("add_employee_form").addEventListener("input", (event) => {
//     DataName = event.target.id;
//     const errorId = `${DataName}Error`;

//     document.getElementById(errorId).textContent = "";
//   });

//   return isValid;
// }

// const maleRadioButton = document.getElementById("male");
// const femaleRadioButton = document.getElementById("female");
// const genderError = document.getElementById("genderError");

// maleRadioButton.addEventListener("click", () => {
//   genderError.textContent = "";
// });

// femaleRadioButton.addEventListener("click", () => {
//   genderError.textContent = "";
// });




  // image error text
  // const border = document.getElementById('viewImage');
  // const imageError = document.getElementById('imageError').style.display = "none";
  




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
  
    const hidden = document.getElementById("hidden");
    hidden.style.display = "block";
  
    const reUp = document.getElementById("reup");
    reUp.style.visibility = "hidden";
  
    const changeText = document.getElementById("changeText");
    changeText.style.visibility = "hidden";
  
    const editEmployeeForm = document.getElementById("editEmployeeForm");
    editEmployeeForm.reset();
  
   }







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


   //////validation////////////////
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
  // image_validation-----------------
  const uploadImage = document.getElementById("editImageUpload");
  const nillImage = document.getElementById("nillImage");
  // image validation condition
  if (uploadImage.files.length === 0) {
    nillImage.textContent = "* Please select an image.";
    isValid = false;
  } else {
    nillImage.textContent = "";
  }

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
  // validation false text
  document.getElementById("editEmployeeForm").addEventListener("input", (event) => {
  DataName = event.target.id;
  const errorId = `${DataName}Nill`;
  console.log(errorId);
  document.getElementById(errorId).textContent = "";
  });
  return isValid;
}
// gender validation
const maleRadioButton = document.getElementById("editMale");
const femaleRadioButton = document.getElementById("editFemale");
const nillGender = document.getElementById("nillGender");

maleRadioButton.addEventListener("click", () => {

  nillGender.textContent = "";

});
femaleRadioButton.addEventListener("click", () => {

  nillGender.textContent = "";

});




async function updateData(id) {
  const salutation = document.getElementById("editSalutation").value;
  // ... (other fields)

  // Validate image upload
  const editImageUpload = document.getElementById("editImageUpload");
  const nillImage = document.getElementById("nillImage");

  if (editImageUpload.files.length === 0) {
    nillImage.textContent = "* Please select an image.";
    return; // Exit the function if image is not selected
  } else {
    nillImage.textContent = "";
  }

  const formData = new FormData();
  formData.append("avatar", editImageUpload.files[0]);
  formData.append("data", JSON.stringify(updatedData));

  // PUT function with image upload
  fetch(`http://localhost:3000/employees/${id}`, {
    method: "PUT",
    body: formData,
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
    editEmployeeSuccessPopup();
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}








///////////////////////

// edit employee view
async function editData(id) {
  await fetch(`http://localhost:3000/employees/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // ... (unchanged code)

      // edit image show
      const editImageShow = document.getElementById("editImageShow");
      editImageShow.src = `http://localhost:3000/employees/${id}/avatar`;
    })
    .catch((err) => {
      console.log(err);
    });

  // edit employee submit button validation
  const addButton = document.getElementById("editSubmitBtn");
  addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isValid = editformValidation();
    if (!isValid) {
      return;
    }
    // Pass 'id' to updateData function
    updateData(id);
  });
}

// edit validation
function editformValidation() {
  // ... (unchanged code)
}

// gender validation
const editmaleRadioButton = document.getElementById("editMale");
const editfemaleRadioButton = document.getElementById("editFemale");
const nillGender = document.getElementById("nillGender");

editmaleRadioButton.addEventListener("click", () => {
  nillGender.textContent = "";
});

editfemaleRadioButton.addEventListener("click", () => {
  nillGender.textContent = "";
});

// edit submission
async function updateData(id) {
  // ... (unchanged code)

  // data to api
  const updatedData = {
    salutation: salutation,
    // ... (other fields)
    password: addNumber,
  };

  // Validate image upload
  const editImageUpload = document.getElementById("editImageUpload");
  const nillImage = document.getElementById("nillImage");

  if (editImageUpload.files.length === 0) {
    nillImage.textContent = "* Please select an image.";
    return; // Exit the function if image is not selected
  } else {
    nillImage.textContent = "";
  }

  const formData = new FormData();
  formData.append("avatar", editImageUpload.files[0]);
  formData.append("data", JSON.stringify(updatedData));

  // PUT function with image upload
  fetch(`http://localhost:3000/employees/${id}`, {
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      editEmployeeSuccessPopup();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}





////////////

// edit employee view
async function editData(id) {
  await fetch(`http://localhost:3000/employees/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // ... (unchanged code)

      // edit image show
      const editImageShow = document.getElementById("editImageShow");
      editImageShow.src = `http://localhost:3000/employees/${id}/avatar`;
    })
    .catch((err) => {
      console.log(err);
    });

  // edit employee submit button validation
  const addButton = document.getElementById("editSubmitBtn");
  addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isValid = editformValidation(id);
    if (!isValid) {
      return;
    }
    // Pass 'id' to updateData function
    updateData(id);
  });
}

// edit validation
function editformValidation(id) {
  // ... (unchanged code)

  // Validate image upload only if there is no existing image
  const editImageShow = document.getElementById("editImageShow");
  const editImageUpload = document.getElementById("editImageUpload");
  const nillImage = document.getElementById("nillImage");

  if (!editImageShow.src || editImageShow.src === "about:blank") {
    // No existing image, validate the image upload
    if (editImageUpload.files.length === 0) {
      nillImage.textContent = "* Please select an image.";
      isValid = false;
    } else {
      nillImage.textContent = "";
    }
  }

  return isValid;
}

// gender validation
const editmaleRadioButton = document.getElementById("editMale");
const editfemaleRadioButton = document.getElementById("editFemale");
const nillGender = document.getElementById("nillGender");

editmaleRadioButton.addEventListener("click", () => {
  nillGender.textContent = "";
});

editfemaleRadioButton.addEventListener("click", () => {
  nillGender.textContent = "";
});

// edit submission
async function updateData(id) {
  // ... (unchanged code)

  // data to api
  const updatedData = {
    salutation: salutation,
    // ... (other fields)
    password: addNumber,
  };

  // Validate image upload only if there is no existing image
  const editImageShow = document.getElementById("editImageShow");
  const editImageUpload = document.getElementById("editImageUpload");
  const nillImage = document.getElementById("nillImage");

  if (!editImageShow.src || editImageShow.src === "about:blank") {
    // No existing image, validate the image upload
    if (editImageUpload.files.length === 0) {
      nillImage.textContent = "* Please select an image.";
      return; // Exit the function if image is not selected
    } else {
      nillImage.textContent = "";
    }
  }

  // ... (unchanged code)
}




// edit validation
function editformValidation() {
  // ... (unchanged code)

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

const clearGenderError = () => {
  nillGender.textContent = "";
};

editmaleRadioButton.addEventListener("click", clearGenderError);
editfemaleRadioButton.addEventListener("click", clearGenderError);

// edit submission
async function updateData(id) {
  // ... (unchanged code)

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

// edit upload image show
let selectedImage = document.getElementById("editImageShow");
let editImageUpload = document.getElementById("editImageUpload");
editImageUpload.onchange = function () {
  selectedImage.src = URL.createObjectURL(editImageUpload.files[0]);
  selectedImage.style.width = "140px";
  selectedImage.style.height = "134px";
};

// edit reload
const popupOkButtonEditSuccess = document.getElementById("popupOkButtonEditSuccess");
popupOkButtonEditSuccess.addEventListener("click", () => {
  window.location.reload();
});
