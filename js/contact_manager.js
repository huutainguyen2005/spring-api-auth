document.addEventListener("DOMContentLoaded", () => {
  // Khai báo DOM và Data
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const telInput = document.getElementById("tel");
  const addressInput = document.getElementById("address");
  const dobInput = document.getElementById("dob");
  const submitBtn = document.getElementById("submitBtn");
  const tableBody = document.getElementById("contactTableBody");

  let contacts = [];
  let nextId = 1;
  let currentEditId = null;

  // Hàm tạo thẻ hiển thị lỗi
  const createErrorElement = (inputElement, errorMessage, idForDebug) => {
    if (!inputElement) {
      console.error(
        `[LỖI HTML]: Không tìm thấy thẻ input có id="${idForDebug}". Hãy kiểm tra lại file HTML.`,
      );
      return;
    }
    const errorDiv = document.createElement("div");
    errorDiv.className = "invalid-feedback";
    errorDiv.textContent = errorMessage;
    if (inputElement.parentNode) {
      inputElement.parentNode.appendChild(errorDiv);
    }
  };

  // Gọi hàm tạo lỗi kèm ID để dễ kiểm tra debug
  createErrorElement(
    nameInput,
    "The full name must contain at least two words.",
    "name",
  );
  createErrorElement(
    telInput,
    "Please enter a valid Vietnamese phone number (e.g., 0912345678).",
    "tel",
  );
  createErrorElement(
    addressInput,
    "The address must be in the correct format (e.g., 600 Nguyen Van Cu extended, Can Tho city)",
    "address",
  );
  createErrorElement(
    dobInput,
    "Date of birth must be between January 1, 1900 and the present day.",
    "dob",
  );

  // Các hàm validate dữ liệu
  const validateName = () => {
    if (!nameInput) return false;
    const val = nameInput.value.trim();
    return val.split(/\s+/).length >= 2 && val !== "";
  };

  const validatePhone = () => {
    if (!telInput) return false;
    return /^0(3[2-9]|5[68]|7[06789]|8[1-9]|9\d)\d{7}$/.test(
      telInput.value.trim(),
    );
  };

  const validateAddress = () => {
    if (!addressInput) return false;
    const addressRegex = /^\d+[a-zA-Z0-9\/\-]*\s+[^,]+,\s*.+\s+city$/i;

    return addressRegex.test(addressInput.value.trim());
  };
  const validateDob = () => {
    if (!dobInput || !dobInput.value) return false;

    const [year, month, day] = dobInput.value.split("-").map(Number);
    const dobDate = new Date(year, month - 1, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const minDate = new Date(1900, 0, 1);

    return dobDate >= minDate && dobDate <= today;
  };

  // Hàm xử lý bật/tắt class báo lỗi màu đỏ (is-invalid)
  const handleFieldError = (inputElement, validationFn, isBlur = false) => {
    if (!inputElement) return;
    if (validationFn()) {
      inputElement.classList.remove("is-invalid");
      inputElement.classList.add("is-valid");
    } else {
      if (isBlur) {
        inputElement.classList.add("is-invalid");
        inputElement.classList.remove("is-valid");
      } else {
        inputElement.classList.remove("is-valid");
        if (inputElement.value.trim() === "") {
          inputElement.classList.remove("is-invalid");
        }
      }
    }
  };

  // Hàm kiểm tra tổng thể để làm mờ/khôi phục nút Add
  const checkFormValidity = () => {
    const isFormValid =
      validateName() && validatePhone() && validateAddress() && validateDob();
    if (submitBtn) {
      submitBtn.disabled = !isFormValid;
    }
  };

  // Gắn sự kiện lắng nghe (Input & Blur) cho các trường
  const setupValidationListeners = (inputElement, validationFn) => {
    if (!inputElement) return;
    inputElement.addEventListener("input", () => {
      handleFieldError(inputElement, validationFn, false);
      checkFormValidity();
    });
    inputElement.addEventListener("blur", () => {
      handleFieldError(inputElement, validationFn, true);
      checkFormValidity();
    });
  };

  setupValidationListeners(nameInput, validateName);
  setupValidationListeners(telInput, validatePhone);
  setupValidationListeners(addressInput, validateAddress);
  setupValidationListeners(dobInput, validateDob);

  // Khóa nút Add ngay khi vừa load trang
  checkFormValidity();

  // Hàm render Table
  const renderTable = () => {
    if (!tableBody) return;
    tableBody.innerHTML = "";
    if (contacts.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center">No contacts yet.</td></tr>`;
      return;
    }

    contacts.forEach((contact, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${contact.name}</td>
                <td>${contact.tel}</td>
                <td>${contact.address}</td>
                <td>${contact.dob}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editContact(${contact.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteContact(${contact.id})">Delete</button>
                </td>
            `;
      tableBody.appendChild(tr);
    });
  };

  // Sự kiện Submit Form thành công
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (
        !validateName() ||
        !validatePhone() ||
        !validateAddress() ||
        !validateDob()
      )
        return;

      const contactData = {
        name: nameInput.value.trim(),
        tel: telInput.value.trim(),
        address: addressInput.value.trim(),
        dob: dobInput.value,
      };

      if (currentEditId) {
        const idx = contacts.findIndex((c) => c.id === currentEditId);
        if (idx !== -1) contacts[idx] = { ...contactData, id: currentEditId };
        if (submitBtn) submitBtn.textContent = "Add";
        currentEditId = null;
      } else {
        contactData.id = nextId++;
        contacts.push(contactData);
      }

      form.reset();
      [nameInput, telInput, addressInput, dobInput].forEach((input) => {
        if (input) input.classList.remove("is-valid", "is-invalid");
      });

      checkFormValidity();
      renderTable();
    });
  }

  // Các hàm Sửa / Xóa (Global Window Methods)
  window.editContact = (id) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      if (nameInput) nameInput.value = contact.name;
      if (telInput) telInput.value = contact.tel;
      if (addressInput) addressInput.value = contact.address;
      if (dobInput) dobInput.value = contact.dob;

      if (submitBtn) submitBtn.textContent = "Save";
      currentEditId = id;

      [nameInput, telInput, addressInput, dobInput].forEach((input) => {
        if (input) {
          input.classList.remove("is-invalid");
          input.classList.add("is-valid");
        }
      });
      checkFormValidity();
    }
  };

  let contactIdToDelete = null;
  const deleteModalEl = document.getElementById("deleteModal");
  const deleteContactNameSpan = document.getElementById("deleteContactName");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", () => {
      if (contactIdToDelete !== null) {
        contacts = contacts.filter((c) => c.id !== contactIdToDelete);
        renderTable();

        const modalInstance = bootstrap.Modal.getInstance(deleteModalEl);
        if (modalInstance) modalInstance.hide();

        contactIdToDelete = null;
      }
    });
  }

  window.deleteContact = (id) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      contactIdToDelete = id;

      if (deleteContactNameSpan) {
        deleteContactNameSpan.textContent = contact.name;
      }

      if (deleteModalEl) {
        const modalInstance =
          bootstrap.Modal.getOrCreateInstance(deleteModalEl);
        modalInstance.show();
      }
    }
  };
});
