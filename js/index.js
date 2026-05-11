var addContactBtn = document.getElementById("addContact");
var inputsSection = document.getElementById("inputsSection");
var closeInputs = document.getElementById("Xmark");
var nameInput = document.getElementById("nameInput");
var numInput = document.getElementById("numInput");
var mailInput = document.getElementById("mailInput");
var addressInput = document.getElementById("addressInput");
var selectInput = document.getElementById("selectInput");
var notesInput = document.getElementById("notesInput");
var checkInput1 = document.getElementById("checkInput1");
var checkInput2 = document.getElementById("checkInput2");
var cancelButton = document.getElementById("cancelButton");
var saveButton = document.getElementById("saveButton");
var inputSearch = document.getElementById("inputSearch");
var currentIndex = 0;
var avatarColors = [
  "#EF4444",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
];

// display addContactBtn
addContactBtn.addEventListener("click", function () {
  inputsSection.classList.remove("d-none");
});

// closeInputsSection
closeInputs.addEventListener("click", function () {
  inputsSection.classList.add("d-none");
});
cancelButton.addEventListener("click", function () {
  inputsSection.classList.add("d-none");
});

var contactList = [];
if (localStorage.getItem("contactContainer") !== null) {
  contactList = JSON.parse(localStorage.getItem("contactContainer"));
}
displayContact();
displaySidebar();
updateCounts();

saveButton.addEventListener("click", function () {
  if (isEditing) {
    updateContact();
  } else {
    saveContact();
  }
});

