let invoices = [];

// Function to reset alerts
function resetAlert(element) {
  element.textContent = '';
  element.className = 'alert';
}

// Generate Invoice Button Click Event
document.getElementById('generate-invoice-btn').addEventListener('click', function () {
  const orgName = document.getElementById('organization-name').value;
  const orgEmail = document.getElementById('organization-email').value;
  const totalOrders = document.getElementById('total-orders').value;
  const invoiceDate = document.getElementById('invoice-date').value;
  const alertMessage = document.getElementById('generate-alert');
  
  resetAlert(alertMessage);

  if (orgName && orgEmail && totalOrders && invoiceDate) {
    const invoice = {
      organization: orgName,
      email: orgEmail,
      totalOrders: totalOrders,
      invoiceDate: invoiceDate,
      status: 'unpaid' 
    };

    invoices.push(invoice);
    updateInvoiceTable();
    alertMessage.textContent = 'Invoice generated successfully!';
    alertMessage.classList.add('alert-success');

    // Clear form inputs after successful generation
    document.getElementById('organization-name').value = '';
    document.getElementById('organization-email').value = '';
    document.getElementById('total-orders').value = '';
    document.getElementById('invoice-date').value = '';
  } else {
    alertMessage.textContent = 'Please fill out all fields.';
    alertMessage.classList.add('alert-error');
  }
});

// Function to update the invoice list table
function updateInvoiceTable() {
  const invoiceList = document.getElementById('invoice-list');
  invoiceList.innerHTML = ''; // Clear previous data

  invoices.forEach((invoice) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${invoice.organization}</td>
      <td>${invoice.invoiceDate}</td>
      <td>${invoice.totalOrders}</td>
      <td><span class="${invoice.status === 'paid' ? 'paid' : 'unpaid'}">${invoice.status}</span></td>
    `;
    invoiceList.appendChild(row);
  });
}

// Send Invoices Button Click Event
document.getElementById('send-invoices-btn').addEventListener('click', function () {
  const successMessage = document.getElementById('success-message');
  resetAlert(successMessage);

  if (invoices.length > 0) {
    invoices.forEach(invoice => {
      sendInvoiceToServer(invoice);
    });
    successMessage.textContent = 'Invoices sent successfully!';
    successMessage.classList.add('alert-success');
  } else {
    successMessage.textContent = 'No invoices to send.';
    successMessage.classList.add('alert-error');
  }
});


// Function to simulate sending invoice data to the server
function sendInvoiceToServer(invoice) {
fetch('/send-invoice', {
method: 'POST',
headers: {
  'Content-Type': 'application/json'
},
body: JSON.stringify(invoice)
})
.then(response => response.json())
.then(data => {
if (data.success) {
  console.log(`Invoice for ${invoice.organization} sent successfully!`);
  invoice.status = 'paid'; // Mark invoice as paid after sending
  updateInvoiceTable();
} else {
  console.error('Failed to send invoice:', data.error);
}
})
.catch(error => console.error('Error:', error));
}