<!doctype html>
<html>
  <body>
    <p>Hi {{ data_get($tx, 'metadata.custom_fields.0.value', '') }},</p>
    <p>Thank you for your payment. Here are the details:</p>
    <ul>
      <li><strong>Reference:</strong> {{ $tx['reference'] }}</li>
      <li><strong>Amount:</strong> ₦{{ $amount }}</li>
      <li><strong>Status:</strong> {{ $tx['status'] }}</li>
    </ul>
    <p>If you have any questions, reply to this email.</p>
    <p>Regards,<br/>GasPoint</p>
  </body>
</html>
