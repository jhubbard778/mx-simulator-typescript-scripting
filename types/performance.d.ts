declare const performance: {
    /** Returns a high resolution timestamp in milliseconds
    * It represents the time elapsed since Performance.timeOrigin 
    *  (the time when navigation has started in window contexts,
    *      or the time when the worker is run in Worker and ServiceWorker contexts).
    */
    now(): number;
};