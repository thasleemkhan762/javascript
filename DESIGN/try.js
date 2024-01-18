// ------------------------------  add-employee --------------------------start
const addButton = document.getElementById('add_employee');
addButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const form = document.getElementById('add_employee_form');

        const isValid = validateForm();

        if (!isValid) {
            return;
        }
        const salutation = document.getElementById('Salutation').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('LastName').value;
        const email = document.getElementById('Email').value;
        const phone = document.getElementById('Phone').value;
        const dob = document.getElementById('dob').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const qualifications = document.getElementById('Qualifications').value;
        const address = document.getElementById('Address').value;
        const country = document.getElementById('country').value;
        const state = document.getElementById('State').value;
        const city = document.getElementById('City').value;
        const pin = document.getElementById('pin').value;
        const [year, month, date] = dob.split("-");
        const newDob = `${date}-${month}-${year}`;
        const formdatas = {
            salutation,
            firstName,
            lastName,
            email,
            phone,
            dob: newDob,
            gender,
            qualifications,
            address,
            country,
            state,
            city,
            pin,
            username: firstName,
            password: phone,
        }
        const apiUrl = 'http://localhost:3000/employees';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdatas), // Convert data to JSON
        })
            .then(response => response.json())

            .then(data => {
                console.log('API Response:', data);
                get_emp();
                const upload_file = document.getElementById("upload_file");
                const formData = new FormData();
                formData.append("avatar", upload_file.files[0]);
                fetch(`http://localhost:3000/employees/${data.id}/avatar`, {
                    method: "POST",
                    body: formData
                })
                    .then((res) => {
                        console.log("Image uploaded:", res);
                        showPopup()
                    })
                    .catch((error) => {
                        console.error("Error uploading image:", error);
                    })
            })
            .catch(error => {
                console.error('Error:', error);
            });
        get_emp();
    }
);
// ....................add employee-end.................................... end





