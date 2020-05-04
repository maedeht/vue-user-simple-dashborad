import { InvoiceService } from "@/common/api.service";
import { FETCH_INVOICES } from "./actions.type";
import { SET_INVOICE } from "./mutations.type";

export const state = {
  invoices: [],
  isLoading: true,
  invoicesCount: 0
};

const getters = {
  invoicesCount(state) {
    return state.invoicesCount;
  },
  invoices(state) {
    return state.invoices;
  },
  isLoading(state) {
    return state.isLoading;
  }
};

export const actions = {
  async [FETCH_INVOICES](context) {
    const { data } = await InvoiceService.get();
    context.commit(SET_INVOICE, data.invoices);
    return data;
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_INVOICE](state, invoices) {
    state.invoices = invoices;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
