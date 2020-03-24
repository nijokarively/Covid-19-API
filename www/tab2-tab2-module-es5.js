(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab2-tab2-module"], {
  /***/
  "./node_modules/ng2-search-filter/ng2-search-filter.js":
  /*!*************************************************************!*\
    !*** ./node_modules/ng2-search-filter/ng2-search-filter.js ***!
    \*************************************************************/

  /*! exports provided: Ng2SearchPipeModule, Ng2SearchPipe */

  /***/
  function node_modulesNg2SearchFilterNg2SearchFilterJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Ng2SearchPipeModule", function () {
      return Ng2SearchPipeModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Ng2SearchPipe", function () {
      return Ng2SearchPipe;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    class Ng2SearchPipe {
      /**
       * @param {?} items object from array
       * @param {?} term term's search
       * @return {?}
       */
      transform(items, term) {
        if (!term || !items) return items;
        return Ng2SearchPipe.filter(items, term);
      }
      /**
       *
       * @param {?} items List of items to filter
       * @param {?} term  a string term to compare with every property of the list
       *
       * @return {?}
       */


      static filter(items, term) {
        const
        /** @type {?} */
        toCompare = term.toLowerCase();
        /**
         * @param {?} item
         * @param {?} term
         * @return {?}
         */

        function checkInside(item, term) {
          for (let
          /** @type {?} */
          property in item) {
            if (item[property] === null || item[property] == undefined) {
              continue;
            }

            if (typeof item[property] === 'object') {
              if (checkInside(item[property], term)) {
                return true;
              }
            }

            if (item[property].toString().toLowerCase().includes(toCompare)) {
              return true;
            }
          }

          return false;
        }

        return items.filter(function (item) {
          return checkInside(item, term);
        });
      }

    }

    Ng2SearchPipe.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
      args: [{
        name: 'filter',
        pure: false
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }];
    /**
     * @nocollapse
     */

    Ng2SearchPipe.ctorParameters = () => [];

    class Ng2SearchPipeModule {}

    Ng2SearchPipeModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        declarations: [Ng2SearchPipe],
        exports: [Ng2SearchPipe]
      }]
    }];
    /**
     * @nocollapse
     */

    Ng2SearchPipeModule.ctorParameters = () => [];
    /**
     * Generated bundle index. Do not edit.
     */
    //# sourceMappingURL=ng2-search-filter.js.map

    /***/

  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/tab2/tab2.page.html":
  /*!***************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tab2/tab2.page.html ***!
    \***************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppTab2Tab2PageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header [translucent]=\"true\">\n  <ion-toolbar>\n    <ion-title>\n      COVID-19 by Country\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-toolbar>\n  <ion-searchbar [(ngModel)]=\"searchCountry\" autocomplete=\"off\"></ion-searchbar>\n</ion-toolbar>\n\n<ion-content [fullscreen]=\"true\">\n\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list *ngFor=\"let country of countries | filter:searchCountry\">\n    <ion-card lines=\"none\" class=\"ion-no-padding\">\n      <ion-card-header>\n        <ion-card-title>\n          {{country.country}}\n        </ion-card-title>\n      </ion-card-header>\n      <ion-card-content>\n        <p>\n          Cases: {{country.cases | number}} | Today: {{country.todayCases | number}} | Active:\n          {{country.active | number}}<br>\n          Deaths: {{country.deaths | number}} | Today: {{country.todayDeaths | number}}<br>\n          Recovered: {{country.recovered | number}} | Critical {{country.critical | number}}\n        </p>\n      </ion-card-content>\n      <!-- <ion-label>\n        <h1>{{country.country}}</h1>\n        <p>\n          Cases: {{country.cases | number}} | Today: {{country.todayCases | number}} | Active: {{country.active | number}}<br>\n          Deaths: {{country.deaths | number}} | Today: {{country.todayDeaths | number}}<br>\n          Recovered: {{country.recovered | number}} | Critical {{country.critical | number}}\n        </p>\n      </ion-label> -->\n    </ion-card>\n  </ion-list>\n</ion-content>";
    /***/
  },

  /***/
  "./src/app/tab2/tab2.module.ts":
  /*!*************************************!*\
    !*** ./src/app/tab2/tab2.module.ts ***!
    \*************************************/

  /*! exports provided: Tab2PageModule */

  /***/
  function srcAppTab2Tab2ModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Tab2PageModule", function () {
      return Tab2PageModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ng2_search_filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ng2-search-filter */
    "./node_modules/ng2-search-filter/ng2-search-filter.js");
    /* harmony import */


    var _tab2_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./tab2.page */
    "./src/app/tab2/tab2.page.ts");

    let Tab2PageModule = class Tab2PageModule {};
    Tab2PageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
      imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], ng2_search_filter__WEBPACK_IMPORTED_MODULE_6__["Ng2SearchPipeModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{
        path: '',
        component: _tab2_page__WEBPACK_IMPORTED_MODULE_7__["Tab2Page"]
      }])],
      declarations: [_tab2_page__WEBPACK_IMPORTED_MODULE_7__["Tab2Page"]]
    })], Tab2PageModule);
    /***/
  },

  /***/
  "./src/app/tab2/tab2.page.scss":
  /*!*************************************!*\
    !*** ./src/app/tab2/tab2.page.scss ***!
    \*************************************/

  /*! exports provided: default */

  /***/
  function srcAppTab2Tab2PageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "ion-content ion-toolbar {\n  --background: translucent;\n}\n\nion-card {\n  margin-bottom: 0px !important;\n}\n\n.card {\n  overflow: hidden;\n  margin: 20px 10px;\n  border-radius: 2px;\n  background-color: #fff;\n  padding-top: 1px;\n  padding-bottom: 1px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGFiMi9DOlxcVXNlcnNcXE5pam9cXFByb2plY3RzXFxDb3ZpZC0xOS1BUElcXGZyb250ZW5kL3NyY1xcYXBwXFx0YWIyXFx0YWIyLnBhZ2Uuc2NzcyIsInNyYy9hcHAvdGFiMi90YWIyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlCQUFBO0FDQ0Y7O0FERUE7RUFDRSw2QkFBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0Esd0NBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL3RhYjIvdGFiMi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tY29udGVudCBpb24tdG9vbGJhciB7XG4gIC0tYmFja2dyb3VuZDogdHJhbnNsdWNlbnQ7XG59XG5cbmlvbi1jYXJke1xuICBtYXJnaW4tYm90dG9tOiAwcHggIWltcG9ydGFudDtcbn1cblxuLmNhcmQge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXJnaW46IDIwcHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBwYWRkaW5nLXRvcDogMXB4O1xuICBwYWRkaW5nLWJvdHRvbTogMXB4O1xuICBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpOyB9XG4gIFxuIiwiaW9uLWNvbnRlbnQgaW9uLXRvb2xiYXIge1xuICAtLWJhY2tncm91bmQ6IHRyYW5zbHVjZW50O1xufVxuXG5pb24tY2FyZCB7XG4gIG1hcmdpbi1ib3R0b206IDBweCAhaW1wb3J0YW50O1xufVxuXG4uY2FyZCB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG1hcmdpbjogMjBweCAxMHB4O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIHBhZGRpbmctdG9wOiAxcHg7XG4gIHBhZGRpbmctYm90dG9tOiAxcHg7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/tab2/tab2.page.ts":
  /*!***********************************!*\
    !*** ./src/app/tab2/tab2.page.ts ***!
    \***********************************/

  /*! exports provided: Tab2Page */

  /***/
  function srcAppTab2Tab2PageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Tab2Page", function () {
      return Tab2Page;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _covid_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../covid.service */
    "./src/app/covid.service.ts");

    let Tab2Page = class Tab2Page {
      constructor(covidService, toastController) {
        this.covidService = covidService;
        this.toastController = toastController;
        this.countries = null;
      }

      refreshingToast() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
          console.log('Refreshing...');
          const toast = yield this.toastController.create({
            message: 'Refreshing...',
            duration: 2000
          });
          toast.present();
        });
      }

      createSubscription() {
        this.sub = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["interval"])(300000).subscribe(val => {
          this.refreshingToast();
          this.getData();
        });
      }

      deleteSubscription() {
        this.sub.unsubscribe();
      }

      getData() {
        this.covidService.getCountries().subscribe(data => {
          if (data) {
            this.countries = data;
          }
        });
      }

      ionViewWillEnter() {
        this.getData();
        this.createSubscription();
      }

      ionViewDidLeave() {
        this.deleteSubscription();
      }

      doRefresh(event) {
        this.refreshingToast();
        this.getData();
        setTimeout(() => {
          console.log('Async operation has ended');
          event.target.complete();
        }, 2000);
      }

    };

    Tab2Page.ctorParameters = () => [{
      type: _covid_service__WEBPACK_IMPORTED_MODULE_4__["CovidService"]
    }, {
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"]
    }];

    Tab2Page = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-tab2',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./tab2.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/tab2/tab2.page.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./tab2.page.scss */
      "./src/app/tab2/tab2.page.scss")).default]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_covid_service__WEBPACK_IMPORTED_MODULE_4__["CovidService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"]])], Tab2Page);
    /***/
  }
}]);
//# sourceMappingURL=tab2-tab2-module-es5.js.map