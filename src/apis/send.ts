// @ts-nocheck

/**
 * Лимит на число счетчиков в одном запросе
 *
 * @type {Number}
 */
var MAX_BATCH_COUNTERS = 42;

/**
 * Интервал в миллисекундах, в течение которого счётчики склеиваются
 *
 * @type {Number}
 */
var COUNTERS_BATCH_TIMEOUT = 15;

const API_KEY = '8B6B7D2D-BAAF-44B9-A2FB-0DEB94754714'
const PAGE_NAME = 'Weather view page'

interface ObjectShape {
    [fieldName: string]: any
}

export class Counter {
    guid = '';
    reqid = '';
    page = '';
    additional = {};
    counters: ObjectShape = {}
    private _inited = false;
    private _indexes = {};
    private _countersBatchData = [];
    private _counterTimerId = null;
    private counterUrl = 'https://shri.yandex/hw/stat/send';

    constructor(guid: string, reqid: string, page: string) {
        if (guid && reqid && page) {
            this.guid = guid;
            this.reqid = reqid;
            this.page = page;

            this._inited = true;
        }
    }

    increase(name: string) {
        if (!this.counters[name]) {
            this.counters[name] = 0
        }

        this.counters[name] += 1
    }

    getCounterValue(name: string) {
        const value = this.counters[name]
        delete this.counters[name]
        return value || 0
    }

    setAdditionalParams(additionalParams: ObjectShape) {
        this.additional = Object.assign({}, additionalParams);
    }

    /**
     * Отправка счётчика. Основной транспорт - sendBeacon, запасной - XMLHttpRequest. Быстро поступающие одиночные события
     * накапливаются и отправляются пачками по MAX_BATCH_COUNTERS штук.
     *
     * @param {String} name
     * @param {Number} value
     */
    send(name: string | number, value: any) {
        if (!this._inited) {
            console.warn('counter is not inited');

            return;
        }

        clearTimeout(this._counterTimerId);

        if (!this._indexes[name]) {
            this._indexes[name] = 0;
        }

        var counterData = {
            counterId: this.guid,
            requestId: this.reqid,
            page: this.page,
            name: name,
            value: value,
            index: this._indexes[name],
            additional: this.additional
        },
            self = this;

        this._countersBatchData.push(counterData);

        this._indexes[name]++;

        if (this._countersBatchData.length < MAX_BATCH_COUNTERS) {
            this._counterTimerId = setTimeout(function () {
                self.sendBatchRequest();
            }, COUNTERS_BATCH_TIMEOUT);
        } else {
            sendBatchRequest();
        }
    }

    private sendBatchRequest() {
        var data = JSON.stringify(this._countersBatchData);

        this._countersBatchData = [];
        this._counterTimerId = null;

        var sendBeaconPostAvailable = navigator.sendBeacon,
            sendBeaconResult = sendBeaconPostAvailable && navigator.sendBeacon(this.counterUrl, new Blob([data], { type: 'application/json' }));

        if (!sendBeaconResult) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', this.counterUrl);
            xhr.send(data);
        }
    }
}

export default new Counter(
    API_KEY,
    String(Math.random()).substr(2, 12),
    PAGE_NAME
)