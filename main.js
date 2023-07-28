async function shortenLink() {
  const originalLink = document.getElementById('originalLink').value;
  const apiKey = '76fc78e683db41883419ec6794e04efc2ef809ab'; // Replace with your Bitly API key
  const apiUrl = `https://api-ssl.bitly.com/v4/shorten`;
  const accessToken = `Bearer ${apiKey}`;

  const requestData = {
    long_url: originalLink
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Bitly API');
    }

    const data = await response.json();
    const shortenedLink = data.link;

    const resultBox = document.getElementById('result');
    const resultTextElement = document.getElementById('resultText');
    const shortenedLinkElement = document.getElementById('shortenedLink');

    // Remove any existing copy button
    const existingCopyButton = document.getElementById('copyButton');
    if (existingCopyButton) {
      resultBox.removeChild(existingCopyButton);
    }

    if (shortenedLink) {
      resultTextElement.innerText = '';
      shortenedLinkElement.innerText = shortenedLink;
    } else {
      resultTextElement.innerText = 'The shortened link will appear here';
      shortenedLinkElement.innerText = '';
    }

    const copyButton = document.createElement('button');
    copyButton.innerText = 'Copy';
    copyButton.id = 'copyButton'; // Add an id to the copy button for easy reference
    copyButton.onclick = function() {
      copyLink(shortenedLink);
    };

    resultBox.appendChild(copyButton);
    resultBox.style.display = 'block';
  } catch (error) {
    console.error('Error:', error);
    showAlert('An error occurred while shortening the link. Please try again later.');
  }
}

function copyLink(link) {
  const tempInput = document.createElement('input');
  tempInput.value = link;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  showPopupMessage('Shortened link copied to clipboard!');
}

function showPopupMessage(message) {
  const popupMessageElement = document.getElementById('popupMessage');
  popupMessageElement.innerText = message;
  popupMessageElement.style.display = 'block';

  setTimeout(() => {
    popupMessageElement.style.display = 'none';
  }, 2000); // Hide the pop-up message after 2 seconds (2000 milliseconds)
}

function showAlert(message) {
  alert(message);
}