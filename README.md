# Frontend Mentor - Contact form solution

This is my solution to the **Contact form** challenge on [Frontend Mentor](https://www.frontendmentor.io/). I built the form UI and implemented accessible client-side validation using **vanilla JavaScript**.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [How to run](#how-to-run)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete the form and (on success) proceed to the next action (client-side only in this solution)
- Receive validation messages if:
  - A required field has been missed
  - The email address is not formatted correctly
- Complete the form using only the keyboard
- Have inputs and error messages announced to screen readers
- View responsive layout at different screen sizes
- See hover and focus states for interactive elements

## My process

### Built with

- Semantic **HTML5**
- **CSS** for layout and focus/error states
- **Vanilla JavaScript** (no libraries)
- Accessibility attributes: `aria-invalid`, `aria-describedby`, `aria-live`, and `fieldset/legend`

### What I learned

- **Custom validation (no native bubbles):** The form uses `novalidate` so I can show consistent inline messages via a small helper pair: `showError(input, message)` and `clearError(input)`.
- **Consistent rules per field:**
  - **First/Last Name:** required, at least 2 characters; allows letters, space, `'`, and `-`.
  - **Email:** required with a practical regex (`name@domain.tld` style).
  - **Query Type (radio):** validates the group as a whole; one message inside the `<fieldset>`.
  - **Message:** trims whitespace; required; 10–1000 characters.
  - **Consent (checkbox):** must be checked before submit.
- **UX & a11y niceties:** Inline validation on `blur`/`input`, re-check on `submit`, focus moves to the **first invalid** control, and messages are announced with `aria-live="polite"`.

