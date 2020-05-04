<template>
  <div>
    <div v-if="invoices.length === 0" class="invoice-preview">
      No invoices are here... yet.
    </div>
    <div v-else>
      <table class="table">
        <tr>
          <th scope="col">Invoice Number</th>
          <th scope="col">Comment</th>
          <th scope="col">Credit</th>
          <th scope="col">Debit</th>
        </tr>
        <RwvInvoicePreview
          v-for="(invoice, index) in invoices"
          :invoice="invoice"
          :key="invoice.invoice_no + index"
        />
      </table>

      <VPagination :pages="pages" :currentPage.sync="currentPage" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvInvoicePreview from "./VInvoicePreview";
import VPagination from "./VPagination";
import { FETCH_INVOICES } from "../store/actions.type";

export default {
  name: "RwvInvoiceList",
  components: {
    RwvInvoicePreview,
    VPagination
  },
  props: {
    invoice_no: {
      type: String,
      required: false,
      default: "all"
    },
    comment: {
      type: String,
      required: false,
      default: "all"
    },
    user: {
      type: String,
      required: false
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    pages() {
      if (this.isLoading || this.invoicesCount <= this.itemsPerPage) {
        return [];
      }
      return [
        ...Array(Math.ceil(this.invoicesCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["invoicesCount", "isLoading", "invoices"])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchInvoices();
    },
    type() {
      this.resetPagination();
      this.fetchInvoices();
    },
    user() {
      this.resetPagination();
      this.fetchInvoices();
    },
    transaction() {
      this.resetPagination();
      this.fetchInvoices();
    },
    favorited() {
      this.resetPagination();
      this.fetchInvoices();
    }
  },
  mounted() {
    this.fetchInvoices();
  },
  methods: {
    fetchInvoices() {
      this.$store.dispatch(FETCH_INVOICES, this.listConfig);
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
