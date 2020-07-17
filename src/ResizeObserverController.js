import ResizeObserverWindowController from './ResizeObserverWindowController.js';

/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
export default class ResizeObserverController {
    /**
     * Map of Window to ResizeObserverWindowController instances.
     *
     * @private {Map<Window, ResizeObserverWindowController>}
     */
    resizeObserverWindowControllers_ = new Map();

    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    static instance_ = null;

    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    addObserver(observer) {
        const targetWindows = observer.getTargetWindows();
        
        targetWindows.forEach(targetWindow => {
          if (!this.resizeObserverWindowControllers_.has(targetWindow)) {
            console.log('Creating a window controller for targetWindow:');
            console.log(targetWindow);
            this.resizeObserverWindowControllers_.set(targetWindow, new ResizeObserverWindowController(targetWindow))
          }
        });
         
        for (const resizeObserverWindowController of this.resizeObserverWindowControllers_.values()){
          resizeObserverWindowController.addObserver(observer);
        }
    }

    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    removeObserver(observer) {
        for (const resizeObserverWindowController of this.resizeObserverWindowControllers_.values()){
          resizeObserverWindowController.removeObserver(observer);
        }
    }

    /**
     * Invokes the update of observers for all windows.
     *
     * @returns {void}
     */
    refresh() {
        for (const resizeObserverWindowController of this.resizeObserverWindowControllers_.values()){
          resizeObserverWindowController.refresh();
        }
    }

    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    static getInstance() {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }

        return this.instance_;
    }
}
