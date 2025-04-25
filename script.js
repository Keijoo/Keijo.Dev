function handleSubmit(event) {
  event.preventDefault(); // Prevent default form submission (no page reload)
  const form = document.getElementById("contact-form");
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    headers: {
      "Accept": "application/json"
    },
    body: formData,
  })
  .then(response => {
    if (response.ok) {
      alert(`Thanks, ${email}! Your message has been sent.`);
      form.reset(); // Reset form after success
    }
    // Remove this else block to avoid error alert
    // else {
    //   alert("There was an issue with the form submission. Please try again.");
    // }
  })
  .catch(error => {
    console.error('Error:', error);
    // Optional: comment this out too if you don't want *any* error message
    // alert('There was an error submitting your message. Please try again.');
  });
}
