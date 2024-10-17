const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
const form = document.querySelector('#add-post-form');

async function showPosts() {
    const response = await fetch('http://localhost:5000/api/posts');
    if (!response.ok) {
        console.error('Failed to fetch posts...');
    }
    const posts = await response.json();
    output.innerHTML = '';
    posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.textContent = post.title;
        output.append(postElement);
    })
}

async function addPost(element) {
    element.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('title');
    const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({title}),
    });
    if (!response.ok) {
        console.error('Failed to add post...');
    }
    const newPost = await response.json();
    const postElement = document.createElement('div');
    postElement.textContent = newPost.title;
    output.appendChild(postElement);
    await showPosts();
}

// Event listeners
button.addEventListener('click', showPosts);
form.addEventListener('submit', addPost);
