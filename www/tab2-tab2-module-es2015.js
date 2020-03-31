(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab2-tab2-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/tab2/tab2.page.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tab2/tab2.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [translucent]=\"true\">\r\n  <ion-toolbar>\r\n    <ion-title>\r\n      COVID-19 by Country\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-toolbar>\r\n  <ion-searchbar [(ngModel)]=\"searchCountry\" autocomplete=\"off\"></ion-searchbar>\r\n</ion-toolbar>\r\n\r\n<ion-content [fullscreen]=\"true\">\r\n\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\">\r\n    <ion-refresher-content></ion-refresher-content>\r\n  </ion-refresher>\r\n\r\n  <ion-list *ngFor=\"let country of countries | filter:searchCountry\">\r\n    <ion-card lines=\"none\" class=\"ion-no-padding\">\r\n      <ion-card-header>\r\n        <ion-card-title>\r\n          {{country.country}}\r\n        </ion-card-title>\r\n      </ion-card-header>\r\n      <ion-card-content>\r\n        <ion-icon *ngIf=\"country.hasRegionalData\" (click)='getRegions(country.isoCode)'\r\n          style=\"float: right; zoom:2.0;\" name=\"chevron-forward-circle\"></ion-icon>\r\n        <ion-avatar *ngIf=\"country.flag\" style=\"float: left; margin-right:1em;\" slot=\"start\">\r\n          <img src=\"../assets/flags-countries/{{country.flag}}.svg\" />\r\n        </ion-avatar>\r\n        <ion-label (click)=\"getHistoricalData(country.isoCode)\">\r\n          <p style=\"overflow: hidden;\">\r\n            Cases: {{country.cases | number}} | Today: {{country.todayCases | number}}<br>\r\n            Active: {{country.active | number}}<br>\r\n            Deaths: {{country.deaths | number}} | Today: {{country.todayDeaths | number}}<br>\r\n            Recovered: {{country.recovered | number}} | Critical {{country.critical | number}}\r\n          </p>\r\n        </ion-label>\r\n      </ion-card-content>\r\n      <!-- <ion-label>\r\n        <h1>{{country.country}}</h1>\r\n        <p>\r\n          Cases: {{country.cases | number}} | Today: {{country.todayCases | number}} | Active: {{country.active | number}}<br>\r\n          Deaths: {{country.deaths | number}} | Today: {{country.todayDeaths | number}}<br>\r\n          Recovered: {{country.recovered | number}} | Critical {{country.critical | number}}\r\n        </p>\r\n      </ion-label> -->\r\n    </ion-card>\r\n  </ion-list>\r\n</ion-content>");

/***/ }),

/***/ "./src/app/tab2/tab2.module.ts":
/*!*************************************!*\
  !*** ./src/app/tab2/tab2.module.ts ***!
  \*************************************/
/*! exports provided: Tab2PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab2PageModule", function() { return Tab2PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");
/* harmony import */ var _tab2_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tab2.page */ "./src/app/tab2/tab2.page.ts");








let Tab2PageModule = class Tab2PageModule {
};
Tab2PageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_6__["Ng2SearchPipeModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _tab2_page__WEBPACK_IMPORTED_MODULE_7__["Tab2Page"] }])
        ],
        declarations: [_tab2_page__WEBPACK_IMPORTED_MODULE_7__["Tab2Page"]]
    })
], Tab2PageModule);



/***/ }),

/***/ "./src/app/tab2/tab2.page.scss":
/*!*************************************!*\
  !*** ./src/app/tab2/tab2.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-content ion-toolbar {\n  --background: translucent;\n}\n\nion-card {\n  margin-bottom: 0px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGFiMi9DOlxcVXNlcnNcXE5pam9cXFByb2plY3RzXFxDb3ZpZC0xOS1BUElcXGZyb250ZW5kL3NyY1xcYXBwXFx0YWIyXFx0YWIyLnBhZ2Uuc2NzcyIsInNyYy9hcHAvdGFiMi90YWIyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlCQUFBO0FDQ0Y7O0FERUE7RUFDRSw2QkFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvdGFiMi90YWIyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50IGlvbi10b29sYmFyIHtcclxuICAtLWJhY2tncm91bmQ6IHRyYW5zbHVjZW50O1xyXG59XHJcblxyXG5pb24tY2FyZHtcclxuICBtYXJnaW4tYm90dG9tOiAwcHggIWltcG9ydGFudDtcclxufSIsImlvbi1jb250ZW50IGlvbi10b29sYmFyIHtcbiAgLS1iYWNrZ3JvdW5kOiB0cmFuc2x1Y2VudDtcbn1cblxuaW9uLWNhcmQge1xuICBtYXJnaW4tYm90dG9tOiAwcHggIWltcG9ydGFudDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/tab2/tab2.page.ts":
/*!***********************************!*\
  !*** ./src/app/tab2/tab2.page.ts ***!
  \***********************************/
/*! exports provided: Tab2Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab2Page", function() { return Tab2Page; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _covid_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../covid.service */ "./src/app/covid.service.ts");






let Tab2Page = class Tab2Page {
    constructor(covidService, toastController, storage, navCtrl) {
        this.covidService = covidService;
        this.toastController = toastController;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.countries = null;
        this.historical = null;
    }
    createToast(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log(msg);
            const toast = yield this.toastController.create({
                message: msg,
                duration: 2000
            });
            toast.present();
        });
    }
    getRegions(countryCode) {
        this.navCtrl.navigateForward(`/regions/${countryCode}`);
    }
    getHistoricalData(countryCode) {
        let countryTimeSeries = this.historical[countryCode];
        if (countryTimeSeries) {
            this.navCtrl.navigateForward(`/history/${countryCode}`);
        }
    }
    createSubscription() {
        this.sub = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(300000).subscribe((val) => {
            this.createToast('Refreshing...');
            this.getData();
        });
    }
    deleteSubscription() {
        this.sub.unsubscribe();
    }
    getData() {
        this.covidService.getCountries().subscribe((data) => {
            if (data) {
                this.countries = data;
                this.storage.set('countries', data);
            }
            else {
                this.storage.get('countries').then((val) => {
                    this.countries = val;
                });
            }
        });
        this.covidService.getTimeSeries().subscribe((data) => {
            if (data) {
                this.historical = data;
                this.storage.set('historical', data);
            }
            else {
                this.storage.get('historical').then((val) => {
                    this.historical = val;
                });
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
        this.createToast('Refreshing...');
        this.getData();
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }
};
Tab2Page.ctorParameters = () => [
    { type: _covid_service__WEBPACK_IMPORTED_MODULE_5__["CovidService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] }
];
Tab2Page = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tab2',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./tab2.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/tab2/tab2.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./tab2.page.scss */ "./src/app/tab2/tab2.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_covid_service__WEBPACK_IMPORTED_MODULE_5__["CovidService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"], _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"]])
], Tab2Page);



/***/ })

}]);
//# sourceMappingURL=tab2-tab2-module-es2015.js.map