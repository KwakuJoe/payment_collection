// Simple abort controller manager
class AbortControllerManager {
    private controllers: Map<string, AbortController> = new Map();

    createController(key: string): AbortController {
        // Cancel existing request with the same key
        this.cancelRequest(key);

        // Create new controller
        const controller = new AbortController();
        this.controllers.set(key, controller);

        return controller;
    }

    cancelRequest(key: string): void {
        const controller = this.controllers.get(key);
        if (controller && !controller.signal.aborted) {
            controller.abort();
            console.log(`Aborted request for key: ${key}`);
        }
        this.controllers.delete(key);
    }

    cancelAllRequests(): void {
        this.controllers.forEach((controller, key) => {
            if (!controller.signal.aborted) {
                controller.abort();
                console.log(`Aborted request for key: ${key}`);
            }
        });
        this.controllers.clear();
    }

    cleanup(key: string): void {
        this.controllers.delete(key);
    }
}


const abortControllerManager = new AbortControllerManager();
export default abortControllerManager;