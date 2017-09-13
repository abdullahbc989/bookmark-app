// Variables
myForm = document.querySelector('#myForm');

// Event Listeners
myForm.addEventListener('submit', saveBookmark);

// Functions
function saveBookmark(e) {
    e.preventDefault();

    var siteName = document.querySelector('#siteName').value;
    var siteUrl = document.querySelector('#siteUrl').value;

    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    };

    /*
    Local Storage Test - Only stores strings
    How to parse JSON to string then back to JSON when we need it
    localStorage.setItem('test': 'Hello World');
    localStorage.getItem('test');
    localStorage.removeItem('test');
    */

    // Test if bookmarks exists
    if(localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        // Set to Local Storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from Local Storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add new bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to Local Storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form
    myForm.reset();

    // Re-fetch bookmarks
    fetchBookmarks();
}

function deleteBookmark(url) {
    // Get bookmarks from Local Storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url === url) {
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to Local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

function fetchBookmarks() {
    // Get bookmarks from Local Storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.querySelector('#bookmarksResults');

    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                         '<h3>'+name+
                                         ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
                                         ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '
                                         '</h3>'+
                                      '</div>';
    }
}

function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('lol');
        return false;
    }

    return true;
}