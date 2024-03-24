
  let profileLink = document.getElementById('profile-link');
  if (profileLink) {
    profileLink.addEventListener('click', function (event) {
      event.preventDefault();
      window.location.href = '/api/v1/expenseTracker/profile';
    });

  }
  let logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', function (event) {
      event.preventDefault();
      window.location.href = '/api/v1/expenseTracker/logout';
    });
  }


function openModal() {
  document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
}

document.onclick = function (event) {
  event.preventDefault();
  let modal = document.getElementById('myModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