function addEmployeeSubmission() {
  const salutation = document.getElementById("addSalutation").value;
  const firstname = document.getElementById("FirstName").value;
  const lastname = document.getElementById("LastName").value;
  const email = document.getElementById("addEmail").value;
  const phn = document.getElementById("addphonenumber").value;
  const dateOfBirth = document.getElementById("addDOB").value;
  const address = document.getElementById("addAddress").value;
  const city = document.getElementById("addCity").value;
  const qualifications = document.getElementById("Qualifications").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const country = document.getElementById("addCountry").value;
  const state = document.getElementById("addState").value;
  const pinZip = document.getElementById("addPinZip").value;
  const [year, month, day] = dateOfBirth.split("-");
  const formattedDate = `${day}-${month}-${year}`;

  const employeeObject = {
    salutation,
    firstName: firstname,
    lastName: lastname,
    email,
    phone: phn,
    dob: formattedDate,
    qualifications,
    gender,
    address,
    country,
    state,
    city,
    pin: pinZip,
    username: firstname,
    password: lastname,
  };

  const formData = new FormData();
  formData.append("avatar", document.getElementById("uploadImage").files[0]);
  formData.append("data", JSON.stringify(employeeObject));

  fetch("http://localhost:3000/employees", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success", data);
      getData(); // Assuming this function handles refreshing the table

      // You can add additional logic here if needed

      addEmployeeSuccessPopup();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}





// Assuming you have an <img> tag with the id "avatarImage" in your HTML
const avatarImage = document.getElementById("avatarImage");

// ...

.then((res) => {
  if (res.ok) {
    console.log("Image uploaded successfully:", res);

    // Assuming the server responds with a correct image URL
    const imageUrl = `http://localhost:3000/employees/${data.id}/avatar`;

    // Display the avatar image
    avatarImage.src = imageUrl;

    // Assuming getData() fetches and updates employee data
    getData();
    addEmployeeSuccessPopup();
  } else {
    console.error("Error uploading image:", res);
  }
})




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
                    <td><img id="avatarImage"  class="tableProfilePic" style="height: 30px;" src='http://localhost:3000/employees/${user.id}/avatar'></img>${user.salutation} ${user.firstName} ${user.lastName}</td>
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
  const gender = document.querySelector('input[name="gender"]:checked').value;
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

  let employeeData; 

  fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeObject),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Employee data added successfully", data);
      employeeData = data;

      // Image upload
      const uploadImage = document.getElementById("uploadImage");
      const formData = new FormData();
      formData.append("avatar", uploadImage.files[0]);

      return fetch(`http://localhost:3000/employees/${data.id}/avatar`, {
        method: "POST",
        body: formData,
      });
    })
    .then((res) => {
      if (res.ok) {
        console.log("Image uploaded successfully:", res);

        // Display image
        const avatarImage = document.getElementById("avatarImage");
        const imageUrl = `http://localhost:3000/employees/${employeeData.id}/avatar`;
        avatarImage.src = imageUrl;

        
        getData();
        addEmployeeSuccessPopup();
      } else {
        console.error("Error uploading image:", res);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

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
  const gender = document.querySelector('input[name="gender"]:checked').value;
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

  let employeeData;

  fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeObject),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Employee data added successfully", data);
      employeeData = data;

      // Image upload
      const uploadImage = document.getElementById("uploadImage");
      const formData = new FormData();
      formData.append("avatar", uploadImage.files[0]);

      return fetch(`http://localhost:3000/employees/${data.id}/avatar`, {
        method: "POST",
        body: formData,
      });
    })
    .then((res) => {
      if (res.ok) {
        console.log("Image uploaded successfully:", res);
        // Now that the image is uploaded, update the DOM
        const avatarImage = document.getElementById("avatarImage");
        const imageUrl = `http://localhost:3000/employees/${employeeData.id}/avatar`;
        avatarImage.src = imageUrl;

        getData();
        addEmployeeSuccessPopup();
      } else {
        console.error("Error uploading image:", res);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}




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
  const gender = document.querySelector('input[name="gender"]:checked').value;
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

  let employeeData;

  fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeObject),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Employee data added successfully", data);
      employeeData = data;

      // Image upload
      const uploadImage = document.getElementById("uploadImage");
      const formData = new FormData();
      formData.append("avatar", uploadImage.files[0]);

      // Extract the id from the response
      const employeeId = data.id;

      return fetch(`http://localhost:3000/employees/${employeeId}/avatar`, {
        method: "POST",
        body: formData,
      });
    })
    .then((res) => {
      if (res.ok) {
        console.log("Image uploaded successfully:", res);
        // Now that the image is uploaded, update the DOM
        const avatarImage = document.getElementById("avatarImage");
        const imageUrl = `http://localhost:3000/employees/${employeeData.id}/avatar`;
        avatarImage.src = imageUrl;

        getData();
        addEmployeeSuccessPopup();
      } else {
        console.error("Error uploading image:", res);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}





// post request ajax 

let getdata = document.getElementById("addsubmitbtn");
getdata.addEventListener(click, () => {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'apilink', true);
  xhr.onprogress = function(){
    console.log("Iam progresisng");
  }
  xhr.onreadystatechange = function() {
    console.log("ready state is"+ xhr.readyState);
  }
  xhr.onload= function () {
    if(this.status === 200){
      console.log(this.responseText);
    }else{
      console.log("Page not found");
    }
  }
  xhr.send();
});







function singleDataUpdate() {

  const api = 'http://localhost:3000/employees';

  //new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Set up the request
  xhr.open('GET', api, true);

  // Define what happens on successful data submission
  xhr.onload = function () {
    if (xhr.status == 200) {
      // Parse the JSON response
      var data = JSON.parse(xhr.responseText);

      // table data show
      let updatedTableHtml = '';
      for (let i = 0; i < data.length; i++) {
        const user = data[i];
        let serialNumber = i + 1;
        let formattedSerialNumber = serialNumber > 9 ? `#${serialNumber}` : `#0${serialNumber}`;

        updatedTableHtml += `<tr>
          <td></td>
          <td>${formattedSerialNumber}</td>
          <td><img id="avatarImage" class="tableProfilePic" style="height: 30px;" src='http://localhost:3000/employees/${user.id}/avatar'></img>${user.salutation} ${user.firstName} ${user.lastName}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.gender}</td>
          <td>${user.dob}</td>
          <td>${user.country}</td>
          <td>
            <button class="button-option" id="threeDotButton" onclick="optionMenu('${user.id}')">
              <!-- Your existing button content -->
            </button>
          </td>
        </tr>`;
      }

      // Update the HTML of the table body with the new data
      document.getElementById('tbody').innerHTML = updatedTableHtml;
    } else {
      console.error('Request failed. Returned status of ' + xhr.status);
    }
  };

  // Send the request
  xhr.send();
}

// Call this function after adding a new employee to update the table
updateTableData();








/////////////////////////////////////////////////////

function singleDataUpdate() {
  const apiUrl = 'http://localhost:3000/employees';

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Set up the request
  xhr.open('GET', apiUrl, true);

  // Define what happens on successful data submission
  xhr.onload = function () {
    if (xhr.status == 200) {
      // Parse the JSON response
      var user = JSON.parse(xhr.responseText);

      // Update the HTML of the table body with the new data
      let updatedTableHtml = `<tr>
        <td></td>
        <td>#01</td>
        <td><img id="avatarImage" class="tableProfilePic" style="height: 30px;" src='http://localhost:3000/employees/${employeeObject.id}/avatar'></img>${employeeObject.salutation} ${employeeObject.firstName} ${employeeObject.lastName}</td>
        <td>${employeeObject.email}</td>
        <td>${employeeObject.phone}</td>
        <td>${employeeObject.gender}</td>
        <td>${employeeObject.dob}</td>
        <td>${employeeObject.country}</td>
        <td>
        <button class="button-option" id="threeDotButton" onclick="optionMenu('${employeeObject.id}')"  >
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

      document.getElementById('tbody').innerHTML += updatedTableHtml;
    } else {
      console.error('Request failed. Returned status of ' + xhr.status);
    }
  };

  // Send the request
  xhr.send();
}

singleDataUpdate();





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
  const gender = document.querySelector('input[name="gender"]:checked').value;
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

  let employeeData;

  fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeObject),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Employee data added successfully", data);
      employeeData = data;

      // Image upload
      const uploadImage = document.getElementById("uploadImage");
      const formData = new FormData();
      formData.append("avatar", uploadImage.files[0]);

      // const employeeId = data.id;
      const user = data;

      return fetch(`http://localhost:3000/employees/${user.id}/avatar`, {
        method: "POST",
        body: formData,
      });
    })
    .then((res) => {
      if (res.ok) {
        console.log("Image uploaded successfully:", res);
        // Now that the image is uploaded, update the DOM
        const avatarImage = document.getElementById("avatarImage");
        const imageUrl = `http://localhost:3000/employees/${employeeData.id}/avatar`;
        avatarImage.src = imageUrl;

        // Continue with other tasks, e.g., getData() and show success popup
        getData();
        addEmployeeSuccessPopup();
      } else {
        console.error("Error uploading image:", res);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}









  










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
  const gender = document.querySelector('input[name="gender"]:checked').value;
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
    .then((response) => response.json())
    .then((data) => {
      console.log("Employee data added successfully", data);

      // Assuming 'data' is the newly added user object
      const user = data;

      // Image upload
      const uploadImage = document.getElementById("uploadImage");
      const formData = new FormData();
      formData.append("avatar", uploadImage.files[0]);

      fetch(`http://localhost:3000/employees/${user.id}/avatar`, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            console.log("Image uploaded successfully:", res);

            // Append the new row to the table
            let serialNumber = document.getElementById('tbody').childElementCount + 1;
            let formattedSerialNumber = serialNumber > 9 ? `#${serialNumber}` : `#0${serialNumber}`;

            let newRow = `<tr>
              <td></td>
              <td>${formattedSerialNumber}</td>
              <td>
                <img id="avatarImage" class="tableProfilePic" style="height: 30px;" src='http://localhost:3000/employees/${user.id}/avatar'></img>
                ${user.salutation} ${user.firstName} ${user.lastName}
                <br>
                Address: ${user.address || ''}
              </td>
              <td>${user.email || ''}</td>
              <td>${user.phone || ''}</td>
              <td>${user.gender || ''}</td>
              <td>${user.dob || ''}</td>
              <td>${user.country || ''}</td>
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

            // Append the new row to the table body
            document.getElementById('tbody').insertAdjacentHTML('beforeend', newRow);

            // Optionally, you can show a success message or perform other actions
            addEmployeeSuccessPopup();
          } else {
            console.error("Error uploading image:", res);
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}






function addEmployeeSubmission() {
  const salutation = document.getElementById("addSalutation").value;
  const firstname = document.getElementById("FirstName").value;
  const lastname = document.getElementById("LastName").value;
  const email = document.getElementById("addEmail").value;
  const phn = document.getElementById("addphonenumber").value;
  const dateOfBirth = document.getElementById("addDOB").value;
  const address = document.getElementById("addAddress").value;
  const country = document.getElementById("addCountry").value;
  const uploadImage = document.getElementById("uploadImage");

  const employeeObject = {
    salutation: salutation,
    firstName: firstname,
    lastName: lastname,
    email: email,
    phone: phn,
    dob: dateOfBirth,
    address: address,
    country: country,
  };

  let employeeData;

  fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeObject),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Employee data added successfully", data);
      employeeData = data;

      // Image upload
      const formData = new FormData();
      formData.append("avatar", uploadImage.files[0]);

      // Assuming 'data' is the newly added user object
      const user = data;

      fetch(`http://localhost:3000/employees/${user.id}/avatar`, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            console.log("Image uploaded successfully:", res);

            // Append the new row to the table
            let serialNumber = document.getElementById('tbody').childElementCount + 1;
            let formattedSerialNumber = serialNumber > 9 ? `#${serialNumber}` : `#0${serialNumber}`;

            let newRow = `<tr>
              <td></td>
              <td>${formattedSerialNumber}</td>
              <td>
                <img id="avatarImage" class="tableProfilePic" style="height: 30px;" src='http://localhost:3000/employees/${user.id}/avatar'></img>
                ${user.salutation} ${user.firstName} ${user.lastName}
                <br>
                Address: ${user.address || ''}
              </td>
              <td>${user.email || ''}</td>
              <td>${user.phone || ''}</td>
              <td>${user.gender || ''}</td>
              <td>${user.dob || ''}</td>
              <td>${user.country || ''}</td>
              <td>
                <button class="button-option" id="threeDotButton" onclick="optionMenu('${user.id}')">
                  <!-- Your existing button content -->
                </button>
              </td>
            </tr>`;

            // Append the new row to the table body
            document.getElementById('tbody').insertAdjacentHTML('beforeend', newRow);

            // Optionally, you can show a success message or perform other actions
            addEmployeeSuccessPopup();
          } else {
            console.error("Error uploading image:", res);
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}










.then((res) => {
  if (res.ok) {
    console.log("Image uploaded successfully:", res);

    // Assuming 'data' is the newly added user object
    const user = data;

    // Wait for a short time to ensure the server has processed the image
    setTimeout(() => {
      // Append the new row to the table
      let serialNumber = document.getElementById('tbody').childElementCount + 1;
      let formattedSerialNumber = serialNumber > 9 ? `#${serialNumber}` : `#0${serialNumber}`;

      let newRow = `<tr>
        <td></td>
        <td>${formattedSerialNumber}</td>
        <td>
          <img id="avatarImage" class="tableProfilePic" style="height: 30px;" src='http://localhost:3000/employees/${user.id}/avatar'></img>
          ${salutation} ${firstname} ${lastname}  
        </td>
        <td>${email}</td>
        <td>${phn}</td>
        <td>${gender}</td>
        <td>${formattedDate}</td>
        <td>${country}</td>
        <td>
          <button class="button-option" id="threeDotButton" onclick="optionMenu('${user.id}')">
            <!-- ... (rest of the button HTML) -->
          </button>
        </td>
      </tr>`;

      // Append the new row to the table body
      document.getElementById('tbody').insertAdjacentHTML('beforeend', newRow);

      addEmployeeSuccessPopup();
    }, 1000); // Adjust the timeout duration as needed
  } else {
    console.error("Error uploading image:", res);
  }


thasleemkhanccc