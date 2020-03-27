(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["regions-regions-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/regions/regions.page.html":
  /*!*********************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/regions/regions.page.html ***!
    \*********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppRegionsRegionsPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header [translucent]=\"true\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button [text]=\"'Countries'\" [icon]=\"buttonIcon\">\n      </ion-back-button>\n    </ion-buttons>\n    <ion-title>\n      COVID-19 by Region\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-toolbar>\n  <ion-searchbar [(ngModel)]=\"searchRegion\" autocomplete=\"off\"></ion-searchbar>\n</ion-toolbar>\n\n<ion-content [fullscreen]=\"true\">\n\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list *ngFor=\"let region of regions | filter:searchRegion\">\n    <ion-card lines=\"none\" class=\"ion-no-padding\">\n      <ion-card-header>\n        <ion-card-title>\n          {{region.region}}\n        </ion-card-title>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-avatar *ngIf=\"region.flag\" style=\"float: left; margin-right:0.5em;\" slot=\"start\">\n          <ion-icon style=\"zoom:3.0;\" [attr.name]=\"region.flag\"></ion-icon>\n        </ion-avatar>\n        <ion-label>\n        <p style=\"overflow: hidden;\">\n          Cases: {{region.cases | number}}</p>\n        <p style=\"overflow: hidden;\" *ngIf=\"region.deaths\">\n          Deaths: {{region.deaths | number}}\n        </p>\n      </ion-label>\n      </ion-card-content>\n    </ion-card>\n  </ion-list>\n</ion-content>";
    /***/
  },

  /***/
  "./src/app/regions/regions.module.ts":
  /*!*******************************************!*\
    !*** ./src/app/regions/regions.module.ts ***!
    \*******************************************/

  /*! exports provided: RegionsPageModule */

  /***/
  function srcAppRegionsRegionsModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RegionsPageModule", function () {
      return RegionsPageModule;
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


    var _regions_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./regions.page */
    "./src/app/regions/regions.page.ts");

    let RegionsPageModule = class RegionsPageModule {};
    RegionsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
      imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], ng2_search_filter__WEBPACK_IMPORTED_MODULE_6__["Ng2SearchPipeModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{
        path: '',
        component: _regions_page__WEBPACK_IMPORTED_MODULE_7__["RegionsPage"]
      }])],
      declarations: [_regions_page__WEBPACK_IMPORTED_MODULE_7__["RegionsPage"]]
    })], RegionsPageModule);
    /***/
  },

  /***/
  "./src/app/regions/regions.page.scss":
  /*!*******************************************!*\
    !*** ./src/app/regions/regions.page.scss ***!
    \*******************************************/

  /*! exports provided: default */

  /***/
  function srcAppRegionsRegionsPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlZ2lvbnMvcmVnaW9ucy5wYWdlLnNjc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/regions/regions.page.ts":
  /*!*****************************************!*\
    !*** ./src/app/regions/regions.page.ts ***!
    \*****************************************/

  /*! exports provided: RegionsPage */

  /***/
  function srcAppRegionsRegionsPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RegionsPage", function () {
      return RegionsPage;
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


    var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @ionic/storage */
    "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _covid_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../covid.service */
    "./src/app/covid.service.ts");

    let RegionsPage = class RegionsPage {
      constructor(route, covidService, toastController, storage) {
        this.route = route;
        this.covidService = covidService;
        this.toastController = toastController;
        this.storage = storage;
        this.regions = null;
        this.countryCode = '';
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
        this.sub = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["interval"])(300000).subscribe(val => {
          this.refreshingToast();
          this.getData();
        });
      }

      deleteSubscription() {
        this.sub.unsubscribe();
      }

      getData() {
        this.covidService.getRegions(this.countryCode).subscribe(data => {
          if (data) {
            this.regions = data;
            this.storage.set(this.countryCode, data);
          } else {
            this.storage.get(this.countryCode).then(val => {
              this.regions = val;
            });
          }
        });
      }

      ionViewWillEnter() {
        this.countryCode = this.route.snapshot.paramMap.get('id');
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

    RegionsPage.ctorParameters = () => [{
      type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]
    }, {
      type: _covid_service__WEBPACK_IMPORTED_MODULE_6__["CovidService"]
    }, {
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"]
    }, {
      type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"]
    }];

    RegionsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-regions',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./regions.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/regions/regions.page.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./regions.page.scss */
      "./src/app/regions/regions.page.scss")).default]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], _covid_service__WEBPACK_IMPORTED_MODULE_6__["CovidService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"], _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"]])], RegionsPage);
    /***/
  }
}]);
//# sourceMappingURL=regions-regions-module-es5.js.map