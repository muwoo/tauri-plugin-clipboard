import { z } from "zod";
import { UnlistenFn } from "@tauri-apps/api/event";
export declare const START_MONITOR_COMMAND = "plugin:clipboard|start_monitor";
export declare const STOP_MONITOR_COMMAND = "plugin:clipboard|stop_monitor";
export declare const TEXT_CHANGED = "plugin:clipboard://text-changed";
export declare const FILES_CHANGED = "plugin:clipboard://files-changed";
export declare const IMAGE_CHANGED = "plugin:clipboard://image-changed";
export declare const IS_MONITOR_RUNNING_COMMAND = "plugin:clipboard|is_monitor_running";
export declare const READ_IMAGE_BINARY_COMMAND = "plugin:clipboard|read_image_binary";
export declare const WRITE_TEXT_COMMAND = "plugin:clipboard|write_text";
export declare const READ_TEXT_COMMAND = "plugin:clipboard|read_text";
export declare const READ_FILES_COMMAND = "plugin:clipboard|read_files";
export declare const READ_IMAGE_COMMAND = "plugin:clipboard|read_image";
export declare const WRITE_IMAGE_COMMAND = "plugin:clipboard|write_image";
export declare const CLIPBOARD_MONITOR_STATUS_UPDATE_EVENT = "plugin:clipboard://clipboard-monitor/status";
export declare const MONITOR_UPDATE_EVENT = "plugin:clipboard://clipboard-monitor/update";
export declare const ClipboardChangedPayloadSchema: z.ZodObject<{
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
}, {
    value: string;
}>;
export declare const ClipboardChangedFilesPayloadSchema: z.ZodObject<{
    value: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    value: string[];
}, {
    value: string[];
}>;
export declare type ClipboardChangedPayload = z.infer<typeof ClipboardChangedPayloadSchema>;
export declare function writeText(text: string): Promise<void>;
export declare function readText(): Promise<string>;
export declare function readFiles(): Promise<string[]>;
/**
 * read clipboard image
 * @returns image in base64 string
 */
export declare function readImage(): Promise<string>;
export declare const readImageBase64: typeof readImage;
export declare function readImageBinary(format: "int_array" | "Uint8Array" | "Blob"): Promise<number[] | Uint8Array | Blob>;
export declare function readImageObjectURL(): Promise<string>;
/**
 * write image to clipboard
 * @param data image data in base64 encoded string
 * @returns Promise<void>
 */
export declare function writeImage(data: string): Promise<void>;
/**
 * @deprecated since version v0.5.x
 * Brute force listen to clipboard text update.
 * Detect update by comparing current value with previous value every delay ms.
 * When there is a update, "plugin:clipboard://text-changed" is emitted.
 * You still need to listen to the event.
 *
 * @param delay check interval delay
 * @returns a stop running function that can be called when component unmounts
 */
export declare function startBruteForceTextMonitor(delay?: number): () => void;
/**
 * @deprecated since version v0.5.x
 * Brute force monitor clipboard image update by comparing current value with previous value.
 * When there is a update, "plugin:clipboard://image-changed" is emitted.
 * You still need to listen to the event.
 *
 * @param delay check interval delay
 * @returns stop running function that can be called to stop the monitor
 */
export declare function startBruteForceImageMonitor(delay?: number): () => void;
/**
 * Listen to "plugin:clipboard://clipboard-monitor/update" from Tauri core.
 * But this event doesn't tell us whether text or image is updated,
 * so this function will detect which is changed and emit the corresponding event
 * Event constant variables: TEXT_CHANGED or IMAGE_CHANGED
 * @returns unlisten function
 */
export declare function listenToClipboard(): Promise<UnlistenFn>;
/**
 * This listen to clipboard monitor update event, and trigger the callback function.
 * However from this event we don't know whether it's text or image, no real data is returned.
 * Use with listenToClipboard function.
 * @param cb callback
 * @returns unlisten function
 */
export declare function onClipboardUpdate(cb: () => void): Promise<UnlistenFn>;
export declare function onTextUpdate(cb: (text: string) => void): Promise<UnlistenFn>;
export declare function onFilesUpdate(cb: (files: string[]) => void): Promise<UnlistenFn>;
export declare function onImageUpdate(cb: (base64ImageStr: string) => void): Promise<UnlistenFn>;
/**
 * Used to check the status of clipboard monitor
 * @returns Whether the monitor is running
 */
export declare function isMonitorRunning(): Promise<boolean>;
/**
 * Start running mointor thread in Tauri core. This feature is added in v0.5.x.
 * Before v0.5.x, the monitor is started during setup when app starts.
 * After v0.5.x, this function must be called first to start monitor.
 * After monitor is started, events "plugin:clipboard://clipboard-monitor/update" will be emitted when there is clipboard update.
 * "plugin:clipboard://clipboard-monitor/status" event is also emitted when monitor status updates
 * Still have to listen to these events.
 */
export declare function startMonitor(): Promise<void>;
/**
 * Stop clipboard monitor thread.
 */
export declare function stopMonitor(): Promise<void>;
/**
 * Listen to monitor status update. Instead of calling isMonitorRunning to get status of monitor,
 * "plugin:clipboard://clipboard-monitor/status" event is emitted from Tauri core when monitor status updates.
 * @param cb callback to be called when there is monitor status update
 */
export declare function listenToMonitorStatusUpdate(cb: (running: boolean) => void): Promise<UnlistenFn>;
export declare function startListening(): Promise<() => Promise<void>>;
