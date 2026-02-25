document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const contactInput = document.getElementById('contact-input');
    const statusMsg = document.getElementById('status-msg');

    if (!sendBtn || !contactInput) return;

    sendBtn.onclick = async () => {
        const message = contactInput.value.trim();
        if (!message) {
            statusMsg.innerText = 'STATUS: NULL_PAYLOAD';
            return;
        }

        sendBtn.disabled = true;
        sendBtn.innerText = '[ SENDING... ]';
        statusMsg.innerText = 'ESTABLISHING_CONNECTION...';

        try {
            const url = SYSTEM_CONFIG.endpoint; 
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: `**[USER]**: ${message}`,
                    username: "SOCIALKILLSEND"
                })
            });

            if (response.ok) {
                statusMsg.innerText = 'SUCCESS: PACKET_DELIVERED';
                sendBtn.innerText = '[ SENT ]';
                contactInput.value = '';
                
                setTimeout(() => {
                    sendBtn.disabled = false;
                    sendBtn.innerText = '[ SEND_PACKET ]';
                    statusMsg.innerText = '';
                }, 3000);
            } else {
                throw new Error();
            }
        } catch (e) {
            statusMsg.innerText = 'ERROR: CONNECTION_REFUSED';
            sendBtn.disabled = false;
            sendBtn.innerText = '[ RETRY ]';
        }
    };

    contactInput.onkeypress = (e) => { 
        if (e.key === 'Enter') sendBtn.click(); 
    };
});