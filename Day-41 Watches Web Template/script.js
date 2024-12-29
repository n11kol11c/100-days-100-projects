let isNavOpen = false;

function toggleNav() {
    const header = document.querySelector('.header');
    const navBar = document.getElementById('navBar');

    if (isNavOpen) {
        // Close the nav bar (move it off-screen)
        navBar.style.right = '-250px';  // Slide the nav bar off the screen
        header.style.transform = 'translateX(0)'; // Return the header to its original position
        isNavOpen = false;
    } else {
        // Open the nav bar (slide it in from the right)
        navBar.style.right = '0'; // Make the nav bar appear on the right side
        header.style.transform = 'translateX(-250px)'; // Slide the header left to make space
        isNavOpen = true;
    }
}


let searchBarVisible = false;

function toggleSearchBar() {
    const searchBar = document.getElementById('searchBar');
    const searchLink = document.getElementById('searchLink');

    if (searchBarVisible) {
        // Slide the search bar off-screen
        searchBar.style.right = '-300px'; // Move right -300px 
        searchLink.textContent = 'Search';  // Change back the text
        searchBarVisible = false; // Search bar is set to be invisible
    } else {
        // Slide the search bar in from the right
        searchBar.style.right = '0';
        searchLink.textContent = 'Close';  // Change text to "Close"
        searchBarVisible = true;
    }
}

document.getElementById('searchLink').addEventListener('click', toggleSearchBar);

// Function for the search button (just for display)
function search() {
    const searchQuery = document.getElementById('searchInput').value;
    alert('Searching for: ' + searchQuery);
}