const API_URL = 'http://localhost:3001/bookmarks';

// Fetch bookmarks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchBookmarks();
});

// Fetch bookmarks from the backend
function fetchBookmarks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(todos => todos.forEach(todo => addBookmarkToDOM(todo)))
        .catch(error => console.error("Error in fetching todos", error));
}

// Add a bookmark to the DOM
function addBookmarkToDOM(bookmark) {
    const bookmarkList = document.getElementById("bookmark-list");

    const bookmarkItem = document.createElement('li');
    bookmarkItem.classList.add('bookmark-item');
    bookmarkItem.setAttribute('data-id', bookmark.id);

    const url = document.createElement('h4');
    url.textContent = `${bookmark.url} (${bookmark.category})`;
    url.style.color = "white";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener("click", () => deleteBookmark(bookmark.id));

    bookmarkItem.appendChild(url);
    bookmarkItem.appendChild(deleteButton);

    bookmarkList.appendChild(bookmarkItem);
}

// Add a new bookmark
document.getElementById('add-bookmark-btn').addEventListener('click', () => {
    const bookmarkUrl = document.getElementById("bookmark-url");
    const bookmarkCategory = document.getElementById("bookmark-category");

    if (!bookmarkUrl || bookmarkCategory) {
        console.error("Input not found");
        return;
    }

    const newBookmark = {
        url: bookmarkUrl.value,
        category: bookmarkCategory.value,
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newBookmark),
    }).then(response => response.json()).then(todo => {
        addBookmarkToDOM(todo);
        bookmarkUrl.value = "";
        bookmarkCategory.value = "";
    }).catch(error => console.error("Error in adding the bookmark", error));
});

// Delete a bookmark
function deleteBookmark(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    }).then(() => {
        const todoItem = document.querySelector(`[data-id='${id}']`);
        todoItem.remove();
    }).catch(error => console.error("Error deleting todo", error));
}