let logoutLink = document.getElementById('logout-link');
if (logoutLink) {
  logoutLink.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '/api/v1/expenseTracker/logout';
  });
}

function openModal() {
  let modal = document.getElementById('myModal');
  if (modal) {
    modal.style.display = 'block';
  } else {
    console.error('Modal element not found');
  }
}

function closeModal() {
  let modal = document.getElementById('myModal');
  if (modal) {
    modal.style.display = 'none';
  } else {
    console.error('Modal element not found');
  }
}

document.addEventListener('click', function (event) {
  let modal = document.getElementById('myModal');
  if (modal && event.target == modal) {
    closeModal();
  }
});
