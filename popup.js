document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('todo-container');
  
    // Fetch mentions from chrome storage
    chrome.storage.local.get({ mentions: [] }, (result) => {
      if (result.mentions.length === 0) {
        container.innerHTML = '<p>No To-Do items yet!</p>';
      } else {
        result.mentions.forEach((item) => {
          const div = document.createElement('div');
          div.classList.add('todo-item');
          div.innerHTML = `
            <p>${item.date}: ${item.content}</p>
            <a href="${item.thread_link}" target="_blank">View Thread</a>
          `;
          container.appendChild(div);
        });
      }
    });
  });