// Function to detect @mentions and save them to chrome storage
function saveMentions() {
    const messages = document.querySelectorAll('.c-message__body'); // message selector
    const mentions = [];
  
    messages.forEach((msg) => {
      if (msg.textContent.includes('@username')) { // 'username' to Slack ID
        const threadLink = msg.closest('.c-message')?.querySelector('a.c-message__reply_button')?.href;
        mentions.push({
          content: msg.textContent,
          thread_link: threadLink || 'N/A',
          date: new Date().toISOString()
        });
      }
    });
  
    // Save mentions to chrome storage
    chrome.storage.local.get({ mentions: [] }, (result) => {
      const updatedMentions = [...result.mentions, ...mentions];
      chrome.storage.local.set({ mentions: updatedMentions });
    });
  }
  
  // Observe DOM changes to catch new messages
  const observer = new MutationObserver(saveMentions);
  observer.observe(document.body, { childList: true, subtree: true });