function saveContact() {
  var duplicateNum = false;

  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].num === numInput.value.trim()) {
      duplicateNum = true;
      break;
    }
  }

  if (duplicateNum) {
    Swal.fire({
      title: "Duplicate Phone Number",
      text: "A contact with this phone number already exists",
      icon: "error",
      confirmButtonText: "ok",
    });
    return;
  }
  if (mailInput.value.trim() && !validation(mailInput)) {
    Swal.fire({
      title: "Invalid Email",
      text: "Please enter a valid email address!",
      icon: "error",
      confirmButtonText: "ok",
    });
    return;
  }

  if (validation(nameInput) && validation(numInput)) {
    var randomIndex = Math.floor(Math.random() * avatarColors.length);
    var assignedColor = avatarColors[randomIndex];
    var contact = {
      name: nameInput.value.trim(),
      num: numInput.value.trim(),
      mail: mailInput.value.trim(),
      address: addressInput.value.trim(),
      select: selectInput.value.trim(),
      notes: notesInput.value.trim(),
      check1: checkInput1.checked,
      check2: checkInput2.checked,
      color: assignedColor,
    };
    contactList.push(contact);
    localStorage.setItem("contactContainer", JSON.stringify(contactList));
    clearForm();
    inputsSection.classList.add("d-none");
    displayContact();
    displaySidebar();
    updateCounts();
    Swal.fire({
      title: "Added!",
      text: "contact has been added successfully👍",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    if (!validation(nameInput)) {
      Swal.fire({
        title: "Missing Name",
        text: "Please enter a name for the contact!",
        icon: "error",
        confirmButtonText: "ok",
      });
    } else if (!validation(numInput)) {
      Swal.fire({
        title: "Missing Phone",
        text: "Please enter a phone nummber!",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  }
}

function clearForm() {
  nameInput.value = null;
  numInput.value = null;
  mailInput.value = null;
  addressInput.value = null;
  selectInput.selectedIndex = 0;
  notesInput.value = null;
  checkInput1.checked = false;
  checkInput2.checked = false;

  nameInput.classList.remove("is-valid", "is-invalid");
  numInput.classList.remove("is-valid", "is-invalid");
  mailInput.classList.remove("is-valid", "is-invalid");
}

inputSearch.addEventListener("input", function () {
  displayContact();
});
function displayContact() {
  var searchValue = inputSearch.value;
  var box = "";
  for (let i = 0; i < contactList.length; i++) {
    bgColor = contactList[i].color;
    var firstChar = contactList[i].name.charAt(0).toUpperCase();
    if (
      contactList[i].name.toLowerCase().includes(searchValue.toLowerCase()) ||
      contactList[i].num.toLowerCase().includes(searchValue.toLowerCase()) ||
      contactList[i].mail.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      box += `
              <div class="col-12 col-md-6 d-flex">
                  <div class="box bg-white shadow-sm rounded-4 w-100">
                    <div class="p-3">
                      <div class="d-flex mb-3">
                        <div
                          class="profile-img position-relative d-flex align-items-center justify-content-center rounded-4" style="background-color: ${bgColor};"
                        >
                          <span class="char fw-bold text-white fs-5">${firstChar}</span>
                          
                          ${
                            contactList[i].check1
                              ? `
                           <span
                            id="star-badge"
                            style="
                              border: 2px solid white;
                              width: 20px;
                              height: 20px;
                              top: 10px;
                              left: 90%;
                            "
                            class="badge-icon position-absolute translate-middle badge rounded-circle bg-warning d-flex align-items-center justify-content-center"
                            ><i style="font-size: 8px" class="fas fa-star"></i
                          ></span>
                          `
                              : ""
                          }
                         
                           ${
                             contactList[i].check2
                               ? `
                              <span
                            id="heart-badge"
                            style="
                              border: 2px solid white;
                              width: 20px;
                              height: 20px;
                              bottom: -10px;
                              left: 90%;
                            "
                            class="badge-icon position-absolute translate-middle badge rounded-circle bg-danger d-flex align-items-center justify-content-center"
                            ><i class="fas fa-heartbeat"></i
                          ></span>
                              `
                               : ""
                           }
                        </div>

                        <div class="ms-3">
                          <h6 class="fw-bold mb-2">${contactList[i].name}</h6>
                          <div class="info-row d-flex align-items-center mb-2">
                            <span
                              style="
                                background-color: #dbeafe;
                                width: 25px;
                                height: 25px;
                                font-size: 0.625rem;
                                color: #155dfc;
                              "
                              class="icon-box d-flex align-items-center justify-content-center rounded-3"
                              ><i class="fas fa-phone-alt"></i
                            ></span>
                            <span class="text-secondary ms-2 small"
                              >${contactList[i].num}</span
                            >
                          </div>
                        </div>
                      </div>

                      ${
                        contactList[i].mail
                          ? `
                        <div class="email-row d-flex align-items-center mb-2">
                        <span
                          class="icon-box d-flex align-items-center justify-content-center rounded-3"
                          style="
                            background-color: #ede9fe;
                            width: 25px;
                            height: 25px;
                            font-size: 0.625rem;
                            color: #7f22fe;
                          "
                          ><i class="fas fa-envelope"></i
                        ></span>
                        <span class="text-secondary ms-2">${contactList[i].mail}</span>
                      </div>`
                          : ""
                      }
                      

                      ${
                        contactList[i].address
                          ? `
                         <div class="address-row d-flex align-items-center mb-2">
                        <span
                          class="icon-box d-flex align-items-center justify-content-center rounded-3"
                          style="
                            background-color: #d0fae5;
                            width: 25px;
                            height: 25px;
                            font-size: 0.625rem;
                            color: #009966;
                          "
                          ><i class="fa-solid fa-location-dot"></i
                        ></span>
                        <span class="text-secondary ms-2">${contactList[i].address}</span>
                      </div>
                        `
                          : ""
                      }

                      <div class="select-emg d-flex gap-3">

                      ${
                        contactList[i].check2
                          ? `
                           <div class="emergency d-flex align-items-center">
                          <span
                            class="icon-box p-2 fw-medium rounded-3"
                            style="
                              background-color: #fff1f2;
                              font-size: 0.75rem;
                              color: #ec003f;
                            "
                            ><i class="fas fa-heartbeat"></i>Emergency</span
                          >
                        </div>
                        `
                          : ""
                      }
                     
                        ${
                          contactList[i].select &&
                          contactList[i].select !== "Select a group"
                            ? `
                           <div
                          class="select d-flex align-items-center icon-box p-2 fw-medium rounded-3"
                          style="
                            background-color: #f3e8ff;
                            font-size: 0.75rem;
                            color: #7f22fe;
                          "
                        >
                          ${contactList[i].select}
                        </div>
                          `
                            : ""
                        }
                       
                      </div>
                    </div>
                    <div
                      style="background-color: #fafbfc"
                      class="card-footer border-top d-flex justify-content-between align-items-center p-3"
                    >
                      <div class="d-flex gap-2">
                        <a
                          href="tel:${contactList[i].num}"
                          id="callBtn"
                          class="btn"
                          style="background-color: #ecfdf5; color: #009966"
                        >
                          <i class="fas fa-phone"></i>
                        </a>
                        ${
                          contactList[i].mail
                            ? `
                        <a
                        href="mailto:${contactList[i].mail}"
                          id="mailBtn"
                          class="btn"
                          style="background-color: #f5f3ff; color: #7f22fe"
                        >
                          <i class="fas fa-envelope"></i>
                        </a>
                          `
                            : ""
                        }
                      </div>
                      <div class="d-flex gap-2">
                        <button onclick="favBtn(${i})" id="favBtn" class="btn favBtn ${contactList[i].check1 ? `text-warning active-fav` : `text-secondary`} " style="${contactList[i].check1 ? `background-color: #FFFBEB;` : `background-color: transparent;`}">
                          <i class="fas fa-star"></i>
                        </button>
                        <button onclick="emergencyBtn(${i})" id="emergencyBtn" class="btn emergencyBtn ${contactList[i].check2 ? `text-danger active-emg` : `text-secondary`}" style="${contactList[i].check2 ? `background-color: #FFF1F2;` : `background-color: transparent;`}">
                          ${contactList[i].check2 ? `<i class="fas fa-heartbeat"></i>` : `<i class="fa-regular fa-heart"></i>`}
                        </button>
                        <button onclick="setcontact(${i})" id="editBtn" class="btn text-secondary">
                          <i class="fas fa-pen"></i>
                        </button>
                        <button onclick="deletecontact(${i})" id="deleteBtn" class="btn text-secondary">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            `;
    }
  }
  document.getElementById("rowData").innerHTML =
    box ||
    ` <div class="d-flex align-items-center justify-content-center flex-column" style="height: 350px;">
      <div class="p-4 mb-3 rounded-3 text-secondary " style="width: fit-content; background-color: #F3F4F6;">
        <i class="fa-solid fa-address-book fa-xl"></i>
      </div>
      <span class="fw-bold" style="color: gray;">No contact found</span>
      <p class="small text-secondary">Click "Add contact" to get started</p>
    </div>`;
}

function favBtn(i) {
  contactList[i].check1 = !contactList[i].check1;
  localStorage.setItem("contactContainer", JSON.stringify(contactList));
  displayContact();
  displaySidebar();
  updateCounts();
}

function emergencyBtn(i) {
  contactList[i].check2 = !contactList[i].check2;
  localStorage.setItem("contactContainer", JSON.stringify(contactList));
  displayContact();
  displaySidebar();
  updateCounts();
}

function displaySidebar() {
  var favBox = document.querySelector(".fav-contact");
  var emgBox = document.querySelector(".emg-contact");

  var favHTML = "";
  var emgHTML = "";

  for (let i = 0; i < contactList.length; i++) {
    bgColor = contactList[i].color;
    var firstChar = contactList[i].name.charAt(0).toUpperCase();
    var favItemHTML = `
        <div class="favItemHTML mb-2 p-3 rounded-3 d-flex align-items-center gap-3" style="background-color: #F9FAFB;">
                    <div class="rounded-3 text-white  d-flex align-items-center justify-content-center fw-bold" style="width: 35px; height: 35px; background-color: ${bgColor};">
                     ${firstChar}
                    </div>
                    <div>
                      <h6 class="m-0 small">${contactList[i].name}</h6>
                      <span class="small text-secondary">${contactList[i].num}</span>
                    </div>
                    <a href="tel:${contactList[i].num}" class="rounded-3 d-flex align-items-center justify-content-center position-absolute" style="right: 30px; width: 30px; height: 30px; background-color: #D0FAE5; color: #009966;">
                      <i class="fa-solid fa-phone"></i>
                    </a>
                  </div>
        `;

    var emgItemHTML = `
        <div class="emgItemHTML mb-2 p-3 rounded-3 d-flex align-items-center gap-3" style="background-color: #F9FAFB;">
                    <div class="rounded-3 text-white d-flex align-items-center justify-content-center fw-bold" style="width: 35px; height: 35px; background-color: ${bgColor};">
                      ${firstChar}
                    </div>
                    <div>
                      <h6 class="m-0 small">${contactList[i].name}</h6>
                      <span class="small text-secondary">${contactList[i].num}</span>
                    </div>
                    <a href="tel:${contactList[i].num}" class="rounded-3 d-flex align-items-center justify-content-center position-absolute" style="right: 30px; width: 30px; height: 30px; background-color: #FFE4E6; color: #FF2056;">
                      <i class="fa-solid fa-phone"></i>
                    </a>
                  </div>
        `;
    if (contactList[i].check1) {
      favHTML += favItemHTML;
    }
    if (contactList[i].check2) {
      emgHTML += emgItemHTML;
    }
  }
  favBox.innerHTML =
    favHTML ||
    `<p class="m-0 text-secondary small text-center p-5"> No favorites yet</p>`;
  emgBox.innerHTML =
    emgHTML ||
    `<p class="m-0 text-secondary small text-center p-5">No emergency contacts</p>`;
}

function updateCounts() {
  var total = contactList.length;
  var favCount = 0;
  var emgCount = 0;
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].check1) favCount++;
    if (contactList[i].check2) emgCount++;
  }

  document.getElementById("totalNum").innerHTML = total;
  document.getElementById("favNum").innerHTML = favCount;
  document.getElementById("emgNum").innerHTML = emgCount;
  document.getElementById("pragraph").innerHTML =
    `Manage and organize your ${total} contacts`;
}

function deletecontact(i) {
  Swal.fire({
    title: "Delete contact?",
    text: `Are you sure you want to delete ${contactList[i].name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    confirmButtonColor: "#ec003f",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      contactList.splice(i, 1);
      localStorage.setItem("contactContainer", JSON.stringify(contactList));
      displayContact();
      displaySidebar();
      updateCounts();
      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
}

var isEditing = false;
function setcontact(i) {
  isEditing = true;
  inputsSection.classList.remove("d-none");
  currentIndex = i;
  nameInput.value = contactList[i].name;
  numInput.value = contactList[i].num;
  mailInput.value = contactList[i].mail;
  addressInput.value = contactList[i].address;
  selectInput.value = contactList[i].select;
  notesInput.value = contactList[i].notes;
  checkInput1.checked = contactList[i].check1;
  checkInput2.checked = contactList[i].check2;
}

function updateContact() {
  if (mailInput.value.trim() && !validation(mailInput)) {
    Swal.fire({
      title: "Invalid Email",
      text: "Please enter a valid email address!",
      icon: "error",
      confirmButtonText: "ok",
    });
    return;
  }

  if (validation(nameInput) && validation(numInput)) {
    var contact = {
      name: nameInput.value.trim(),
      num: numInput.value.trim(),
      mail: mailInput.value.trim(),
      address: addressInput.value.trim(),
      select: selectInput.value.trim(),
      notes: notesInput.value.trim(),
      check1: checkInput1.checked,
      check2: checkInput2.checked,
      color: contactList[currentIndex].color,
    };
    contactList.splice(currentIndex, 1, contact);
    localStorage.setItem("contactContainer", JSON.stringify(contactList));
    clearForm();
    displayContact();
    displaySidebar();
    updateCounts();
    isEditing = false;
    inputsSection.classList.add("d-none");
    Swal.fire({
      title: "Updated!",
      text: "contact has been added successfully👍",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    if (!validation(nameInput)) {
      Swal.fire({
        title: "Missing Name",
        text: "Please enter a name for the contact!",
        icon: "error",
        confirmButtonText: "ok",
      });
    } else if (!validation(numInput)) {
      Swal.fire({
        title: "Missing Phone",
        text: "Please enter a phone number!",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  }
}

//validation
nameInput.addEventListener("input", function () {
  validation(this);
});
numInput.addEventListener("input", function () {
  validation(this);
});
mailInput.addEventListener("input", function () {
  validation(this);
});

function validation(element) {
  var text = element.value;
  var regex = {
    nameInput: /^[A-Z][a-zA-Z]{1,10}(\s[A-Z][a-zA-Z]{1,10})*$/,
    numInput: /^01[0125][0-9]{8}$/,
    mailInput: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$/,
  };

  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
