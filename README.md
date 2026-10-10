File Organization

index.html: Defines the page structure and loads the CSS and JavaScript files.

style.css: Styles the dashboard and visually distinguishes completed tasks.

taskManager.js: Defines the Task and TaskManager classes and handles immutable task updates.

api.js: Simulates a server request using a Promise and setTimeout.

main.js: Handles asynchronous loading, JSON conversion, rendering, event listeners, and error handling.


Challenges Faced

One challenge was coordinating asynchronous task loading with DOM rendering. This was handled using async/await.

Another challenge was updating tasks without modifying the original array directly. The spread operator, map(), and filter() were used to create new arrays.

Handling DOM events and converting raw JSON objects into instances of the Task class were also important parts of the implementation.