// Select elements
const generateButton = document.getElementById('generate');
const domainInput = document.getElementById('domain');
const authorInput = document.getElementById('author');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const colorInput = document.getElementById('color');
const imageInput = document.getElementById('image');
const redirectInput = document.getElementById('redirect');
const finalURLText = document.getElementById('finalURLText');
const finalURL = document.getElementById('finalURL');

// Add event listener to generate button
generateButton.addEventListener('click', () => {
  // Get input values
  const domain = domainInput.value;
  const author = authorInput.value.replace('\n', '\\n');
  const title = titleInput.value.replace('\n', '\\n');
  const description = descriptionInput.value.replace('\n', '\\n');
  const color = colorInput.value;
  const image = imageInput.value;
  const redirect = redirectInput.value;

  // Create URLSearchParams object
  const params = new URLSearchParams();
  if (author) params.set('author', encodeURIComponent(author));
  if (title) params.set('title', encodeURIComponent(title));
  if (description) params.set('description', encodeURIComponent(description));
  if (color !== '#000000') params.set('color', color.slice(1));
  if (image) params.set('image', encodeURIComponent(image));
  if (redirect) params.set('redirect', encodeURIComponent(redirect));

  // Update final URL text
  finalURLText.innerText = `${domain}?${params.toString()}`;
  finalURL.hidden = false;
});

// Add event listener to delete notification buttons
document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.notification .delete');
  deleteButtons.forEach(($delete) => {
    $delete.addEventListener('click', () => {
      const $notification = $delete.parentNode;
      $notification.parentNode.removeChild($notification);
    });
  });
});
