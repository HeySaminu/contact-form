
  // Grab the form and the two inputs
  const form  = document.querySelector(".form-wrapper form");
  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const consent = document.getElementById("consent");

  // Optional: silence native bubbles so we control the UX
  form.setAttribute("novalidate", "");

  // Utilities to show/clear errors in your current structure
  function groupOf(input) {
    return input.closest(".form-group") || input.parentElement;
  }

  function showError(input, message) {
    const group = groupOf(input);
    const msgEl = group.querySelector(".error-msg");
    input.classList.add("is-error");
    input.setAttribute("aria-invalid", "true");
    if (msgEl) {
      msgEl.textContent = message;
      msgEl.setAttribute("aria-live", "polite");
      msgEl.setAttribute("role", "alert");
    }
  }

  function clearError(input) {
    const group = groupOf(input);
    const msgEl = group.querySelector(".error-msg");
    input.classList.remove("is-error");
    input.removeAttribute("aria-invalid");
    if (msgEl) msgEl.textContent = "";
  }

  // Validation for first/last name
  function validateName(input) {
    const value = input.value.trim();

    if (!value) {
      showError(input, "This field is required");
      return false;
    }

    // Allow letters, spaces, apostrophes, and hyphens; min length 2
    const basicPattern = /^[a-zA-Z' -]{2,}$/;

    if (!basicPattern.test(value)) {
      showError(input, "Enter at least 2 letters (letters, spaces, ' or - only)");
      return false;
    }

    clearError(input);
    return true;
  }

  // Validation for Email address
 function validateEmail(input) {
  const value = input.value.trim();
  if (!value) {
    showError(input, "This field is required");
    return false;
  }
  const pattern = /^[A-Za-z0-9](\.?[A-Za-z0-9_%+-])*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
  if (!pattern.test(value)) {
    showError(input, "Please enter a valid email address");
    return false;
  }
  clearError(input);
  return true;
}

// --- Query Type (radio group) ---
const queryRadios   = document.querySelectorAll('input[type="radio"][name="query"]');
const queryFieldset = queryRadios[0].closest('fieldset');

function showGroupError(container, message, name) {
  const msgEl = container.querySelector('.error-msg');
  container.classList.add('is-error');
  container.setAttribute('aria-invalid', 'true');
  if (msgEl) {
    const id = `${name}-error`;
    msgEl.id = id;
    msgEl.textContent = message;
    container.setAttribute('aria-describedby', id);
    msgEl.setAttribute('aria-live', 'polite');
  }
}

function clearGroupError(container) {
  const msgEl = container.querySelector('.error-msg');
  container.classList.remove('is-error');
  container.removeAttribute('aria-invalid');
  if (msgEl) {
    msgEl.textContent = '';
    container.removeAttribute('aria-describedby');
  }
}

function validateQuery() {
  const anyChecked = Array.from(queryRadios).some(r => r.checked);
  if (!anyChecked) {
    showGroupError(queryFieldset, 'Please select a query type', 'query');
    return false;
  }
  clearGroupError(queryFieldset);
  return true;
}

// --- Message (textarea) ---
function validateMessage(input) {
  // collapse excess whitespace, then trim
  const value = input.value.replace(/\s+/g, " ").trim();

  if (!value) {
    showError(input, "This field is required");
    return false;
  }
  if (value.length < 10) {
    showError(input, "Message should be at least 10 characters");
    return false;
  }
  if (value.length > 1000) {
    showError(input, "Message is too long (max 1000 characters)");
    return false;
  }
  clearError(input);
  return true;
}

// --- Consent (checkbox) ---
function validateConsent(input) {
  if (!input.checked) {
    showError(input, "To submit this form, please consent to being contacted");
    return false;
  }
  clearError(input);
  return true;
}



  // Real-time feedback
  [fname, lname].forEach((input) => {
    input.addEventListener("blur",  () => validateName(input));
    input.addEventListener("input", () => validateName(input));
  });

  // Real-time feedback for email
  const touched = new WeakSet();

[email].forEach((input) => {
  input.addEventListener("blur", () => {
    touched.add(input);
    validateEmail(input);
  });
  input.addEventListener("input", () => {
    if (touched.has(input)) validateEmail(input);
  });
});

// real-time: validate whenever selection changes
queryRadios.forEach(radio => {
  radio.addEventListener('change', validateQuery);
});

// Message: validate as user types and on blur
message.addEventListener("blur",  () => validateMessage(message));
message.addEventListener("input", () => validateMessage(message));

// Consent: validate on change (tick/untick)
consent.addEventListener("change", () => validateConsent(consent));

 form.addEventListener("submit", (e) => {
  const okFirst   = validateName(fname);
  const okLast    = validateName(lname);
  const okEmail   = validateEmail(email);
  const okQuery   = validateQuery();     // from previous step
  const okMessage = validateMessage(message);
  const okConsent = validateConsent(consent);

  if (!okFirst || !okLast || !okEmail || !okQuery || !okMessage || !okConsent) {
    e.preventDefault();

    // Optional: focus the first invalid thing, in a sensible order
    if      (!okFirst)   fname.focus();
    else if (!okLast)    lname.focus();
    else if (!okEmail)   email.focus();
    else if (!okQuery)   document.querySelector('input[name="query"]').focus();
    else if (!okMessage) message.focus();
    else if (!okConsent) consent.focus();
  }
});