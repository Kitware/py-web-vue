import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { AgGridVue } from '@ag-grid-community/vue';

window.AgGridCommunityModules = AllCommunityModules;

export default {
  AgGrid: AgGridVue,
};
