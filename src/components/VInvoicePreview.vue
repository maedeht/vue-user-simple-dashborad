<template>
  <tr>
    <td scope="row">{{ invoice.invoice_no }}</td>
    <td scope="row">{{ invoice.comment }}</td>
    <td scope="row">{{ invoice.transaction.credit }}</td>
    <td scope="row">{{ invoice.transaction.debit }}</td>
  </tr>
</template>

<script>
export default {
  name: "RwvInvoicePreview",
  props: {
    invoice: { type: Object, required: true }
  }
};
</script>
