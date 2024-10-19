// Your JavaScript functions
document.getElementById('send-reminder-btn').addEventListener('click', function () {
    const email = document.getElementById('customer-email').value;
    const amount = document.getElementById('amount-owed').value;
    const dueDate = document.getElementById('due-date').value;
    const invoice = document.getElementById('invoice-number').value;

    if (email && amount && dueDate && invoice) {
        document.getElementById('success-message').textContent = 'Reminder sent successfully!';
    } else {
        alert('Please fill out all fields.');
    }
});

document.getElementById('preview-btn').addEventListener('click', function () {
    const email = document.getElementById('customer-email').value;
    const amount = document.getElementById('amount-owed').value;
    const dueDate = document.getElementById('due-date').value;
    const invoice = document.getElementById('invoice-number').value;
    const message = document.getElementById('message-template').value;

    const preview = `
To: ${email}
Subject: Payment Reminder - Invoice ${invoice}

Dear Customer,
${message ? message : `This is a reminder that the amount of $${amount} is due on ${dueDate} for Invoice #${invoice}. Please make the payment at your earliest convenience.`} Thank you!
    `;

    document.getElementById('email-preview').textContent = preview;
});

document.getElementById('schedule-reminder-btn').addEventListener('click', function () {
    const reminderDate = document.getElementById('schedule-date').value;
    if (reminderDate) {
        document.getElementById('success-message').textContent = `Next reminder set for ${reminderDate}`;
    } else {
        alert('Please choose a reminder date.');
    }
});
