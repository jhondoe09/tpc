/*! DataTables styling wrapper for Responsive
 * © SpryMedia Ltd - datatables.net/license
 */
!function(t){var o,d;"function"==typeof define&&define.amd?define(["jquery","datatables.net-dt","datatables.net-responsive"],function(e){return t(e,window,document)}):"object"==typeof exports?(o=require("jquery"),d=function(e,n){n.fn.dataTable||require("datatables.net-dt")(e,n),n.fn.dataTable.Responsive||require("datatables.net-responsive")(e,n)},"undefined"!=typeof window?module.exports=function(e,n){return e=e||window,n=n||o(e),d(e,n),t(n,0,e.document)}:(d(window,o),module.exports=t(o,window,window.document))):t(jQuery,window,document)}(function(e,n,t,o){"use strict";return e.fn.dataTable});