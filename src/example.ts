
/**
 * Listener
 *
 * @interface Listener
 */
interface Listener {
    (message?: any): void 
}
  /**
   * Event
   *
   * @interface Event
   */
  interface Event {
    name: string
    listener: Listener
  }
  /**
   * EventDispatcher
   *
   * @export
   * @class EventDispatcher
   */
  export default class EventDispatcher {
    private constructor() {
      this.EventList = new Array<Event>()
    }
    private static instance: EventDispatcher
    /**
     * EventDispatcher
     *
     * @static
     * @returns {EventDispatcher}
     * @memberof EventDispatcher
     */
    static getInstance(): EventDispatcher {
      this.instance = this.instance || new EventDispatcher()
      return this.instance
    }
    /**
     * EventList
     *
     * @private
     * @type {Event[]}
     * @memberof EventDispatcher
     */
    private EventList: Event[]
    /**
     * addEventListener
     *
     * @param {string} name
     * @param {Listener} listener
     * @memberof EventDispatcher
     */
    public addEventListener(name: string, listener: Listener): void {
      this.EventList.push({ name: name, listener: listener })
    }
    /**
     * removeEventListener
     *
     * @param {string} name
     * @memberof EventDispatcher
     */
    public removeEventListener(name: string): void {
      this.EventList = this.EventList.filter(event => event.name !== name)
    }
    
    /**
     *dispatchEvent
     *
     * @param {string} name
     * @param {*} [message]
     * @memberof EventDispatcher
     */
    public dispatchEvent(name: string, message?: any): void {
      this.EventList.filter(event => event.name === name)
        .map(event => event.listener)
        .forEach(listener => listener(message))
    }
  }