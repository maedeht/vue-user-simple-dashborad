<template>
  <div class="profile-page">
    <RwvInvoiceList :user="user" :items-per-page="5"></RwvInvoiceList>
  </div>
</template>

<script>
import RwvInvoiceList from "@/components/InvoiceList";

export default {
  name: "RwvProfileInvoices",
  components: {
    RwvInvoiceList
  },
  computed: {
    user() {
      return this.$route.params.user;
    }
  }
};
</script>
